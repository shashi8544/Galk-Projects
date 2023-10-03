import React from "react";
import { Region } from "../../common/layout/region";
import StudentProfileImport from "./studentProfileImport";
import ExamScoreImport from "./studentScoreImport";
import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const DataImport = () => {
	return (
		<Region>
			<div style={{ height: "100%", padding: "10px 10px", overflowY: "auto" }}>
				<Card title="Data import" style={{ minHeight: "100%" }}>
					<Tabs type="card">
						<TabPane tab="Student Import" key="1">
							<StudentProfileImport />
						</TabPane>
						<TabPane tab="Company Import" key="2">
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab="GALK Exam Score Import" key="3">
							<ExamScoreImport />
						</TabPane>
					</Tabs>
				</Card>
			</div>
		</Region>
	);
};

export default DataImport;
