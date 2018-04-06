import React, { Component } from 'react';
import './Contract.css';
//import Web3 from 'web3';

class Contract extends Component {
  constructor(props) {
    super(props);

     this.state = {
        web3: null,
        // deployedTokenContractContract: "0x13274fe19c0178208bcbee397af8167a7be27f6f",
        deployedBarterContractInstance: null,
        deployedBarterContractAddress: "0xd54b47f8e6a1b97f3a84f63c867286272b273b7c",
        mnemonic: "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
     };



     this.onPressed = this.onPressed.bind(this);
     this.onCanceled = this.onCanceled.bind(this);
     // this.onContractSubmit =  this.onContractSubmit.bind(this);
     // this.filterWatch = this.filterWatch.bind(this);
    }

  onPressed(e){
    e.preventDefault();
    var abi = [{"constant":false,"inputs":[],"name":"reportServiceProvided","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractAlive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"returnEscrowHoldingToOwners","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"payEscrow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"cancelAgreement","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"checkEscrowFulfilled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_ReputationTokenContract","type":"address"},{"name":"_driver","type":"address"},{"name":"_doctor","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_driverReputationTokensHeld","type":"uint256"},{"indexed":false,"name":"_doctorReptuationTokenHeld","type":"uint256"}],"name":"AgreementReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_fulfilled","type":"bool"}],"name":"AgreementFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_driverReputationTokensReturned","type":"uint256"},{"indexed":false,"name":"_doctorReputationTokensReturned","type":"uint256"}],"name":"EscrowTokensReturned","type":"event"}];
    let hold = this.state.web3.eth.contract(abi);
    this.setState({deployedBarterContractInstance: hold.at(this.state.deployedBarterContractAddress)}, ()=>{
      // console.log("button clicked");
      // console.log("DEPLOYED BARTER CONTRACT INSTANCE"+this.state.deployedBarterContractInstance);
      try{
        this.state.deployedBarterContractInstance.payEscrow({from:this.state.web3.eth.accounts[1]});
      }
      catch(e){
        console.log(e);
      }
    });


  }

  onCanceled(e){
      e.preventDefault();
      var abi = [{"constant":false,"inputs":[],"name":"reportServiceProvided","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractAlive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"returnEscrowHoldingToOwners","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"payEscrow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"cancelAgreement","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"checkEscrowFulfilled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_ReputationTokenContract","type":"address"},{"name":"_driver","type":"address"},{"name":"_doctor","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_driverReputationTokensHeld","type":"uint256"},{"indexed":false,"name":"_doctorReptuationTokenHeld","type":"uint256"}],"name":"AgreementReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_fulfilled","type":"bool"}],"name":"AgreementFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_driverReputationTokensReturned","type":"uint256"},{"indexed":false,"name":"_doctorReputationTokensReturned","type":"uint256"}],"name":"EscrowTokensReturned","type":"event"}];
      let hold = this.state.web3.eth.contract(abi);
      this.setState({deployedBarterContractInstance: hold.at(this.state.deployedBarterContractAddress)}, ()=>{
        // console.log("button clicked");
        // console.log("DEPLOYED BARTER CONTRACT INSTANCE"+this.state.deployedBarterContractInstance);
        try{
          this.state.deployedBarterContractInstance.cancelAgreement({from:this.state.web3.eth.accounts[1]});
        }
        catch(e){
          console.log(e);
        }
      });

  }

  componentDidMount(){
    this.setState({barterContractAddress: "0xd54b47f8e6a1b97f3a84f63c867286272b273b7c" });
    var newWeb3 = new window.Web3(new window.Web3.providers.HttpProvider('http://localhost:8545'));

    if(newWeb3 != null){
      console.log("New Web 3 = "+newWeb3);
      this.setState({web3:newWeb3},()=>{
          console.log("Updated Web3 State = "+this.state.web3);
          // this.filterWatch();
      });
    }
    else{
      this.setState({web3: window.web3});
      console.log("Web3 Provider Not Found"+this.state.web3);
    }



  }

    render() {
      return (

        <div className="contract_paramaters_div">
          <p>
            <strong>Service</strong><span> Physical Exam</span>
          </p>
          <p>
            <strong>Service Provider</strong><span> Dr. Yang, Kaiser Permanente</span>
          </p>
          <p>
            <strong>In Exchange For</strong><span> 20 Uber Credits</span>
          </p>
          <p>
            <strong>Value Held in Escrow</strong>
            <p>
              <span> 20 Uber Credits</span>
            </p>
            <p>
              <span> 500 Reputation Credits</span>
            </p>
          </p>
          <p>
            <button onClick={this.onPressed}>
              <span>Confirm Service Provided</span>
            </button>
            <button>
              <span>Cancel Agreement</span>
            </button>
          </p>
        </div>
      )

    }
}


export default Contract;
