var ReputationToken = artifacts.require("./ReputationToken.sol");
var Barter = artifacts.require("./Barter.sol");

module.exports = function(deployer) {
  deployer.deploy(ReputationToken).then(async () => {
    await deployer.deploy(Barter, ReputationToken.address, web3.eth.accounts[1],web3.eth.accounts[2]);
  });
  // deployer.deploy(ReputationToken);
};
