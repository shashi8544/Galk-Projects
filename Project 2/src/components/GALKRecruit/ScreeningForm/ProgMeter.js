import React from "react";
import { TeamOutlined } from "@ant-design/icons";

import "./ProgMeter.css";

const ProgMeter = ({ questionNum, totalQuestions }) => {
	return (
		<div className="prog-meter-cover">
			<div className="prog-meter-lable">
				<div className="left">
					<TeamOutlined />
					<span>Have an interview</span>
				</div>
				<div className="right">
					<span>
						{questionNum} of {totalQuestions}
					</span>
				</div>
			</div>
			<div className="meter">
				<div
					style={{
						backgroundColor: "white",
						width: `${(questionNum * 100) / totalQuestions}%`,
						height: "100%",
					}}
				>
					{" "}
				</div>
			</div>
		</div>
	);
};

export default ProgMeter;
