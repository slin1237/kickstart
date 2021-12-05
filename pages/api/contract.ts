import { ethers } from "ethers";
import React, {useEffect} from 'react';
import { useContractCall } from "@usedapp/core";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";

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
  "function getAllCampaigns()",
  "function createCampaign(string name, uint256 goal, address tokenAddress)"
]);

const campaignInterface = new ethers.utils.Interface([
  "function participate(uint256 amount)",
  "function managerWithdraw(uint256 amount)",
  "function payParticipants(uint256 amount)",
  "function setActive(bool _bool)"
]);

declare let window: any;
var campaignGeneratorAddress = "0xe1638d0f9f2618D8b5336aa5E7E305BD1cd2Cd7b";

export function useGetCampaign() {
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

export function useCreateCampaign(name: string | Falsy, goal: ethers.BigNumber | Falsy, tokenAddress: string | Falsy) {
    const [createCampaign] =
      useContractCall(
        name&&
        goal&&
        tokenAddress&&
         {
            abi: campaignGeneratorInterface, // ABI interface of the called contract
            address: campaignGeneratorAddress, // On-chain address of the deployed contract
            method: 'createCampaign', // Method to be called
            args: [name, goal, tokenAddress], // Method arguments - address to be checked for balance
          }
      ) ?? [createCampaign];
    return campaigns;
}

export function participateCampaign(amount: ethers.BigNumber | Falsy, campaignAddress: string | Falsy) {
    const [participate] =
      useContractCall(
        amount&&
        campaignAddress&&
         {
            abi: campaignInterface, // ABI interface of the called contract
            address: campaignAddress, // On-chain address of the deployed contract
            method: 'participate', // Method to be called
            args: [amount], // Method arguments - address to be checked for balance
          }
      ) ?? [];
    return participate;
  }

export function managerWithdraw(amount: ethers.BigNumber | Falsy, campaignAddress: string | Falsy) {
    const [managerWithdraw] =
      useContractCall(
        amount&&
        campaignAddress&&
         {
            abi: campaignInterface, // ABI interface of the called contract
            address: campaignAddress, // On-chain address of the deployed contract
            method: 'managerWithdraw', // Method to be called
            args: [amount], // Method arguments - address to be checked for balance
          }
      ) ?? [];
    return managerWithdraw;
  }

export function payParticipants(amount: ethers.BigNumber | Falsy, campaignAddress: string | Falsy) {
    const [payParticipants] =
      useContractCall(
        amount&&
        campaignAddress&&
         {
            abi: campaignInterface, // ABI interface of the called contract
            address: campaignAddress, // On-chain address of the deployed contract
            method: 'payParticipants', // Method to be called
            args: [amount], // Method arguments - address to be checked for balance
          }
      ) ?? [];
    return payParticipants;
  }

export function setActiveCampaign(bool_val: Boolean | Falsy, campaignAddress: string | Falsy) {
    const [setActive] =
      useContractCall(
        bool_val&&
        campaignAddress&&
         {
            abi: campaignInterface, // ABI interface of the called contract
            address: campaignAddress, // On-chain address of the deployed contract
            method: 'setActive', // Method to be called
            args: [bool_val], // Method arguments - address to be checked for balance
          }
      ) ?? [];
    return setActive;
  }
