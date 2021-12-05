// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./_app"
import { DAppProvider } from "@usedapp/core";
import {Tabs} from "antd";

export default function Home() {
    const { TabPane } = Tabs;

const Demo = () => (
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
);
    return(
        <div>
            fuck
            {Demo()}
        </div>
    );
}