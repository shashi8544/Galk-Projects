import moment from "moment";
import { connect } from "react-redux";
import { Card, Button, Form } from "antd";
import React, { useState, useEffect } from "react";

import { usePreviousState } from "../../../../utils/customHooks";
import SkillsSetInput from "../../common/StudentInformation/SkillsSet";
import SocialInformation from "../../common/StudentInformation/SocialInformation";
import { updateStudentBasicInformation } from "../../../../actions/profileActions";

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
	},
};

const BasicInformation = ({
	studentBasicDetails,
	isActionProgress,
	updateStudentBasicInformation,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePreviousState(isActionProgress);
	const [isEditable, setIsEditable] = useState(false);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			setIsEditable(false);
		}
	}, [isActionProgress]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		return () => {
			resetAll();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const resetAll = () => {
		form.resetFields();
		setIsEditable(false);
	};

	const updateInformation = (values) => {
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
			type="inner"
			title="Basic information"
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							disabled={isActionProgress}
							style={{ marginRight: 10 }}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							onClick={() => form.submit()}
							disabled={false}
							loading={isActionProgress}
						>
							Save
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>Edit</Button>
				)
			}
		>
			{studentBasicDetails &&
				Object.entries(studentBasicDetails).length > 0 && (
					<Form
						{...formItemLayout}
						form={form}
						initialValues={
							studentBasicDetails && {
								name: studentBasicDetails.name,
								gender: studentBasicDetails.gender || "male",
								email: studentBasicDetails.email,
								emailVerified: studentBasicDetails.emailVerified,
								personalEmail: studentBasicDetails.personalEmail,
								mobileNumber: studentBasicDetails.mobileNumber,
								yearOfAdmission: studentBasicDetails.yearOfAdmission
									? moment(studentBasicDetails.yearOfAdmission)
									: null,
								yearOfGraduation: studentBasicDetails.yearOfGraduation
									? moment(studentBasicDetails.yearOfGraduation)
									: null,
								yearOfRegistration: studentBasicDetails.yearOfRegistration
									? moment(studentBasicDetails.yearOfRegistration)
									: null,
								JEERank: studentBasicDetails.JEERank,
								collegeName: studentBasicDetails.collegeName,
								branchName: studentBasicDetails.branchName,
								otherBranchName: studentBasicDetails.branchName,
								collegeGrade: studentBasicDetails.collegeGrade,
								minorDegree: studentBasicDetails.minorDegree,
								otherMinorDegree: studentBasicDetails.minorDegree,
								skills: studentBasicDetails.skills,
								secondarySkills: studentBasicDetails.secondarySkills,
								spokenLanguages: studentBasicDetails.spokenLanguages,
								dob: studentBasicDetails.dob
									? moment(studentBasicDetails.dob)
									: null,
								githubProfileLink: studentBasicDetails.githubProfileLink,
								linkedinURL: studentBasicDetails.linkedinURL,
								selfIntro: studentBasicDetails.selfIntro,
								placeOfBirth: studentBasicDetails.placeOfBirth,
								religion: studentBasicDetails.religion,
								otherReligion: studentBasicDetails.religion,
								medicallyFit:
									studentBasicDetails.medicallyFit !== undefined
										? studentBasicDetails.medicallyFit
										: true,
								hasPassport:
									studentBasicDetails.hasPassport !== undefined
										? studentBasicDetails.hasPassport
										: false,
								medicallyNotFitReason:
									studentBasicDetails.medicallyNotFitReason,
								foodPrefer: studentBasicDetails.foodPrefer,
								foodAvoid: studentBasicDetails.foodAvoid,
								japaneseProficiency: studentBasicDetails.japaneseProficiency,
							}
						}
						onFinish={updateInformation}
					>
						<SkillsSetInput isEditable={isEditable} />
						<SocialInformation
							isEditable={isEditable}
							studentBasicDetails={studentBasicDetails}
						/>
					</Form>
				)}
		</Card>
	);
};
const mapStateToProps = (state) => ({
	isActionProgress: state.profile.actionInProgress,
	studentBasicDetails: state.firebase.profile,
});

export default connect(mapStateToProps, { updateStudentBasicInformation })(
	BasicInformation
);
