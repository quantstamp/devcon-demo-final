const Escrow = artifacts.require('Escrow');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

contract('Escrow', function(accounts) {

  it("Test stub that should never fail.", async function() {
    assert.true;
  });


  it("Test that the contract throws when confirmPayment is called before initiation and with bad arguments", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    const seller = accounts[1];
    // the price is internally recorded in wei
    const price = 11 ** 18;
    let errr = false
      try {
        await escrow.confirmPayment({from:buyer,value:price});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message for bad state')

    const badPrice = 11 ** 18;
    errr = false
      try {
        await escrow.confirmPayment({from:buyer,value:badPrice});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message for bad price')

    const badBuyer = accounts[2];
    errr = false
      try {
        await escrow.confirmPayment({from:badBuyer,value:price});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message for bad buyer')

    errr = false
      try {
        await escrow.confirmPayment({from:seller,value:price});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message because seller is not allowed to call')
  });

  it("Test that the contract throws when confirmDelivery is called before initiation and with bad arguments", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    const seller = accounts[1];
    // the price is internally recorded in wei
    const price = 11 ** 18;
    let errr = false
      try {
        await escrow.confirmDelivery({from:buyer});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message for bad state')

    errr = false
      try {
        await escrow.confirmDelivery({from:seller});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, "should give an error message because the buyer didnt call");
  });



  it("Test that the buyer status is true after they initiate", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    // the price is internally recorded in wei
    const price = 10 ** 18;
    await escrow.initiateContract({from:buyer,value:price});

    assert.isTrue(await escrow.buyerIn(), "buyer should be in");
    assert.isFalse(await escrow.sellerIn(), "seller should not be in");

    // console.log(web3.eth.getBalance(escrow.address));

    // assert.equal(await web3.eth.getBalance(escrow.address), price);

  });

  it("Test that the contract throws when confirmPayment is called after buyer initiation but before seller initiation", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    const seller = accounts[1];
    // the price is internally recorded in wei
    const price = 11 ** 18;
    let errr = false
      try {
        await escrow.confirmPayment({from:buyer,value:price});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message for bad state')
  });



  it("Test that confirmPayment throws when it is the correct state but called by the seller or bad price", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    const seller = accounts[1];
    // the price is internally recorded in wei
    const price = 10 ** 18;
    const badPrice = 11 ** 18;
    let errr = false
      try {
        await escrow.confirmPayment({from:seller,value:price});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message for wrong caller')

    errr = false
      try {
        await escrow.confirmPayment({from:buyer,value:badPrice});
      } catch (e) {
        errr = true
      }
    assert.isTrue(errr, 'should give an error message for bad price');
  });

  it("Test that the state is changed when confirmPayment is called correctly", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    const seller = accounts[1];
    // the price is internally recorded in wei
    const price = 10 ** 18;
    await escrow.confirmPayment({from:buyer,value:price});

    assert.isTrue(await escrow.buyerIn(), "buyer should be in");
    assert.isTrue(await escrow.sellerIn(), "seller should be in");
    assert.equal(await escrow.currentState(),2);

  });



  it("Test that the state is changed when confirmDelivery is called correctly", async function() {
    const escrow = await Escrow.deployed();
    const buyer = accounts[0];
    const seller = accounts[1];
    // the price is internally recorded in wei
    const price = 10 ** 18;
    await escrow.confirmDelivery({from:buyer});

    assert.isTrue(await escrow.buyerIn(), "buyer should be in");
    assert.isTrue(await escrow.sellerIn(), "seller should be in");
    assert.equal(await escrow.currentState(),3);

    //assert.equal(await web3.eth.getBalance(escrow.address), 0);

  });

});


