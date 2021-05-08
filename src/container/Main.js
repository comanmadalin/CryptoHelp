import React, {useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import CurrencySelect from '../components/CurrencySelect';
import "./Main.css";
import axios from "axios";

function Main() {
  const [currency, setCurrency] = useState("EUR");

  const [cryptos, setCryptos] = useState([]);
  useEffect(() => {   
      const options = {
          method: 'GET',
          url: 'https://coinpaprika1.p.rapidapi.com/tickers',
          headers: {
              'x-rapidapi-key': '00ad0163a5msh6cd633284bbf7d3p15fb30jsn2e5ffa5f8c73',
              'x-rapidapi-host': 'coinpaprika1.p.rapidapi.com'
          }
      }; 
      axios.request(options).then(function (response) {
          setCryptos(response.data.slice(0,15));
      }).catch(function (error) {
          console.error(error);
      });
  }, []);

  return (
    <div className="main">
      <CurrencySelect currency = {currency} setCurrency ={setCurrency} />
      <div className="dashboards">
        <div>
          <h2>All cryptos</h2>
          <Dashboard currency = {currency} cryptos = {cryptos}/>
        </div>
        <div>
          <h2>Your cryptos</h2>
          <Dashboard currency = {currency}/>
        </div>
      </div>
    </div>
  );
}

export default Main;
