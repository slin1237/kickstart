import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import campaignGeneratorABI from "./CampaignGeneratorContract.json";
import campaignABI from "./CampaignContract.json";
import { ethers } from "ethers";
import { useContractCall, useContractFunction, useEthers, TransactionOptions } from "@usedapp/core";
// import { useCallback, useState } from "react";
// import { usePromiseTransaction } from "@usedapp/core/dist/esm/src/hooks/usePromiseTransaction";
// import { Contract } from "@usedapp/core/node_modules/ethers";
// import { Web3Provider } from "@usedapp/core/node_modules/@ethersproject/providers";


declare let window: any;
export const campaignGeneratorAddress = "0xe1638d0f9f2618D8b5336aa5E7E305BD1cd2Cd7b";

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

export const useCreateCampaign = (name: string | Falsy, goal: ethers.BigNumber | Falsy, tokenAddress: string | Falsy) => {
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

// export function useCreateCampaign(name: string | Falsy, goal: ethers.BigNumber | Falsy, tokenAddress: string | Falsy) {
//     const [createCampaign] =
//       useContractCall(
//         // name&&
//         // goal&&
//         // tokenAddress&&
//          {
//             abi: campaignGeneratorInterface, // ABI interface of the called contract
//             address: campaignGeneratorAddress, // On-chain address of the deployed contract
//             method: 'createCampaign', // Method to be called
//             args: [name, goal, tokenAddress], // Method arguments - address to be checked for balance
//           }
//       ) ?? [];
//     return createCampaign;
// }

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


//   const contract = new Contract(campaignGeneratorAddress, campaignGeneratorInterface);


//   export function useContractMethod(methodName: string) {
//     const { state, send } = useContractFunction(contract, methodName, {});
//     return { state, send };
// }

// export function connectContractToSigner(
//     contract: Contract,
//     options?: TransactionOptions,
//     library?: Web3Provider
// ) {
//     if (contract.signer) {
//         return contract;
//     }

//     if (options?.signer) {
//         //@ts-ignore
//         return contract.connect(options.signer as Signer);
//     }

//     if (library?.getSigner()) {
//         return contract.connect(library.getSigner());
//     }

//     throw new TypeError("No signer available in contract, options or library");
// }

// export const useContractFunction__fix = (
//     contract: Contract,
//     functionName: string,
//     options?: TransactionOptions
// ) => {
//     const { library, chainId } = useEthers();
//     const [events, setEvents] = useState<Record<string, any> | undefined>(undefined);

//     const { promiseTransaction, state } = usePromiseTransaction(chainId, options);

//     const send = useCallback(
//         async (...args: any[]) => {
//             const contractWithSigner = connectContractToSigner(contract, options, library);
//             const sendPromise = contractWithSigner[functionName](...args).then(
//                 (result: any): Promise<any> => {
//                     // Need to add chainId here to prevent "TypeError: Unsupported Chain" error message
//                     result.chainId = chainId;
//                     return result;
//                 }
//             );

//             const receipt: any = await promiseTransaction(sendPromise);

//             if (receipt) {
//                 if (receipt.logs && receipt.logs.length > 0) {
//                     setEvents(receipt.logs.map((log: any) => contract.interface.parseLog(log)));
//                 } else {
//                     setEvents([]);
//                 }
//             }
//         },
//         [contract, functionName, chainId, promiseTransaction, library, options]
//     );

//     return { send, state, events };
// };

// export function useContractMethod_fixd(methodName: string) {
//     const { state, send, events } = useContractFunction__fix(contract, methodName, {});
//     return { state, send, events };
// }