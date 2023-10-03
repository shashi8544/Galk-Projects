import React, { useEffect, useState } from "react";
import { Region } from "../../common/layout/region";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import BasicInfo from "./basicInfo";
import Education from "./education";
import Project from "./project";
import Certificate from "./certificate";
import ExtraCurricular from "./extraCurricular";
import GALKExamDetails from "./examDetails";
import AdminActivity from "./adminActivity";
import { database } from "../../../utils/configs/firebaseConfig";
import {
	getStudentDetails,
	resetStudentToShowDetails,
	SubscribedInGALKLab,
	unSubscribeInGALKLab,
} from "../../../actions/studentAction";
import { Card, Button, Tabs, Modal } from "antd";
import {
	ArrowLeftOutlined,
	CheckOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import { usePreviousState } from "../../../utils/customHooks";

const { TabPane } = Tabs;
const { confirm } = Modal;

const StudentProfileDetails = ({
	history,
	match,
	studentDetails,
	getStudentDetails,
	resetStudentToShowDetails,
	unSubscribeInGALKLab,
	SubscribedInGALKLab,
}) => {
	const studentId = match.params.profileId;
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (studentId) {
			getStudentDetails(studentId);
		}
	}, [studentId]);
	useEffect(() => {
		return () => {
			console.log("RESET");
			resetStudentToShowDetails();
		};
	}, []);

	const archiveStudent = () => {
		const studentToArchiveId = studentDetails.id;

		if (studentToArchiveId) {
			confirm({
				title: "Do you want to archive these student?",
				icon: <WarningOutlined />,
				content: "This action can not be undone !",
				onOk() {
					return new Promise((resolve, reject) => {
						database
							.collection("StudentProfile")
							.where("id", "==", studentToArchiveId)
							.get()
							.then((qrySnap) => {
								let student = [];
								qrySnap.forEach((doc) => student.push(doc.data()));

								if (student.length > 0) {
									database
										.collection("ArchivedStudentProfiles")
										.doc(studentToArchiveId)
										.set(student[0])
										.then(() => {
											database
												.collection("StudentProfile")
												.doc(studentToArchiveId)
												.delete()
												.then(() => {
													resolve();
													history.goBack();
												})
												.catch((err) => {
													console.log("Error in Data archive:", err);
												});
										})
										.catch((err) => {
											//reject();
											console.log("Error in Data archive:", err);
										});
								} else {
									reject();
								}
							})
							.catch((err) => {
								console.log("Error in Data archive:", err);
							});
						// setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
					}).catch((err) => console.log("Oops errors:", err));
				},
				onCancel() {},
			});
		}
	};

	const subscribeInGALKLab = () => {
		setIsLoading(true);
		database
			.collection("StudentProfile")
			.doc(studentDetails.id)
			.update({ subscribedInGalkLab: true })
			.then(() => {
				setIsLoading(false);
				SubscribedInGALKLab();
			});
	};
	const unsubscribeInGALKLab = () => {
		setIsLoading(true);
		database
			.collection("StudentProfile")
			.doc(studentDetails.id)
			.update({ subscribedInGalkLab: false })
			.then(() => {
				setIsLoading(false);
				unSubscribeInGALKLab();
			});
	};

	return (
		<Region>
			<Card
				title={`${
					studentDetails && studentDetails.name + " - " + studentDetails.id
				}`}
				style={{
					height: "100%",
					width: "100%",
					overflowY: "auto",
				}}
				extra={
					<>
						{studentDetails && studentDetails.subscribedInGalkLab ? (
							<Button
								style={{
									marginRight: 20,
									color: "#0000ff",
									borderWidth: 1,
									borderColor: "#0000ff",
									background: "#ffffff",
								}}
								onClick={unsubscribeInGALKLab}
								loading={isLoading}
								icon={<CheckOutlined />}
								danger
								type="primary"
							>
								Subscribed in GALK Lab
							</Button>
						) : (
							<Button
								style={{
									marginRight: 20,
									color: "#0000ff",
									borderWidth: 1,
									borderColor: "#0000ff",
									background: "#ffffff",
								}}
								onClick={subscribeInGALKLab}
								loading={isLoading}
								danger
								type="primary"
							>
								Subscribe in GALK Lab
							</Button>
						)}
						<Button
							style={{ marginRight: 20 }}
							onClick={archiveStudent}
							icon={<WarningOutlined />}
							danger
							type="primary"
						>
							Archive
						</Button>
						<Button
							style={{ marginRight: 20 }}
							onClick={() => history.goBack()}
							icon={<ArrowLeftOutlined />}
						>
							Back
						</Button>
					</>
				}
			>
				{studentDetails && (
					<Tabs defaultActiveKey="1">
						<TabPane tab="Basic Information" key="1">
							<BasicInfo student={studentDetails} />
						</TabPane>
						<TabPane tab="Education" key="2">
							<Education />
						</TabPane>
						<TabPane tab="Project" key="3">
							<Project />
						</TabPane>
						<TabPane tab="Certificate" key="4">
							<Certificate />
						</TabPane>
						<TabPane tab="ExtraCurricular" key="5">
							<ExtraCurricular />
						</TabPane>
						<TabPane tab="GALK Exam" key="6">
							<GALKExamDetails />
						</TabPane>
						<TabPane tab="Admin activity" key="7">
							<AdminActivity student={studentDetails} />
						</TabPane>
						<TabPane tab="Raw DB json" key="8">
							To be implemented...
						</TabPane>
						<TabPane tab="Activity log" key="9">
							To be implemented...
						</TabPane>
					</Tabs>
				)}
			</Card>
		</Region>
	);
};

const mapStateToProps = (state) => ({
	studentDetails: state.student.studentToShow,
});

export default connect(mapStateToProps, {
	getStudentDetails,
	resetStudentToShowDetails,
	unSubscribeInGALKLab,
	SubscribedInGALKLab,
})(withRouter(StudentProfileDetails));
