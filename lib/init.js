import { Meteor } from 'meteor/meteor'
if(Meteor.isClient){
  if (typeof web3 !== 'undefined') {
     // Use Mist/MetaMask's provider
     web3 = new Web3(web3.currentProvider);
     EthAccounts.init();
  }
}
