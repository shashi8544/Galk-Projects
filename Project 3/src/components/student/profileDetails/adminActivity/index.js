import React from "react";
import GALKExamDetails from "./galkExamDetails";
import TagCompany from "./tagCompany";
import CompanySelection from "./companySelection";
import SendMail from "./sendMail";

const AdminActivity = ({ student }) => {
	return (
		<div>
			<GALKExamDetails studentDetails={student} />
			<TagCompany studentDetails={student} />
			<CompanySelection studentDetails={student} />
			<SendMail studentDetails={student} />
		</div>
	);
};

export default AdminActivity;
