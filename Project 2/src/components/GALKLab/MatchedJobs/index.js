import React from "react";
import { connect } from "react-redux";

import Jobs from "./jobs";
import Loading from "../../common/ApplicationLoading";
import { getMatchedJobs } from "../../../actions/galkLabActions";

import "./index.css";

const MatchedJobs = ({
	matchedJobsList,
	matchedJobsLoading,
	getMatchedJobs,
	user,
}) => {
	if (matchedJobsList === null) getMatchedJobs(user.id);

	return (
		<>
			{matchedJobsLoading ? (
				<div
					style={{
						height: "95%",
						display: "flex",
						justifyContent: "center",
						marginTop: 20,
						alignItems: "center",
					}}
				>
					<Loading />
				</div>
			) : (
				<div className="total">
					<div className="match-job">
						<p>Matched Jobs</p>
					</div>
					{matchedJobsList &&
						(matchedJobsList.length === 0 ? (
							<div> No Job Match your profile</div>
						) : (
							matchedJobsList.map((jobDetails, inx) => {
								return <Jobs jobDetails={jobDetails} id={`job${inx}`} />;
							})
						))}
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.firebase.profile,
	matchedJobsList: state.galkLab.matchedJobsList,
	matchedJobsLoading: state.galkLab.matchedJobsLoading,
});

export default connect(mapStateToProps, {
	getMatchedJobs,
})(MatchedJobs);
