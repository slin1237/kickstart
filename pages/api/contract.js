import { ethers } from "ethers";
var fs = require('fs');
var abiFile = "../../contracts/campaign.json";
var parsed = JSON.parse(fs.readFileSync(abiFile));
var abi = parsed.abi;

// Connect Wallet
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
console.log("Account:", await signer.getAddress());

// Connect to CampaignGenerator, TODO: Move to static file
var address = "0x123";
const campaignGenerator = new ethers.Contract(address, abi, signer);

// Stablecoin token
var BUSD = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"

function createCampaign(name, goal, tokenAddress) {
    campaignGenerator.createCampaign(name, goal, tokenAddress);
}

function getCampaigns() {
    campaignGenerator.getCampaigns();
}

function donateToCampaign(campaignAddress, amount) {
    const campaign = new ethers.Contract(campaignAddress, abi, signer);
    await campaign.participate(amount);
}