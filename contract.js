const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { convertTime, convertDuration, confertToEther } = require("./tools.js")

const url = 'https://ropsten.infura.io/v3/e5ee8e790fa34571a51173b4aa1081dd';

const address = "0x8adA0901ad5f4A9312bF372f20fde6A0e298Dd65";
const privateKey = "c83d9e02a1c92bb88d08f753674d94347d43bf10161d6b7211c0846068b10f86";

const contractAddress = "0xC8D92CA133C3031e8A6E467Edd66c826aB033b4E";
const abiLottery = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"transf","type":"uint256"}],"name":"BuyTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winer","type":"address"},{"indexed":false,"internalType":"uint256","name":"payoff","type":"uint256"}],"name":"LotteryDraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"upToTime","type":"uint256"}],"name":"LotteryRestarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getAdressOfMembers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastWiner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMaxPlayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getMemberFromMembers","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMembersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTicketPrise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUpToTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"offLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"onLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"restart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"lotteryDuration","type":"uint256"}],"name":"setLotteryDuration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"maxPlayers","type":"uint256"}],"name":"setMaxPlayers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"ticketPrise","type":"uint256"}],"name":"setTicketPrise","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
// const abiLottery = [
//   "function buy() payable public returns (bool)",
//   "function pay() public onlyOwner returns (bool)",
//   "function restart() public onlyOwner returns (bool)",
//   "function offLottery() public onlyOwner returns (bool)",
//   "function onLottery() public onlyOwner returns (bool)",
//   "function setMaxPlayers(uint256 maxPlayers) public onlyOwner returns (bool)",
//   "function setLotteryDuration(uint256 lotteryDuration) public onlyOwner returns (bool)",
//   "function setTicketPrise(uint256 ticketPrise) public onlyOwner returns (bool)",
//   "function getLotteryIsActive() public view returns (bool)",
//   "function getLotteryDuration() public view returns (uint256)",
//   "function getUpToTime() public view returns (uint256)",
//   "function getMembersLength() public view returns (uint256)",
//   "function getLastWiner() public view returns (address)",
//   "function getTicketPrise() public view returns (uint256)",
//   "function getMaxPlayers() public view returns (uint256)",
//   "function getAdressOfMembers() public view returns (address[] memory)",
//   "function getMemberFromMembers( uint id) public view returns (address, uint256, uint256)"
// ]

const provider = new HDWalletProvider(privateKey, url);
const web3 = new Web3(provider);

// 1. ABI [-] 
// 2. req - restart, pay
// 3. server
// 4.

const contract = new web3.eth.Contract(
  abiLottery,
  contractAddress
);

// function convertTime(unixString) {
//   let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
//   unixString = new Date(unixString * 1000).toLocaleString(options);
//   return unixString;
// }

// function convertDuration(unixString) {
//   days = unixString / 86400;
//   hours = (unixString % 86400) / 3600;
//   return `${days}-days  ${hours}-hours`;
// }

// function confertToEther(weiValue) {
//   weiValue = web3.utils.fromWei(weiValue, "ether"); 
//   return `${weiValue} Ethers`;
// }

const payWinning = async () => {
  const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
  if(!lotteryIsActive) {
    await contract.methods.pay().send({from: address, value: 1});
    console.lod("Winning payed")
    return "Winning payed"
  } else {
    console.log("Contract is Ative. You can't call pay function.");
    return "Contract is Ative. You can't call pay function.";
  }
}

const getAllInfo = async () => {
    let ticketPrise = await contract.methods.getTicketPrise().call();
    const adressOfMembers = await contract.methods.getAdressOfMembers().call();
    const lastWiner = await contract.methods.getLastWiner().call();
    const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
    let lotteryDuration = await contract.methods.getLotteryDuration().call();
    let upToTime = await contract.methods.getUpToTime().call();
    const owner = await contract.methods.owner().call()

    ticketPrise = confertToEther(ticketPrise);
    upToTime = convertTime(upToTime);
    lotteryDuration = convertDuration(lotteryDuration);

    const result = {
      name: "Lottery",
      discription: "Lottery on block-chain",
      contractAddress,
      owner,
      ticketPrise,
      adressOfMembers,
      lastWiner,
      lotteryIsActive,
      lotteryDuration,
      upToTime
    }

  console.log(result);
  return result;
}

const getMembers = async () => {
  members = [];
  const adressOfMembers = await contract.methods.getAdressOfMembers().call();
  for(let i = 0; i<adressOfMembers.length; i++) {
    await contract.methods.getMemberFromMembers(i).call().then(res => members.push(res));
  }
  console.log(members);
  return members;
}

const getMembersAdress = async () => {
  const adressOfMembers = await contract.methods.getAdressOfMembers().call();
  return adressOfMembers;
}

const toggleStateOfContract = async () => {
  const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
  if(lotteryIsActive) {
    await contract.methods.offLottery().send({from: address});
  } else {
    await contract.methods.onLottery().send({from: address});
  }
  return `Now state of lottery is ${!lotteryIsActive}`;
}

// payWinning();
// getAllInfo();
// getMembers();
// getMembersAdress();
// toggleStateOfContract();

provider.engine.stop();

module.exports = { payWinning, getAllInfo, getMembers, getMembersAdress, toggleStateOfContract };
