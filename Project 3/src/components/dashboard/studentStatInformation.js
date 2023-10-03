import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardStudentStat } from "../../actions/dashboardActions";
import { Pie } from "react-chartjs-2";
import { Card, List, Skeleton, Divider, Typography } from "antd";

import "./dashboardStyles.css";

const { Title } = Typography;

const StudentStatInformation = ({
	isLoading,
	getDashboardStudentStat,
	studentStatData,
}) => {
	useEffect(() => {
		getDashboardStudentStat();
	}, []);

	if (studentStatData) {
		var {
			totalMaleCount,
			totalFemaleCount,
			thirdYearCount,
			fourthYearCount,
			totalStudentCount,
		} = studentStatData;
		var maleParcentage = Math.ceil((totalMaleCount * 100) / totalStudentCount);
		var femaleParcentage = 100 - maleParcentage;
		var data = {
			datasets: [
				{
					data: [maleParcentage, femaleParcentage],
					backgroundColor: ["#e94e1b", "#f9b233"],
					borderWidth: 3,
					borderColor: "#fff",
					hoverBorderColor: "#f8f9fb",
				},
			],
			labels: ["Male", "Female"],
		};
	}

	return (
		<Card
			className="dashboard-basicInformation-card-container"
			title="Student Statistics"
		>
			{studentStatData && (
				<>
					<List size="small">
						<List.Item>
							<List.Item.Meta
								title="No. of Internship Candidates"
								description="Students who are in 3rd year"
							/>
							{isLoading ? (
								<Skeleton.Input style={{ width: 40 }} active={true} />
							) : (
								<div>{thirdYearCount}</div>
							)}
						</List.Item>
						<List.Item>
							<List.Item.Meta
								title="No. of Fulltime Candidates"
								description="Students who are in 4th year"
							/>
							{isLoading ? (
								<Skeleton.Input style={{ width: 40 }} active={true} />
							) : (
								<div>{fourthYearCount}</div>
							)}
						</List.Item>
					</List>
					<Divider />
					<Title level={5}>Gender balance overview</Title>
					<div style={{ width: 200, margin: "auto" }}>
						<Pie
							data={data}
							options={{
								maintainAspectRatio: true,
								cutoutPercentage: 0,
								plugins: {
									legend: {
										position: "bottom",
									},
									tooltips: {
										usePointStyle: true,
									},
									title: {
										display: true,
										text: `Male ${maleParcentage}%  Female ${
											100 - maleParcentage
										}%`,
									},
								},
								responsive: true,
							}}
						/>
					</div>
				</>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isStudentStatInformationLoading,
	studentStatData: state.dashboard.studentStatInformation,
});

export default connect(mapStateToProps, { getDashboardStudentStat })(
	StudentStatInformation
);
