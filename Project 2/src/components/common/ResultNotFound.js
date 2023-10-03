import React from "react";
import NotFoundLogo from "../../assets/img/NoResultFound.svg";

export default function ResultNotFound(props) {
	return (
		<div className="resultNotFound">
			<img src={NotFoundLogo} alt="no data found" />
			{props.infoText ? (
				<div className="resultNotFound-info">{props.infoText}</div>
			) : null}
		</div>
	);
}
