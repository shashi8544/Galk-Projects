import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDashboardBasic } from "../../actions/dashboardActions";
import Logo from "../../assets/images/logo.png";
import { Card, List, Skeleton } from "antd";

import "./dashboardStyles.css";

const BasicInformation = ({
	getDashboardBasic,
	companyId,
	basicInfoData,
	isLoading,
}) => {
	useEffect(() => {
		if (companyId) {
			getDashboardBasic(companyId);
		}
	}, [companyId]);

	return (
		<Card
			className="dashboard-basicInformation-card-container"
			title="Basic Information"
		>
			{basicInfoData && (
				<>
					<div className="cardBox">
						<React.Fragment>
							<h3 className="milageText">Mileage Card</h3>
							<img
								src={Logo}
								className="dashboard-basicInformation-card-logo"
							/>
							<h3 className="pointText">
								{basicInfoData.galkMileagePoint} <span>Points</span>
							</h3>
							<p className="rankText">Rank {basicInfoData.galkRank}</p>

							<h3 className="companyText">{basicInfoData.companyName}</h3>

							<div className="dateBox">
								<p className="label1">MONTH / YEAR</p>
								<span className="lable2">GOOD{"\n"}THRU</span>
								<h3>{basicInfoData.galkMileageExpiry}</h3>
							</div>
						</React.Fragment>
					</div>
					<List>
						<List.Item>
							{isLoading ? (
								<Skeleton.Input
									style={{ width: 120 }}
									active={true}
									size="large"
								/>
							) : (
								<List.Item.Meta
									title="Mileage Point"
									description={`${basicInfoData.galkMileagePoint}`}
								/>
							)}
						</List.Item>
						<List.Item>
							{isLoading ? (
								<Skeleton.Input
									style={{ width: 200 }}
									active={true}
									size="large"
								/>
							) : (
								<List.Item.Meta
									title="Company current subscription"
									description={`${basicInfoData.galkMileageMembership}`}
								/>
							)}
						</List.Item>
						<List.Item>
							{isLoading ? (
								<Skeleton.Input
									style={{ width: 100 }}
									active={true}
									size="large"
								/>
							) : (
								<List.Item.Meta
									title="Expiry date"
									description={`${basicInfoData.galkMileageExpiry}`}
								/>
							)}
						</List.Item>
					</List>
				</>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.dashboard.isBasicInformationLoading,
	companyId: state.firebase.profile.companyId,
	basicInfoData: state.dashboard.basicInformation,
});

export default connect(mapStateToProps, { getDashboardBasic })(
	BasicInformation
);
