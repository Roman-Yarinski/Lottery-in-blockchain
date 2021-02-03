const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { convertTime, convertDuration, confertToEther, confertToWei } = require("./tools.js");


const url = 'https://ropsten.infura.io/v3/e5ee8e790fa34571a51173b4aa1081dd';

const address = "0x8adA0901ad5f4A9312bF372f20fde6A0e298Dd65";
const privateKey = "c83d9e02a1c92bb88d08f753674d94347d43bf10161d6b7211c0846068b10f86";

const contractAddress = "0xC8D92CA133C3031e8A6E467Edd66c826aB033b4E";
const abiLottery = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"transf","type":"uint256"}],"name":"BuyTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winer","type":"address"},{"indexed":false,"internalType":"uint256","name":"payoff","type":"uint256"}],"name":"LotteryDraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"upToTime","type":"uint256"}],"name":"LotteryRestarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getAdressOfMembers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastWiner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMaxPlayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getMemberFromMembers","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMembersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTicketPrise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUpToTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"offLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"onLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"restart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"lotteryDuration","type":"uint256"}],"name":"setLotteryDuration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"maxPlayers","type":"uint256"}],"name":"setMaxPlayers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"ticketPrise","type":"uint256"}],"name":"setTicketPrise","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const provider = new HDWalletProvider(privateKey, url);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(
  abiLottery,
  contractAddress
);

const BuyTicket = async (value) => {
  const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
  if(lotteryIsActive) { 
    // value = confertToWei(value);
    await contract.methods.buy().send({from: address, value });
    return await getMembers();
  } else return "Lotterry in not active";
}

const payWinning = async () => {
  const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
  if(!lotteryIsActive) {
    await contract.methods.pay().send({from: address, value: 1});
    console.lod("Winning payed");
    return "Winning payed";
  } else {
    console.log("Contract is Active. You can't call pay function.");
    return "Contract is Active. You can't call pay function.";
  }
}

const restart = async () => {
  const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
  if(!lotteryIsActive) {
    await contract.methods.getAdressOfMembers().call();
    return "Contract restarted";
  } else {
    return "Contract is Active. You can't call restart function.";
  }
}

const getAllInfo = async () => {
    return Promise.all([contract.methods.getAdressOfMembers().call(), contract.methods.getLastWiner().call(), contract.methods.getLotteryIsActive().call(), contract.methods.owner().call(), contract.methods.getTicketPrise().call(), contract.methods.getLotteryDuration().call(), contract.methods.getUpToTime().call()]).then(res => {
      return {
        name: "Lottery",
        discription: "Lottery on block-chain",
        contractAddress,
        owner: res[3],
        ticketPrise: confertToEther(res[4]),
        adressOfMembers: res[0],
        lastWiner: res[1],
        lotteryIsActive: res[2],
        lotteryDuration: convertDuration(res[5]),
        upToTime: convertTime(res[6])
      }
    });
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

provider.engine.stop();

module.exports = { payWinning, getAllInfo, getMembers, getMembersAdress, toggleStateOfContract, BuyTicket, restart };
