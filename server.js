const express = require("express");
const path = require("path");

const { payWinning, getAllInfo,  getMembers, getMembersAdress, toggleStateOfContract, BuyTicket, restart } = require("./contract.js");

server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

server.post('/', async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log(req.body.value);
    res.send(await BuyTicket(req.body.value));
    // res.status(201).sendFile(path.resolve(__dirname, "index.html"));
});


server.get("/allData", async (req, res) => {
    console.log(req);
    res.status(200);
    res.send("await getAllInfo()");
});

server.get("/allMembers", async (req, res) => {
    res.send(await getMembers());
});

server.get("/allMembersAddresses", async (req, res) => {
    res.send(await getMembersAdress());
});

server.get("/admin", (req, res) => {
    res.sendFile(path.resolve(__dirname, "toggle.html"));
});

server.post("/adminToggleState", async (req, res) => {
    const password = req.body.password;
    if(password == 123) {
        res.send(await toggleStateOfContract());
    } else res.send("Uncorrect password"); 
    console.log(password)  
}); 

server.post("/abminPayWinnings", async (req, res) => {
    const password = req.body.password;
    if(password == 123) {
        res.send(await payWinning());
    } else res.send("Uncorrect password");   
});

server.post("/abminRestart", async (req, res) => {
    const password = req.body.password;
    if(password == 123) {
        res.send(await restart());
    } else res.send("Uncorrect password");   
});

server.listen(3000, () => console.log("Server started at port 3000..."));
