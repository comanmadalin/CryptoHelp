# CryptoHelp

#### Introducere 
CryptoHelp este un Single Page Application destinat persoanelor ce vor sa urmareasca evolutia pretului cryptomonedelor.

#### Descriere problemă
In ultimii ani, Cryptomonedele au luat amploare in domeniul investitiilor, drept urmare o aplicatie precum CryptoHelp vine in ajutorul persoanelor interesate de acest tip de active. 
In cadrul aplicatiei, sunt incarcate 25 de cryptomonede, impreuna cu pretul acestora. Totodata, interfata pune la dispozitia utilizatorului inca 2 modalitati de conversie a pretului, din Dolari in Euro, respectiv Lira Sterlina. 

#### Descriere API 
Pentru realizarea acestei aplicatii, au fost utilizate doua API-uri de tip REST:
##### 1. coinpaprika1
Acest API a folosit pentru popularea UI-ului cu date despre cryptomonede: denumire si pretul actual. 

##### 2. currency-exchange
Acest API a fost folosit pentru convesia pretului cryptomonedei, din Dolari americani in Lire sterline/ Euro

#### Servicii cloud
##### 1. Firestore Authentication
Pentru autentificare, s-a folosit Google Authentication, pus la dispozitie de Firebase. Autentificare se face prin pop-up, iar apelul este urmatorul: 
```
auth.signInWithPopup(googleProvider).then(res => {
   let loggedUser = {
       displayName: res.additionalUserInfo.profile.given_name,
       id: res.additionalUserInfo.profile.id
   }
}
```

##### 2. Cloud Firestore
In cadrul aplicatiei a fost necesara si stocarea persistenta, in cazul cryptomonedelor favorite. Acestea se stocheaza intr-un vector in documetentul specific fiecarui utilizator. Un exemplu de apel, poate fi cel de aducere in UI cryptomonedele salvate: 
```
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
```

#### Flux de date
Utilizatorul interactioneaza pentru prima data cu aplicatia in momentul autentificarii, aceasta realizandu-se prin Google. Odata autentificat, utilizatorul este dus catre dashboard, unde poate vedea o lista cu cryptomonede existente si o lista cu cryptomonede favorite. Din lista cu cryptomonede existente, acesta isi poate alege si adauga in lista de urmarire.

#### Request/response 
Pentru gestionarea cererilor/raspunsurilor facute/primite de la API, s-a folosit axios, iar un exemplu poate fi vazut dupa cum urmeaza: 
```
    const options = {
      method: 'GET',
      url: 'https://currency-exchange.p.rapidapi.com/exchange',
      params: {to: currency, from: 'USD', q: '1.0'},
      headers: {
        'x-rapidapi-key': '00ad0163a5msh6cd633284bbf7d3p15fb30jsn2e5ffa5f8c73',
        'x-rapidapi-host': 'currency-exchange.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      setCurrencyConversion(response.data);
    }).catch(function (error) {
        console.error(error);
    });
```

### Publicarea
Aplicatia a fost publicata folosind heroku si poate fi accesata la adresa: https://crypyohelp.herokuapp.com/

### Rularea locala
Pentru a rula acest proiect local, sunt necesari urmatorii pasi:
```
git clone this repository
cd cryptohelp
npm install
npm start
```
Project is running on port 3000 -> http://localhost:3000/

![Dashboard](https://github.com/comanmadalin/CryptoHelp/blob/main/Dashboard.png)
![Authentication](https://github.com/comanmadalin/CryptoHelp/blob/main/Auth.png)

### Referinte
- https://reactjs.org/
- https://www.npmjs.com/package/axios
- https://firebase.google.com/docs/auth
- https://firebase.google.com/docs/web/setup
