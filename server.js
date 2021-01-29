const express = require("express");

const { payWinning, getAllInfo,  getMembers, getMembersAdress, toggleStateOfContract } = require("./contract.js");

server = express();

server.get("/", (req, res) => {
    res.send("<ul><li>/allData</li><li>/allMembers</li><li>/allMembersAddresses</li><li>4</li></ul>")
});

server.get("/allData", async (req, res) => {
    res.send(await getAllInfo());
});

server.get("/allMembers", async (req, res) => {
    res.send(await getMembers());
});

server.get("/allMembersAddresses", async (req, res) => {
    res.send(await getMembersAdress());
});

server.get("/toggleStateOfContract", async (req, res) => {
    res.send(await toggleStateOfContract());
});

server.listen(3000, () => console.log("Server started"));

