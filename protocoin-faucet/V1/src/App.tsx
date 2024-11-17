import { useState } from 'react';

import { mint, ProtoCoinContractAddress } from './Web3Service';
function App() {

  const [message,setMessage] = useState("");

  function onBtnClick() {
    setMessage("Requesting your tokens...waiting..");

    mint()
      .then((tx) => setMessage("Your token were sent. Tx: " + tx.transactionHash) )
      .catch((err) => setMessage(err.message));
  }

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">ProtoCoin Faucet</h3>
          
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a>
            <a className="nav-link fw-bold py-1 px-0" href="#">About</a>
          </nav>
        </div>
      </header>

      <main className="px-3">
        <h1>Get your ProtoCoins</h1> <br/>
        <h6>PRC Contract: {ProtoCoinContractAddress()}</h6> <br />
        <p className="lead">Once a day, earn 1.000 coins for free just connecting your MetaMask below. </p>
    <br/><br/>
        <p className="lead">
          <a href="#" onClick={onBtnClick} className="btn btn-lg btn-light fw-bold border-white bg-white">
            <img src="/assets/metamask.svg" alt='Metamask logo' width={48} />
            Connect MetaMask</a>
        </p>
        <p className="lead">
          {message}
        </p>
      </main>

      <footer className="mt-auto text-white-50">
        <p>Built by  <a href="https://www.linkedin.com/in/deivid-r-santos/" className="text-white">Deivid Roger</a></p>
      </footer>
    </div>
  );
}

export default App;
