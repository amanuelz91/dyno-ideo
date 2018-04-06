const BarterContract = artifacts.require('Barter');
const ReputationToken = artifacts.require('ReputationToken');
const BigNumber = web3.BigNumber;

/*
* @dev Test initial constants/constructor.
* @dev Tests that all initial properties are set correctly.
* @dev These might not be too useful, but they do provide a sanity check.
* @dev If tests are failing, it's likely that the initial properties changed.
*/
contract('BarterContract', function(accounts) {

  // Token properties/constructor args.
  let deployedReputationToken;
  let deployedBarterContract;

  beforeEach('deploy new Barter and Reputation Token Contracts', async () => {
      deployedReputationToken = await ReputationToken.new({gas: 3000000});
      deployedBarterContract = await BarterContract.new(deployedReputationToken, web3.eth.accounts[1], web3.eth.accounts[2], {gas: 3000000});

  });

  describe('Initial Properties', function(){

    it('should have correct owners');

    it('Barter Contract Should Be Initialized', async function(){
      // let contractIsAlive = await deployedBarterContract.contractAlive();
      console.log("Contract is Alive = ");
        // assert.isTrue(contractIsAlive, 'contract is not alive');
    });

  });

});
