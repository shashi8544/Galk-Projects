import { connect } from "react-redux";
import React, { useState, useMemo } from "react";
import { Button, Form, Switch, Divider, Card } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { updateGalkSubscription } from "../../../../actions/profileActions";

import "./style.css";

const ChooseProgramProfile = ({
	updateGalkSubscription,
	actionInProgress,
	studentDetails,
}) => {
	const [form] = Form.useForm();
	const [isFormDataChanged, setIsFormDataChanged] = useState(false);

	const updateSubscription = (values) => {
		setIsFormDataChanged(false);
		updateGalkSubscription({ ...values });
	};

	const isStudentDataLoaded = useMemo(
		() => studentDetails.isLoaded && !studentDetails.isEmpty,
		[studentDetails]
	);

	return (
		<Card title="Please select atleast one subscription.">
			{isStudentDataLoaded && (
				<Form
					style={{ height: "100%", padding: "0 10px", overflowY: "auto" }}
					layout="vertical"
					form={form}
					initialValues={
						studentDetails && {
							subscribedInInternship:
								studentDetails.subscribedInInternship || false,
							subscribedInGalkLab: studentDetails.subscribedInGalkLab || false,
						}
					}
					onFinish={updateSubscription}
					// onFieldsChange={(changedFields, allFields) => {}}
					onValuesChange={(changedValues, allValues) => {
						const valueChanged =
							Object.entries(changedValues).length > 0 &&
							(allValues.subscribedInInternship ||
								allValues.subscribedInGalkLab);
						setIsFormDataChanged(valueChanged);
					}}
				>
					<Form.Item
						label="GALK Recruit"
						name="subscribedInInternship"
						valuePropName="checked"
						extra="Select above option if you want to subscribe in GALK Recruit program."
					>
						<Switch
							// disabled={!isEditable}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item>
					<Divider />
					<Form.Item
						label="GALK Lab"
						name="subscribedInGalkLab"
						valuePropName="checked"
						extra="Select above option if you want to subscribe in GALK Lab program."
					>
						<Switch
							// disabled={!isEditable}
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item>
					<Divider />
					<Form.Item style={{ marginTop: 20 }}>
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={actionInProgress}
							disabled={!isFormDataChanged}
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			)}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	actionInProgress: state.profile.actionInProgress,
	studentDetails: state.firebase.profile,
});

export default connect(mapStateToProps, { updateGalkSubscription })(
	ChooseProgramProfile
);
