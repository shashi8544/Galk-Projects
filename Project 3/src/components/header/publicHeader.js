import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import cover1 from "../../assets/images/cover-1.webp";
import cover2 from "../../assets/images/cover-2.webp";
import IndiaFlag from "../../assets/images/in.svg";
import JapanFlag from "../../assets/images/jp.svg";
import { Carousel, Button, Select, Avatar } from "antd";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import "./publicHeader.css";

const Header = ({ history }) => {
	const { t } = useTranslation();
	const currentLanguageCode = cookies.get("i18next") || "en";

	const onSignUpClicked = () => {
		history.push("/SignUp");
	};

	const onSignInClicked = () => {
		history.push("/SignIn");
	};

	const handleLanguageChange = (languageCode) => {
		i18next.changeLanguage(languageCode);
	};

	return (
		<header className="headerBanner">
			<div className="bannerLogo">
				<img src={logo} style={{ width: 150, height: 52 }} alt="Logo@Galk" />
			</div>
			<div className="bannerAction">
				<Select
					defaultValue={currentLanguageCode}
					bordered={false}
					onChange={handleLanguageChange}
				>
					<Select.Option value="en">
						<Avatar shape="square" size="small" src={IndiaFlag} />
					</Select.Option>
					<Select.Option value="ja">
						<Avatar shape="square" size="small" src={JapanFlag} />
					</Select.Option>
				</Select>
			</div>

			<div className="bannerText">
				<h1 className="fadeIn">ADMIN SIDE</h1>
				{/* <p>{t("landing_banner_text_secondary")}</p> */}
			</div>

			<div className="signButton">
				<Button
					type="primary"
					className="signInButton"
					onClick={onSignInClicked}
					size="large"
				>
					{t("signIn")}
				</Button>
			</div>
		</header>
	);
};

export default withRouter(Header);
