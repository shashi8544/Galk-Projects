import React from "react";
import { Region } from "../../common/layout/region";
import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const ChatPool = () => {
	return (
		<Region>
			<div style={{ height: "100%", padding: "10px 10px", overflowY: "auto" }}>
				<Card title="Monitor chat data" style={{ minHeight: "100%" }}>
					<Tabs type="card">
						<TabPane tab="Individual Chats" key="1">
							Content of Tab Pane 1
						</TabPane>
						<TabPane tab="Group Chats" key="2">
							Content of Tab Pane 2
						</TabPane>
					</Tabs>
				</Card>
			</div>
		</Region>
	);
};

export default ChatPool;
