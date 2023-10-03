import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateStudentToShowExtraCurricular } from "../../../../actions/studentAction";
import { Modal, Form, Input, Button } from "antd";

const { TextArea } = Input;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const ExtraCurricularModal = ({
	modalCloseHandler,
	isActionProgress,
	extraCurricularDetails,
	updateStudentToShowExtraCurricular,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateExtraCurricular = (formValues) => {
		let dataToUpdate = {
			...formValues,
			id: extraCurricularDetails.id,
		};
		// console.log("UPDATE:", dataToUpdate);
		updateStudentToShowExtraCurricular(dataToUpdate);
	};

	return (
		<Modal
			title="Edit Extracurricular"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={extraCurricularDetails && { ...extraCurricularDetails }}
				onFinish={updateExtraCurricular}
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

export default connect(mapStateToProps, { updateStudentToShowExtraCurricular })(
	ExtraCurricularModal
);
