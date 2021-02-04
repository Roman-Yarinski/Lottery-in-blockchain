const express = require("express");
const path = require("path");
const cors = require("cors");

const { payWinning, getAllInfo,  getMembers, getMembersAdress, toggleStateOfContract, restart } = require("./contract.js");

server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());

server.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "toggle.html"));
});

server.post('/', async (req, res) => {
    res.send(await BuyTicket(req.body.value));
});


server.get("/allData", async (req, res) => {
    console.log(req);
    res.send(await getAllInfo());
});

server.get("/allMembers", async (req, res) => {
    res.send(await getMembers());
});

server.get("/allMembersAddresses", async (req, res) => {
    res.send(await getMembersAdress());
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
