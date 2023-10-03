import React from "react";
import { Region } from "../../common/layout/region";
import GALKAnalytic from "./GALKAnalytic";
import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const GALKInfoContainer = () => {
	return (
		<Region>
			<div style={{ height: "100%", padding: "10px 10px", overflowY: "auto" }}>
				<Card title="GALK Information" style={{ minHeight: "100%" }}>
					<Tabs type="card">
						<TabPane tab="GALK Analytic" key="1">
							<GALKAnalytic />
						</TabPane>
						<TabPane tab="GALK News" key="2">
							Content of Tab Pane 2
						</TabPane>
					</Tabs>
				</Card>
			</div>
		</Region>
	);
};

export default GALKInfoContainer;
