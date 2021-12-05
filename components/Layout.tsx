// Layout.tsx
import { ReactNode, FC} from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import { Tabs, TabPanel, TabList, TabPanels, Tab } from "@chakra-ui/tabs";
import AccountModal from "./AccountModal";
import Table from "./Table";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h="100vh"
          bg="gray.800"
        >

        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
            <div>
          <Tabs>
        <TabList>
          <Tab>Active Projects</Tab>
          <Tab>Funded Projects</Tab>
          <Tab>Finished Projects</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table/>
          </TabPanel>
          <TabPanel>
           <Table/>
          </TabPanel>
          <TabPanel>
           <Table/>
          </TabPanel>
        </TabPanels>
      </Tabs>

          </div>
        </Flex>
      ) 
}

export default Layout;