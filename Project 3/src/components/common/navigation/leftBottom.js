import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setApplicationModule } from "../../../actions/appActions";
import { ApplicationModule } from "../../../utils/models/applicationModules";
import { withRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import {
	AppstoreOutlined,
	DiffOutlined,
	BarChartOutlined,
	DatabaseOutlined,
	UsergroupAddOutlined,
	TeamOutlined,
	FileSearchOutlined,
	CommentOutlined,
	MailOutlined,
	BankOutlined,
	EditOutlined
} from "@ant-design/icons";
import "./leftBottom.css";

const LeftBottom = ({
	location,
	appModule,
	match,
	setApplicationModule,
	userId,
}) => {
	const { t } = useTranslation();

	//Below hook is the fix of left navigation visibility on page refresh
	useEffect(() => {
		if (appModule === "Default") {
			let splittedLocation = location.pathname.split("/");

			if (splittedLocation.includes("Company")) {
				setApplicationModule(ApplicationModule.Company);
			}
			if (splittedLocation.includes("Student")) {
				setApplicationModule(ApplicationModule.Student);
			}
			if (splittedLocation.includes("Management")) {
				setApplicationModule(ApplicationModule.AccountManagement);
			}
			if (splittedLocation.includes("Mentor")) {
				setApplicationModule(ApplicationModule.GalkLabMentor);
			}
		}
	}, [appModule, location]);

	const companyPages = [
		{
			title: "Dashboard",
			href: "/Company/Dashboard",
			icon: <AppstoreOutlined />,
		},
		{
			title: "ProfileList",
			href: "/Company/ProfileList",
			icon: <TeamOutlined />,
		},
		{
			title: "QuickInterview",
			href: "/Company/QuickInterview",
			icon: <TeamOutlined />,
		},
		{
			title: "EditQuestion",
			href: "/Company/EditQuestion",
			icon: <EditOutlined />,
		},
	];

	const studentPages = [
		{
			title: "Dashboard",
			href: "/Student/Dashboard",
			icon: <AppstoreOutlined />,
		},
		{
			title: "AllStudents",
			href: "/Student/AllStudents",
			icon: <TeamOutlined />,
		},
		// {
		// 	title: "ThirdYear",
		// 	href: "/Student/ThirdYear",
		// 	icon: <TeamOutlined />,
		// },
		// {
		// 	title: "FourthYear",
		// 	href: "/Student/FourthYear",
		// 	icon: <TeamOutlined />,
		// },
		// {
		// 	title: "AllOtherStudents",
		// 	href: "/Student/AllOtherStudents",
		// 	icon: <TeamOutlined />,
		// },
		{
			title: "Universities",
			href: "/Student/Universities",
			icon: <BankOutlined />,
		},
	];

	const accountManagementPages = [
		{
			title: "GALKInformation",
			href: "/Management/GALKInformation",
			icon: <BarChartOutlined />,
		},
		{
			title: "DataImport",
			href: "/Management/DataImport",
			icon: <DiffOutlined />,
		},
		{
			title: "EmailTemplate",
			href: "/Management/EmailTemplate",
			icon: <MailOutlined />,
		},
		{
			title: "DBManagement",
			href: "/Management/DBManagement",
			icon: <DatabaseOutlined />,
		},
	];

	const galkLabMentorPages = [
		{
			title: "ProjectInformation",
			href: "/Mentor/ProjectInformation",
			icon: <BarChartOutlined />,
		},
	];

	const getActiveModule = (appModule) => {
		if (appModule === ApplicationModule.Company) {
			return companyPages;
		}
		if (appModule === ApplicationModule.Student) {
			return studentPages;
		}
		if (appModule === ApplicationModule.AccountManagement) {
			return accountManagementPages;
		}
		if (appModule === ApplicationModule.GalkLabMentor) {
			return galkLabMentorPages;
		}
		return [];
	};

	return (
		<div style={{ padding: 10 }}>
			{userId && (
				<Menu mode="inline" selectedKeys={[location.pathname.split("/")[2]]}>
					{getActiveModule(appModule).map((item, i) => (
						<Menu.Item key={item.title} icon={item.icon}>
							<Link to={item.href}>{item.title} </Link>
						</Menu.Item>
					))}
				</Menu>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	userId: state.firebase.auth.uid,
	appModule: state.app.appModule,
});

export default connect(mapStateToProps, { setApplicationModule })(
	withRouter(LeftBottom)
);
