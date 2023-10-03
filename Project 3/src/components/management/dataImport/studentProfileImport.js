import React, { useState, useEffect } from "react";
import { database, auth } from "../../../utils/configs/firebaseConfig";
import { Card, Upload, message, Button, Alert } from "antd";
import { FormOutlined, InboxOutlined } from "@ant-design/icons";
import { parse } from "papaparse";
import { GALKStudentImportURL } from "../../../utils/constants";
import moment from "moment";
import axios from "axios";

const { Dragger } = Upload;

const getObjectEntries = (object) => {
	var _html = "";
	for (const [key, value] of Object.entries(object)) {
		_html += `<b>${key}:</b> ${value}<br/>`;
	}
	return { __html: _html };
};

const getEducationList = (studentData) => {
	let validEducationList = [];

	let education1 = {
		degree: studentData["education_degree_1"] || "",
		description: studentData["education_description_1"] || "",
		instituteName: studentData["education_instituteName_1"] || "",
		place: studentData["education_place_1"] || "",
		startDate: studentData["education_startDate_1"] || "",
		endDate: studentData["education_endDate_1"] || "",
	};
	if (education1.degree) {
		validEducationList.push(education1);
	}

	let education2 = {
		degree: studentData["education_degree_2"] || "",
		description: studentData["education_description_2"] || "",
		instituteName: studentData["education_instituteName_2"] || "",
		place: studentData["education_place_2"] || "",
		startDate: studentData["education_startDate_2"] || "",
		endDate: studentData["education_endDate_2"] || "",
	};
	if (education2.degree) {
		validEducationList.push(education2);
	}

	let education3 = {
		degree: studentData["education_degree_3"] || "",
		description: studentData["education_description_3"] || "",
		instituteName: studentData["education_instituteName_3"] || "",
		place: studentData["education_place_3"] || "",
		startDate: studentData["education_startDate_3"] || "",
		endDate: studentData["education_endDate_3"] || "",
	};
	if (education3.degree) {
		validEducationList.push(education3);
	}

	return validEducationList;
};

const getProjectList = (studentData) => {
	let validProjectList = [];

	let project1 = {
		title: studentData["project_title_1"] || "",
		description: studentData["project_description_1"] || "",
		skillsUsed: studentData["project_skillsUsed_1"]
			? studentData["project_skillsUsed_1"]
					.split(",")
					.map((x) => ({ key: x, label: x, value: x }))
			: [],
		place: studentData["project_place_1"] || "",
		startDate: studentData["project_startDate_1"] || "",
		endDate: studentData["project_endDate_1"] || "",
	};
	if (project1.title) {
		validProjectList.push(project1);
	}

	let project2 = {
		title: studentData["project_title_2"] || "",
		description: studentData["project_description_2"] || "",
		skillsUsed: studentData["project_skillsUsed_2"]
			? studentData["project_skillsUsed_2"]
					.split(",")
					.map((x) => ({ key: x, label: x, value: x }))
			: [],
		place: studentData["project_place_2"] || "",
		startDate: studentData["project_startDate_2"] || "",
		endDate: studentData["project_endDate_2"] || "",
	};
	if (project2.title) {
		validProjectList.push(project2);
	}

	let project3 = {
		title: studentData["project_title_3"] || "",
		description: studentData["project_description_3"] || "",
		skillsUsed: studentData["project_skillsUsed_3"]
			? studentData["project_skillsUsed_3"]
					.split(",")
					.map((x) => ({ key: x, label: x, value: x }))
			: [],
		place: studentData["project_place_3"] || "",
		startDate: studentData["project_startDate_3"] || "",
		endDate: studentData["project_endDate_3"] || "",
	};
	if (project3.title) {
		validProjectList.push(project3);
	}

	return validProjectList;
};

const getCertificateList = (studentData) => {
	let validCertificateList = [];

	let certificate1 = {
		title: studentData["certificate_title_1"] || "",
		description: studentData["certificate_description_1"] || "",
		link: studentData["certificate_link_1"] || "",
		issueDate: studentData["certificate_issueDate_1"] || "",
	};
	if (certificate1.title) {
		validCertificateList.push(certificate1);
	}

	let certificate2 = {
		title: studentData["certificate_title_2"] || "",
		description: studentData["certificate_description_2"] || "",
		link: studentData["certificate_link_2"] || "",
		issueDate: studentData["certificate_issueDate_2"] || "",
	};
	if (certificate2.title) {
		validCertificateList.push(certificate2);
	}

	let certificate3 = {
		title: studentData["certificate_title_3"] || "",
		description: studentData["certificate_description_3"] || "",
		link: studentData["certificate_link_3"] || "",
		issueDate: studentData["certificate_issueDate_3"] || "",
	};
	if (certificate3.title) {
		validCertificateList.push(certificate3);
	}

	return validCertificateList;
};

const getPersonalInterestList = (studentData) => {
	let validPersonalInterestList = [];

	let personalInterest1 = {
		title: studentData["personalInterest_title_1"] || "",
		description: studentData["personalInterest_description_1"] || "",
	};
	if (personalInterest1.title) {
		validPersonalInterestList.push(personalInterest1);
	}

	let personalInterest2 = {
		title: studentData["personalInterest_title_2"] || "",
		description: studentData["personalInterest_description_2"] || "",
	};
	if (personalInterest2.title) {
		validPersonalInterestList.push(personalInterest2);
	}

	let personalInterest3 = {
		title: studentData["personalInterest_title_3"] || "",
		description: studentData["personalInterest_description_3"] || "",
	};
	if (personalInterest3.title) {
		validPersonalInterestList.push(personalInterest3);
	}

	return validPersonalInterestList;
};

const StudentImport = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [etxractedData, setExtractedData] = useState(null);
	const [uploadStatus, setUploadStatus] = useState("Start upload");

	useEffect(() => {
		return () => setFileList([]);
	}, []);

	const props = {
		onRemove: (file) => {
			setFileList([]);
		},
		beforeUpload: (file) => {
			setIsLoading(true);
			// console.log("File type:", file.type);
			const isCSV =
				file.type === "application/vnd.ms-excel" ||
				file.type === "text/csv" ||
				file.type ===
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
			if (isCSV) {
				setFileList([file]);
				populateDataFromCSV(file);
			} else {
				message.error("Please upload only CSV file");
				setIsLoading(false);
			}

			return false;
		},
		fileList,
	};

	const populateDataFromCSV = async (file) => {
		setUploadStatus("Parsing csv...");
		const _rawText = await file.text();
		const _extractedData = parse(_rawText, { header: true });

		if (_extractedData.errors.length > 0) {
			_extractedData.errors.forEach((err) =>
				message.error(`There is problem parsing row# ${err.row + 2}`)
			);
			setIsLoading(false);
			setUploadStatus("Data invalid. Fix it and try again..");
		} else {
			setExtractedData(_extractedData.data);
			setIsLoading(false);
			setUploadStatus("Data validated. Click to upload..");
		}
	};

	const handleUpload = () => {
		setIsLoading(true);
		setUploadStatus("Uploading data to server...");

		if (etxractedData) {
			const totalNoOfStudentToImport = etxractedData.length;

			for (let i = 0; i <= totalNoOfStudentToImport - 1; i++) {
				setTimeout(function () {
					let studentData = etxractedData[i];

					const studentEmail = studentData.email;

					if (studentEmail) {
						let newStudentData = {
							id: "",
							name: studentData.name,
							gender: studentData.gender,
							email: studentEmail,
							img: "",
							video: "",
							videoThumb: "",
							branchName: studentData.branchName,
							collegeName: studentData.collegeName,
							collegeGrade: studentData.collegeGrade,
							yearOfAdmission: studentData.yearOfAdmission,
							dob: studentData.dob,
							skills: studentData.skills.split(","),
							personalInterest: getPersonalInterestList(studentData),
							education: getEducationList(studentData),
							project: getProjectList(studentData),
							certificate: getCertificateList(studentData),
							spokenLanguages: studentData.spokenLanguages.split(","),
							appliedInterships: [],
							linkedinURL: studentData.linkedinURL,
							skypeId: studentData.skypeId,
							active: false,
							emailVerified: false,
							profileCompletionStatus: false,
							interviewCount: [],
							shortListedCount: [],
							taggedCompanies: [],
							selectedByCompany: {},
							selectedByGALKLabCompany: {},
							yearOfRegistration: studentData.yearOfRegistration,
							newArrived: true,
							timestamp: moment().format("LL"),
							adminComments: studentData.adminComments,
							eatingHabbit: "",
							monthlySalary: "",
							professionType: "",
							avgRating: "",
							experience: "",
							homeTown: studentData.homeTown,
							parentOccupation: studentData.parentOccupation,
							selfStrength: studentData.selfStrength,
							selfWeakness: studentData.selfWeakness,
							JEERank: studentData.JEERank,
							whyInJapan: studentData.whyInJapan,
							personalEmail: studentData.personalEmail,
						};

						// console.log("NEW STUDENT:", newStudentData);

						auth
							.createUserWithEmailAndPassword(
								newStudentData.email,
								"GALK_default_pwd#"
							)
							.then(({ user }) => {
								const studentId = user.uid;
								console.log("STUDENT ID:", studentId);

								if (studentId) {
									database
										.collection("StudentProfile")
										.doc(studentId)
										.set({ ...newStudentData, id: studentId })
										.then(() => {
											axios.post(
												"https://us-central1-piit-52003.cloudfunctions.net/sendNotificationFromAdmin",
												{
													candidateName: newStudentData.name,
													// candidateEmail: newStudentData.email,
													candidateEmail: "arpansardar1988@gmail.com",
													subject: "New account created in GALK",
													emailBody: `Your account has been created through our automated student import system. Please login to your account using id: ${newStudentData.email} and password as: GALK_default_pwd#`,
													// emailCc: emailDefaults.cc,
													// emailBcc: emailDefaults.bcc,
												}
											);
										})
										.catch((err) => {
											console.log("Data import error:", err);
											message.err("Data import error");
											setIsLoading(false);
											setUploadStatus("Start upload");
											setExtractedData(null);
											setFileList([]);
										});
								}
							})
							.catch((err) => {
								console.log("Data import error:", err);
								message.err("Data import error");
								setIsLoading(false);
								setUploadStatus("Start upload");
								setExtractedData(null);
								setFileList([]);
							});
					}

					if (i === totalNoOfStudentToImport - 1) {
						//stop loading
						message.success("Data imported successfully");
						setIsLoading(false);
						setUploadStatus("Start upload");
						setExtractedData(null);
						setFileList([]);
					}
				}, 3000 + 3000 * i);
			}
			// etxractedData.forEach((studentData) => {
			// 	const studentEmail = studentData.email;

			// 	if (studentEmail) {
			// 		let newStudentData = {
			// 			id: "",
			// 			name: studentData.name,
			// 			gender: studentData.gender,
			// 			email: studentEmail,
			// 			img: "",
			// 			video: "",
			// 			videoThumb: "",
			// 			branchName: studentData.branchName,
			// 			collegeName: studentData.collegeName,
			// 			collegeGrade: studentData.collegeGrade,
			// 			yearOfAdmission: studentData.yearOfAdmission,
			// 			dob: studentData.dob,
			// 			skills: studentData.skills.split(","),
			// 			personalInterest: getPersonalInterestList(studentData),
			// 			education: getEducationList(studentData),
			// 			project: getProjectList(studentData),
			// 			certificate: getCertificateList(studentData),
			// 			spokenLanguages: studentData.spokenLanguages.split(","),
			// 			appliedInterships: [],
			// 			linkedinURL: studentData.linkedinURL,
			// 			skypeId: studentData.skypeId,
			// 			active: false,
			// 			emailVerified: false,
			// 			profileCompletionStatus: false,
			// 			interviewCount: [],
			// 			shortListedCount: [],
			// 			taggedCompanies: [],
			// 			selectedByCompany: {},
			// 			yearOfRegistration: studentData.yearOfRegistration,
			// 			newArrived: true,
			// 			timestamp: moment().format("LL"),
			// 			adminComments: studentData.adminComments,
			// 			eatingHabbit: "",
			// 			monthlySalary: "",
			// 			professionType: "",
			// 			avgRating: "",
			// 			experience: "",
			// 			homeTown: studentData.homeTown,
			// 			parentOccupation: studentData.parentOccupation,
			// 			selfStrength: studentData.selfStrength,
			// 			selfWeakness: studentData.selfWeakness,
			// 			JEERank: studentData.JEERank,
			// 			whyInJapan: studentData.whyInJapan,
			// 			personalEmail: studentData.personalEmail,
			// 		};

			// 		console.log("NEW STUDENT:", newStudentData);

			// 		auth
			// 			.createUserWithEmailAndPassword(
			// 				newStudentData.email,
			// 				"GALK_default_pwd#"
			// 			)
			// 			.then(({ user }) => {
			// 				const studentId = user.uid;
			// 				console.log("STUDENT ID:", studentId);
			// 				if (studentId) {
			// 					database
			// 						.collection("StudentProfile")
			// 						.doc(studentId)
			// 						.set({ ...newStudentData, id: studentId })
			// 						.then(() => {
			// 							axios.post(
			// 								"https://us-central1-piit-52003.cloudfunctions.net/sendNotificationFromAdmin",
			// 								{
			// 									candidateName: newStudentData.name,
			// 									// candidateEmail: newStudentData.email,
			// 									candidateEmail: "arpansardar1988@gmail.com",
			// 									subject: "New account created in GALK",
			// 									emailBody: `Your account has been created through our automated student import system. Please login to your account using id: ${newStudentData.email} and password as: GALK_default_pwd#`,
			// 									emailCc: emailDefaults.cc,
			// 									emailBcc: emailDefaults.bcc,
			// 								}
			// 							);
			// 						});
			// 				}
			// 			})
			// 			.catch((err) => {});
			// 	}
			// });

			// message.success("Data imported successfully");
			// setIsLoading(false);
			// setUploadStatus("Start upload");
			// setExtractedData(null);
			// setFileList([]);
		} else {
			setIsLoading(false);
			setUploadStatus("Start upload");
			setExtractedData(null);
			setFileList([]);
		}
	};

	return (
		<Card
			title="Student Import using .csv file"
			style={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
			}}
			extra={
				<a href={GALKStudentImportURL} target="_blank">
					<Button
						// onClick={() => history.goBack()}
						icon={<FormOutlined />}
					>
						Template editor
					</Button>
				</a>
			}
		>
			<Alert
				message="Instruction on how to use import template."
				description="Please click on template editor button to open the template in new tab. Follow the instruction on each column header note while filling data. After you fill, you should download the file in csv format which can be used for upload."
				type="info"
				showIcon
			/>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">
					Click or drag file to this area to upload
				</p>
				<p className="ant-upload-hint">
					This control uploads only single CSV file and before upload please
					make sure the file doesn't contain any extra line or space.
				</p>
			</Dragger>
			<Button
				type="primary"
				onClick={handleUpload}
				disabled={fileList.length === 0 || isLoading}
				loading={isLoading}
				style={{ marginTop: 16 }}
			>
				{uploadStatus}
			</Button>
			<hr />
			{etxractedData && (
				<React.Fragment>
					{etxractedData.map((entry, i) => (
						<div key={i} className="scoreEntryContainer my-1 p-1">
							<p>
								<strong>Row No:{i + 1}</strong>
							</p>
							<p dangerouslySetInnerHTML={getObjectEntries(entry)} />
						</div>
					))}
				</React.Fragment>
			)}
		</Card>
	);
};

export default StudentImport;
