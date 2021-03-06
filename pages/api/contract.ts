import { ethers } from "ethers";
import React, {useEffect} from 'react';
import { useContractCall } from "@usedapp/core";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import campaignGeneratorABI from "./CampaignGeneratorContract.json";
import campaignABI from "./CampaignContract.json";
import IBEP20ABI from "./IBEP20Contract.json";

declare let window: any;
export const campaignGeneratorAddress = "0xe1638d0f9f2618D8b5336aa5E7E305BD1cd2Cd7b";
export const BUSDAddress = "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"

const campaignGeneratorInterface = new ethers.utils.Interface(campaignGeneratorABI);
const campaignInterface = new ethers.utils.Interface(campaignABI);
const IBEP20Interface = new ethers.utils.Interface(IBEP20ABI);

export function approve(spender: string | Falsy, amount: ethers.BigNumber | Falsy, tokenAddress: string | Falsy) {
  const [approve] =
    useContractCall(
      spender&&
      amount&&
      tokenAddress&&
       {
          abi: IBEP20Interface, // ABI interface of the called contract
          address: tokenAddress, // On-chain address of the deployed contract
          method: 'approve', // Method to be called
          args: [spender, amount], // Method arguments - address to be checked for balance
        }
    ) ?? [];
  return approve;
}

export function useGetCampaign() {
    console.log(campaignGeneratorAddress);
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
      ) ?? [];
    return createCampaign;
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