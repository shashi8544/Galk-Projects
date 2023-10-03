import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../../utils/components/RestrictedRoute";
import Dashboard from "../student/dashboard";
import AllStudents from "../student/allStudents";
// import ThirdYearStudentList from "../student/thirdYear";
// import FourthYearStudentList from "../student/fourthYear";
// import GraduateStudentList from "../student/graduate";
import StudentProfileDetails from "../student/profileDetails";
import UniversityList from "../student/universityList";

const StudentRoot = ({ match }) => {
	return (
		<>
			<Redirect
				// from={`${match.path}`}
				to={`${match.path}/Dashboard`}
			/>
			<RestrictedRoute path={`${match.path}/Dashboard`}>
				<Dashboard />
			</RestrictedRoute>
			<RestrictedRoute exact path={`${match.path}/AllStudents`}>
				<AllStudents />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/AllStudents/:profileId`}>
				<StudentProfileDetails />
			</RestrictedRoute>
			{/* <RestrictedRoute exact path={`${match.path}/ThirdYear`}>
				<ThirdYearStudentList />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/ThirdYear/:profileId`}>
				<StudentProfileDetails />
			</RestrictedRoute>
			<RestrictedRoute exact path={`${match.path}/FourthYear`}>
				<FourthYearStudentList />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/FourthYear/:profileId`}>
				<StudentProfileDetails />
			</RestrictedRoute> */}
			<RestrictedRoute exact path={`${match.path}/Universities`}>
				<UniversityList />
			</RestrictedRoute>
			{/* <RestrictedRoute exact path={`${match.path}/AllOtherStudents`}>
				<GraduateStudentList />
			</RestrictedRoute>
			<RestrictedRoute path={`${match.path}/AllOtherStudents/:profileId`}>
				<StudentProfileDetails />
			</RestrictedRoute> */}
		</>
	);
};

export default connect(null, {})(withRouter(StudentRoot));
