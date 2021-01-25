pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";
import "./safemath.sol";

contract Lottery is Ownable {

  using SafeMath for uint256;
  
  bool public lottery_is_active;                                                            // State of lottery
  
  uint256 public up_to_time;                                                                // The lottery is open until then
  uint256 public ticketPrise = 0.2 ether;                                                   // Ticket price
  uint256 public max_players = 10;                                                          // Max players in this lottery
  
  address public lastWiner;                                                                 // Last winner
  
    struct Member {
    address addr;                                                                           // Address of member
    uint256 time;                                                                           // The time of ticket buying
    uint256 transfer;                                                                       // Tranfer value
  }
  
  Member [] public members;                                                                 // Array of members
  
  
  constructor() public {        
    lottery_is_active = true;
    up_to_time = block.timestamp.add(1 weeks);
  }
  
  function buy() payable public returns(bool) {
      
      require(lottery_is_active == true, "Lottery: lottery is not active, you can't Buy");  // Check state of lottery
      
      if(block.timestamp > up_to_time) {                                                    // Check time condition
          lottery_is_active = false;
          return false;
      }
      
      if(msg.value < ticketPrise) return false;                                             // Check that cost > ticket prise
       
      members.push(Member(msg.sender, block.timestamp, msg.value));                         // Add memder to Lottery array whith members
      
      if(members.length == 10) lottery_is_active = false;                                   // Check max players condition
  }
  
  function findWinner() public view returns( uint256 ) {
    return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, members.length))) % members.length;  // Calculates a random number from 0 to the number of members
  }
  
  function pay() public onlyOwner {
    require(lottery_is_active == false, "Lottery: lottery is active, you can't Pay");       // Check state of lottery
      
    uint256 winerId = findWinner();
    
    address payable winner = address(uint256(members[winerId].addr));                       // Payable adress for winner
    address payable owner = address(uint256(owner()));                                      // Payable adress for owner
    
    lastWiner = winner;
    
    winner.transfer(address(this).balance.div(2));                                          // Sends the winnings to the winner
    owner.transfer(address(this).balance);                                                  // Sends the remaining balance tj the owner
  }
  
  function restart() public onlyOwner{                                                      // Restart lottery
      require(lottery_is_active == false);
      
      lottery_is_active = true;                                                             // Update state
      up_to_time = block.timestamp.add(1 weeks);                                            // Update the start time
      members.length = 0;                                                                   // Deete all members
  }
  
  // function is_active() public view returns(bool) {
  //   return lottery_is_active;
  // }
  
  // function time_up() public view returns(uint256) {
  //   return up_to_time;
  // }
  
  //  function membersLength() public view returns(uint256) {
  //   return members.length;
  // }
  
}
