import * as actionType from "./types";
import moment from "moment";
import {
	splitArrayByNoOfElement,
	filterStudentBasedOnSkillArr,
} from "./actionHelper";
import { emailTemplateNames } from "../utils/constants";
import { sendMail } from "../utils/functions/httpServices";
import {
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../utils/functions/javaScriptHelper";
import { message } from "antd";

export const getAllStudentList =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const database = getFirestore();

		let _allStudentArray = [];

		database
			.collection("StudentProfile")
			.get()
			.then((querySnapshot) => {
				//make all student data array
				querySnapshot.forEach((doc) => {
					_allStudentArray.push(doc.data());
				});

				dispatch({
					type: actionType.GET_ALL_STUDENT_LIST,
					payload: _allStudentArray,
				});
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Tagged third year student load error: ", err);
				message.error("Error while loading data !");
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			});
	};

export const getAllThirdYearStudentList =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const database = getFirestore();

		let _allStudentArray = [];
		const admissionYearForThirdYearStudents =
			getAdmissionYearForThirdYearStudents();
		// const admissionYearForThirdYearStudents =
		// 	getAdmissionYearForFourthYearStudents();

		database
			.collection("StudentProfile")
			// .where("active", "==", true)
			.where(
				"yearOfAdmission",
				"==",
				admissionYearForThirdYearStudents.toString()
			)
			.get()
			.then((querySnapshot) => {
				//make all student data array
				querySnapshot.forEach((doc) => {
					_allStudentArray.push(doc.data());
				});

				dispatch({
					type: actionType.GET_ALL_THIRD_YEAR_STUDENT_LIST,
					payload: _allStudentArray,
				});
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Tagged third year student load error: ", err);
				message.error("Error while loading data !");
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			});
	};

export const getAllFourthYearStudentList =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const database = getFirestore();

		let _allStudentArray = [];
		const admissionYearForFourthYearStudents =
			getAdmissionYearForFourthYearStudents();

		database
			.collection("StudentProfile")
			// .where("active", "==", true)
			.where(
				"yearOfAdmission",
				"==",
				admissionYearForFourthYearStudents.toString()
			)
			.get()
			.then((querySnapshot) => {
				//make all student data array
				querySnapshot.forEach((doc) => {
					_allStudentArray.push(doc.data());
				});

				dispatch({
					type: actionType.GET_ALL_FOURTH_YEAR_STUDENT_LIST,
					payload: _allStudentArray,
				});
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Fourth year student load error: ", err);
				message.error("Error while loading data !");
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			});
	};

export const getAllGraduateStudentList =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const database = getFirestore();

		let _allStudentArray = [];
		const admissionYearForThirdYearStudents =
			getAdmissionYearForThirdYearStudents();
		const admissionYearForFourthYearStudents =
			getAdmissionYearForFourthYearStudents();

		database
			.collection("StudentProfile")
			.where("yearOfAdmission", "not-in", [
				admissionYearForThirdYearStudents.toString(),
				admissionYearForFourthYearStudents.toString(),
			])
			.get()
			.then((querySnapshot) => {
				//make all student data array
				querySnapshot.forEach((doc) => {
					_allStudentArray.push(doc.data());
				});

				dispatch({
					type: actionType.GET_ALL_GRADUATE_STUDENT_LIST,
					payload: _allStudentArray,
				});
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Graduate student load error: ", err);
				message.error("Error while loading data !");
				dispatch({
					type: actionType.SET_STUDENT_LIST_LOADING,
					payload: false,
				});
			});
	};

export const getStudentDetails =
	(studentId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_DETAILS_LOADING_IN_STUDENT_MODULE,
			payload: true,
		});

		const database = getFirestore();

		database
			.collection("StudentProfile")
			.doc(studentId)
			.get()
			.then((doc) => {
				let studentDetails = doc ? doc.data() : null;
				let formattedStudentDetails = studentDetails
					? {
							...studentDetails,
							education: studentDetails.education.map((x, i) => ({
								...x,
								id: i,
							})),
							certificate: studentDetails.certificate.map((x, i) => ({
								...x,
								id: i,
							})),
							project: studentDetails.project.map((x, i) => ({
								...x,
								id: i,
							})),
							personalInterest: studentDetails.personalInterest
								? studentDetails.personalInterest.map((x, i) => ({
										...x,
										id: i,
								  }))
								: [],
							GALKExamDetails: studentDetails.GALKExamDetails
								? studentDetails.GALKExamDetails.map((x, i) => ({
										...x,
										id: i,
								  }))
								: [],
					  }
					: null;
				dispatch({
					type: actionType.GET_STUDENT_TO_SHOW_DETAILS_IN_STUDENT_MODULE,
					payload: formattedStudentDetails
						? { ...formattedStudentDetails }
						: {},
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_DETAILS_LOADING_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error fetching company details:", err);
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_DETAILS_LOADING_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

export const resetStudentToShowDetails = () => (dispatch) => {
	dispatch({
		type: actionType.RESET_STUDENT_TO_SHOW_DETAILS_IN_STUDENT_MODULE,
	});
};

export const filterStudents =
	(filter) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const { collegeName, technicalSkill, fieldOfStudy, projectType } = filter;
		const allStudents = getState().student.initialAllStudentList;
		let filteredStudents = allStudents ? [...allStudents] : [];

		//Filter by college name
		if (collegeName && collegeName.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					x.collegeName &&
					collegeName.find(
						(clg) =>
							clg.toLowerCase().includes(x.collegeName.toLowerCase()) ||
							x.collegeName.toLowerCase().includes(clg.toLowerCase())
					)
				) {
					return true;
				}
				return false;
			});
		}

		//Filter by field of study
		if (fieldOfStudy && fieldOfStudy.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					x.branchName &&
					fieldOfStudy.find(
						(br) =>
							br.toLowerCase().includes(x.branchName.toLowerCase()) ||
							x.branchName.toLowerCase().includes(br.toLowerCase())
					)
				) {
					return true;
				}
				return false;
			});
		}

		//Filter by technical skills
		if (technicalSkill && technicalSkill.length > 0) {
			filteredStudents = [
				...filterStudentBasedOnSkillArr(
					[...filteredStudents],
					[...technicalSkill]
				),
			];
		}

		//Filter by Project type
		if (projectType) {
			filteredStudents = [...filteredStudents].filter((x) => {
				let projectList = x.project || [];
				let projectListString = projectList
					.filter((x) => (x.type ? true : false))
					.map((x) => x.type)
					.toString()
					.toLowerCase();
				if (
					projectListString &&
					(projectListString.includes(projectType.toLowerCase()) ||
						projectType.toLowerCase().includes(projectListString))
				) {
					return true;
				}
				return false;
			});
		}

		dispatch({
			type: actionType.FILTER_STUDENT_LIST,
			payload: [...filteredStudents],
		});
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: false,
		});
	};

export const filterThirdYearStudents =
	(filter) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const { collegeName, technicalSkill, fieldOfStudy } = filter;
		const allStudents = getState().student.initialThirdYearList;
		let filteredStudents = allStudents ? [...allStudents] : [];

		if (collegeName && collegeName.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					collegeName.find(
						(clg) => clg.toLowerCase() === x.collegeName.toLowerCase()
					)
				) {
					return true;
				}
				return false;
			});
		}
		if (fieldOfStudy && fieldOfStudy.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					fieldOfStudy.find(
						(br) => br.toLowerCase() === x.branchName.toLowerCase()
					)
				) {
					return true;
				}
				return false;
			});
		}
		if (technicalSkill && technicalSkill.length > 0) {
			filteredStudents = [
				...filterStudentBasedOnSkillArr(
					[...filteredStudents],
					[...technicalSkill]
				),
			];
		}

		dispatch({
			type: actionType.FILTER_THIRD_YEAR_STUDENT_LIST,
			payload: [...filteredStudents],
		});
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: false,
		});
	};

export const filterFourthYearStudents =
	(filter) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const { collegeName, technicalSkill, fieldOfStudy } = filter;
		const allStudents = getState().student.initialFourthYearList;
		let filteredStudents = allStudents ? [...allStudents] : [];

		if (collegeName && collegeName.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					collegeName.find(
						(clg) => clg.toLowerCase() === x.collegeName.toLowerCase()
					)
				) {
					return true;
				}
				return false;
			});
		}
		if (fieldOfStudy && fieldOfStudy.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					fieldOfStudy.find(
						(br) => br.toLowerCase() === x.branchName.toLowerCase()
					)
				) {
					return true;
				}
				return false;
			});
		}
		if (technicalSkill && technicalSkill.length > 0) {
			filteredStudents = [
				...filterStudentBasedOnSkillArr(
					[...filteredStudents],
					[...technicalSkill]
				),
			];
		}

		dispatch({
			type: actionType.FILTER_FOURTH_YEAR_STUDENT_LIST,
			payload: [...filteredStudents],
		});
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: false,
		});
	};

export const filterGraduateStudents =
	(filter) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: true,
		});

		const { collegeName, technicalSkill, fieldOfStudy } = filter;
		const allStudents = getState().student.initialGraduateList;
		let filteredStudents = allStudents ? [...allStudents] : [];

		if (collegeName && collegeName.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					collegeName.find(
						(clg) => clg.toLowerCase() === x.collegeName.toLowerCase()
					)
				) {
					return true;
				}
				return false;
			});
		}
		if (fieldOfStudy && fieldOfStudy.length > 0) {
			filteredStudents = [...filteredStudents].filter((x) => {
				if (
					fieldOfStudy.find(
						(br) => br.toLowerCase() === x.branchName.toLowerCase()
					)
				) {
					return true;
				}
				return false;
			});
		}
		if (technicalSkill && technicalSkill.length > 0) {
			filteredStudents = [
				...filterStudentBasedOnSkillArr(
					[...filteredStudents],
					[...technicalSkill]
				),
			];
		}

		dispatch({
			type: actionType.FILTER_GRADUATE_STUDENT_LIST,
			payload: [...filteredStudents],
		});
		dispatch({
			type: actionType.SET_STUDENT_LIST_LOADING,
			payload: false,
		});
	};

export const updateStudentImg =
	(newLogoObject) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		const database = getFirestore();
		const storage = getFirebase().storage();

		storage
			.ref()
			.child(`CandidateProfilePic/${studentId}`)
			.put(newLogoObject, { contentType: newLogoObject.type })
			.on(
				"state_changed",
				(snapshot) => {
					// const progress = Math.round(
					//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					// );
					// this.setState({ progress });
				},
				(err) => {
					console.log("error in document upload:", err);
					message.error("Error in uploading document !");
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
						payload: false,
					});
				},
				() => {
					storage
						.ref()
						.child(`CandidateProfilePic/${studentId}`)
						.getDownloadURL()
						.then((url) => {
							database
								.collection("StudentProfile")
								.doc(studentId)
								.update({
									img: url,
								})
								.then(() => {
									dispatch({
										type: actionType.SET_STUDENT_PROFILE_IMG,
										payload: url,
									});
									dispatch({
										type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
										payload: false,
									});
								})
								.catch((err) => {
									console.log("Error while uploading file:", err);
									message.error("Error uploading file");
									dispatch({
										type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
										payload: false,
									});
								});
						})
						.catch((err) => {
							console.log("Error while uploading file:", err);
							message.error("Error uploading file");
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
								payload: false,
							});
						});
				}
			);
	};

export const updateStudentVideo =
	(newVideoObject) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		const database = getFirestore();
		const storage = getFirebase().storage();

		storage
			.ref()
			.child(`CandidateIntroVideo/${studentId}`)
			.put(newVideoObject, { contentType: newVideoObject.type })
			.on(
				"state_changed",
				(snapshot) => {
					// const progress = Math.round(
					//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					// );
					// this.setState({ progress });
				},
				(err) => {
					console.log("error in document upload:", err);
					message.error("Error in uploading document !");
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
						payload: false,
					});
				},
				() => {
					storage
						.ref()
						.child(`CandidateIntroVideo/${studentId}`)
						.getDownloadURL()
						.then((url) => {
							database
								.collection("StudentProfile")
								.doc(studentId)
								.update({
									video: url,
								})
								.then(() => {
									dispatch({
										type: actionType.SET_STUDENT_PROFILE_VIDEO,
										payload: url,
									});
									dispatch({
										type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
										payload: false,
									});
								})
								.catch((err) => {
									console.log("Error while uploading file:", err);
									message.error("Error uploading file");
									dispatch({
										type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
										payload: false,
									});
								});
						})
						.catch((err) => {
							console.log("Error while uploading file:", err);
							message.error("Error uploading file");
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
								payload: false,
							});
						});
				}
			);
	};

export const updateStudentBasicInformation =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		const database = getFirestore();

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				...updatedInformation,
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_BASIC_INFORMATION,
					payload: { ...updatedInformation },
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

export const updateInternshipStudentTagInformation =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const _studentId = getState().student.studentToShow.id;
		const database = getFirestore();

		let _updatedTaggedCompanyArray = updatedInformation.taggedCompanies || [];
		let _oldTaggedCompanyArray = [];

		//Fetch student details from current students
		let _studentDetails = getState().student.studentToShow;

		// let _studentName = _studentDetails.name || "";
		// let _studentCollege = _studentDetails.collegeName || "";

		//Fetch old tagged companies
		if (_studentDetails) {
			_oldTaggedCompanyArray = _studentDetails.taggedCompanies || [];
		}

		//Update student collection with updated tagged companies as per old db structure
		database
			.collection("StudentProfile")
			.doc(_studentId)
			.update({
				taggedCompanies: _updatedTaggedCompanyArray,
			})
			.then(() => {
				var _oldTaggedCompanyIds = _oldTaggedCompanyArray.map(
					(company) => company.key
				);
				var _newTaggedCompanyIds = _updatedTaggedCompanyArray.map(
					(company) => company.key
				);

				//Companies in this difference, are either removed from tag
				//or addd as new tag
				let _newlyAddedCompanyIdList = _newTaggedCompanyIds.filter(
					(x) => !_oldTaggedCompanyIds.includes(x)
				);

				var _differenceInIdArray = _oldTaggedCompanyIds
					.filter((x) => !_newTaggedCompanyIds.includes(x))
					.concat(_newlyAddedCompanyIdList);

				if (_differenceInIdArray.length > 0) {
					_differenceInIdArray.forEach((companyId) => {
						if (_oldTaggedCompanyIds.includes(companyId)) {
							//Means this student is untagged for this company
							database
								.collection("CompanyProfile")
								.doc(companyId)
								.get()
								.then((doc) => {
									let oldTaggedCandidates =
										doc.data().taggedCandidatesForInternship || [];
									database
										.collection("CompanyProfile")
										.doc(companyId)
										.update({
											taggedCandidatesForInternship: oldTaggedCandidates.filter(
												(x) => x !== _studentId
											),
										});
								});
						}
						if (_newTaggedCompanyIds.includes(companyId)) {
							//Means this student is newly tagged for this company
							database
								.collection("CompanyProfile")
								.doc(companyId)
								.get()
								.then((doc) => {
									let taggedCandidates =
										doc.data().taggedCandidatesForInternship || [];

									if (taggedCandidates && taggedCandidates.length > 0) {
										let oldArr = [...taggedCandidates];
										oldArr.push(_studentId);
										taggedCandidates = [...new Set(oldArr)];
									} else {
										taggedCandidates = [_studentId];
									}
									database.collection("CompanyProfile").doc(companyId).update({
										taggedCandidatesForInternship: taggedCandidates,
									});

									//Code to send email
									// const { name, nameInEnglish, email } = doc.data();
									// axios.post(
									// 	"https://us-central1-piit-52003.cloudfunctions.net/sendStudentTagNotificationToCompanyFromAdmin",
									// 	{
									// 		companyName: name + "/" + nameInEnglish,
									// 		companyEmail: email,
									// 		studentName: _studentName,
									// 		studentCollege: _studentCollege,
									// 	}
									// );
								});
						}
					});
				}

				dispatch({
					type: actionType.UPDATE_COMPANY_TAG_IN_STUDENT_MODULE,
					payload: [..._updatedTaggedCompanyArray],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch(function (error) {
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
				console.log("ERROR:", error);
				message.error("Error in company tag !");
			});
	};

export const updateGalkLabStudentTagTagInformation =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE_GALK_LAB,
			payload: true,
		});

		const _studentId = getState().student.studentToShow.id;
		const database = getFirestore();

		let _updatedTaggedCompanyArray =
			updatedInformation.taggedCompaniesForGalkLab || [];
		let _oldTaggedCompanyArray = [];

		//Fetch student details from current students
		let _studentDetails = getState().student.studentToShow;

		// let _studentName = _studentDetails.name || "";
		// let _studentCollege = _studentDetails.collegeName || "";

		//Fetch old tagged companies
		if (_studentDetails) {
			_oldTaggedCompanyArray = _studentDetails.taggedCompaniesForGalkLab || [];
		}

		//Update student collection with updated tagged companies as per old db structure
		database
			.collection("StudentProfile")
			.doc(_studentId)
			.update({
				taggedCompaniesForGalkLab: _updatedTaggedCompanyArray,
			})
			.then(() => {
				var _oldTaggedCompanyIds = _oldTaggedCompanyArray.map(
					(company) => company.key
				);
				var _newTaggedCompanyIds = _updatedTaggedCompanyArray.map(
					(company) => company.key
				);

				//Companies in this difference, are either removed from tag
				//or addd as new tag
				let _newlyAddedCompanyIdList = _newTaggedCompanyIds.filter(
					(x) => !_oldTaggedCompanyIds.includes(x)
				);

				var _differenceInIdArray = _oldTaggedCompanyIds
					.filter((x) => !_newTaggedCompanyIds.includes(x))
					.concat(_newlyAddedCompanyIdList);

				if (_differenceInIdArray.length > 0) {
					_differenceInIdArray.forEach((companyId) => {
						if (_oldTaggedCompanyIds.includes(companyId)) {
							//Means this student is untagged for this company
							database
								.collection("CompanyProfile")
								.doc(companyId)
								.get()
								.then((doc) => {
									let oldTaggedCandidates =
										doc.data().taggedCandidatesForGalkLab || [];
									database
										.collection("CompanyProfile")
										.doc(companyId)
										.update({
											taggedCandidatesForGalkLab: oldTaggedCandidates.filter(
												(x) => x !== _studentId
											),
										});
								});
						}
						if (_newTaggedCompanyIds.includes(companyId)) {
							//Means this student is newly tagged for this company
							database
								.collection("CompanyProfile")
								.doc(companyId)
								.get()
								.then((doc) => {
									let taggedCandidates =
										doc.data().taggedCandidatesForGalkLab || [];

									if (taggedCandidates && taggedCandidates.length > 0) {
										let oldArr = [...taggedCandidates];
										oldArr.push(_studentId);
										taggedCandidates = [...new Set(oldArr)];
									} else {
										taggedCandidates = [_studentId];
									}
									database.collection("CompanyProfile").doc(companyId).update({
										taggedCandidatesForGalkLab: taggedCandidates,
									});

									//Code to send email
									// const { name, nameInEnglish, email } = doc.data();
									// axios.post(
									// 	"https://us-central1-piit-52003.cloudfunctions.net/sendStudentTagNotificationToCompanyFromAdmin",
									// 	{
									// 		companyName: name + "/" + nameInEnglish,
									// 		companyEmail: email,
									// 		studentName: _studentName,
									// 		studentCollege: _studentCollege,
									// 	}
									// );
								});
						}
					});
				}

				dispatch({
					type: actionType.UPDATE_GALK_LAB_COMPANY_TAG_IN_STUDENT_MODULE,
					payload: [..._updatedTaggedCompanyArray],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE_GALK_LAB,
					payload: false,
				});
			})
			.catch(function (error) {
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE_GALK_LAB,
					payload: false,
				});
				console.log("ERROR:", error);
				message.error("Error in company tag !");
			});
	};

//Education
export const deleteStudentToShowEducation =
	(educationId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentEducationBeforeUpdate =
			getState().student.studentToShow.education || [];
		const database = getFirestore();

		let updatedStudentEducationList = studentEducationBeforeUpdate.filter(
			(x) => x.id !== educationId
		);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				education: updatedStudentEducationList.map((x) => ({
					degree: x.degree,
					place: x.place,
					startDate: x.startDate,
					endDate: x.endDate,
					instituteName: x.instituteName,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EDUCATION_INFORMATION,
					payload: [...updatedStudentEducationList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const updateStudentToShowEducation =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentEducationBeforeUpdate =
			getState().student.studentToShow.education;
		const database = getFirestore();

		let updatedStudentEducation = studentEducationBeforeUpdate.map((x) => {
			let data = { ...x };
			if (data.id === updatedInformation.id) {
				data.degree = updatedInformation.degree;
				data.description = updatedInformation.description;
				data.endDate = updatedInformation.endDate;
				data.startDate = updatedInformation.startDate;
				data.instituteName = updatedInformation.instituteName;
				data.place = updatedInformation.place;
			}
			return data;
		});

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				education: updatedStudentEducation.map((x) => ({
					degree: x.degree,
					place: x.place,
					startDate: x.startDate,
					endDate: x.endDate,
					instituteName: x.instituteName,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EDUCATION_INFORMATION,
					payload: [...updatedStudentEducation],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const createStudentToShowEducation =
	(newEducation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentEducationBeforeUpdate =
			getState().student.studentToShow.education || [];
		const database = getFirestore();

		let newEducationUpdatedWithId = {
			...newEducation,
			id: studentEducationBeforeUpdate.length,
		};

		studentEducationBeforeUpdate.push(newEducationUpdatedWithId);
		let updatedStudentEducationList = [...studentEducationBeforeUpdate];

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				education: updatedStudentEducationList.map((x) => ({
					degree: x.degree,
					place: x.place,
					startDate: x.startDate,
					endDate: x.endDate,
					instituteName: x.instituteName,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EDUCATION_INFORMATION,
					payload: [...updatedStudentEducationList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

export const SubscribedInGALKLab =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
	dispatch({
		type: actionType.SET_SUBSCRIBED_STUDENT,
	});
};
export const unSubscribeInGALKLab =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
	dispatch({
		type: actionType.SET_UNSUBSCRIBED_STUDENT,
	});
};

//Project
export const deleteStudentToShowProject =
	(projectId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentProjectBeforeUpdate =
			getState().student.studentToShow.project || [];
		const database = getFirestore();

		let updatedStudentProjectList = studentProjectBeforeUpdate.filter(
			(x) => x.id !== projectId
		);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				project: updatedStudentProjectList.map((x) => ({
					title: x.title,
					place: x.place,
					startDate: x.startDate,
					endDate: x.endDate,
					skillsUsed: x.skillsUsed || [],
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_PROJECT_INFORMATION,
					payload: [...updatedStudentProjectList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const updateStudentToShowProject =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentProjectBeforeUpdate =
			getState().student.studentToShow.project || [];
		const database = getFirestore();

		let updatedStudentProject = studentProjectBeforeUpdate.map((x) => {
			let data = { ...x };
			if (data.id === updatedInformation.id) {
				data.title = updatedInformation.title;
				data.description = updatedInformation.description;
				data.endDate = updatedInformation.endDate;
				data.startDate = updatedInformation.startDate;
				data.skillsUsed = updatedInformation.skillsUsed;
				data.place = updatedInformation.place;
				data.type = updatedInformation.type;
			}
			return data;
		});
		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				project: updatedStudentProject.map((x) => ({
					title: x.title || "",
					place: x.place || "",
					startDate: x.startDate || "",
					endDate: x.endDate || "",
					skillsUsed: x.skillsUsed || [],
					description: x.description || "",
					type: x.type || "",
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_PROJECT_INFORMATION,
					payload: [...updatedStudentProject],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const createStudentToShowProject =
	(newProject) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentProjectBeforeUpdate =
			getState().student.studentToShow.project || [];
		const database = getFirestore();

		let newProjectUpdatedWithId = {
			...newProject,
			id: studentProjectBeforeUpdate.length,
		};

		studentProjectBeforeUpdate.push(newProjectUpdatedWithId);
		let updatedStudentProjectList = [...studentProjectBeforeUpdate];

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				project: updatedStudentProjectList.map((x) => ({
					title: x.title || "",
					place: x.place || "",
					startDate: x.startDate || "",
					endDate: x.endDate || "",
					skillsUsed: x.skillsUsed || [],
					description: x.description || "",
					type: x.type || "",
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_PROJECT_INFORMATION,
					payload: [...updatedStudentProjectList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

//Certificate
export const deleteStudentToShowCertificate =
	(certificateId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentCertificateBeforeUpdate =
			getState().student.studentToShow.certificate || [];
		const database = getFirestore();

		let updatedStudentCertificateList = studentCertificateBeforeUpdate.filter(
			(x) => x.id !== certificateId
		);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificate: updatedStudentCertificateList.map((x) => ({
					title: x.title,
					issueDate: x.issueDate,
					description: x.description,
					link: x.link,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_CERTIFICATE_INFORMATION,
					payload: [...updatedStudentCertificateList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const updateStudentToShowCertificate =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentCertificateBeforeUpdate =
			getState().student.studentToShow.certificate || [];
		const database = getFirestore();

		let updatedStudentCertificate = studentCertificateBeforeUpdate.map((x) => {
			let data = { ...x };
			if (data.id === updatedInformation.id) {
				data.title = updatedInformation.title;
				data.description = updatedInformation.description;
				data.issueDate = updatedInformation.issueDate;
				data.link = updatedInformation.link;
			}
			return data;
		});

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificate: updatedStudentCertificate.map((x) => ({
					title: x.title,
					link: x.link,
					issueDate: x.issueDate,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_CERTIFICATE_INFORMATION,
					payload: [...updatedStudentCertificate],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const createStudentToShowCertificate =
	(newCertificate) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentCertificateBeforeUpdate =
			getState().student.studentToShow.certificate || [];
		const database = getFirestore();

		let newCertificateUpdatedWithId = {
			...newCertificate,
			id: studentCertificateBeforeUpdate.length,
		};

		studentCertificateBeforeUpdate.push(newCertificateUpdatedWithId);
		let updatedStudentCertificateList = [...studentCertificateBeforeUpdate];

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				certificate: updatedStudentCertificateList.map((x) => ({
					title: x.title,
					link: x.link,
					issueDate: x.issueDate,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_CERTIFICATE_INFORMATION,
					payload: [...updatedStudentCertificateList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

//ExtraCurricular
export const deleteStudentToShowExtraCurricular =
	(curricularId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentExtraCurricularBeforeUpdate =
			getState().student.studentToShow.personalInterest || [];
		const database = getFirestore();

		let updatedStudentExtraCurricularList =
			studentExtraCurricularBeforeUpdate.filter((x) => x.id !== curricularId);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedStudentExtraCurricularList.map((x) => ({
					title: x.title,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedStudentExtraCurricularList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const updateStudentToShowExtraCurricular =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentExtraCurricularBeforeUpdate =
			getState().student.studentToShow.personalInterest || [];
		const database = getFirestore();

		let updatedStudentExtraCurricular = studentExtraCurricularBeforeUpdate.map(
			(x) => {
				let data = { ...x };
				if (data.id === updatedInformation.id) {
					data.title = updatedInformation.title;
					data.description = updatedInformation.description;
				}
				return data;
			}
		);
		console.log("UPDATED:", updatedStudentExtraCurricular);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedStudentExtraCurricular.map((x) => ({
					title: x.title,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedStudentExtraCurricular],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

//GALK Exam
export const deleteStudentToShowExam =
	(curricularId) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentExtraCurricularBeforeUpdate =
			getState().student.studentToShow.personalInterest || [];
		const database = getFirestore();

		let updatedStudentExtraCurricularList =
			studentExtraCurricularBeforeUpdate.filter((x) => x.id !== curricularId);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedStudentExtraCurricularList.map((x) => ({
					title: x.title,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedStudentExtraCurricularList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};
export const updateStudentToShowExam =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentExtraCurricularBeforeUpdate =
			getState().student.studentToShow.personalInterest || [];
		const database = getFirestore();

		let updatedStudentExtraCurricular = studentExtraCurricularBeforeUpdate.map(
			(x) => {
				let data = { ...x };
				if (data.id === updatedInformation.id) {
					data.title = updatedInformation.title;
					data.description = updatedInformation.description;
				}
				return data;
			}
		);
		console.log("UPDATED:", updatedStudentExtraCurricular);

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedStudentExtraCurricular.map((x) => ({
					title: x.title,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedStudentExtraCurricular],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

export const createStudentToShowExtraCurricular =
	(newExtraCurricular) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		let studentExtraCurricularBeforeUpdate =
			getState().student.studentToShow.personalInterest || [];
		const database = getFirestore();

		let newExtraCurricularUpdatedWithId = {
			...newExtraCurricular,
			id: studentExtraCurricularBeforeUpdate.length,
		};

		studentExtraCurricularBeforeUpdate.push(newExtraCurricularUpdatedWithId);
		let updatedStudentExtraCurricularList = [
			...studentExtraCurricularBeforeUpdate,
		];

		database
			.collection("StudentProfile")
			.doc(studentId)
			.update({
				personalInterest: updatedStudentExtraCurricularList.map((x) => ({
					title: x.title,
					description: x.description,
				})),
			})
			.then(() => {
				dispatch({
					type: actionType.UPDATE_STUDENT_EXTRACURRICULAR_INFORMATION,
					payload: [...updatedStudentExtraCurricularList],
				});
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Error while updating data", err);
				message.error("Error updating data !");
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});
	};

export const makeStudentSelectedForCompany =
	(updatedInformation) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const studentId = getState().student.studentToShow.id;
		const database = getFirestore();
		const selectedByCompanyId = updatedInformation.selectedByCompany.id;
		const selectedByCompanyName = updatedInformation.selectedByCompany.name;

		if (selectedByCompanyId) {
			database
				.collection("StudentProfile")
				.doc(studentId)
				.update({
					selectedByCompany: updatedInformation.selectedByCompany,
					taggedCompanies: [
						{
							key: selectedByCompanyId,
							label: selectedByCompanyName,
						},
					],
				})
				.then(() => {
					database
						.collection("CompanyProfile")
						.get()
						.then((querySnap) => {
							let allCompanyData = [];
							querySnap.forEach((doc) => allCompanyData.push(doc.data()));

							allCompanyData.forEach((company) => {
								if (
									company.id !== selectedByCompanyId &&
									company.taggedCandidatesForInternship.includes(studentId)
								) {
									let listAfterRemove =
										company.taggedCandidatesForInternship.filter(
											(x) => x !== studentId
										);
									database.collection("CompanyProfile").doc(company.id).update({
										taggedCandidatesForInternship: listAfterRemove,
									});
								}
								if (company.id === selectedByCompanyId) {
									database
										.collection("CompanyProfile")
										.doc(selectedByCompanyId)
										.update({
											selectedCandidateForInternship:
												database.FieldValue.arrayUnion({
													candidateId: studentId,
													actionBy: "Admin",
													actionByName: "Admin",
													actionDate: moment().format("LL"),
												}),
										});
								}
							});

							dispatch({
								type: actionType.UPDATE_STUDENT_BASIC_INFORMATION,
								payload: { ...updatedInformation },
							});
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Error while updating data", err);
							message.error("Error updating data !");
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Error while updating data", err);
					message.error("Error updating data !");
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
						payload: false,
					});
				});
		} else {
			database
				.collection("StudentProfile")
				.doc(studentId)
				.update({
					selectedByCompany: {},
				})
				.then(() => {
					dispatch({
						type: actionType.UPDATE_STUDENT_BASIC_INFORMATION,
						payload: { ...updatedInformation },
					});
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Error while updating data", err);
					message.error("Error updating data !");
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
						payload: false,
					});
				});
		}
	};

export const sendMailToStudentFromAdmin =
	({ to, subject, body }) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
			payload: true,
		});

		const student = getState().student.studentToShow;
		const { name, email } = student;

		sendMail(emailTemplateNames.MAIL_FROM_ADMIN, {
			to: email,
			subject: subject,
			userName: name,
			message: body,
		})
			.then((res) => {
				console.log("Send mail response", res.data);
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			})
			.catch((err) => {
				console.log("Mail sent error:", err);
				dispatch({
					type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
					payload: false,
				});
			});

		// axios
		// 	.post(
		// 		"https://us-central1-piit-52003.cloudfunctions.net/sendNotificationFromAdmin",
		// 		{
		// 			candidateName: name,
		// 			candidateEmail: email || to,
		// 			subject: subject,
		// 			emailBody: body,
		// 			emailCc: emailDefaults.cc,
		// 			emailBcc: emailDefaults.bcc,
		// 		}
		// 	)
		// 	.then(() => {
		// 		dispatch({
		// 			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
		// 			payload: false,
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		dispatch({
		// 			type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS_IN_STUDENT_MODULE,
		// 			payload: false,
		// 		});
		// 	});
	};
