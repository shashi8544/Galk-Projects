import React from "react";
import { RightOutlined } from "@ant-design/icons";

import logo from "./Images/startForm.png";

import "./index.css";

function FormStart({ triggerIsStart }) {
	return (
		<div className="cover">
			<div className="image">
				<img src={logo} alt="" />
			</div>
			<div onClick={() => triggerIsStart(true)} className="link">
				<p>Let's Start !</p>
				<RightOutlined />
			</div>
			<div className="bottom-container">
				<p>It takes 10 minute to answer all.</p>
			</div>
		</div>
	);
}

export default FormStart;
