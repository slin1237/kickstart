import { Button } from '@chakra-ui/button';
import {FC} from 'react';


interface Props {
    data: any;
}

const ManagerDisplay: FC<{Props}> = (data) => {

    return (
        <div>
            <Button> Withdraw </Button>
        </div>
    );
}

export default ManagerDisplay;