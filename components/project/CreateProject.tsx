import { Button} from '@chakra-ui/button';
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
import { BigNumber } from '@ethersproject/bignumber';
import {FC, useRef, useState} from 'react';
import { Contract } from "@usedapp/core/node_modules/ethers";
import { ethers } from "ethers";
import campaignGeneratorABI from "../../pages/api/CampaignGeneratorContract.json";
import { useContractFunction } from "@usedapp/core";

const campaignGeneratorAddress = "0xe1638d0f9f2618D8b5336aa5E7E305BD1cd2Cd7b";
const campaignGeneratorInterface = new ethers.utils.Interface(campaignGeneratorABI);

export const tokenNameToAddressMapping = new Map<string, string>([
    ['BUSD', "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"],
]);

// TODO: refresh the state once metamask confirms

const campaignGeneratorContract = new Contract(campaignGeneratorAddress, campaignGeneratorInterface);

const CreateProject: FC<{}> = () => {
    
      const { isOpen, onOpen, onClose } = useDisclosure();

      const { state: setCreateCampaignState, send: createCampaign } = useContractFunction(campaignGeneratorContract, "createCampaign", {});


      const [name, setName] = useState('');
      const [targetDonation, setTargetDonation] = useState('');
      const [currency, setCurrency] = useState('');

      const initialRef = useRef();
      const finalRef = useRef();
      const handleNameChange = (event) => setName(event.target.value);
      const handleGoalChange = (event) => setTargetDonation(event.target.value)
      const handleCurrencyChange = (event) => setCurrency(event.target.value)
      const [createdClicked, setCreateClicked] = useState(false);

      const onCreateProjectClick = (name, goal, tokenName) => {
          createCampaign(name, BigNumber.from(goal), tokenNameToAddressMapping.get(tokenName));
          setCreateClicked(true);
          onClose();
      };

      return (
        <>
          <Button         onClick={onOpen}
      bg="gray.800"
      border="1px solid transparent"
      _hover={{
        border: "1px",
        borderStyle: "solid",
        borderColor: "blue.400",
        backgroundColor: "gray.700",
      }}
      borderRadius="xl"
      m="1px"
      px={3}
      height="38px">Create Project</Button>
    
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your project</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Project name</FormLabel>
                  <Input ref={initialRef} placeholder='project name' onChange={handleNameChange}/>
                </FormControl>
    
                <FormControl mt={4}>
                  <FormLabel>Target Donation</FormLabel>
                  <Input placeholder='target donation' onChange={handleGoalChange}/>
                </FormControl>

                <FormControl id='country'>
                  <FormLabel>Currency</FormLabel>
                  <Select placeholder='select currency' onChange={handleCurrencyChange}>
                      <option> BUSD </option>
                  </Select>
                </FormControl>
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => onCreateProjectClick(name, targetDonation, currency)}>
                  Create Project
                </Button>

                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
  
}

export default CreateProject;