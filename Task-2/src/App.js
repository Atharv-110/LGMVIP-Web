import React, { useState } from 'react';
import './App.css';
import { DiAndroid } from "react-icons/di";
import Card from './components/cards';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(false);
  // API Calling from here
  const getUser = () => {
    console.log('before');
    setloading(true)
    const time = setTimeout(async () => {
      const resPonse = await fetch('https://reqres.in/api/users?page=1');
      const jsonResponse = await resPonse.json();
      console.log(jsonResponse);
      setloading(false);
      setUsers(jsonResponse.data)

    }, 2000);
    console.log('sfter');
    return () => clearTimeout(time)
  }
  // Navbar and Cards Dimensioning
  return (
    <div className="App">
      <div className="nav">
        <div className="name">
          <DiAndroid />DEVO-APP
        </div>
        <div className="getButton">
          <button onClick={getUser}>Get Users</button>
        </div>
      </div>
      {
        users.length > 0 ?
          (<div className="row">
            {
              users.map((user, idx) => {
                const userData = user;
                return (
                  <div key={idx} className="col">
                    <Card userData={userData} />
                  </div>
                )
              })
            }
          </div>)
          : null
      }
      {
        // Loader
        loading ? (<div className="loader"></div>) : null
      }
    </div>
  );
}
export default App;