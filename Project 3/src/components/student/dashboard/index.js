import React from "react";
import { Row, Col } from "antd";
import { Region } from "../../common/layout/region";
// import BasicInformation from "./basicInformation";
// import StudentStatInformation from "./studentStatInformation";
// import GALKNews from "./GALKNews";
// import VisitorInformation from "./visitorInformation";
// import AnalyticInformation from "./analyticInformation";
// import CompanyStatInformation from "./companyStatInformation";

const Dashboard = () => {
	return (
		<Region>
			<Row
				gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
				style={{ overflowY: "scroll", height: "100%" }}
			>
				<Col className="gutter-row" span={8}>
					Information
					{/* <BasicInformation /> */}
				</Col>
				<Col className="gutter-row" span={8}>
					Information
					{/* <StudentStatInformation /> */}
				</Col>
				<Col className="gutter-row" span={8}>
					Information
					{/* <CompanyStatInformation /> */}
				</Col>
				<Col className="gutter-row" span={16}>
					Information
					{/* <AnalyticInformation /> */}
				</Col>
				<Col className="gutter-row" span={8}>
					Information
					{/* <GALKNews /> */}
				</Col>
			</Row>
		</Region>
	);
};

export default Dashboard;
