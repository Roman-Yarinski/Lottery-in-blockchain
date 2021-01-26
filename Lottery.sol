pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";
import "./safemath.sol";

/** 
 * @title Block-chain Lottery
 * @author Roman Yarinki [299442676t@gmail.com]
**/
contract Lottery is Ownable {

    using SafeMath for uint256;
    
    event buyTicket(address addr, uint256 time, uint256 transf);
    event lotteryDraw(address winer, uint payoff);
    event lotteryRestarted(uint256 upToTime);
    
    // State of lottery
    bool private lotteryIsActive = true;                                                              
    
    // The lottery is open until then
    uint256 private upToTime;
    // Ticket price
    uint256 private ticketPrise = 0.2 ether;
    // Max players in this lottery
    uint256 private maxPlayers = 10;
    // How long will the lottery run
    uint256 private lotteryDuration = 1 weeks;
    
    // Last winner
    address private lastWiner = address(0);                                                   
    
    struct Member {
        address addr;   // Address of member
        uint256 time;   // The time of ticket buying
        uint256 transf; // Tranfer value
    }
    
    // Array of members
    Member [] private members;
    // Array address of members
    address [] private adressOfMembers;  
    
    
    constructor() public {        
        upToTime = block.timestamp.add(lotteryDuration);
    }
    
    /**
     * @dev Buying lottery tickets
     * @return Boolean value false if one of the checks failed
    **/
    function buy() payable public returns(bool) {
        require(lotteryIsActive == true, "Lottery: lottery is not active, you can't Buy");
        
        if(block.timestamp > upToTime) {
          offLottery();
          return false;
        }
        
        if(msg.value < ticketPrise) return false;
        
        members.push(Member(msg.sender, block.timestamp, msg.value));
        adressOfMembers.push(msg.sender);
        
        emit buyTicket( msg.sender, block.timestamp, msg.value);
        
        if(members.length >= maxPlayers) offLottery();
    }
    
    // @dev determines the winner from the array of members
    // @return random number from 0 to members.length
    function findWinner() public view returns( uint256 ) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, members.length))) % members.length;
    }
    
    // @dev Draws a lottery ,pays out the winnings, and sends the balance to the owner
    function pay() public onlyOwner {
        require(lotteryIsActive == false, "Lottery: lottery is active, you can't Pay");
          
        uint256 winerId = findWinner();
        
        address payable winner = address(uint256(members[winerId].addr));
        address payable owner = address(uint256(owner()));
        
        lastWiner = winner;
        uint256 payoff = address(this).balance.div(2);
        
        emit lotteryDraw(winner, payoff);
        
        winner.transfer(payoff); 
        owner.transfer(address(this).balance);
    }
    
    // @dev Restart lottery, delete all members, update the start time
    function restart() public onlyOwner{
        require(lotteryIsActive == false);
        
        onLottery();
        upToTime = block.timestamp.add(lotteryDuration);
        members.length = 0;
        
        emit lotteryRestarted(upToTime);
    }
    
    function offLottery() public {
        lotteryIsActive = false;
    }
    
    function onLottery() public {
        lotteryIsActive = true;
    }
    
    function setMaxPlayers(uint256 _maxPlayers) public {
        maxPlayers = _maxPlayers;
    }
    
    function setLotteryDuration(uint256 _lotteryDuration) public {
        lotteryDuration = _lotteryDuration;
    }
    
    function setTicketPrise(uint256 _ticketPrise) public {
        ticketPrise = _ticketPrise;
    }

    function getLotteryIsActive() public view returns(bool) {
        return lotteryIsActive;
    }
    
     function getLotteryDuration() public view returns(uint256) {
        return lotteryDuration;
    }
    
    function getUpToTime() public view returns(uint256) {
        return upToTime;
    }
    
    function getMembersLength() public view returns(uint256) {
        return members.length;
    }
    
    function getLastWiner() public view returns(address) {
        return lastWiner;
    }
    
    function getTicketPrise() public view returns(uint256) {
        return ticketPrise;
    }
    
    function getMaxPlayers() public view returns(uint256) {
        return maxPlayers;
    }
    
    function getAdressOfMembers() public view returns(address[] memory) {
        return adressOfMembers;
    }
    
    // @dev Get member from members
    // @return All about member from members by id(index)
    function getMemberFromMembers( uint id) public view returns (address, uint256, uint256) {
        address addr = members[id].addr;
        uint256 time = members[id].time;
        uint256 transfer = members[id].transf;
        return(addr, time, transfer);
    }

}
    /*
    1. Коменты - ✔
    2. Гетеры (Приват) - ✔
    3. Сетеры - ✔
    4. Формат (КамелКасе) - ✔
    5. Массив адресов - ✔
    6. Events - ✔
    */
