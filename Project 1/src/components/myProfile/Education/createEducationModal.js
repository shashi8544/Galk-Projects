import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addNewCandidateEducation } from "../../../actions/candidateActions";
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

const CreateEducationModal = ({
	modalCloseHandler,
	isActionProgress,
	addNewCandidateEducation,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const createEducation = (formValues) => {
		formValues.startDate = formValues.startDate ? moment(formValues.startDate).format("LL") : null
		formValues.endDate = formValues.endDate ? moment(formValues.endDate).format("LL") : null
		let jobToCreate = {
			...formValues,
		};
		addNewCandidateEducation(jobToCreate);
	};

	return (
		<Modal
			title="Create education"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					degree: "",
					instituteName: "",
					description: "",
					place: "",
					startDate: "",
					endDate: "",
				}}
				onFinish={createEducation}
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

export default connect(mapStateToProps, { addNewCandidateEducation })(
	CreateEducationModal
);
 