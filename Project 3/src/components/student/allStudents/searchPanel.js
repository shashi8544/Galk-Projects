import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
	collegeNames,
	skillsets,
	fieldOfStudies,
	projectTypeOptions,
} from "../../../utils/constants";
import { filterStudents } from "../../../actions/studentAction";
import { Form, Card, Button, Select, AutoComplete } from "antd";

const { Option } = Select;

const typeOptions = [];
projectTypeOptions.map((type) =>
	typeOptions.push(<Option key={type}>{type}</Option>)
);

const SearchPanel = ({ isLoading, filterStudents }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		return () => form.resetFields();
	}, []);

	const onSearch = (filter) => {
		filterStudents(filter);
	};

	const resetForm = () => {
		form.resetFields();
	};

	return (
		<Card
			title="Filter students"
			size="small"
			style={{ height: "100%", width: 200 }}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					collegeName: [],
					technicalSkill: [],
					fieldOfStudy: [],
					projectType: "",
				}}
				// onValuesChange={onFormValueChange}
				onFinish={onSearch}
			>
				<Form.Item>
					<Button
						style={{ marginBottom: 10 }}
						type="primary"
						htmlType="submit"
						block
						loading={isLoading}
					>
						Apply
					</Button>
					<Button
						htmlType="submit"
						block
						disabled={isLoading}
						onClick={resetForm}
					>
						Clear Filter
					</Button>
				</Form.Item>
				<Form.Item
					name="collegeName"
					label="College name"
					rules={[{ type: "array" }]}
				>
					<Select
						mode="multiple"
						placeholder="Please select college"
						disabled={isLoading}
					>
						{collegeNames &&
							collegeNames.map((clg, i) => (
								<Option key={i} value={clg}>
									{clg}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="fieldOfStudy"
					label="Field of studies"
					rules={[{ type: "array" }]}
				>
					<Select
						mode="tags"
						placeholder="Please select field"
						disabled={isLoading}
					>
						{fieldOfStudies &&
							fieldOfStudies.map((study, i) => (
								<Option key={i} value={study}>
									{study}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="technicalSkill"
					label="Technical skills"
					rules={[{ type: "array" }]}
				>
					<Select
						mode="tags"
						placeholder="Please select skill"
						disabled={isLoading}
					>
						{skillsets &&
							skillsets.map((skill, i) => (
								<Option key={i} value={skill}>
									{skill}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item label="Project type" name="projectType">
					<AutoComplete
						dataSource={typeOptions}
						placeholder="Ex: Web development"
						allowClear={true}
						filterOption={(inputValue, option) =>
							option.props.children
								.toUpperCase()
								.indexOf(inputValue.toUpperCase()) !== -1
						}
					/>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default connect(null, { filterStudents })(SearchPanel);
