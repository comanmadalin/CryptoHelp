import React, {useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import CurrencySelect from '../components/CurrencySelect';
import Button from '@material-ui/core/Button';
import { db } from '../firebase';
import "./Main.css";
import axios from "axios";

function Main(props) {
  const [currency, setCurrency] = useState("EUR");
  const [cryptos, setCryptos] = useState([]);
  const [userCryptos, setUserCryptos] = useState([]);
  const { setUser, currentUser } = props;

  const logOut = () => {
    setUser(null);
  }

  const fetchCryptoAPI = () => {
    const options = {
        method: 'GET',
        url: 'https://coinpaprika1.p.rapidapi.com/tickers',
        headers: {
            'x-rapidapi-key': '00ad0163a5msh6cd633284bbf7d3p15fb30jsn2e5ffa5f8c73',
            'x-rapidapi-host': 'coinpaprika1.p.rapidapi.com'
        }
    }; 
    axios.request(options)
    .then(function (response) {
      setCryptos(response.data.slice(0,15));
      return response.data.slice(0,15);
    }).then((cryptos)=> {
      fetchCryptoDataBase(cryptos);
    }).catch(function (error) {
        console.error(error);
    });
  }

  const fetchCryptoDataBase = (fetchedCoins) => {
    db.collection("users").doc(currentUser.id).get().then((doc) => {
      if (doc.exists) {
        let coins = [];
        doc.data().cryptos.map(index => {
          coins.push({...fetchedCoins[index], index})
        });
        setUserCryptos(coins);
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  useEffect(() => { 
    fetchCryptoAPI();  
  }, []);

  return (
    <div className="main">
        <Button onClick={() => logOut()} className="logOut" variant="contained" color="primary">
            Log out
        </Button>
      <CurrencySelect currency = {currency} setCurrency ={setCurrency} />
      <div className="dashboards">
        <div>
          <h2>All cryptos</h2>
          <Dashboard currency = {currency} 
            cryptos = {cryptos} 
            user = {currentUser} 
            isFav = {false} 
            userCryptos= {userCryptos}
            setUserCryptos = {setUserCryptos}
          />
        </div>
        <div>
          <h2>Your cryptos</h2>
          <Dashboard 
            currency = {currency} 
            cryptos = {userCryptos} 
            user = {currentUser} 
            isFav = {true}
            userCryptos= {userCryptos}
            setUserCryptos = {setUserCryptos} />
        </div>
      </div>
    </div>
  );
}

export default Main;
