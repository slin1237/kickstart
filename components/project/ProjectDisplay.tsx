import { Button } from '@chakra-ui/button';
import {FC} from 'react';


interface Props {
    data: any;
}

const ProjectDisplay: FC<{Props}> = (data) => {

    return (
        <div>
            <Button> Create Project </Button>
        </div>
    );
}

export default ProjectDisplay;