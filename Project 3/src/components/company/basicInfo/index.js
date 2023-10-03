import React from "react";
import Logo from "./logo";
import CoverPhoto from "./coverPhoto";
import BasicInformation from "./basicInformation";
import Operation from "./operationalInformation";
import AccountUserList from "./accountUserList";

const CompanyBasicInfo = ({ company }) => {
	return (
		<div>
			<Logo companyLogo={company.logo} />
			<CoverPhoto coverPhoto={company.coverPhoto || null} />
			<BasicInformation companyBasicDetails={company} />
			<Operation companyBasicDetails={company} />
			<AccountUserList teamMembers={company.accountUserList} />
		</div>
	);
};

export default CompanyBasicInfo;
