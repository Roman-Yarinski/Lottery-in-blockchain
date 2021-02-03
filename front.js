let form = document.querySelector("form");
let btn = document.querySelector(".buy");
let info = document.querySelector(".info");



const getAllData = async () => {
    // fetch("http://localhost:3000/allData", {mode: 'no-cors', method: 'GET'}).then((response) => {
    //     return response.json();
    //   }).then(res => {
    //     console.log(res);
    // }).catch((error) => {
    //     console.log(error)
    // });

    let url = new URL(`http://localhost:3000/allData`);

    // url.search = new URLSearchParams({
    //   id: 443,
    //   amount
    // });

    const req = await fetch(url, { method: 'GET', mode: 'no-cors' });
    console.log(url)
    console.log(req);
    const data = await req.json();
    console.log(data);


}


btn.onclick = e => {
    e.preventDefault();
    let value = confertFromEther(document.querySelector(".value").value);
    console.log(value);
    getAllData();
}

function confertFromEther(etherValue) {
    etherValue = etherValue * 10**18; 
    return etherValue;
}