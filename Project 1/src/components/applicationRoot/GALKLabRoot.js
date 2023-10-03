import React from "react";
import { connect } from "react-redux";
// import DashboardContainer from "../dashboard";
// import ThirdYearStudents from "../student/thirdYear";
// import StudentList from "../GALKLab/student";
// import InterviewPanel from "../interviewPanel";
// import ChatRoom from "../GALKLab/chatRoom";
// import JobPostings from "../GALKLab/jobPosting";
import { Redirect, withRouter } from "react-router-dom";
import { Region } from "../common/layout/region";
import RestrictedRoute from "../common/RestrictedRoute";
import AllJobs from "../GALKLab/AllJobs";
import ChatRoom from "../GALKLab/ChatRoom";
import YourAssignments from "../GALKLab/YourAssignments";

const GALKLabRoot = ({ match }) => {
	return (
		<>
			{/* <RestrictedRoute path={`${match.path}/Students`}>
				<StudentList />
			</RestrictedRoute> */}
			<RestrictedRoute path={`${match.path}/AllJobs`}>
				<Region>
					<AllJobs />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/YourAssignments`}>
				<Region>
					<YourAssignments />
				</Region>
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/ChatRoom`}>
				<Region>
					<ChatRoom />
				</Region>
			</RestrictedRoute>

		</>
	);
};

export default connect(null, {})(withRouter(GALKLabRoot));
