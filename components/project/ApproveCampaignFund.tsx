import { Button } from '@chakra-ui/button';
import {FC} from 'react';

// TODO: amount * 10 ** (18+1) be sure to submit with this amount to metamask api.

interface Props {
    tokenAddress: string;
}

const ApproveCampaignButton: FC<{Props}> = (tokenAddress) => {

    return (
        <div>
            <Button> Approve </Button>
        </div>
    );
}

export default ApproveCampaignButton;