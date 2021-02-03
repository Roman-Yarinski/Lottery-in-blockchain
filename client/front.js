

let form = document.querySelector("form");
let btn = document.querySelector(".buy");
let info = document.querySelector(".info");


let contract;
let web3js;

function startApp() {
    const contractAddress = "0xC8D92CA133C3031e8A6E467Edd66c826aB033b4E";
    const abiLottery = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"transf","type":"uint256"}],"name":"BuyTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winer","type":"address"},{"indexed":false,"internalType":"uint256","name":"payoff","type":"uint256"}],"name":"LotteryDraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"upToTime","type":"uint256"}],"name":"LotteryRestarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getAdressOfMembers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastWiner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLotteryIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMaxPlayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getMemberFromMembers","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMembersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTicketPrise","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUpToTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"offLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"onLottery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pay","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"restart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"lotteryDuration","type":"uint256"}],"name":"setLotteryDuration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"maxPlayers","type":"uint256"}],"name":"setMaxPlayers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"ticketPrise","type":"uint256"}],"name":"setTicketPrise","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    contract = new web3js.eth.Contract(abiLottery, contractAddress);
}

const getAdressOfMembers = async() => {
    let res = await contract.methods.getAdressOfMembers().call();
    // console.log(res);
    return res;
}

const BuyTicket = async (from, value) => {
    const lotteryIsActive = await contract.methods.getLotteryIsActive().call();
    if(lotteryIsActive) { 
      // value = confertToWei(value);
      await contract.methods.buy().send({ from, value });
      return await getMembers();
    } else return "Lotterry in not active";
  }

window.onload = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
        // console.log(web3js);
      } else {
        console.log('Net maski')
      }

    startApp()
    getAllData();
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

btn.onclick = e => {
    e.preventDefault();
    let value = confertFromEther(document.querySelector(".value").value);
    const accounts = web3js.eth_accounts;
    console.log(accounts);
    // console.log(value);
    // console.log(getAdressOfMembers());
    // BuyTicket(from, value);
    //duy on block-ch

    getAllData();
}

function confertFromEther(etherValue) {
    etherValue = etherValue * 10**18; 
    return etherValue;
}