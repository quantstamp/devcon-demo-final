const Escrow = artifacts.require('Escrow');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

contract('Escrow', function(accounts) {

  it("Test stub that should never fail.", async function() {
    assert.true;
  });

  it("Test that the buyer, seller and price are set properly.", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    const seller = accounts[1];
    // the price is internally recorded in wei
    const price = 10 ** 18;
    assert.equal(await escrow.buyer(), buyer);
    assert.equal(await escrow.seller(), seller);
    var priceInWei = await escrow.price();
    assert.equal(priceInWei.toNumber(), price);
  });

});
