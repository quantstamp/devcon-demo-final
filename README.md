# devcon-demo-final
A demo for Devcon IV presentation.

[Presentation in Google Slides](https://docs.google.com/presentation/d/1F_d0N121oATQt0-8VDUIcq2oFoDo2BQPhr5RXhGEldI/edit?usp=sharing)

## Escrow Protocol

A one-time use escrow smart contract that works as follows:

1. Seller deploys the contract and set the price
1. Seller initiates the contract by staking the price
1. Buyer initiates the contract by staking the price
1. Buyer transfers the sale price to the contract
1. Buyer confirms delivery of an item and the contract handles the transfers
    - Buyer gets the stake back
    - Seller gets the stake back and the purchase price


## Requirements
- Node.JS v8 with npm

## Steps
1. `npm install`
1. For convenience, install Truffle globally: npm install -g truffle@0.0.0, replacing 0.0.0 by the Truffle version from package.json
1. Install Ganache (Formerly, testrpc), either:
   * UI version of version 1.1.0 or
   * Console version: `npm install -g ganache-cli@6.1.0` and then (from another terminal tab): `ganache-cli`
1. `truffle compile`
1. `npm test`. To also generate a code coverage report, run `npm run test-cov` instead.

©2018-2019 Quantstamp, Inc.  All rights reserved. 
DISCLAIMER:  This content is provided for informational, personal, non-commercial purposes on an as-is, where-is, and as-available basis. This content may include descriptions or forward-looking statements concerning concepts under continuing development in testing environments, along with features, functionality, schedules, or design architectures, but all of the foregoing are subject to continuing update, modification, cancellation, delay, external dependencies, evolving regulatory frameworks, and/or factors beyond our control and you are cautioned not to place undue reliance on this information. This content shall not be used, copied, modified, redistributed or otherwise disseminated except to the extent expressly permitted by Quantstamp.  FOR AVOIDANCE OF DOUBT, THIS CONTENT, INCLUDING ANY ASSOCIATED SERVICES OR MATERIALS, SHALL NOT BE CONSIDERED OR RELIED UPON AS ANY FORM OF FINANCIAL, INVESTMENT, TAX, LEGAL, REGULATORY, OR OTHER ADVICE.
