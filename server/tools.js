const Web3 = require("web3");

function convertTime(unixString) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  unixString = new Date(unixString * 1000).toLocaleString(options);
  return unixString;
}

function convertDuration(unixString) {
  days = unixString / 86400;
  hours = (unixString % 86400) / 3600;
  return `${days}-days  ${hours}-hours`;
}

function confertToEther(weiValue) {
  weiValue = Web3.utils.fromWei(weiValue, "ether"); 
  return `${weiValue} Ethers`;
}

function confertToWei(etherValue) {
  etherValue = Web3.utils.fromEther(etherValue); 
  return etherValue;
}

module.exports = { convertTime, convertDuration, confertToEther, confertToWei };
