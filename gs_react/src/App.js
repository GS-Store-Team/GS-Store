import React, {useState} from "react";
import PluginList from "./components/pluginList/PluginList";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [plugins, setplugins] = useState([
    {id: 1, name: 'First', shortDescription: 'some', mark: 5},
    {id: 2, name: 'Second', shortDescription: 'some', mark: 4},
    {id: 3, name: 'Third', shortDescription: 'some', mark: 3},
    {id: 4, name: '4', shortDescription: 'some', mark: 3},
    {id: 5, name: '5', shortDescription: 'some', mark: 3},
    {id: 6, name: '6', shortDescription: 'some', mark: 3},
    {id: 7, name: '7', shortDescription: 'some', mark: 3},
    {id: 8, name: '8', shortDescription: 'some', mark: 3},
    {id: 9, name: '9', shortDescription: 'some', mark: 3},
    {id: 10, name: '9', shortDescription: 'some', mark: 3}]);

  return <div>
    <PluginList list={plugins}/>
  </div>;
}

export default App;
