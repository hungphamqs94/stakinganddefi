import './App.css';
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Marketplace from './components/Marketplace';
import Gradens from './components/Gradens';
import Bank from './components/Bank';
import Docks from './components/Docks';
import MeditationCircle from './components/Meditation Circle';
import Portal from './components/Portal';
import Professions from './components/Professions';
import Tavern from './components/Tavern';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// We'll use ethers to interact with the Ethereum network and our contract
// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import UniswapV2Router02 from "./contracts/UniswapV2Router02.json";
import UniswapV2Router02Address from "./contracts/UniswapV2Router02-address.json";
import JewelToken from "./contracts/JewelToken.json";
import JewelTokenAddress from "./contracts/JewelToken-address.json";
import RenaToken from "./contracts/RenaToken.json";
import RenaTokenAddress from "./contracts/RenaToken-address.json";

// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import { NoTokensMessage } from "./NoTokensMessage";

const HARDHAT_NETWORK_ID = '31337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

class App extends Component {

  constructor(props) {
    super(props);

    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      tokenRenaData: undefined,
      tokenJewelData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      balanceJewel: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      approveRena: undefined,
      approveJewel: undefined,
    };
    this.handleChangeRena = this.handleChangeRena.bind(this);
    this.handleChangeJewel = this.handleChangeJewel.bind(this);
    this.state = this.initialState;
    this.addLiquidity = this.addLiquidity.bind(this);
  }

  async approveRena() {
    await this._renaToken.approve(String(UniswapV2Router02Address.Token),String(this.state.approveRena), {from : this.state.selectedAddress})
  }

  async approveJewel() {
    await this._jewelToken.approve(String(UniswapV2Router02Address.Token),String(this.state.approveJewel), {from : this.state.selectedAddress})
  }

  async addLiquidity(amoutOne, amountTwo) {
    await this._uniswapRouter02.addLiquidity(RenaTokenAddress.Token, JewelTokenAddress.Token, String(2000000000000000000), String(2000000000000000000), String(1e18), String(1e18), String(this.state.selectedAddress), 1640654617)
  }

  handleChangeRena(e) {
    this.setState({approveRena: e.target.value});
  }

  handleChangeJewel(e) {
    this.setState({approveJewel: e.target.value});
  }


  render() {

    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet 
          connectWallet={() => this._connectWallet()} 
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }

    if (!this.state.tokenRenaData || !this.state.balance) {
      return <Loading />;
    }

    return (
      <Router>
        <div>
          <nav>
            <ul style={{listStyleType: "none"}}>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/">
                <div>
                    <h2>Approve Rena</h2>
                    <Form style={{width: "50%", marginLeft: "25%", background: 'black',}}>
                            <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                                    <Form.Control placeholder="From" style={{width:'70%', float: 'left', marginRight: '20px'}}/>
                                  
                            </Form.Group>
                            <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                                    <Form.Control placeholder="To" style={{width:'70%', float: 'left', marginRight: '20px'}} />
                                    
                            </Form.Group>
                            <Button variant="primary" type="submit" variant="success" style={{width: '90%', marginTop: '20px', marginBottom: '20px'}} onClick={()=>this.addLiquidity()}>
                                Add Liquidity
                            </Button>
                        </Form>
                        
                    </div>
                    <div>
                        <h2>Approve Jewel</h2>
                        <Form style={{width: "50%", marginLeft: "25%", background: 'black',}}>
                          <Form.Group style={{background: '#a3a2a2', padding: '15px', display: 'table', width: '100%'}}>
                            <Form.Control placeholder="Number Rena" style={{width:'100%'}} onChange={this.handleChangeJewel}/>
                          </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" variant="success" style={{width: '90%', marginTop: '20px', marginBottom: '20px'}} onClick={()=>this.approveJewel()}>
                          Approve JEWEL
                        </Button>
                    </div>
                </Link>
              </li>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/marketplace">MarketPlace</Link>
              </li>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/gradens">Gradens</Link>
              </li>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/bank">Bank</Link>
              </li>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/tavern">Tavern</Link>
              </li>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/portal">Portal</Link>
              </li>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/meditationcircle">Meditation Circle</Link>
              </li>
              <li style={{float: "left", padding: "20px"}}>
                <Link to="/professions">Professions</Link>
              </li>
              <li style={{ padding: "20px"}}>
                <Link to="/docks">Docks</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/marketplace" element={<Marketplace/>} addLiquidity={this.addLiquidity}>
            </Route>
            <Route path="/gradens" element={<Gradens/>}>
            </Route>
            <Route path="/"  element={<Home/>}>
            </Route>
            <Route path="/bank" element={<Bank/>}>
            </Route>
            <Route path="/docks" element={<Docks/>}>
            </Route>
            <Route path="/meditationcircle" element={<MeditationCircle/>}>
            </Route>
            <Route path="/portal" element={<Portal/>}>
            </Route>
            <Route path="/professions" element={<Professions/>}>
            </Route>
            <Route path="/tavern" element={<Tavern/>}>
            </Route>
          </Routes>
        </div>
      </Router>
    );
  }

  componentWillUnmount() {
    // We poll the user's balance, so we have to stop doing that when Dapp
    // gets unmounted
    this._stopPollingData();
  }

  async _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.enable();

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);
    this._transferToken();
    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(newAddress);
      
    });
    
    // We reset the dapp state if the network is changed
    window.ethereum.on("networkChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    this._intializeEthers();
    this._getData();
    this._startPollingData();
  }

  async _intializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    // When, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    this._uniswapRouter02 = new ethers.Contract(
      UniswapV2Router02Address.Token,
      UniswapV2Router02.abi,
      this._provider.getSigner(0)
    );
    this._jewelToken = new ethers.Contract(
      JewelTokenAddress.Token,
      JewelToken.abi,
      this._provider.getSigner(0)
    );
    this._renaToken = new ethers.Contract(
      RenaTokenAddress.Token,
      RenaToken.abi,
      this._provider.getSigner(0)
    );
  }

  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

    // We run it once immediately so we don't have to wait for it
    this._updateBalance();
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  async _getData() {
    const name = await this._renaToken.name();
    const symbol = await this._renaToken.symbol();
    this.setState({ tokenRenaData: { name, symbol } });
    const nameJewel = await this._jewelToken.name();
    const symbolJewel = await this._jewelToken.symbol();
    this.setState({tokenJewelData: {nameJewel, symbolJewel}})
  }

  async _updateBalance() {
    const balance = await this._renaToken.balanceOf(this.state.selectedAddress);
    this.setState({ balance });
    const balanceJewel = await this._jewelToken.balanceOf(this.state.selectedAddress);
    this.setState({ balanceJewel });
  }

  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  // This method just clears part of the state.
  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }

  // This method checks if Metamask selected network is Localhost:8545 
  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({ 
      networkError: 'Please connect Metamask to Localhost:8545'
    });

    return false;
  }

  async _transferToken() {
    const tx = await this._renaToken.mint(String(this.state.selectedAddress), String(10e18), {from: this.state.selectedAddress});
    console.log('cho toi biet gia tri:', JSON.stringify(tx));
    const txJewel = await this._jewelToken.mint(String(this.state.selectedAddress), String(10e18), {from: this.state.selectedAddress});
    console.log('22222222222222222222:', JSON.stringify(txJewel));
  }



}

export default App;

