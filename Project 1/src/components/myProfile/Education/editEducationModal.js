import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { updateStudentEducation } from "../../../actions/candidateActions";
import { Modal, Form, Input, Button, DatePicker } from "antd";
import moment from "moment";

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
	updateStudentEducation,
	id
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const updateEducation = (formValues) => {
		formValues.startDate = formValues.startDate ? moment(formValues.startDate).format("LL") : null
		formValues.endDate = formValues.endDate ? moment(formValues.endDate).format("LL") : null
		let dataToUpdate = {
			...formValues,
			// id: educationDetails.id,
		};
		updateStudentEducation(dataToUpdate, id);
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
				initialValues={educationDetails && {
					...educationDetails,
					startDate: educationDetails.startDate ? moment(educationDetails.startDate) : null,
					endDate: educationDetails.endDate ? moment(educationDetails.endDate) : null,
				}}
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
					<DatePicker picker="date"/>
				</Form.Item>
				<Form.Item label="End date" name="endDate">
					<DatePicker picker="date"/>
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
	isActionProgress: state.profile.actionInProgress,
});

export default connect(mapStateToProps, { updateStudentEducation })(
	EditEducationModal
);
