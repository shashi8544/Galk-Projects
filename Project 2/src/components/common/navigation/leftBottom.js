import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setApplicationModule } from "../../../actions/appActions";
import { ApplicationModule } from "../../../utils/models/applicationModules";
import { withRouter, Link } from "react-router-dom";

import { Menu } from "antd";
import {
	UserSwitchOutlined,
	CommentOutlined,
	UserOutlined,
	FormOutlined,
	ProfileOutlined,
	ReadOutlined,
} from "@ant-design/icons";
import "./leftBottom.css";

const LeftBottom = ({
	location,
	appModule,
	match,
	setApplicationModule,
	userId,
}) => {
	//Below hook is the fix of left navigation visibility on page refresh
	useEffect(() => {
		if (appModule === "Default") {
			let splittedLocation = location.pathname.split("/");

			if (splittedLocation.includes("GALKRecruit")) {
				setApplicationModule(ApplicationModule.GALKRecruit);
			}
			if (splittedLocation.includes("GALKLab")) {
				setApplicationModule(ApplicationModule.GALKLab);
			}
			if (splittedLocation.includes("AccountSetting")) {
				setApplicationModule(ApplicationModule.AccountSetting);
			}
		}
	}, [appModule, location]); // eslint-disable-line react-hooks/exhaustive-deps

	const internshipPages = [
		{
			title: `${"ScreeningForm"}`,
			href: "/GALKRecruit/ScreeningForm",
			icon: <FormOutlined />,
			key: "ScreeningForm",
		},
		{
			title: `${"SecondarySelection"}`,
			href: "/GALKRecruit/SecondarySelection",
			// icon: <FormOutlined />,
			key: "SecondarySelection",
		},
		// {
		// 	title: `${"Jobs"}`,
		// 	href: "/GALKRecruit/Jobs",
		// 	icon: <ProfileOutlined />,
		// 	key: "Jobs",
		// },
		// {
		// 	title: `${"InterviewPanel"}`,
		// 	href: "/GALKRecruit/InterviewPanel",
		// 	icon: <UserSwitchOutlined />,
		// 	key: "InterviewPanel",
		// },
		// {
		// 	title: `${"ChatRoom"}`,
		// 	href: "/GALKRecruit/ChatRoom",
		// 	icon: <CommentOutlined />,
		// 	key: "ChatRoom",
		// },
	];
	const galkLabPages = [
		// {
		// 	title: `${"All Jobs"}`,
		// 	href: "/GALKLab/AllJobs",
		// 	icon: <ProfileOutlined />,
		// 	key: "AllJobs",
		// },
		{
			title: `${"Jobs"}`,
			href: "/GALKLab/Jobs",
			icon: <ProfileOutlined />,
			key: "Jobs",
		},
		// {
		// 	title: `${"Your Assignments"}`,
		// 	href: "/GALKLab/YourAssignments",
		// 	icon: <ReadOutlined />,
		// 	key: "YourAssignments",
		// },
		// {
		// 	title: `${"chatRoom"}`,
		// 	href: "/GALKLab/ChatRoom",
		// 	icon: <CommentOutlined />,
		// 	key: "ChatRoom",
		// },
	];

	const accountSettingPages = [
		{
			title: `${"My profile"}`,
			href: "/AccountSetting/Myprofile",
			icon: <UserOutlined />,
			key: "Myprofile",
		},
	];

	const getActiveModule = (appModule) => {
		if (appModule === ApplicationModule.GALKRecruit) {
			return internshipPages;
		}
		if (appModule === ApplicationModule.GALKLab) return galkLabPages;
		if (appModule === ApplicationModule.AccountSetting) {
			return accountSettingPages;
		}
		return [];
	};

	return (
		<div style={{ padding: 5 }}>
			{userId && (
				<Menu mode="inline" selectedKeys={[location.pathname.split("/")[2]]}>
					{getActiveModule(appModule).map((item, i) => (
						<Menu.Item key={item.key} icon={item.icon}>
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