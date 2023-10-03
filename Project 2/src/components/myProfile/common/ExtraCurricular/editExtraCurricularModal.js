import { connect } from "react-redux";
import React, { useEffect, useRef } from "react";
import { Modal, Form, Input, Button } from "antd";

import { updateCandidatePersonalInterest } from "../../../../actions/candidateActions";

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
	editIndex,
	updateCandidatePersonalInterest,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePrevious(isActionProgress);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isActionProgress]); // eslint-disable-line react-hooks/exhaustive-deps

	const updateExtraCurricular = (formValues) => {
		let dataToUpdate = {
			...formValues,
			id: extraCurricularDetails.id,
		};
		updateCandidatePersonalInterest({ dataToUpdate, editIndex });
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
	isActionProgress: state.profile.actionInProgress,
});

export default connect(mapStateToProps, { updateCandidatePersonalInterest })(
	ExtraCurricularModal
);
