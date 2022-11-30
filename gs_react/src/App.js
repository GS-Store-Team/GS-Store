import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./components/AppRouter";
import Header from "./components/header/Header";

const App = () => {

  return <div>
            <Header />
            <AppRouter />
         </div>;
}

export default App;
