(declare supply-msg)
(declare notify-msg)

(defn storage
      "Creates a new storage
       ware - a name of ware to store (string)
       notify-step - amount of stored items required for logger to react. 0 means to logging
       consumers - factories to notify when the storage is updated
       returns a map that contains:
         :storage - an atom to store items that can be used by factories directly
         :ware - a stored ware name
         :worker - an agent to send supply-msg"
      [ware notify-step & consumers]
      (let [counter (atom 0 :validator #(>= % 0)),
            worker-state {:storage counter,
                          :ware ware,
                          :notify-step notify-step,
                          :consumers consumers}]
           {:storage counter,
            :ware ware,
            :worker (agent worker-state)}))

(defn factory
      "Creates a new factory
       amount - number of items produced per cycle
       duration - cycle duration in milliseconds
       target-storage - a storage to put products with supply-msg
       ware-amounts - a list of ware names and their amounts required for a single cycle
       returns a map that contains:
         :worker - an agent to send notify-msg"
      [amount duration target-storage & ware-amounts]
      (let [bill (apply hash-map ware-amounts),
            buffer (reduce-kv (fn [acc k _] (assoc acc k 0))
                              {} bill),
            worker-state {:amount amount,
                          :duration duration,
                          :target-storage target-storage,
                          :bill bill,
                          :buffer buffer}]
           {:worker (agent worker-state)}))

(defn source
      "Creates a source that is a thread that produces 'amount' of wares per cycle to store in 'target-storage'
       and with given cycle 'duration' in milliseconds
       returns Thread that must be run explicitly"
      [amount duration target-storage]
      (new Thread
           (fn []
               (Thread/sleep duration)
               (send (target-storage :worker) supply-msg amount)
               (recur))))

(defn supply-msg
      "A message that can be sent to a storage worker to notify that the given 'amount' of wares should be added.
       Adds the given 'amount' of ware to the storage and notifies all the registered factories about it
       state - see code of 'storage' for structure"
      [state amount]
      (swap! (state :storage) #(+ % amount))
      (let [ware (state :ware),
            cnt @(state :storage),
            notify-step (state :notify-step),
            consumers (state :consumers)]

           (when (and (> notify-step 0)
                      (> (int (/ cnt notify-step))
                         (int (/ (- cnt amount) notify-step))))
                 (println (.format (new java.text.SimpleDateFormat "hh.mm.ss.SSS") (new java.util.Date))
                          "|" ware "amount: " cnt))

           (when consumers
                 (doseq [consumer (shuffle consumers)]
                        (send (consumer :worker) notify-msg ware (state :storage) amount))))
      state)

(defn notify-msg
      "A message that can be sent to a factory worker to notify that the provided 'amount' of 'ware's are
       just put to the 'storage-atom'."
      [state ware storage-atom]
      (let [bill (state :bill)
            buffer (state :buffer)
            needed_amount (- (bill ware) (buffer ware))
            [a_old a_new] (swap-vals! storage-atom #(- % (min % needed_amount)))
            new_buffer (assoc buffer ware (+ (buffer ware) (- a_old a_new)))
            ]
           (if (= bill new_buffer)

             (do
               (Thread/sleep (state :duration))
               (send ((state :target-storage) :worker) supply-msg (state :amount))
               (assoc state :buffer (reduce-kv (fn [acc k _] (assoc acc k 0))
                                               {} bill))
               )

             (assoc state :buffer new_buffer)
             )
           )
      )

;;;
(def safe-storage (storage "Safe" 1))
(def safe-factory (factory 1 3000 safe-storage "Metal" 3))
(def cuckoo-clock-storage (storage "Cuckoo-clock" 1))
(def cuckoo-clock-factory (factory 1 2000 cuckoo-clock-storage "Lumber" 5 "Gears" 10))
(def gears-storage (storage "Gears" 1 cuckoo-clock-factory))
(def gears-factory (factory 4 1000 gears-storage "Ore" 4))
(def metal-storage (storage "Metal" 1 safe-factory))
(def metal-factory (factory 1 1000 metal-storage "Ore" 10))
(def lumber-storage (storage "Lumber" 2 cuckoo-clock-factory))
(def lumber-mill (source 5 4000 lumber-storage))
(def ore-storage (storage "Ore" 1 metal-factory gears-factory))
(def ore-mine (source 2 1000 ore-storage))

(defn start []
      (.start ore-mine)
      (.start lumber-mill))

(defn stop []
      (.stop ore-mine)
      (.stop lumber-mill))

(defn -main []
      (do
        (start)
        (Thread/sleep 60000)
        (stop)
        (println (agent-error (gears-factory :worker)))
        ))
