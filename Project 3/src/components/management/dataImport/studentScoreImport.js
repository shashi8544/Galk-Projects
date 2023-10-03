import React, { useState } from "react";

import { parse } from "papaparse";
import { database } from "../../../utils/configs/firebaseConfig";
import { Upload, message, Button, Card } from "antd";
import { InboxOutlined, FormOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const getObjectEntries = (object) => {
	var _html = "";
	for (const [key, value] of Object.entries(object)) {
		_html += `<b>${key}:</b> ${value}<br/>`;
	}
	return { __html: _html };
};

const ScoreImportControl = () => {
	const [fileList, setFileList] = useState([]);
	const [etxractedData, setExtractedData] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [uploadStatus, setUploadStatus] = useState("Start upload");

	const props = {
		onRemove: (file) => {
			setFileList([]);
		},
		beforeUpload: (file) => {
			setUploading(true);
			const isCSV =
				file.type === "application/vnd.ms-excel" || file.type === "text/csv";
			if (isCSV) {
				setFileList([file]);
				populateDataFromCSV(file);
			} else {
				message.error("Please upload only CSV file");
				setUploading(false);
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
			setUploading(false);
			setUploadStatus("Data invalid. Fix it and try again..");
		} else {
			setExtractedData(_extractedData.data);
			setUploading(false);
			setUploadStatus("Data validated. Ready to upload..");
		}
	};

	const handleUpload = () => {
		setUploading(true);
		setUploadStatus("Uploading data to server...");

		if (etxractedData) {
			// etxractedData.forEach((studentExamData) => {
			// 	const studentEmail = studentExamData["Email_Address"];
			// 	const examIdToImport = studentExamData["Exam_ID"];

			// 	if (studentEmail) {
			// 		database
			// 			.collection("StudentProfile")
			// 			.where("email", "==", studentEmail)
			// 			.get()
			// 			.then((querySnapshot) => {
			// 				let _studentId;
			// 				let _existingExamDetails;

			// 				querySnapshot.forEach((snap) => {
			// 					if (snap.data().email === studentEmail) {
			// 						_studentId = snap.data().id;
			// 						_existingExamDetails = snap.data().GALKExamDetails || [];
			// 					}
			// 				});

			// 				let filteredExamDetails = _existingExamDetails.filter(
			// 					(x) => x.Exam_ID !== examIdToImport
			// 				);

			// 				filteredExamDetails.push(studentExamData);

			// 				if (_studentId) {
			// 					database
			// 						.collection("StudentProfile")
			// 						.doc(_studentId)
			// 						.update({
			// 							// GALKExamDetails:
			// 							// 	database.FieldValue.arrayUnion(studentExamData),
			// 							GALKExamDetails: [...filteredExamDetails],
			// 							testScore: studentExamData["Overall_Score"],
			// 						})
			// 						.catch((err) => {
			// 							message.error("Error in uploading exam score");
			// 							console.log("Error:", err);
			// 						});
			// 				}
			// 			})
			// 			.catch((err) => {
			// 				message.error("Error in uploading exam score");
			// 				console.log("Error:", err);
			// 			});
			// 	}
			// });

			for (let i = 0; i < etxractedData.length; i++) {
				setTimeout(() => {
					const studentEmail = etxractedData[i]["Email_Address"];
					const examIdToImport = etxractedData[i]["Exam_ID"];

					if (studentEmail) {
						database
							.collection("StudentProfile")
							.where("email", "==", studentEmail)
							.get()
							.then((querySnapshot) => {
								let _studentId;
								let _existingExamDetails;

								querySnapshot.forEach((snap) => {
									if (snap.data().email === studentEmail) {
										_studentId = snap.data().id;
										_existingExamDetails = snap.data().GALKExamDetails || [];
									}
								});

								let filteredExamDetails = _existingExamDetails.filter(
									(x) => x.Exam_ID !== examIdToImport
								);

								filteredExamDetails.push(etxractedData[i]);

								if (_studentId) {
									database
										.collection("StudentProfile")
										.doc(_studentId)
										.update({
											// GALKExamDetails:
											// 	database.FieldValue.arrayUnion(etxractedData[i]),
											GALKExamDetails: [...filteredExamDetails],
											testScore: etxractedData[i]["Overall_Score"],
										})
										.catch((err) => {
											message.error("Error in uploading exam score");
											console.log("Error:", err);
										});
								}
							})
							.catch((err) => {
								message.error("Error in uploading exam score");
								console.log("Error:", err);
							});
					}
				}, 3000 + 3000 * i);
			}

			message.success(
				"System will take around 4 sec to process each row data to avoid system overhead !!",
				10
			);
			setUploading(false);
			setUploadStatus("Start upload");
			setExtractedData(null);
			setFileList([]);
		} else {
			setUploading(false);
			setUploadStatus("Start upload");
			setExtractedData(null);
			setFileList([]);
		}
	};

	return (
		<Card
			title="GALK Exam Score Import using .csv file"
			style={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
			}}
			extra={
				// <a href={GALKStudentImportURL} target="_blank">
				<Button icon={<FormOutlined />} disabled>
					Template editor
				</Button>
				// </a>
			}
		>
			<React.Fragment>
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
					disabled={fileList.length === 0 || uploading}
					loading={uploading}
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
			</React.Fragment>
		</Card>
	);
};

export default ScoreImportControl;
