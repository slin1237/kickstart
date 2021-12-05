import { Button } from '@chakra-ui/button';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Select
  } from "@chakra-ui/react";
import {FC, useState } from 'react';
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import campaignABI from "../../pages/api/CampaignContract.json";
import IBEP20 from "../../pages/api/IBEP20Contract.json";
import { Contract } from "@usedapp/core/node_modules/ethers";
import { BigNumber } from '@ethersproject/bignumber';

// TODO: amount * 10 ** (18+1) be sure to submit with this amount to metamask api.

interface Props {
    campaignAddress: string;
}


const FundProjectButton: FC<Props> = ({ campaignAddress }) => {

    const campaignInterface = new ethers.utils.Interface(campaignABI);
    const campaignContract = new Contract(campaignAddress, campaignInterface);
    const busdContract = new Contract("0x78867bbeef44f2326bf8ddd1941a4439382ef2a7", IBEP20);

    const { state: participateState, send: participateSend } = useContractFunction(campaignContract, "participate", {});
    const { state: approveState, send: approveSend } = useContractFunction(busdContract, "approve", {});

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [amount, setAmount] = useState('');
    const [tokenName, setTokenName] = useState('');
    const [isApproved, setApproved] = useState(false);

    const handleDonateChange = (event) => setAmount(event.target.value);
    const handleTokenChange = (event) => setTokenName(event.target.value);

    const onProjectDonation = (number) => {
        participateSend(parseInt(number));
        // console.log(parseInt(number));
    }

    const onApproveSpending = (campaignAddress, approveAmount, tokenName) => {
        // Call approve spending for campaign contract
        approveSend(campaignAddress, BigNumber.from(approveAmount));
        setApproved(true);
    }

    // useEffect(() => {
    //   setApproved(true);
    // }, [approveState])

    const modal = () => {
        return(<div>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Donation</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Donation</FormLabel>
                    <Input placeholder='donation amount' onChange={handleDonateChange}/>
                  </FormControl>
                  <FormControl id='country'>
                    <FormLabel>Currency</FormLabel>
                    <Select placeholder='select currency' onChange={handleTokenChange}>
                        <option> BUSD </option>
                    </Select>
                  </FormControl>
      
                </ModalBody>
      
                <ModalFooter>

                  {isApproved ? <Button colorScheme='blue' mr={3} onClick={() => onProjectDonation(amount)}>
                    Donate
                  </Button> : 
                  <Button colorScheme='blue' mr={3} onClick={() => onApproveSpending(campaignAddress, amount, tokenName)}>
                    Approve Spending
                </Button>
                  }  

                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            </div>);
    }

    return (
        <div>
            {modal()}
            <Button bg="gray.700"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.900",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px" onClick={onOpen}> Fund </Button>
        </div>
    );
}

export default FundProjectButton;