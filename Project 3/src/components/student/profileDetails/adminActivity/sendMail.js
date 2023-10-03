import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../../utils/customHooks";
import { sendMailToStudentFromAdmin } from "../../../../actions/studentAction";

import { Card, Button, Form, Input, Divider } from "antd";

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
	},
};

const SendMail = ({
	studentDetails,
	isActionProgress,
	sendMailToStudentFromAdmin,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePreviousState(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			resetAll();
		}
	}, [isActionProgress]);

	const resetAll = () => {
		form.resetFields();
	};

	const updateInformation = (values) => {
		let updatedValue = {
			to: values.to,
			subject: values.subject,
			body: values.body,
		};
		sendMailToStudentFromAdmin(updatedValue);
	};

	return (
		<Card type="inner" title="Send mail to this student">
			{studentDetails && studentDetails.email && (
				<Form
					{...formItemLayout}
					form={form}
					initialValues={{
						to: studentDetails.email,
						subject: "",
						body: "",
					}}
					onFinish={updateInformation}
				>
					<Form.Item label="To" name="to">
						<Input disabled />
					</Form.Item>
					<Form.Item label="Subject" name="subject">
						<Input placeholder="Email subject" disabled={isActionProgress} />
					</Form.Item>
					<Divider />
					<Form.Item label="Email body" name="body" extra="From, GALK ADMIN">
						<Input.TextArea
							autoSize={{ minRows: 3, maxRows: 8 }}
							placeholder="Email body..."
							disabled={isActionProgress}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit" loading={isActionProgress}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.student.studentToShowActionInProgress,
});

export default connect(mapStateToProps, { sendMailToStudentFromAdmin })(
	SendMail
);
