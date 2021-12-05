// Layout.tsx
import { ReactNode, FC} from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import { Tabs, TabPanel, TabList, TabPanels, Tab } from "@chakra-ui/tabs";
import AccountModal from "./AccountModal";
import Table from "./Table";
import Header from "./Header";
import useGetCampaign from "../pages/api/contract";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    const campaigns = useGetCampaign();

    return (
        <div>
        <Header />
        <Flex
        //   flexDirection="column"
        //   alignItems="center"
        //   justifyContent="center"
          display="flex"
          h="100vh"
          bg="gray.800"
        >
            <div>
              {console.log(campaigns)}
              {campaigns}
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
        </div>
      ) 
}

export default Layout;