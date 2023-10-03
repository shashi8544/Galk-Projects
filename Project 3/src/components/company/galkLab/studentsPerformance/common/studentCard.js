import React, { useState } from "react";
import { connect } from "react-redux";
import { getShortenName } from "../../../../../utils/functions/javaScriptHelper";
import { notification, Button, Tooltip } from "antd";
import { removeTagForGalkLabStudent } from "../../../../../actions/companyActions";
// import { CopyToClipboard } from "react-copy-to-clipboard";

import { AuditOutlined, BookOutlined, CloseOutlined, StarOutlined } from "@ant-design/icons";
import "./studentCard.css";
import StudentUnAssignModal from "./studentUnassignModal";

const StudentCard = ({
	student,
	children,
	onClick,
	ifActionInProgress,
	removeTagForGalkLabStudent,
	removeTagOption
}) => {
	// const studentLink = `http://company.galk-jp.com/3rdYearStudents/${student.id}`;

	// const copyStudentLink = () => {
	// 	notification["info"]({
	// 		message: "Copied to clipboard",
	// 		description:
	// 			"A link has been copied which shareable to see the details of this student.",
	// 	});
	// };
	const [isModalVisible, setIsModalVisible] = useState(false)
	const showStudentDetails = () => {
		onClick(student.id);
	};
	const displayUnassignModal = (e) => {
		setIsModalVisible(true)
		e.stopPropagation();
	}
	return (
		<>
			<StudentUnAssignModal
				setIsModalVisible={setIsModalVisible}
				isModalVisible={isModalVisible}
				student={student}
				removeTagForGalkLabStudent={removeTagForGalkLabStudent}
			/>
			<div
				className="_internshipStudentCard-container"
				onClick={!ifActionInProgress && showStudentDetails}
				id={student.id}
			>
				<div className="_internshipStudentCard-box">
					<img
						src={student.img}
						className="_internshipStudentCard-box-profilePicture"
						alt="candidateAvatar"
					/>
					<p className="_internshipStudentCard-box-name">
						{getShortenName({
							name: student.name,
							collegeName: student.collegeName,
						})}
					</p>
					<div className="_internshipStudentCard-box-shortDes leftSide">
						<ul className="headerUl text-center iq-mt-30">
							{/* <li key="headerUl1">
								<BookOutlined style={{ color: "#969ea8", fontSize: 20 }} />
								<h2>{student.certificate ? student.certificate.length : 0}</h2>
								<p>Certificates</p>
							</li> */}
							<li key="headerUl2">
								<StarOutlined style={{ color: "#969ea8", fontSize: 20 }} />
								<p style={({ marginTop: '5px' })}>Rating</p>
								<h2 style={({ marginTop: '5px' })}> {student.studentAverageRatingForGalkLab ? student.studentAverageRatingForGalkLab : "No Rating"}</h2>
							</li>
						</ul>
					</div>
					<div className="_internshipStudentCard-box-largeDes _internshipStudentCard-box-popupButton leftSide">
						{/* <CopyToClipboard text={studentLink} onCopy={copyStudentLink}> */}
						{removeTagOption && <Tooltip placement="top" title="Click to remove tag">
							<Button
								type="danger"
								className="rightSide"
								onClick={(e) => displayUnassignModal(e)}
								icon={<CloseOutlined />}
								disabled={ifActionInProgress}
							/>
						</Tooltip>}
						{/* </CopyToClipboard> */}
						<p>Education</p>
						<p >
							<span className="student_education_college">{student.collegeName} , </span>
							<span className="student_education_branch">{student.branchName}</span>
						</p>
						<ul className="_internshipStudentCard-box-cardUL text-left">
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
								<li key="skills-more" className="invert">{`+ ${student.skills.length - 3
									} More..`}</li>
							)}
						</ul>
						<div className="_internshipStudentCard-box-children">{children}</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	studentList: state.company.taggedGalkLabStudentList,
	isListLoading: state.company.isGalkStudentListLoading,
	studentDetails: state.company.studentToShowDetails,
	ifActionInProgress: state.company.galkLabStudentActionInProgress,
	isStudentToShowDetailsLoading: state.company.studentToShowDetailsLoading,
});

export default connect(mapStateToProps, {
	removeTagForGalkLabStudent,
})(StudentCard);
