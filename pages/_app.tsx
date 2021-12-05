// App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
// Import DAppProvider
import { DAppProvider } from "@usedapp/core";

export default function App() {
  
  const config = {
    readOnlyChainId: 97,
    readOnlyUrls: {
      97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    }
  }

  return (
    <DAppProvider config={config}>
      <div style={{color: "white"}}>
        <ChakraProvider>
          <Layout/>
        </ChakraProvider>
      </div>    
    </DAppProvider>
  );
}