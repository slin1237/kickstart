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
import {FC, useState} from 'react';

// TODO: amount * 10 ** (18+1) be sure to submit with this amount to metamask api.

interface Props {
    campaignAddress: string;
}

const FundProjectButton: FC<Props> = (campaignAddress) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [amount, setAmount] = useState('');
    const [isApproved, setApproved] = useState(false);

    const handleDonateChange = (event) => setAmount(event.target.value);

    const onProjectDonation = (number) => {
        console.log(parseInt(number));
    }

    const onApproveSpending = (campaignAddress) => {
        // Call approve spending for campaign contract
        console.log(campaignAddress);
        setApproved(true);
    }

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
      
                </ModalBody>
      
                <ModalFooter>

                  {isApproved ? <Button colorScheme='blue' mr={3} onClick={() => onProjectDonation(amount)}>
                    Donate
                  </Button> : 
                  <Button colorScheme='blue' mr={3} onClick={() => onApproveSpending(campaignAddress)}>
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