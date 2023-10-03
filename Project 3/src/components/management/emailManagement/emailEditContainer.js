import React, { useEffect, useState } from "react";
import { DraftEditor } from "../../../utils/components/inputFields";
import { usePreviousState } from "../../../utils/customHooks";
import { emailTemplateVariables } from "../../../utils/constants";
import { Form, Button, Divider, Input, Switch, Select } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const EmailEditContainer = ({
	emailDetails,
	updateHandler,
	isEditing,
	modalCloseHandler,
}) => {
	const [form] = Form.useForm();
	const prevActionInProgressValue = usePreviousState(isEditing);

	useEffect(() => {
		if (!isEditing && prevActionInProgressValue) {
			modalCloseHandler();
		}
	}, [isEditing]);

	useEffect(() => {
		return () => {
			form.resetFields();
		};
	}, []);

	const updateEmail = (formValues) => {
		// console.log("FORM VALUES:", formValues);
		updateHandler(formValues);
	};
	return (
		<>
			<Form
				layout="vertical"
				form={form}
				initialValues={{ ...emailDetails }}
				// onValuesChange={onFormLayoutChange}
				onFinish={updateEmail}
			>
				<Form.Item
					label="Active:"
					name="active"
					valuePropName="checked"
					extra="Only active templates can be sent to recepient."
				>
					<Switch
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<CloseOutlined />}
					/>
				</Form.Item>
				<Form.Item
					label="Email name"
					name="templateName"
					extra="This template name will be used as an identifier when we call the sendMail function."
				>
					<Input disabled />
				</Form.Item>
				<Form.Item
					label="Email title:"
					name="title"
					rules={[{ required: true, message: "Please enter email title!" }]}
				>
					<Input placeholder="Email title..." />
				</Form.Item>
				<Form.Item
					label="Description:"
					name="description"
					extra="This describes the purpose of this mail."
					rules={[
						{ required: true, message: "Please enter email description!" },
					]}
				>
					<TextArea
						autoSize={{ minRows: 2, maxRows: 4 }}
						placeholder="Email description.."
					/>
				</Form.Item>
				<Form.Item
					label="From:"
					name="defaultFrom"
					extra="This is GALK support email. Changing it is not recommended."
				>
					<Input placeholder="From..." />
				</Form.Item>
				<Form.Item label="Cc:" name="defaultCc">
					<Input placeholder="Cc..." />
				</Form.Item>
				<Form.Item label="Bcc:" name="defaultBcc">
					<Input placeholder="Bcc..." />
				</Form.Item>
				<Form.Item
					label="Email subject:"
					name="subject"
					rules={[{ required: true, message: "Please enter email subject!" }]}
				>
					<Input placeholder="Email subject..." />
				</Form.Item>
				<Form.Item
					name="templateVariables"
					label="Template variables:"
					rules={[{ type: "array" }]}
					extra="Please mention the template variables names which will be dynamically replaced by the original data."
				>
					<Select mode="tags" placeholder="Please select variable names..">
						{emailTemplateVariables &&
							emailTemplateVariables.map((variable, i) => (
								<Option key={i} value={variable}>
									{variable}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Body"
					name="body"
					rules={[{ required: true, message: "Please enter template body!" }]}
					extra="Be careful when you enter template variable names. This should match exactly with the varibale names mentioned in above field."
				>
					<DraftEditor />
				</Form.Item>
				<Divider />
				<Form.Item style={{ marginTop: 20 }}>
					<Button type="primary" htmlType="submit" block loading={isEditing}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default EmailEditContainer;
