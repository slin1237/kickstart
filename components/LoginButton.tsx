import { ReactNode, FC} from "react";
import AccountModal from "./AccountModal";
import ConnectButton from "./ConnectButton";
import { useDisclosure } from "@chakra-ui/react";

const LoginButton:FC<{}> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <ConnectButton handleOpenModal={onOpen} />
            <AccountModal isOpen={isOpen} onClose={onClose} />
        </div>
    );
}

export default LoginButton;