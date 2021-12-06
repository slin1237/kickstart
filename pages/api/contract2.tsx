import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import campaignGeneratorABI from "./CampaignGeneratorContract.json";
import campaignABI from "./CampaignContract.json";
import { ethers } from "ethers";
import { useContractCall, useContractFunction} from "@usedapp/core";
import { Contract } from "@usedapp/core/node_modules/ethers";


declare let window: any;
export const campaignGeneratorAddress = "0xe1638d0f9f2618D8b5336aa5E7E305BD1cd2Cd7b";
export const harmonyCampaignGeneratorAddress = "one13php26xy9pxgttm8pvtpsmee9q7nzdusmss664"

const campaignGeneratorInterface = new ethers.utils.Interface(campaignGeneratorABI);
const campaignInterface = new ethers.utils.Interface(campaignABI);

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

const campaignGeneratorContract = new Contract(campaignGeneratorAddress, campaignGeneratorInterface);

export const useCreateCampaign = () => {
  const { state, send, events } = useContractFunction(
    campaignGeneratorContract,
    "createCampaign",
    {}
  );

  return { state, send, events };
};

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(campaignGeneratorContract, methodName, {});
  return { state, send };
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
