
import CryptoCard from './CryptoCard'
import './Dashboard.css';

function Dashboard(props) {
    const { currency, cryptos, user, isFav, userCryptos, setUserCryptos } = props;

    return (
        <div className="dashboard" >
            {
                cryptos && cryptos.length > 0
                ? cryptos.map((crypto, index) => 
                    <CryptoCard 
                        key={index} 
                        crypto = {crypto} 
                        currency = {currency} 
                        user = {user} 
                        index = {index} 
                        isFav={isFav}
                        userCryptos= {userCryptos}
                        setUserCryptos = {setUserCryptos}
                    />)
                : "There are no cryptos in this list"
            }
        </div>
    );
}

export default Dashboard;
