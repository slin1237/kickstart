// App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
// Import DAppProvider
import { DAppProvider } from "@usedapp/core";

export default function App() {

  return (
    <DAppProvider config={{}}>
      <div style={{color: "white"}}>
        <ChakraProvider>
          <Layout/>
        </ChakraProvider>
      </div>    
    </DAppProvider>
  );
}