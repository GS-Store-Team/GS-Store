package com.store.gs.repositories;

import com.store.gs.models.UserData;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserDataRepository extends CrudRepository<UserData, Long> {

    @Modifying
    @Query("insert into userdata (user_id, nickname, email, phonenumber, description) " +
           "values (:user_id, :nickname, :email, :phone_number, :description)")
    void insert(@Param("user_id") Long userId,
                @Param("nickname") String nickName,
                @Param("email") String email,
                @Param("phone_number") String phoneNumber,
                @Param("description") String description);
}
