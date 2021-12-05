// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./_app"
// Import DAppProvider
import { DAppProvider } from "@usedapp/core";

export default function Home() {
    return(
        <div>
            Hello World
            </div>
    //     <React.StrictMode>
    //     {/* 
    //        Wrap our app in the provider, config is required, 
    //         but can be left as an empty object: 
    //     */}
    //     <DAppProvider config={{}}>
    //       <App />
    //     </DAppProvider>
    //   </React.StrictMode>
    );
}