import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../utils/customHooks";
import { updateCompanyBasicInformation } from "../../../actions/companyActions";
import { Card, Button, Form, Input } from "antd";

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 12,
	},
};

const BasicInformation = ({
	companyBasicDetails,
	isActionProgress,
	updateCompanyBasicInformation,
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
			description: values.description || "",
		};

		updateCompanyBasicInformation(updatedValue);
	};
	return (
		<Card
			type="inner"
			title="Operational information"
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
			{Object.entries(companyBasicDetails).length > 0 && (
				<Form
					// {...formItemLayout}
					style={{ width: 800, margin: "auto" }}
					layout="vertical"
					form={form}
					initialValues={
						companyBasicDetails && {
							description: companyBasicDetails.description,
						}
					}
					onFinish={updateInformation}
				>
					<Form.Item
						label="Brief description about what your company does."
						name="description"
						rules={[{ required: true, message: "Please enter company name!" }]}
					>
						<Input.TextArea
							placeholder="Brief company operational information.."
							disabled={!isEditable}
							autoSize={{ minRows: 6, maxRows: 10 }}
						/>
					</Form.Item>
				</Form>
			)}
		</Card>
	);
};
const mapStateToProps = (state) => ({
	isActionProgress: state.company.actionInProgress,
});

export default connect(mapStateToProps, { updateCompanyBasicInformation })(
	BasicInformation
);
