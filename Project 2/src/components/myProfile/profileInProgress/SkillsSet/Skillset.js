import React from "react";
import { connect } from "react-redux";
import { Card, Button, Form, Typography } from "antd";

import SkillsSetInput from "../../common/StudentInformation/SkillsSet";
import { updateStudentBasicInformation } from "../../../../actions/profileActions";

import "./style.css";

const { Title } = Typography;

const Skillset = ({
	isActionProgress,
	studentProfile,
	updateStudentBasicInformation,
}) => {
	const [form] = Form.useForm();

	const updateSocialDetails = (values) => {
		let updatedValue = {
			skills: values.skills || [],
			secondarySkills: values.secondarySkills || [],
			spokenLanguages: values.spokenLanguages || [],
		};

		updateStudentBasicInformation(updatedValue);
	};

	return (
		<Card
			className="Forms"
			title={
				<Title level={4} style={{ marginBottom: 0 }}>
					Technical and other skill sets
				</Title>
			}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					skills: studentProfile.skills || [],
					secondarySkills: studentProfile.secondarySkills || [],
					spokenLanguages: studentProfile.spokenLanguages || [],
				}}
				onFinish={updateSocialDetails}
			>
				<SkillsSetInput isEditable={!isActionProgress} />
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
	Skillset
);
