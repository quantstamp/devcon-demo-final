const Escrow = artifacts.require('Escrow');

module.exports = function(deployer, network, accounts) {
  buyer = accounts[0];
  seller = accounts[1];
  price = 1;
  deployer.deploy(Escrow, buyer, seller, price)
    .then(() => console.log("Escrow was deployed"));
};
