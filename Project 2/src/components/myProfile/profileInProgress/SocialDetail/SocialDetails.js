import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Card, Button, Form, Typography } from "antd";

import { updateStudentBasicInformation } from "../../../../actions/profileActions";
import SocialInformation from "../../common/StudentInformation/SocialInformation";

import "./style.css";

const { Title } = Typography;

const SocialDetailsProfile = ({
	isActionProgress,
	studentProfile,
	updateStudentBasicInformation,
}) => {
	const [formSocialDetails] = Form.useForm();

	const updateSocialDetails = (values) => {
		if (values.branchName === "Other") {
			values.branchName = values.otherBranchName || "Other";
		}
		if (values.religion === "Other") {
			values.religion = values.otherReligion || "Other";
		}
		if (values.minorDegree === "Other") {
			values.minorDegree = values.otherMinorDegree || "Other";
		}

		let {
			otherBranchName, // eslint-disable-line
			otherReligion, // eslint-disable-line
			otherMinorDegree, // eslint-disable-line
			...updatedValue
		} = values;

		updatedValue.dob = values.dob.format("LL") || null;
		updatedValue.yearOfAdmission =
			values.yearOfAdmission?.format("LL").split(" ")[2] || null;
		updatedValue.yearOfGraduation =
			values.yearOfGraduation?.format("LL").split(" ")[2] || null;
		updatedValue.yearOfRegistration =
			values.yearOfRegistration.format("LL").split(" ")[2] || null;

		updateStudentBasicInformation(updatedValue);
	};

	return (
		<Card
			className="Forms"
			title={
				<Title level={4} style={{ marginBottom: 0 }}>
					Social Details
				</Title>
			}
		>
			<Form
				// {...formItemLayout}
				layout="vertical"
				form={formSocialDetails}
				initialValues={{
					name: studentProfile.name,
					email: studentProfile.email,
					personalEmail: studentProfile.personalEmail,
					mobileNumber: studentProfile.mobileNumber,
					gender: studentProfile.gender || "male",
					dob: studentProfile.dob ? moment(studentProfile.dob) : null,
					collegeName: studentProfile.collegeName,
					branchName: studentProfile.branchName,
					otherBranchName: studentProfile.branchName,
					yearOfAdmission: studentProfile.yearOfAdmission
						? moment(studentProfile.yearOfAdmission)
						: null,
					yearOfGraduation: studentProfile.yearOfGraduation
						? moment(studentProfile.yearOfGraduation)
						: null,
					yearOfRegistration: studentProfile.yearOfRegistration
						? moment(studentProfile.yearOfRegistration)
						: null,
					minorDegree: studentProfile.minorDegree,
					otherMinorDegree: studentProfile.minorDegree,
					JEERank: studentProfile.JEERank,
					collegeGrade: studentProfile.collegeGrade,
					githubProfileLink: studentProfile.githubProfileLink,
					linkedinURL: studentProfile.linkedinURL,
					placeOfBirth: studentProfile.placeOfBirth,
					medicallyFit:
						studentProfile.medicallyFit !== undefined
							? studentProfile.medicallyFit
							: true,
					hasPassport:
						studentProfile.hasPassport !== undefined
							? studentProfile.hasPassport
							: false,
					religion: studentProfile.religion,
					otherReligion: studentProfile.religion,
					medicallyNotFitReason: studentProfile.medicallyNotFitReason,
					foodPrefer: studentProfile.foodPrefer,
					foodAvoid: studentProfile.foodAvoid,
					japaneseProficiency: studentProfile.japaneseProficiency,
				}}
				onFinish={updateSocialDetails}
			>
				<SocialInformation
					isEditable={!isActionProgress}
					studentBasicDetails={studentProfile}
				/>

				<Form.Item style={{ marginTop: 20, width: "100%" }}>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isActionProgress}
						style={{ width: "100%" }}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.profile.actionInProgress,
	studentProfile: state.firebase.profile,
});

export default connect(mapStateToProps, { updateStudentBasicInformation })(
	SocialDetailsProfile
);
