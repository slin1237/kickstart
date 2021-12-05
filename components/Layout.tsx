// Layout.tsx
import { ReactNode, FC} from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100vh"
          bg="gray.800"
        >
          {children}
        </Flex>
      ) 
}

export default Layout;