import React from "react";
import { getShortenName } from "../../../utils/functions/javaScriptHelper";
import { notification, Button, Badge } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import defaultStudentPic from "../../../assets/images/defaultStudentPic.jpeg";

import {
	AuditOutlined,
	BookOutlined,
	CheckOutlined,
	EditOutlined,
} from "@ant-design/icons";
import "./studentCard.css";

const StudentCard = ({ student, children, onClick, isActionInProgress }) => {
	const studentLink = `http://company.galk-jp.com/3rdYearStudents/${student.id}`;

	const copyStudentLink = () => {
		notification["info"]({
			message: "Copied to clipboard",
			description:
				"A link has been copied which shareable to see the details of this student.",
		});
	};

	const showStudentDetails = () => {
		onClick(student.id);
	};
	return (
		<div
			className="studentCard-container"
			onClick={!isActionInProgress && showStudentDetails}
			id={student.id}
		>
			<div className="studentCard-box">
				<img
					src={student.img || defaultStudentPic}
					className="studentCard_box_profilePicture"
					alt="candidateAvatar"
				/>
				<p className="studentCard-box-name">
					{getShortenName({
						name: student.name,
						collegeName: student.collegeName,
					})}
				</p>
				<div className="studentCard-box-shortDes leftSide">
					<ul className="headerUl text-center iq-mt-30">
						<li key="headerUl1">
							<BookOutlined style={{ color: "#969ea8", fontSize: 20 }} />
							<h2>{student.certificate ? student.certificate.length : 0}</h2>
							<p>Certificates</p>
						</li>
						<li key="headerUl2">
							<AuditOutlined style={{ color: "#969ea8", fontSize: 20 }} />
							<h2> {student.project ? student.project.length : 0}</h2>
							<p>Projects</p>
						</li>
						{student.subscribedInGalkLab && (
							<li key="headerUl2">
								<Button
									type="primary"
									size="small"
									style={{
										background: "#ffffff",
										borderWidth: 1,
										borderColor: "green",
										color: "green",
									}}
									block
									icon={<CheckOutlined />}
									// onClick={stopEventPropagation}
								>
									GALK Lab
								</Button>
							</li>
						)}
					</ul>
				</div>
				<Badge.Ribbon
					text={student.profileCompletionStatus ? "Published" : "Not published"}
					color={student.profileCompletionStatus ? "green" : "volcano"}
				>
					<div className="studentCard-box-largeDes studentCard-box-popupButton leftSide">
						{/* <CopyToClipboard text={studentLink} onCopy={copyStudentLink}>
							<Button
								type="link"
								className="rightSide"
								onClick={(e) => e.stopPropagation()}
								disabled
							>
								Share
							</Button>
						</CopyToClipboard> */}
						<p>College Name</p>
						<h2>{student.collegeName}</h2>
						<ul className="bottomUl text-left">
							<li key="bottomUl1">
								<p>Major</p>
								<h2>{student.branchName}</h2>
							</li>
						</ul>
						<ul className="studentCard-box-cardUL text-left">
							{[...student.skills].splice(0, 3).map((skill, i) => (
								<React.Fragment key={i}>
									{typeof skill === "string" && (
										<li key={`${skill}-string-${i}`}>{skill}</li>
									)}
									{typeof skill === "object" && (
										<li key={`${skill}-object-${i}`}>{skill.label}</li>
									)}
								</React.Fragment>
							))}
							{student.skills.length > 3 && (
								<li key="skills-more" className="invert">{`+ ${
									student.skills.length - 3
								} More..`}</li>
							)}
						</ul>
						<div className="studentCard-box-children">{children}</div>
					</div>
				</Badge.Ribbon>
			</div>
		</div>
	);
};
export default StudentCard;
