import React, {useState, useEffect } from 'react';
import Main from './container/Main';
import { SignIn } from './components/SignIn';
import "./App.css";
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_PEXELS_KEY;
  });

  return (
    <div className="App">
      {user !== null ? <Main setUser = {setUser} currentUser = {user}/> : <SignIn setUser = {setUser} /> }
    </div>
  );
}

export default App;
