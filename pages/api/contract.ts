import { ethers } from "ethers";
import React, {useEffect} from 'react';
import { useContractCall } from "@usedapp/core";

// const fs = require('fs');
// var abiJson = "../../contracts/campaign.json";
// var parsed = JSON.parse(fs.readFileSync(abiJson));
// var abi = parsed.abi;

// var campaignAbiJsonString = "[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_goal\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_manager\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_token\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"funders\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"fundersDistributed\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"fundersValue\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"goal\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isActive\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"manager\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"managerWithdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"participate\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"payParticipants\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"requests\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_bool\",\"type\":\"bool\"}],\"name\":\"setActive\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"token\",\"outputs\":[{\"internalType\":\"contract IBEP20\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalDonatedTokens\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]";
// var parsedCampaign = JSON.parse(campaignAbiJsonString);
// var campaignAbi = parsedCampaign.abi;
// var generatorAbiJsonString = "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"campaignAddress\",\"type\":\"address\"}],\"name\":\"CampaignCreated\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"goal\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"createCampaign\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"campaigns\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getAllCampaigns\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]"
// var parsedGenerator = JSON.parse(generatorAbiJsonString);
// var generatorAbi = parsedGenerator.abi;

const campaignGeneratorInterface = new ethers.utils.Interface([
  "function getAllCampaigns()"
]);

const campaignInterface = new ethers.utils.Interface([
  "function participate(uint256 amount)",
  "function managerWithdraw(uint256 amount)",
  "function payParticipants(uint256 amount)",
  "function setActive(bool _bool)"
]);

declare let window: any;
var campaignGeneratorAddress = "0xe1638d0f9f2618D8b5336aa5E7E305BD1cd2Cd7b";

export default function useGetCampaign() {
    const [campaigns] =
      useContractCall(
         {
            abi: campaignGeneratorInterface, // ABI interface of the called contract
            address: campaignGeneratorAddress, // On-chain address of the deployed contract
            method: 'getAllCampaigns', // Method to be called
            args: [], // Method arguments - address to be checked for balance
          }
      ) ?? [];
    return campaigns;
  }


// const client = () => {
//     if (typeof window !== "undefined") {
//         // Client-side-only code
//             // Connect Wallet
//         const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
//         // await provider.send("eth_requestAccounts", []);
//         const signer = provider.getSigner();
//         // console.log("Account:", await signer.getAddress());

//         // Connect to CampaignGenerator, TODO: Move to static file
//         var address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
//         const campaignGenerator = new ethers.Contract(address, abi, signer);

//         // Stablecoin token
//         var BUSD = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"

//         return campaignGenerator;
//     }

// }

// export async function createCampaign(name, goal, tokenAddress) {
//     await client().createCampaign(name, goal, tokenAddress);
// }

// export async function getCampaigns() {
//     const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

//     return client().getCampaigns();
// }

// // export async function donateToCampaign(campaignAddress, amount) {
// //         const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

// //         const signer = provider.getSigner();

// //         const campaign = new ethers.Contract(campaignAddress, abi, signer);
// //         await campaign.participate(amount);
// // }

// export default client;