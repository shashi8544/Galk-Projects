import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateStudentToShowExam } from "../../../../actions/studentAction";
import { Modal, Form, Input, Button } from "antd";

const { TextArea } = Input;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const ExamModal = ({
	modalCloseHandler,
	isActionProgress,
	examDetails,
	updateStudentToShowExam,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateExam = (formValues) => {
		let dataToUpdate = {
			...formValues,
			id: examDetails.id,
		};
		// console.log("UPDATE:", dataToUpdate);
		updateStudentToShowExam(dataToUpdate);
	};

	return (
		<Modal
			title="Edit GALK Exam details"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={examDetails && { ...examDetails }}
				onFinish={updateExam}
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[{ required: true, message: "Please enter title!" }]}
				>
					<Input placeholder="Title.." />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{
							required: true,
							message: "Please enter description!",
						},
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Description..."
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

export default connect(mapStateToProps, { updateStudentToShowExam })(ExamModal);
