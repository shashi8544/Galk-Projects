import React, { useState, useEffect } from "react";
import Loading from "../../common/loading";
import { database } from "../../../utils/configs/firebaseConfig";
import { sortByOption } from "../../../actions/actionHelper";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const GALKAnalytic = () => {
	const [analyticData, setAnalyticData] = useState(null);
	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState("");

	const isEditing = (record) => record.year === editingKey;

	useEffect(() => {
		setLoading(true);
		database
			.collection("GALKAnalytics")
			.get()
			.then((querySnap) => {
				let dataList = [];
				querySnap.forEach((doc) => {
					dataList.push({
						year: doc.id,
						...doc.data(),
					});
				});
				setAnalyticData(sortByOption(dataList, "year"));
				setLoading(false);
			});
	}, []);

	const edit = (record) => {
		form.setFieldsValue({
			year: "",
			recruiterParticipation: "",
			totalPlacement: "",
			...record,
		});
		setEditingKey(record.year);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			const newData = [...analyticData];
			const index = newData.findIndex((item) => key === item.year);

			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...row });
				database
					.collection("GALKAnalytics")
					.doc(key)
					.update({
						recruiterParticipation: row.recruiterParticipation,
						totalPlacement: row.totalPlacement,
					})
					.then(() => {
						setAnalyticData(newData);
						setEditingKey("");
					});
			} else {
				newData.push(row);
				setAnalyticData(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
		{
			title: "Year",
			dataIndex: "year",
			width: "25%",
			editable: false,
		},
		{
			title: "Total Recruiter",
			dataIndex: "recruiterParticipation",
			width: "25%",
			editable: true,
		},
		{
			title: "Total Placement",
			dataIndex: "totalPlacement",
			width: "25%",
			editable: true,
		},
		{
			title: "Action",
			dataIndex: "action",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<a
							href="javascript:;"
							onClick={() => save(record.year)}
							style={{
								marginRight: 8,
							}}
						>
							Save
						</a>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ""}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: "number",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	return (
		<>
			{loading && (
				<div style={{ height: 450 }}>
					<Loading />
				</div>
			)}
			{analyticData && (
				<Form form={form} component={false}>
					<Table
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						bordered
						dataSource={analyticData}
						columns={mergedColumns}
						rowClassName="editable-row"
						pagination={{
							onChange: cancel,
						}}
					/>
				</Form>
			)}
		</>
	);
};

export default GALKAnalytic;
