import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../../utils/customHooks";
import { makeStudentSelectedForCompany } from "../../../../actions/studentAction";
import { getCompanyMeta } from "../../../../actions/actionHelper";
import { AsyncSelect } from "../../../../utils/components/inputFields";
import { Card, Button, Form, message } from "antd";

const formItemLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 9,
	},
};

const CompanySelection = ({
	studentDetails,
	isActionProgress,
	makeStudentSelectedForCompany,
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

	const updateInformation = ({ selectedByCompany }) => {
		let updatedValue = {
			selectedByCompany:
				selectedByCompany && selectedByCompany.key
					? {
							// ...selectedByCompany,
							id: selectedByCompany.key,
							name: selectedByCompany.label,
					  }
					: {},
		};
		// console.log("UPDATE:", updatedValue);
		makeStudentSelectedForCompany(updatedValue);
	};

	const fetchCompanyList = async () => {
		return getCompanyMeta().then((querySnapShot) => {
			let companyData = [];
			querySnapShot.forEach((doc) => companyData.push(doc.data()));

			// let filtereByAlreadyTaggedCompany = [];
			// companyData.forEach((company) => {
			// 	if (
			// 		studentDetails.taggedCompanies
			// 			.map((x) => x.key)
			// 			.findIndex((y) => y === company.id) < 0
			// 	) {
			// 		filtereByAlreadyTaggedCompany.push(company);
			// 	}
			// });

			return companyData.map((company) => ({
				label: `${company.name}${
					company.nameInEnglish ? "/" + company.nameInEnglish : ""
				}`,
				value: company.id,
			}));
		});
	};

	return (
		<Card
			type="inner"
			title="Selection information"
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
			{studentDetails && studentDetails.id && (
				<Form
					{...formItemLayout}
					form={form}
					initialValues={
						studentDetails &&
						studentDetails.selectedByCompany.id && {
							selectedByCompany: studentDetails.selectedByCompany.id
								? {
										value: studentDetails.selectedByCompany.id,
										label: studentDetails.selectedByCompany.name,
										key: studentDetails.selectedByCompany.id,
								  }
								: {},
						}
					}
					onFinish={updateInformation}
				>
					<Form.Item
						label="Selected by company"
						name="selectedByCompany"
						extra="Type to search for companies that you want to block this student with."
					>
						<AsyncSelect
							allowClear={true}
							showSearch
							showArrow={false}
							disabled={!isEditable}
							placeholder="Type company name to select..."
							fetchOptions={fetchCompanyList}
							// onSearch={fetchCompanyList}
						/>
					</Form.Item>
				</Form>
			)}
			{/* {studentDetails &&
				studentDetails.id &&
				studentDetails.selectedByCompany.id && (
					<div style={{ display: "flex", justifyContent: "center" }}>
						{studentDetails.selectedByCompany.name}
					</div>
				)} */}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.student.studentToShowActionInProgress,
});

export default connect(mapStateToProps, { makeStudentSelectedForCompany })(
	CompanySelection
);
