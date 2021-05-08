import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import axios from "axios";
import "./CryptoCard.css";


export default function CryptoCard(props) {
  const { crypto, currency } = props;
  const [ currencyConversion, setCurrencyConversion ] = useState(0);
  const roundNumber = (number) => { return Math.round(number * 100) / 100 };
  const convertCurrency = (sum) => { return sum* currencyConversion};


  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://currency-exchange.p.rapidapi.com/exchange',
  //     params: {to: currency, from: 'USD', q: '1.0'},
  //     headers: {
  //       'x-rapidapi-key': '00ad0163a5msh6cd633284bbf7d3p15fb30jsn2e5ffa5f8c73',
  //       'x-rapidapi-host': 'currency-exchange.p.rapidapi.com'
  //     }
  //   };
  //   axios.request(options).then(function (response) {
  //     setCurrencyConversion(response.data);
  //   }).catch(function (error) {
  //       console.error(error);
  //   });
  // }, [currency]);

  return (
    <Card className="crypto-card">
      <CardContent>
        <h2>{ crypto.name }</h2>
        <h5 className="prices"> 
        {`${roundNumber(crypto.quotes.USD.price)} USD`}
         <TrendingFlatIcon/> 
         {`${roundNumber(convertCurrency(crypto.quotes.USD.price))} ${currency}`}
        </h5>
      </CardContent>
      <CardActions className="crypto-card-action">
        <IconButton>
          <AddCircleIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}