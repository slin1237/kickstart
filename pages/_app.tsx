// App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
// Import DAppProvider
import { DAppProvider } from "@usedapp/core";
import { Tabs, TabPanel, TabList, TabPanels, Tab } from "@chakra-ui/tabs";

export default function App() {

  return (
    <DAppProvider config={{}}>
      <div style={{color: "white"}}>
        <ChakraProvider>
        <Layout>
          <div>
          <Tabs>
        <TabList>
          <Tab>Active Projects</Tab>
          <Tab>Funded Projects</Tab>
          <Tab>Finished Projects</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>TODO add table</p>
          </TabPanel>
          <TabPanel>
            <p> 2 TODO add table</p>
          </TabPanel>
          <TabPanel>
            <p>3 TODO add table</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

          </div>
      </Layout>
        </ChakraProvider>
      </div>    
    </DAppProvider>
  );
}