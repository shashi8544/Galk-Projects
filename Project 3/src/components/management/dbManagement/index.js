import React from "react";
import { Region } from "../../common/layout/region";
import { Card } from "antd";

const DBManagement = () => {
	return (
		<Region>
			<div style={{ height: "100%", padding: "10px 10px", overflowY: "auto" }}>
				<Card title="Database management" style={{ minHeight: "100%" }}></Card>
			</div>
		</Region>
	);
};

export default DBManagement;
