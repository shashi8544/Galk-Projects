import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateStudentToShowCertificate } from "../../../../actions/studentAction";
import { Modal, Form, Input, Button, Select } from "antd";

const { TextArea } = Input;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const EditCertificateModal = ({
	modalCloseHandler,
	isActionProgress,
	certificateDetails,
	updateStudentToShowCertificate,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateCertificate = (formValues) => {
		let dataToUpdate = {
			...formValues,
			id: certificateDetails.id,
		};
		// console.log("UPDATE:", dataToUpdate);
		updateStudentToShowCertificate(dataToUpdate);
	};

	return (
		<Modal
			title="Edit certificate"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={certificateDetails && { ...certificateDetails }}
				onFinish={updateCertificate}
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{ required: true, message: "Please enter certificate title!" },
					]}
				>
					<Input placeholder="Certificate title.." />
				</Form.Item>
				<Form.Item label="Certificate link" name="link">
					<Input placeholder="Certificate link.." />
				</Form.Item>
				<Form.Item label="Issue date" name="issueDate">
					<Input placeholder="Date in format DD/MM/YYYY" />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{
							required: true,
							message: "Please enter certificate description!",
						},
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Certificate description..."
					/>
				</Form.Item>
				<Form.Item style={{ marginTop: 20 }}>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isActionProgress}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.student.studentToShowActionInProgress,
});

export default connect(mapStateToProps, { updateStudentToShowCertificate })(
	EditCertificateModal
);
