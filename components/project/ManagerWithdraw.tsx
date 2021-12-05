import { Button } from '@chakra-ui/button';
import {FC} from 'react';


interface Props {
    data: any;
}

const ManagerDisplay: FC<{Props}> = (data) => {

    return (
        <div>
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
        height="38px"> Withdraw </Button>
        </div>
    );
}

export default ManagerDisplay;