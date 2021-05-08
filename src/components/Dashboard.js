
import CryptoCard from './CryptoCard'
import './Dashboard.css';

function Dashboard(props) {
    const { currency, cryptos } = props;

    return (
        <div className="dashboard" >
            {
                cryptos 
                ? cryptos.map((crypto, index) => <CryptoCard key={index} crypto = {crypto} currency = {currency}/>)
                : "There are no cryptos in this list"
            }
        </div>
    );
}

export default Dashboard;
