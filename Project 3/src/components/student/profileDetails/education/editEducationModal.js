import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateStudentToShowEducation } from "../../../../actions/studentAction";
import { Modal, Form, Input, Button } from "antd";

const { TextArea } = Input;

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

const EditEducationModal = ({
	modalCloseHandler,
	isActionProgress,
	educationDetails,
	updateStudentToShowEducation,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateEducation = (formValues) => {
		let dataToUpdate = {
			...formValues,
			id: educationDetails.id,
		};
		// console.log("UPDATE:", dataToUpdate);
		updateStudentToShowEducation(dataToUpdate);
	};
	return (
		<Modal
			title="Edit education"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={educationDetails && { ...educationDetails }}
				onFinish={updateEducation}
			>
				<Form.Item
					label="Degree"
					name="degree"
					rules={[{ required: true, message: "Please enter degree name!" }]}
				>
					<Input placeholder="Degree name.." />
				</Form.Item>
				<Form.Item
					label="Institute name"
					name="instituteName"
					rules={[{ required: true, message: "Please enter institute name!" }]}
				>
					<Input placeholder="Institute name.." />
				</Form.Item>

				<Form.Item label="Location" name="place">
					<Input placeholder="Location.." />
				</Form.Item>
				<Form.Item label="Start date" name="startDate">
					<Input placeholder="Date in format DD/MM/YYYY" />
				</Form.Item>
				<Form.Item label="End date" name="endDate">
					<Input placeholder="Date in format DD/MM/YYYY" />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{ required: true, message: "Please enter education description!" },
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Education description..."
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

export default connect(mapStateToProps, { updateStudentToShowEducation })(
	EditEducationModal
);
