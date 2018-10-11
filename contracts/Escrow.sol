pragma solidity 0.4.24;

/*
Simple escrow contract that mediates disputes using a burn contract
*/
contract Escrow {

    enum State {UNINITIATED, AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE}
    State public currentState;

    modifier inState(State expectedState) { require(currentState == expectedState); _; }
    modifier buyerOnly() { require(msg.sender == buyer); _; }
    modifier correctPrice() { require(msg.value == price); _; }

    address public buyer;
    address public seller;
    uint public price;

    bool public buyerIn;
    bool public sellerIn;


    constructor (address _buyer, address _seller, uint _price) public {
        buyer = _buyer;
        seller = _seller;
        price = _price * (10 ** 18);
    }

    function initiateContract() public correctPrice inState(State.UNINITIATED) payable {
        if (msg.sender == buyer) {
            buyerIn = true;
        }
        if (msg.sender == seller) {
            sellerIn = true;
        }
        if (buyerIn && sellerIn) {
            currentState = State.AWAITING_PAYMENT;
        }
    }

    function confirmPayment() public buyerOnly correctPrice inState(State.AWAITING_PAYMENT) payable {
        currentState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery() public buyerOnly inState(State.AWAITING_DELIVERY) {
        // !!! This method is prone to re-entrancy !!!
        buyer.call.value(price)();
        seller.call.value(price * 2)();
        currentState = State.COMPLETE;
    }
}
