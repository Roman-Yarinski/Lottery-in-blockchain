const btn = document.querySelector(".buy");
const info = document.querySelector(".info");
const viweAccount = document.querySelector(".account");

let contract;
let web3js;
let account;

window.onload = () => {
  getWeb3();
  initAccount();
  startApp();
  getAllData();
}

ethereum.on('accountsChanged', (accounts) => {
  initAccount(accounts);
});

btn.onclick = async e => {
  try {
    e.preventDefault();
    let value = confertFromEther(document.querySelector(".value").value);
    if(!value || value <= 0 ) {
      console.log("Invalid value");
      alert("The ticket price cannot be less than 0 and not a number");
    } else {
      const res = await BuyTicket(account, value);
      if(res) {
        alert("You buy 1 ticket");
      } else {
        alert('Transaction failed');
      }
      getAllData();
    }
  } catch(error) {
    alert('Transaction failed');
    console.log(error);
  }
}

const getWeb3 = () => {
   // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    // console.log(web3js);
  } else {
    alert('Connect the metamask and reload the page');
    console.log('Connect the metamask and reload the page');
  }
}

const initAccount = async(accounts) => {
  if(!accounts) {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
  } else account = accounts[0];
  viweAccount.innerHTML = `Account: ${account}`; 
}

const startApp = () => {
    const contractAddress = "0x1a9a503d9055802c4F26e7bDde606A921b76965a";
    const abiLottery = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"transf","type":"uint256"}],"name":"BuyTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winer","type":"address"},{"indexed":false,"internalType":"uint256","name":"payoff","type":"uint256"}],"name":"LotteryDraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"upToTime","type":"uint256"}],"name":"LotteryRestarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getAdressOfMembers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastWiner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMaxPlayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getMemberFromMembers","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMembersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTicketPrise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUpToTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"offLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"onLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"restart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"lotteryDuration","type":"uint256"}],"name":"setLotteryDuration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"maxPlayers","type":"uint256"}],"name":"setMaxPlayers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"ticketPrise","type":"uint256"}],"name":"setTicketPrise","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    contract = new web3js.eth.Contract(abiLottery, contractAddress);
}

const BuyTicket = async (from, value) => {
  let res;
    const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
    if(lotteryIsActive) { 
      try {
        res = await contract.methods.buy().send({ from, value });
      } catch(error) {
        return false;
        }
      return res;
    } else {
      alert("Lotteryr is not active");
      return false;
    }
}

const getAllData = async () => {
    let url = new URL(`http://localhost:3000/allData`);
    const req = await fetch(url, { method: 'GET' });
    const data = await req.json();
    let str ='';
    for (let i in data) {
        str += `${i}: ${data[i]} <br>`;
    }
    info.innerHTML = `${str}`;
}

const getAdressOfMembers = async() => {
  let res = await contract.methods.getAdressOfMembers().call();
  return res;
}

const confertFromEther = (etherValue) => {
    etherValue = etherValue * 10**18; 
    return etherValue;
}
