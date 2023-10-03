import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../utils/customHooks";
import { updateCompanyBasicInformation } from "../../../actions/companyActions";
import { CompanyAccountType } from "../../../utils/constants";
import { Card, Button, Form, Input, Select, Divider } from "antd";

const { Option } = Select;

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
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
			name: values.name || "",
			nameInEnglish: values.nameInEnglish || "",
			founder: values.founder || "",
			website: values.website || "",
			address: values.address || "",
			size: values.size || "",
			industry: values.industry || "",
			points: values.points || "0",
			accountType: values.accountType || CompanyAccountType.Guest,
			rank: values.rank || "0",
		};

		updateCompanyBasicInformation(updatedValue);
	};

	return (
		<Card
			type="inner"
			title="Basic information"
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
					{...formItemLayout}
					form={form}
					initialValues={
						companyBasicDetails && {
							name: companyBasicDetails.name,
							email: companyBasicDetails.email,
							nameInEnglish: companyBasicDetails.nameInEnglish,
							founder: companyBasicDetails.founder,
							website: companyBasicDetails.website,
							address: companyBasicDetails.address,
							size: companyBasicDetails.size,
							industry: companyBasicDetails.industry,
							points: companyBasicDetails.points || "0",
							accountType:
								companyBasicDetails.accountType || CompanyAccountType.Guest,
							rank: companyBasicDetails.rank || "0",
						}
					}
					onFinish={updateInformation}
				>
					<Form.Item label="Account Type" name="accountType">
						<Select
							disabled={!isEditable}
							placeholder="Please select Account type"
						>
							<Option key="Guest" value={CompanyAccountType.Guest}>
								Guest
							</Option>
							<Option key="Paid" value={CompanyAccountType.Paid}>
								Paid
							</Option>
							<Option key="Admin" value={CompanyAccountType.GALKAdmin}>
								Admin
							</Option>
						</Select>
					</Form.Item>
					<Divider />
					<Form.Item
						label="Company name"
						name="name"
						rules={[{ required: true, message: "Enter company name" }]}
					>
						<Input placeholder="Company name..." disabled={!isEditable} />
					</Form.Item>
					<Form.Item
						label="Company name in English"
						name="nameInEnglish"
						rules={[
							{
								required: true,
								message: "Please enter company name in english!",
							},
						]}
					>
						<Input placeholder="Company name.." disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="Company email" name="email">
						<Input disabled />
					</Form.Item>
					<Form.Item label="Company email" name="founder">
						<Input
							placeholder="Company founder's name.."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item
						label="Company website"
						name="website"
						rules={[
							{ required: true, message: "Please enter company website!" },
						]}
					>
						<Input placeholder="Company website.." disabled={!isEditable} />
					</Form.Item>
					<Form.Item
						label="Address"
						name="address"
						rules={[
							{ required: true, message: "Please enter company address!" },
						]}
					>
						<Input
							placeholder="Example: Tokyo, Japan .."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item label="Company size" name="size">
						<Input
							placeholder="Company size/number of employees..."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item label="Company industry" name="industry">
						<Input
							placeholder="Example: Information technology.."
							disabled={!isEditable}
						/>
					</Form.Item>
					<Form.Item label="Company Rank" name="rank">
						<Input placeholder="Company rank" disabled={!isEditable} />
					</Form.Item>
					<Form.Item label="Company Point" name="points">
						<Input
							placeholder="Company points from GALK"
							disabled={!isEditable}
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
