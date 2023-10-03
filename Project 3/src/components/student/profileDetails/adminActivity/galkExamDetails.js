import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../../utils/customHooks";
import { updateStudentBasicInformation } from "../../../../actions/studentAction";

import { Card, Button, Form, Input, Divider, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
	},
};

const GALKExamDetails = ({
	studentDetails,
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
	}, [isActionProgress]);

	const resetAll = () => {
		form.resetFields();
		setIsEditable(false);
	};

	const updateInformation = (values) => {
		let updatedValue = {
			active: values.active || false,
			adminComments: values.adminComments || "",
			backgroundComment: values.backgroundComment || "",
			profileCompletionStatus: values.profileCompletionStatus || false,
			testScore: values.testScore || "",
			hrInterviewScore: values.hrInterviewScore || "",
		};
		// console.log("UPDATE:", updatedValue);
		updateStudentBasicInformation(updatedValue);
	};

	return (
		<Card
			type="inner"
			title="GALK exam and Account setting information"
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
			{studentDetails && Object.entries(studentDetails).length > 0 && (
				<Form
					{...formItemLayout}
					form={form}
					initialValues={
						studentDetails && {
							active: studentDetails.active || false,
							adminComments: studentDetails.adminComments || "",
							backgroundComment: studentDetails.backgroundComment || "",
							profileCompletionStatus:
								studentDetails.profileCompletionStatus || false,
							testScore: studentDetails.testScore || "",
							hrInterviewScore: studentDetails.hrInterviewScore || "",
						}
					}
					onFinish={updateInformation}
				>
					<Form.Item
						label="Account ACTIVE status"
						name="active"
						valuePropName="checked"
						extra="Checked status of this field means that the student is approved by GALK Admin and he/she will appear in student tag list."
					>
						<Switch
							disabled={!isEditable}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item>
					<Form.Item
						label="Profile published"
						name="profileCompletionStatus"
						valuePropName="checked"
						extra="Checked status of this field means that the student has filled all mandatory information and published his/her profile."
					>
						<Switch
							disabled={!isEditable}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item>
					<Divider />
					<Form.Item
						label="Comment for Internship recruiter"
						name="adminComments"
						extra="Recruiters can see this comment as an extra note about this student."
					>
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="Admin comment..."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Divider />
					<Form.Item
						label="Comment for GalkLab recruiter"
						name="backgroundComment"
						extra="Recruiters can see this comment as an extra note about this student."
					>
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="Admin comment..."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Divider />
					<Form.Item label="GALK test score" name="testScore">
						<Input placeholder="GALK test score..." disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="GALK Hr interview score" name="hrInterviewScore">
						<Input placeholder="Hr interview score..." disabled={!isEditable} />
					</Form.Item>
				</Form>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.student.studentToShowActionInProgress,
});

export default connect(mapStateToProps, { updateStudentBasicInformation })(
	GALKExamDetails
);