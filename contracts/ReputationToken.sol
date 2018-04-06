pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
// File: contracts/TokensoftToken.sol

contract ReputationToken is StandardToken {
  string public name = "ReputationToken";
  string public symbol = "DRT";
  uint public decimals = 18;
  uint public INITIAL_SUPPLY = 10000 * (10 ** decimals);

  function ReputationToken() {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}
