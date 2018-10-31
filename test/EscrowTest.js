const Escrow = artifacts.require('Escrow');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

contract('Escrow', function(accounts) {

  it("Test stub that should never fail.", async function() {
    assert.true;
  });

  //...implement more tests

});
