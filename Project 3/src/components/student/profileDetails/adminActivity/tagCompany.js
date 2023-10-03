import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { usePreviousState } from "../../../../utils/customHooks";
import {
	updateGalkLabStudentTagTagInformation,
	updateInternshipStudentTagInformation,
} from "../../../../actions/studentAction";
import { getCompanyMeta } from "../../../../actions/actionHelper";
import { AsyncSelect } from "../../../../utils/components/inputFields";
import { Card, Button, Form, message } from "antd";

const formItemLayout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 18,
	},
};

const TagCompany = ({
	studentDetails,
	isActionProgress,
	isActionProgressGalkLab,
	updateInternshipStudentTagInformation,
	updateGalkLabStudentTagTagInformation,
}) => {
	const [form] = Form.useForm();
	const [Galkform] = Form.useForm();
	const prevActionInProgressValue = usePreviousState(isActionProgress);
	const prevActionInProgressValueGalkLab = usePreviousState(
		isActionProgressGalkLab
	);
	const [isEditable, setIsEditable] = useState(false);
	const [isEditableGalkLab, setIsEditableGalkLab] = useState(false);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			setIsEditable(false);
		}
	}, [isActionProgress]);
	useEffect(() => {
		if (!isActionProgressGalkLab && prevActionInProgressValueGalkLab) {
			setIsEditableGalkLab(false);
		}
	}, [isActionProgressGalkLab]);

	const resetAll = () => {
		form.resetFields();
		setIsEditable(false);
	};

	const resetAllGalk = () => {
		Galkform.resetFields();
		setIsEditableGalkLab(false);
	};

	const updateInternshipTagInformation = (values) => {
		let updatedValue = {
			taggedCompanies: values.taggedCompanies || [],
		};
		// console.log("UPDATE:", updatedValue);
		updateInternshipStudentTagInformation(updatedValue);
	};

	const updateGalkLabTagInformation = (values) => {
		let updatedValue = {
			taggedCompaniesForGalkLab: values.taggedCompaniesForGalkLab || [],
		};
		updateGalkLabStudentTagTagInformation(updatedValue);
	};

	const fetchCompanyList = async () => {
		return getCompanyMeta().then((querySnapShot) => {
			let companyData = [];
			querySnapShot.forEach((doc) => companyData.push(doc.data()));

			let filtereByAlreadyTaggedCompany = [];
			companyData.forEach((company) => {
				if (
					studentDetails.taggedCompanies
						.map((x) => x.key)
						.findIndex((y) => y === company.id) < 0
				) {
					filtereByAlreadyTaggedCompany.push(company);
				}
			});

			return filtereByAlreadyTaggedCompany.map((company) => ({
				label: `${company.name}`,
				value: company.id,
			}));
		});
	};
	const fetchCompanyListForGalk = async () => {
		return getCompanyMeta().then((querySnapShot) => {
			let companyData = [];
			querySnapShot.forEach((doc) => companyData.push(doc.data()));

			let filtereByAlreadyTaggedCompany = [];
			companyData.forEach((company) => {
				if (
					!studentDetails.taggedCompaniesForGalkLab ||
					studentDetails.taggedCompaniesForGalkLab
						.map((x) => x.key)
						.findIndex((y) => y === company.id) < 0
				) {
					filtereByAlreadyTaggedCompany.push(company);
				}
			});

			return filtereByAlreadyTaggedCompany.map((company) => ({
				label: `${company.name}`,
				value: company.id,
			}));
		});
	};

	return (
		<div>
			<Card
				type="inner"
				title="Internship Tag companies"
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
								onClick={() => {
									form.submit();
								}}
								disabled={false}
								loading={isActionProgress}
							>
								Save
							</Button>
						</>
					) : (
						<>
							{Object.entries(studentDetails.selectedByCompany).length > 0 ? (
								<Button
									onClick={() =>
										message.warning(
											"This student has already been selected. You need to remove the selection to edit."
										)
									}
								>
									Edit
								</Button>
							) : (
								<Button onClick={() => setIsEditable(true)}>Edit</Button>
							)}
						</>
					)
				}
			>
				{studentDetails && Object.entries(studentDetails).length > 0 && (
					<Form
						{...formItemLayout}
						form={form}
						initialValues={
							studentDetails && {
								taggedCompanies: studentDetails.taggedCompanies || [],
							}
						}
						onFinish={updateInternshipTagInformation}
					>
						<Form.Item
							label="Tag Companies"
							name="taggedCompanies"
							extra="Type to search for companies that you want to tag with this student. Only tagged companies can see this student in their available internship candidate list."
						>
							<AsyncSelect
								mode="multiple"
								disabled={!isEditable}
								placeholder="Type company name to tag..."
								fetchOptions={fetchCompanyList}
								style={{ width: "100%" }}
							/>
						</Form.Item>
					</Form>
				)}
			</Card>
			<Card
				type="inner"
				title="Galk Lab Tag companies"
				extra={
					isEditableGalkLab ? (
						<>
							<Button
								onClick={resetAllGalk}
								disabled={isActionProgressGalkLab}
								style={{ marginRight: 10 }}
							>
								Cancel
							</Button>
							<Button
								type="primary"
								onClick={() => {
									Galkform.submit();
								}}
								disabled={false}
								loading={isActionProgressGalkLab}
							>
								Save
							</Button>
						</>
					) : (
						<>
							{<Button onClick={() => setIsEditableGalkLab(true)}>Edit</Button>}
						</>
					)
				}
			>
				{studentDetails && Object.entries(studentDetails).length > 0 && (
					<Form
						{...formItemLayout}
						form={Galkform}
						initialValues={
							studentDetails && {
								taggedCompaniesForGalkLab:
									studentDetails.taggedCompaniesForGalkLab || [],
							}
						}
						onFinish={updateGalkLabTagInformation}
					>
						<Form.Item
							label="Tag Companies"
							name="taggedCompaniesForGalkLab"
							extra="Type to search for companies that you want to tag with this student. Only tagged companies can see this student in their available Galk Lab candidate list."
						>
							<AsyncSelect
								mode="multiple"
								disabled={!isEditableGalkLab}
								placeholder="Type company name to tag..."
								fetchOptions={fetchCompanyListForGalk}
								style={{ width: "100%" }}
							/>
						</Form.Item>
					</Form>
				)}
			</Card>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isActionProgress: state.student.studentToShowActionInProgress,
	isActionProgressGalkLab: state.student.studentToShowActionInProgressGalkLab,
});

export default connect(mapStateToProps, {
	updateInternshipStudentTagInformation,
	updateGalkLabStudentTagTagInformation,
})(TagCompany);
