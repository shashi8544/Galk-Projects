import React from "react";

import logo from "./Images/endForm.png";

import "./index.css";

function FormEnd() {
	return (
		<div className="cover-end">
			<div className="image-end">
				<img src={logo} alt="" />
			</div>
			<div className="bottom-container-end">
				<p>You've already done!</p>
				<p>We'll contact you as soon as we have confirmed.</p>
			</div>
		</div>
	);
}

export default FormEnd;
