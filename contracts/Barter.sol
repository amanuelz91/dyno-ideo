pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
// File: contracts/TokensoftToken.sol

contract Barter{

  using SafeMath for uint;
  using SafeMath for uint256;

  address driver;
  address doctor;
  address reputationTokenContract;

  bool driverPaidEscrow;
  bool doctorPaidEscrow;

  bool agreementReached;
  bool agreementFulfilled;
  bool public contractAlive = false;

  mapping (address => uint256) amountHeldInEscrowFor;

  event AgreementReached(
    uint256 _driverReputationTokensHeld,
    uint256 _doctorReptuationTokenHeld
  );

  event AgreementFulfilled(bool _fulfilled);

  event EscrowTokensReturned(
    uint256 _driverReputationTokensReturned,
    uint256 _doctorReputationTokensReturned
  );

  modifier onlyWhenContractAlive{
    require(contractAlive);
    _;
  }

  modifier onlyDriver{
    require(msg.sender == driver);
    _;
  }

  modifier onlyWhenAgreementReached{
    require(agreementReached);
    _;
  }

  function Barter(
      address _ReputationTokenContract,
      address _driver,
      address _doctor
      )
  {
    driver = _driver;
    doctor = _doctor;
    reputationTokenContract = _ReputationTokenContract;

    amountHeldInEscrowFor[driver] = 0;
    amountHeldInEscrowFor[doctor] = 0;

    driverPaidEscrow = false;
    doctorPaidEscrow = false;

    agreementReached = false;
    agreementFulfilled = false;

    contractAlive = true;

  }

  function payEscrow()
  onlyWhenContractAlive
  {
    uint defaultEscrowPrice = 500;
    require(
      ERC20(reputationTokenContract)
        .transferFrom(
          msg.sender,
          this,
          defaultEscrowPrice
        )
    );
    uint256 currentEscrowAmount = amountHeldInEscrowFor[msg.sender];
    amountHeldInEscrowFor[msg.sender] = currentEscrowAmount.add(defaultEscrowPrice);

    if(msg.sender == driver)
    {
      driverPaidEscrow = true;
      checkEscrowFulfilled();

    }
    else
    {
      if(msg.sender == doctor)
      {
        driverPaidEscrow = true;
        checkEscrowFulfilled();
      }
    }

  }

  function reportServiceProvided()
  onlyDriver
  onlyWhenAgreementReached
  {
    agreementFulfilled = true;
    returnEscrowHoldingToOwners();
    contractAlive = false;
  }

  function returnEscrowHoldingToOwners()
  onlyWhenContractAlive
  {
    uint256 driverHoldings;
    uint256 doctorHoldings;

    driverHoldings = amountHeldInEscrowFor[driver];
    doctorHoldings = amountHeldInEscrowFor[doctor];
    require(ERC20(reputationTokenContract).transfer(driver, driverHoldings));
    require(ERC20(reputationTokenContract).transfer(doctor, doctorHoldings));

    agreementFulfilled = true;
    EscrowTokensReturned(driverHoldings,doctorHoldings);
    AgreementFulfilled(true);
  }

  function checkEscrowFulfilled() returns (bool){
    if(driverPaidEscrow && doctorPaidEscrow){
      AgreementReached(
        amountHeldInEscrowFor[driver],
        amountHeldInEscrowFor[doctor]
      );

      return true;
    }

    else{
      return false;
    }
  }

  function checkBalance() returns ( uint256 )
  {
    return uint256(ERC20(reputationTokenContract).balanceOf(this));
  }

  function cancelAgreement() onlyWhenContractAlive returns (bool)
  {
    uint256 driverHoldings = amountHeldInEscrowFor[driver];
    uint256 doctorHoldings = amountHeldInEscrowFor[doctor];

    require(ERC20(reputationTokenContract).transfer(driver, driverHoldings));
    require(ERC20(reputationTokenContract).transfer(doctor, doctorHoldings));

    agreementReached = false;
    agreementFulfilled = false;
    driverPaidEscrow = false;
    doctorPaidEscrow = false;


  }


}
