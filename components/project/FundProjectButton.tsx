import { Button } from '@chakra-ui/button';
import {FC} from 'react';

// TODO: amount * 10 ** (18+1) be sure to submit with this amount to metamask api.

const FundProjectButton: FC<{}> = () => {

    return (
        <div>
            <Button> Fund </Button>
        </div>
    );
}

export default FundProjectButton;