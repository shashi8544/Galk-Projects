import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addNewCandidateJob } from "../../../actions/candidateActions";
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

const CreateJobModal = ({
	modalCloseHandler,
	isActionProgress,
	addNewCandidateJob,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]);

	const createJob = (formValues) => {
		formValues.startDate = formValues.startDate ? moment(formValues.startDate).format("LL") : null
		formValues.endDate = formValues.endDate ? moment(formValues.endDate).format("LL") : null
		let jobToCreate = {
			...formValues,
		};
		
		addNewCandidateJob(jobToCreate);
	};

	return (
		<Modal
			title="Create job"
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					company: "",
					designation: "",
					description: "",
					place: "",
					startDate: "",
					endDate: "",
				}}
				onFinish={createJob}
			>
				<Form.Item
					label="Company"
					name="company"
					rules={[{ required: true, message: "Please enter company name!" }]}
				>
					<Input placeholder="Company name.." />
				</Form.Item>
				<Form.Item
					label="Designation"
					name="designation"
					rules={[{ required: true, message: "Please enter your designation" }]}
				>
					<Input placeholder="Your designation.." />
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
						{ required: true, message: "Please enter job description!" },
					]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 8 }}
						placeholder="Job description..."
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

export default connect(mapStateToProps, { addNewCandidateJob })(
	CreateJobModal
);
 