import React, {useEffect, useState} from "react";
import PluginList from "./components/pluginList/PluginList";
import 'bootstrap/dist/css/bootstrap.min.css';
import PluginService from "./API/PluginService";
import PluginForm from "./components/pluginForm/PluginForm";
import Header from "./components/header/Header";

const App = () => {
  const pic = "https://cs11.pikabu.ru/images/big_size_comm/2018-05_6/1527621584174088638.jpg";

  const [plugins, setplugins] = useState([
    {id: 1, name: 'First', picture: pic, shortDescription: 'some', mark: 5},
    {id: 2, name: 'Second', picture: pic,  shortDescription: 'some', mark: 4},
    {id: 3, name: 'Third', picture: pic, shortDescription: 'some', mark: 3},
    // {id: 4, name: '4', picture: pic, shortDescription: 'some', mark: 3},
    // {id: 5, name: '5', picture: pic, shortDescription: 'some', mark: 3},
    // {id: 6, name: '6', picture: pic, shortDescription: 'some', mark: 3},
    // {id: 7, name: '7', picture: pic, shortDescription: 'some', mark: 3},
    // {id: 8, name: '8', picture: pic, shortDescription: 'some', mark: 3},
    // {id: 9, name: '9', picture: pic, shortDescription: 'some', mark: 3},
    {id: 10, name: '9', picture: pic, shortDescription: 'some', mark: 3}]);


  useEffect(() =>{
    fetchPlugins();
  }, [])

  async function fetchPlugins() {
    const response = await PluginService.getPage();
    setplugins(response.data.content);
  }

  const addPlugin = (plugin) => {
    setplugins([...plugins ,plugin])
  }

  return <div>
    {/*<PluginForm add={addPlugin}/>*/}
    {/*<PluginList list={plugins}/>*/}
    <Header />
  </div>;
}

export default App;
