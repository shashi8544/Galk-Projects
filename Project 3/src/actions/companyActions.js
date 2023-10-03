import * as actionType from "./types";
import axios from "axios";
import { firebase, auth } from "../utils/configs/firebaseConfig";
import { splitArrayByNoOfElement } from "./actionHelper";
import {
	getAdmissionYearForThirdYearStudents,
	getAdmissionYearForFourthYearStudents,
} from "../utils/functions/javaScriptHelper";
import moment from "moment";
import { message } from "antd";
import { database, storage } from "../utils/configs/firebaseConfig";
//Admin side actions
export const getAllCompanyList =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_COMPANY_LIST_LOADING,
				payload: true,
			});
			const database = getFirestore();

			database
				.collection("CompanyProfile")
				.get()
				.then((querySnap) => {
					let companyList = [];
					querySnap.forEach((doc) => {
						companyList.push(doc.data());
					});

					dispatch({
						type: actionType.GET_ALL_COMPANY_LIST,
						payload: [...companyList],
					});
				})
				.catch((err) => {
					console.log("Error:", err);
					message.error("Error loading data !");
					dispatch({
						type: actionType.SET_COMPANY_LIST_LOADING,
						payload: false,
					});
				});
		};

export const resetComapnyList = () => (dispatch) => {
	dispatch({
		type: actionType.RESET_COMPANY_LIST,
	});
};

export const getCompanyDetailsById =
	(companyId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_COMPANY_DETAILS_LOADING,
				payload: true,
			});

			const database = getFirestore();

			database
				.collection("CompanyProfile")
				.doc(companyId)
				.get()
				.then((doc) => {
					let companyDetails = doc.data();
					dispatch({
						type: actionType.GET_COMPANY_DETAILS,
						payload: companyDetails ? { ...companyDetails } : null,
					});
				})
				.catch((err) => {
					console.log("Error fetching company details:", err);
					dispatch({
						type: actionType.SET_COMPANY_DETAILS_LOADING,
						payload: false,
					});
				});
		};

export const resetComapnyToShowDetails = () => (dispatch) => {
	dispatch({
		type: actionType.RESET_COMPANY_DETAILS,
	});
};

export const updateCompanyLogo =
	(newLogoObject) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
				payload: true,
			});
			const companyId = getState().company.companyToShow.id;
			const database = getFirestore();
			const storage = getFirebase().storage();

			storage
				.ref()
				.child(`CompanyLogo/${companyId}`)
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
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
							payload: false,
						});
					},
					() => {
						storage
							.ref()
							.child(`CompanyLogo/${companyId}`)
							.getDownloadURL()
							.then((url) => {
								database
									.collection("CompanyProfile")
									.doc(companyId)
									.update({
										logo: url,
									})
									.then(() => {
										dispatch({
											type: actionType.SET_COMPANY_PROFILE_LOGO,
											payload: url,
										});
										dispatch({
											type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
											payload: false,
										});
									})
									.catch((err) => {
										console.log("Error while uploading file:", err);
										message.error("Error uploading file");
										dispatch({
											type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
											payload: false,
										});
									});
							})
							.catch((err) => {
								console.log("Error while uploading file:", err);
								message.error("Error uploading file");
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							});
					}
				);
		};

export const updateCompanyCoverPhoto =
	(newPhotoObject) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
				payload: true,
			});
			const companyId = getState().company.companyToShow.id;
			const database = getFirestore();
			const storage = getFirebase().storage();

			storage
				.ref()
				.child(`CompanyCoverPhoto/${companyId}`)
				.put(newPhotoObject, { contentType: newPhotoObject.type })
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
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
							payload: false,
						});
					},
					() => {
						storage
							.ref()
							.child(`CompanyCoverPhoto/${companyId}`)
							.getDownloadURL()
							.then((url) => {
								database
									.collection("CompanyProfile")
									.doc(companyId)
									.update({
										coverPhoto: url,
									})
									.then(() => {
										dispatch({
											type: actionType.SET_COMPANY_PROFILE_COVER_PHOTO,
											payload: url,
										});
										dispatch({
											type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
											payload: false,
										});
									})
									.catch((err) => {
										console.log("Error while uploading file:", err);
										message.error("Error uploading file");
										dispatch({
											type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
											payload: false,
										});
									});
							})
							.catch((err) => {
								console.log("Error while uploading file:", err);
								message.error("Error uploading file");
								dispatch({
									type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
									payload: false,
								});
							});
					}
				);
		};

export const updateCompanyBasicInformation =
	(updatedInformation) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
				payload: true,
			});
			const companyId = getState().company.companyToShow.id;
			const database = getFirestore();

			database
				.collection("CompanyProfile")
				.doc(companyId)
				.update({
					...updatedInformation,
				})
				.then(() => {
					dispatch({
						type: actionType.UPDATE_COMPANY_BASIC_INFORMATION,
						payload: { ...updatedInformation },
					});
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Error while updating data", err);
					message.error("Error updating data !");
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
						payload: false,
					});
				});
		};

export const updateCompanyUserAuthorization =
	(updatedAccountUserList, updatedRow) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
				payload: true,
			});

			const _companyId = getState().company.companyToShow.id;
			const database = getFirestore();

			if (_companyId != null) {
				database
					.collection("CompanyProfile")
					.doc(_companyId)
					.update({
						accountUserList: updatedAccountUserList,
					})
					.then(() => {
						const userId = updatedRow.id;
						if (userId != null) {
							database.collection("CompanyUserProfile").doc(userId).update({
								role: updatedRow.role,
							});
						}
						dispatch({
							type: actionType.UPDATE_ACCOUNT_USER_AUTHORIZATION,
							payload: updatedAccountUserList,
						});
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
							payload: false,
						});
					})
					.catch(function (error) {
						message.error("Error in data update !");
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
							payload: false,
						});
					});
			}
		};

export const addNewTeamMember =
	(newMember) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
				payload: true,
			});

			const _companyId = getState().company.companyToShow.id;
			const database = getFirestore();
			const _companyAdminName = "GALK_Admin";

			auth
				.createUserWithEmailAndPassword(newMember.email, newMember.password)
				.then((u) => {
					let userId = u.user.uid;
					var docData = {
						id: userId,
						ownProfileComplete: true,
						companyProfileComplete: true,
						role: newMember.role,
						companyId: _companyId,
						name: newMember.name,
						email: newMember.email,
						phoneNumber: "",
						active: true,
						emailVerified: true,
					};

					database
						.collection("CompanyUserProfile")
						.doc(userId)
						.set(docData)
						.then(() => {
							var _newAccountUser = { ...newMember, id: userId };
							database
								.collection("CompanyProfile")
								.doc(_companyId)
								.update({
									accountUserList:
										firebase.firestore.FieldValue.arrayUnion(_newAccountUser),
								})
								.then(() => {
									dispatch({
										type: actionType.ADD_NEW_ACCOUNT_USER,
										payload: _newAccountUser,
									});
									dispatch({
										type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
										payload: false,
									});
								})
								.catch((err) => {
									console.log("error:", err);
									dispatch({
										type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
										payload: false,
									});
								});
						})
						.catch((err) => {
							console.log("error:", err);
							dispatch({
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE,
								payload: false,
							});
						});
				})
				.then(() => {
					axios
						.post(
							"https://us-central1-piit-52003.cloudfunctions.net/newTeamMemberAdded",
							{
								newTeamMemberName: newMember.name + "-san",
								newTeamMemberEmail: newMember.email,
								newTeamMemberPassword: newMember.password,
								companyAdminName: _companyAdminName,
							}
						)
						.then(function (response) {
							// console.log("Success:", response);
						})
						.catch(function (error) {
							console.log("Error", error);
						});
				})
				.catch((err) => {
					console.log("Team member email sent error:", err);
				});
		};

export const getInternshipJobListToShow =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_INTERNSHIP_JOB_LIST_LOADING,
				payload: true,
			});

			const internshipJobIdList =
				getState().company.companyToShow.internshipJobsIds;
			const splittedBy10JobIdArr = splitArrayByNoOfElement(
				internshipJobIdList,
				10
			);

			const database = getFirestore();

			if (splittedBy10JobIdArr.length > 0) {
				const arrLength = splittedBy10JobIdArr.length;
				let counter = 0;

				splittedBy10JobIdArr.forEach((x) => {
					counter = counter + 1;

					database
						.collection("InternshipJobs")
						.where("jobId", "in", x)
						.get()
						.then((querySnapshot) => {
							let _jobDataArray = [];

							querySnapshot.forEach((doc) => {
								let _data = doc.data();

								_jobDataArray.push({
									jobId: _data.jobId,
									title: _data.title,
									skills: _data.skills,
									attachmentURL: _data.attachmentURL,
									createDate: _data.createDate,
									createdBy: _data.createdBy,
									location: _data.location,
									status: _data.status,
									description: _data.description,
								});
							});

							dispatch({
								type: actionType.GET_INTERNSHIP_JOB_LIST_TO_SHOW,
								payload: _jobDataArray,
							});
							if (counter === arrLength) {
								dispatch({
									type: actionType.SET_INTERNSHIP_JOB_LIST_LOADING,
									payload: false,
								});
							}
						})
						.catch((err) => {
							console.log("Internship job load error:", err);
							dispatch({
								type: actionType.SET_INTERNSHIP_JOB_LIST_LOADING,
								payload: false,
							});
						});
				});
			} else {
				dispatch({
					type: actionType.GET_INTERNSHIP_JOB_LIST_TO_SHOW,
					payload: [],
				});
				dispatch({
					type: actionType.SET_INTERNSHIP_JOB_LIST_LOADING,
					payload: false,
				});
			}
		};

export const getGalkJobListToShow =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_GALK_JOB_LIST_LOADING,
				payload: true,
			});

			const galkLabJobIdList = getState().company.companyToShow.galkLabJobsIds
				? getState().company.companyToShow.galkLabJobsIds
				: [];
			const splittedBy10JobIdArr = splitArrayByNoOfElement(galkLabJobIdList, 10);

			const database = getFirestore();

			if (splittedBy10JobIdArr.length > 0) {
				const arrLength = splittedBy10JobIdArr.length;
				let counter = 0;

				splittedBy10JobIdArr.forEach((x) => {
					counter = counter + 1;

					database
						.collection("GalkLabJobs")
						.where("jobId", "in", x)
						.get()
						.then((querySnapshot) => {
							let _jobDataArray = [];

							querySnapshot.forEach((doc) => {
								let _data = doc.data();

								_jobDataArray.push({
									jobId: _data.jobId,
									title: _data.title,
									skills: _data.skills,
									attachmentURL: _data.attachmentURL,
									createDate: _data.createDate,
									createdBy: _data.createdBy,
									location: _data.location,
									status: _data.status,
									description: _data.description,
									assignedMentors: _data.assignedMentors,
									candidateAssignedList:
										_data.candidateAssignedList.length === 0
											? []
											: _data.candidateAssignedList,
									requiredEngineerCount: _data.requiredEngineerCount
										? _data.requiredEngineerCount
										: 0,
									assignedStudentCount: _data.candidateAssignedList.length,
									repositoryUrl: _data.repositoryUrl,
									timesheet: _data.timesheet
								});
							});

							dispatch({
								type: actionType.GET_GALK_JOB_LIST_TO_SHOW,
								payload: _jobDataArray,
							});
							if (counter === arrLength) {
								dispatch({
									type: actionType.SET_GALK_JOB_LIST_LOADING,
									payload: false,
								});
							}
						})
						.catch((err) => {
							console.log("Internship job load error:", err);
							dispatch({
								type: actionType.SET_GALK_JOB_LIST_LOADING,
								payload: false,
							});
						});
				});
			} else {
				dispatch({
					type: actionType.GET_GALK_JOB_LIST_TO_SHOW,
					payload: [],
				});
				dispatch({
					type: actionType.SET_GALK_JOB_LIST_LOADING,
					payload: false,
				});
			}
		};

export const assignEngineeorInProject =
	(jobId, studentId) => (dispatch, getState) => {
		//const companyId = getState().company.company.id;
		dispatch({
			type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
			payload: true,
		});
		database
			.collection("GalkLabJobs")
			.doc(jobId)
			.update({
				candidateAssignedList:
					firebase.firestore.FieldValue.arrayUnion(studentId),
			})
			.then((res) => {
				dispatch({
					type: actionType.UPDATE_GALK_LAB_JOB_ASSIGNED_ENGINEER,
					payload: { studentId, jobId },
				});
			})
			.catch((err) => {
				dispatch({
					type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
					payload: false,
				});
			});
	};
export const unAssignEngineeorFromProject =
	(jobId, studentId) => (dispatch, getState) => {
		dispatch({
			type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
			payload: true,
		});
		database
			.collection("GalkLabJobs")
			.doc(jobId)
			.update({
				candidateAssignedList:
					firebase.firestore.FieldValue.arrayRemove(studentId),
			})
			.then((res) => {
				dispatch({
					type: actionType.UPDATE_GALK_LAB_JOB_UNASSIGNED,
					payload: { studentId, jobId },
				});
			})
			.catch((err) => {
				dispatch({
					type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
					payload: false,
				});
			});
	};
export const tagAndAssignEngineerInProject =
	(jobId, studentId) => (dispatch, getState) => {
		dispatch({
			type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
			payload: true,
		});

		const state = getState();
		const companyId = state.company.companyToShow.id;
		const companyName = state.company.companyToShow.name;
		// const database = getFirestore();

		database
			.collection("CompanyProfile")
			.doc(companyId)
			.update({
				taggedCandidatesForGalkLab:
					firebase.firestore.FieldValue.arrayUnion(studentId),
			})
			.then(() => {
				database
					.collection("StudentProfile")
					.doc(studentId)
					.update({
						taggedCompaniesForGalkLab: firebase.firestore.FieldValue.arrayUnion(
							{
								key: companyId,
								label: companyName,
							}
						),
					})
					.then(() => {
						database
							.collection("GalkLabJobs")
							.doc(jobId)
							.update({
								candidateAssignedList:
									firebase.firestore.FieldValue.arrayUnion(studentId),
							})
							.then(() => {
								dispatch({
									type: actionType.UPDATE_GALK_LAB_JOB_ASSIGNED_ENGINEER,
									payload: { studentId, jobId },
								});
							})
							.catch((err) => {
								dispatch({
									type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
									payload: false,
								});
							});
					})
					.catch((err) => {
						dispatch({
							type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
							payload: false,
						});
					});
			})
			.catch((err) => {
				dispatch({
					type: actionType.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING,
					payload: false,
				});
			});
	};

export const deleteInternshipJobToShow =
	(jobId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
				payload: true,
			});

			const companyId = getState().company.companyToShow.id;
			let existingJobList = getState().company.internshipJobListToShow || [];
			let listAfterDelete = existingJobList.filter((x) => x.jobId !== jobId);
			const database = getFirestore();

			database
				.collection("InternshipJobs")
				.doc(jobId)
				.delete()
				.then(() => {
					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							internshipJobsIds: listAfterDelete.map((x) => x.jobId),
						})
						.then(() => {
							dispatch({
								type: actionType.DELETE_INTERNSHIP_JOB_TO_SHOW,
								payload: [...listAfterDelete],
							});
							dispatch({
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Error while deleting data:", err);
							message.error("Data delete error");
							dispatch({
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Error while deleting data:", err);
					message.error("Data delete error");
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
						payload: false,
					});
				});
		};
export const deleteGalkJobToShow =
	(jobId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
				payload: true,
			});

			const companyId = getState().company.companyToShow.id;
			let existingJobList = getState().company.galkJobListToShow || [];
			let listAfterDelete = existingJobList.filter((x) => x.jobId !== jobId);
			const database = getFirestore();

			database
				.collection("GalkLabJobs")
				.doc(jobId)
				.delete()
				.then(() => {
					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							galkLabJobsIds: listAfterDelete.map((x) => x.jobId),
						})
						.then(() => {
							dispatch({
								type: actionType.DELETE_GALK_JOB_TO_SHOW,
								payload: [...listAfterDelete],
							});
							dispatch({
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Error while deleting data:", err);
							message.error("Data delete error");
							dispatch({
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Error while deleting data:", err);
					message.error("Data delete error");
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
						payload: false,
					});
				});
		};
export const approveInternshipJobToShow =
	(jobId, statusToUpdate) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
				payload: true,
			});

			const database = getFirestore();

			database
				.collection("InternshipJobs")
				.doc(jobId)
				.update({
					status: statusToUpdate,
				})
				.then(() => {
					dispatch({
						type: actionType.SET_INTERNSHIP_JOB_TO_SHOW_STATUS,
						payload: {
							jobId,
							status: statusToUpdate,
						},
					});
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Error while deleting data:", err);
					message.error("Data delete error");
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
						payload: false,
					});
				});
		};
export const approveGalkJobToShow =
	(jobId, statusToUpdate) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
				payload: true,
			});

			const database = getFirestore();

			database
				.collection("GalkLabJobs")
				.doc(jobId)
				.update({
					status: statusToUpdate,
				})
				.then(() => {
					dispatch({
						type: actionType.SET_GALK_JOB_TO_SHOW_STATUS,
						payload: {
							jobId,
							status: statusToUpdate,
						},
					});
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Error while deleting data:", err);
					message.error("Data delete error");
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
						payload: false,
					});
				});
		};
export const updateInternshipJobToShow =
	(updatedData) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
				payload: true,
			});

			const jobId = updatedData.jobId;
			const attachmentFile = updatedData.attachmentFileObject;
			const database = getFirestore();
			const storage = getFirebase().storage();

			if (attachmentFile) {
				storage
					.ref()
					.child(`InternshipJobAttachment/${jobId}`)
					.put(attachmentFile, { contentType: attachmentFile.type })
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
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
								payload: false,
							});
						},
						() => {
							storage
								.ref()
								.child(`InternshipJobAttachment/${jobId}`)
								.getDownloadURL()
								.then((url) => {
									database
										.collection("InternshipJobs")
										.doc(jobId)
										.update({
											attachmentURL: url,
											title: updatedData.title,
											description: updatedData.description,
											location: updatedData.location,
											skills: updatedData.skills,
											optionalSkills: updatedData.optionalSkills || [],
										})
										.then(() => {
											dispatch({
												type: actionType.UPDATE_INTERNSHIP_JOB_TO_SHOW,
												payload: {
													jobId: jobId,
													attachmentURL: url,
													title: updatedData.title,
													description: updatedData.description,
													location: updatedData.location,
													skills: updatedData.skills,
													optionalSkills: updatedData.optionalSkills || [],
												},
											});
											dispatch({
												type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
												payload: false,
											});
										})
										.catch((err) => {
											console.log("Error while updating data:", err);
											message.error("Error updating data");
											dispatch({
												type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
												payload: false,
											});
										});
								})
								.catch((err) => {
									console.log("Error while updating data:", err);
									message.error("Error updating data");
									dispatch({
										type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
										payload: false,
									});
								});
						}
					);
			} else {
				database
					.collection("InternshipJobs")
					.doc(jobId)
					.update({
						title: updatedData.title,
						description: updatedData.description,
						location: updatedData.location,
						skills: updatedData.skills,
						optionalSkills: updatedData.optionalSkills || [],
					})
					.then(() => {
						dispatch({
							type: actionType.UPDATE_INTERNSHIP_JOB_TO_SHOW,
							payload: {
								jobId: jobId,
								attachmentURL: null,
								title: updatedData.title,
								description: updatedData.description,
								location: updatedData.location,
								skills: updatedData.skills,
								optionalSkills: updatedData.optionalSkills || [],
							},
						});
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
							payload: false,
						});
					})
					.catch((err) => {
						console.log("Error while updating data:", err);
						message.error("Error updating data");
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
							payload: false,
						});
					});
			}
		};
export const updateGalkJobToShow =
	(updatedData) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
				payload: true,
			});

			const jobId = updatedData.jobId;
			const attachmentFile = updatedData.attachmentFileObject;
			const database = getFirestore();
			const storage = getFirebase().storage();

			if (attachmentFile) {
				storage
					.ref()
					.child(`GalkLabJobAttachment/${jobId}`)
					.put(attachmentFile, { contentType: attachmentFile.type })
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
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
								payload: false,
							});
						},
						() => {
							storage
								.ref()
								.child(`GalkLabJobAttachment/${jobId}`)
								.getDownloadURL()
								.then((url) => {
									database
										.collection("GalkLabJobs")
										.doc(jobId)
										.update({
											attachmentURL: url,
											title: updatedData.title,
											description: updatedData.description,
											location: updatedData.location,
											skills: updatedData.skills,
											optionalSkills: updatedData.optionalSkills || [],
											requiredEngineerCount: updatedData.requiredEngineerCount,
										})
										.then(() => {
											dispatch({
												type: actionType.UPDATE_GALK_JOB_TO_SHOW,
												payload: {
													jobId: jobId,
													attachmentURL: url,
													title: updatedData.title,
													description: updatedData.description,
													location: updatedData.location,
													skills: updatedData.skills,
													optionalSkills: updatedData.optionalSkills || [],
													requiredEngineerCount:
														updatedData.requiredEngineerCount,
												},
											});
											dispatch({
												type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
												payload: false,
											});
										})
										.catch((err) => {
											console.log("Error while updating data:", err);
											message.error("Error updating data");
											dispatch({
												type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
												payload: false,
											});
										});
								})
								.catch((err) => {
									console.log("Error while updating data:", err);
									message.error("Error updating data");
									dispatch({
										type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
										payload: false,
									});
								});
						}
					);
			} else {
				database
					.collection("GalkLabJobs")
					.doc(jobId)
					.update({
						title: updatedData.title,
						description: updatedData.description,
						location: updatedData.location,
						skills: updatedData.skills,
						optionalSkills: updatedData.optionalSkills || [],
						requiredEngineerCount: updatedData.requiredEngineerCount,
					})
					.then(() => {
						dispatch({
							type: actionType.UPDATE_GALK_JOB_TO_SHOW,
							payload: {
								jobId: jobId,
								attachmentURL: null,
								title: updatedData.title,
								description: updatedData.description,
								location: updatedData.location,
								skills: updatedData.skills,
								optionalSkills: updatedData.optionalSkills || [],
								requiredEngineerCount: updatedData.requiredEngineerCount,
							},
						});
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
							payload: false,
						});
					})
					.catch((err) => {
						console.log("Error while updating data:", err);
						message.error("Error updating data");
						dispatch({
							type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
							payload: false,
						});
					});
			}
		};
export const createInternshipJobToShow =
	(newData) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
				payload: true,
			});

			const attachmentFile = newData.attachmentFileObject;
			const database = getFirestore();
			const storage = getFirebase().storage();
			const companyId = getState().company.companyToShow.id;

			const newInternshipJob = {
				jobId: "",
				companyId: companyId,
				title: newData.title,
				description: newData.description,
				attachmentURL: "",
				skills: newData.skills,
				location: newData.location,
				optionalSkills: newData.optionalSkills || [],
				status: "pendingApproval",
				createDate: moment().format("LL"),
				jobEndDate: "",
				candidateAssignedList: [],
				openCandidateInterestList: [],
				createdBy: "Admin",
			};

			let newJobId;

			database
				.collection("InternshipJobs")
				.add(newInternshipJob)
				.then((doc) => {
					newJobId = doc.id;

					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							internshipJobsIds: database.FieldValue.arrayUnion(newJobId),
						})
						.then(() => {
							database
								.collection("InternshipJobs")
								.doc(newJobId)
								.update({
									jobId: newJobId,
								})
								.then(() => {
									if (attachmentFile) {
										storage
											.ref()
											.child(`InternshipJobAttachment/${newJobId}`)
											.put(attachmentFile, { contentType: attachmentFile.type })
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
														type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
														payload: false,
													});
												},
												() => {
													storage
														.ref()
														.child(`InternshipJobAttachment/${newJobId}`)
														.getDownloadURL()
														.then((url) => {
															database
																.collection("InternshipJobs")
																.doc(newJobId)
																.update({
																	attachmentURL: url,
																})
																.then(() => {
																	dispatch({
																		type: actionType.ADD_INTERNSHIP_JOB_TO_SHOW,
																		payload: {
																			...newInternshipJob,
																			jobId: newJobId,
																			attachmentURL: url,
																		},
																	});
																	dispatch({
																		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
																		payload: false,
																	});
																})
																.catch((err) => {
																	console.log("Error while adding data:", err);
																	message.error("Error adding data");
																	dispatch({
																		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
																		payload: false,
																	});
																});
														})
														.catch((err) => {
															console.log("Error while adding data:", err);
															message.error("Error adding data");
															dispatch({
																type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
																payload: false,
															});
														});
												}
											);
									} else {
										dispatch({
											type: actionType.ADD_INTERNSHIP_JOB_TO_SHOW,
											payload: {
												...newInternshipJob,
												jobId: newJobId,
											},
										});
										dispatch({
											type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
											payload: false,
										});
									}
								})
								.catch((err) => {
									console.log("Error while adding data:", err);
									message.error("Error adding data");
									dispatch({
										type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
										payload: false,
									});
								});
						})
						.catch((err) => {
							console.log("Error while adding data:", err);
							message.error("Error adding data");
							dispatch({
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Error while adding data:", err);
					message.error("Error adding data");
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW,
						payload: false,
					});
				});
		};
export const createGalkJobToShow =
	(newData) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
				payload: true,
			});

			const attachmentFile = newData.attachmentFileObject;
			const database = getFirestore();
			const storage = getFirebase().storage();
			const companyId = getState().company.companyToShow.id;

			const newGalkLabJob = {
				jobId: "",
				companyId: companyId,
				title: newData.title,
				description: newData.description,
				attachmentURL: "",
				skills: newData.skills,
				location: newData.location,
				optionalSkills: newData.optionalSkills || [],
				status: "pendingApproval",
				createDate: moment().format("LL"),
				jobEndDate: "",
				candidateAssignedList: [],
				openCandidateInterestList: [],
				createdBy: "Admin",
				requiredEngineerCount: newData.requiredEngineerCount,
			};

			let newJobId;

			database
				.collection("GalkLabJobs")
				.add(newGalkLabJob)
				.then((doc) => {
					newJobId = doc.id;

					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							galkLabJobsIds: database.FieldValue.arrayUnion(newJobId),
						})
						.then(() => {
							database
								.collection("GalkLabJobs")
								.doc(newJobId)
								.update({
									jobId: newJobId,
								})
								.then(() => {
									if (attachmentFile) {
										storage
											.ref()
											.child(`GalkLabJobAttachment/${newJobId}`)
											.put(attachmentFile, { contentType: attachmentFile.type })
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
														type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
														payload: false,
													});
												},
												() => {
													storage
														.ref()
														.child(`GalkLabJobAttachment/${newJobId}`)
														.getDownloadURL()
														.then((url) => {
															database
																.collection("GalkLabJobs")
																.doc(newJobId)
																.update({
																	attachmentURL: url,
																})
																.then(() => {
																	dispatch({
																		type: actionType.ADD_GALK_JOB_TO_SHOW,
																		payload: {
																			...newGalkLabJob,
																			jobId: newJobId,
																			attachmentURL: url,
																		},
																	});
																	dispatch({
																		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
																		payload: false,
																	});
																})
																.catch((err) => {
																	console.log("Error while adding data:", err);
																	message.error("Error adding data");
																	dispatch({
																		type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
																		payload: false,
																	});
																});
														})
														.catch((err) => {
															console.log("Error while adding data:", err);
															message.error("Error adding data");
															dispatch({
																type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
																payload: false,
															});
														});
												}
											);
									} else {
										dispatch({
											type: actionType.ADD_GALK_JOB_TO_SHOW,
											payload: {
												...newGalkLabJob,
												jobId: newJobId,
											},
										});
										dispatch({
											type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
											payload: false,
										});
									}
								})
								.catch((err) => {
									console.log("Error while adding data:", err);
									message.error("Error adding data");
									dispatch({
										type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
										payload: false,
									});
								});
						})
						.catch((err) => {
							console.log("Error while adding data:", err);
							message.error("Error adding data");
							dispatch({
								type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Error while adding data:", err);
					message.error("Error adding data");
					dispatch({
						type: actionType.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW,
						payload: false,
					});
				});
		};

export const getTaggedThirdYearStudentList =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_THIRDYEAR_TAGGED_STUDENT_LIST_LOADING,
				payload: true,
			});

			const database = getFirestore();
			const companyId = getState().company.companyToShow.id;

			let _allStudentArray = [];

			const admissionYearForThirdYearStudents =
				getAdmissionYearForThirdYearStudents();
			const admissionYearForFourthYearStudents =
				getAdmissionYearForFourthYearStudents();

			database
				.collection("StudentProfile")
				.where("active", "==", true)
				// .where(
				// 	"yearOfAdmission",
				// 	"==",
				// 	admissionYearForThirdYearStudents.toString()
				// )
				.where("yearOfAdmission", "in", [
					admissionYearForThirdYearStudents.toString(),
					admissionYearForFourthYearStudents.toString(),
				])
				.get()
				.then((querySnapshot) => {
					//make all student data array
					querySnapshot.forEach((doc) => {
						_allStudentArray.push(doc.data());
					});
					//Filter out tagged students by companyId
					let _taggedStudentList = _allStudentArray.filter((student) => {
						if (student.taggedCompanies) {
							var found = student.taggedCompanies.find((taggedCompanies) => {
								return taggedCompanies.key === companyId;
							});
							return found ? true : false;
						}
						return false;
					});

					dispatch({
						type: actionType.SET_THIRD_YEAR_STUDENT_META,
						payload: [
							..._allStudentArray.map((x) => {
								let studentMeta = {
									id: x.id,
									name: x.name,
									branchName: x.branchName,
									collegeName: x.collegeName,
									email: x.email,
									gender: x.gender,
									img: x.img,
									skills: x.skills,
								};
								return studentMeta;
							}),
						],
					});
					dispatch({
						type: actionType.GET_THIRDYEAR_TAGGED_STUDENT_LIST,
						payload: [..._taggedStudentList],
					});
					dispatch({
						type: actionType.SET_THIRDYEAR_TAGGED_STUDENT_LIST_LOADING,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Tagged third year student load error: ", err);
					message.error("Error while loading data !");
					dispatch({
						type: actionType.SET_THIRDYEAR_TAGGED_STUDENT_LIST_LOADING,
						payload: false,
					});
				});
		};

export const getTaggedGalkLabStudentList =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_GALK_TAGGED_STUDENT_LIST_LOADING,
				payload: true,
			});

			const database = getFirestore();
			const companyId = getState().company.companyToShow.id;

			database
				.collection("CompanyProfile")
				.doc(companyId)
				.get()
				.then((doc) => {
					let companyDetails = doc.data();
					let _taggedStudents = companyDetails.taggedCandidatesForGalkLab
						? companyDetails.taggedCandidatesForGalkLab
						: [];
					_taggedStudents.map((x, i) => {
						database
							.collection("StudentProfile")
							.doc(x)
							.get()
							.then((doc) => {
								_taggedStudents[i] = doc.data();
								if (i === _taggedStudents.length - 1) {
									dispatch({
										type: actionType.GET_GALK_TAGGED_STUDENT_LIST,
										payload: [..._taggedStudents],
									});
									dispatch({
										type: actionType.SET_GALK_TAGGED_STUDENT_LIST_LOADING,
										payload: false,
									});
								}
							});
					});
					if (_taggedStudents.length === 0) {
						dispatch({
							type: actionType.GET_GALK_TAGGED_STUDENT_LIST,
							payload: [..._taggedStudents],
						});
						dispatch({
							type: actionType.SET_GALK_TAGGED_STUDENT_LIST_LOADING,
							payload: false,
						});
					}
				})
				.catch((err) => {
					console.log("Tagged Galk student load error: ", err);
					message.error("Error while loading data !");
					dispatch({
						type: actionType.SET_GALK_TAGGED_STUDENT_LIST_LOADING,
						payload: false,
					});
				});
		};
export const requestStudentForInterview =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
				payload: true,
			});

			const state = getState();
			const companyId = state.company.companyToShow.id;
			const companyName = state.company.companyToShow.name;
			const database = getFirestore();

			database
				.collection("StudentProfile")
				.doc(studentId)
				.update({
					interviewCount: firebase.firestore.FieldValue.arrayUnion({
						key: companyId,
						label: companyName,
					}),
				})
				.then(() => {
					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							interviewRequestedCandidateForInternship:
								firebase.firestore.FieldValue.arrayUnion({
									candidateId: studentId,
									actionBy: "Admin",
									actionByName: "Admin",
									actionDate: moment().format("LL"),
								}),
						})
						.then(() => {
							dispatch({
								type: actionType.REQUEST_INTERVIEW_FOR_THIRD_YEAR,
								payload: {
									studentIdToUdate: studentId,
									updateForStudent: {
										key: companyId,
										label: companyName,
									},
									updateForCompany: {
										candidateId: studentId,
										actionBy: "Admin",
										actionByName: "Admin",
										actionDate: moment().format("LL"),
									},
								},
							});
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Interview request error:", err);
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Interview request error:", err);
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
						payload: false,
					});
				});
		};

export const requestGALKStudentForInterview =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
				payload: true,
			});

			const state = getState();
			const companyId = state.company.companyToShow.id;
			const companyName = state.company.companyToShow.name;
			const database = getFirestore();

			database
				.collection("StudentProfile")
				.doc(studentId)
				.update({
					interviewCount: firebase.firestore.FieldValue.arrayUnion({
						key: companyId,
						label: companyName,
					}),
				})
				.then(() => {
					database
						.collection("CompanyProfile")
						.doc(companyId)
						.update({
							interviewRequestedCandidateForGALKLab:
								firebase.firestore.FieldValue.arrayUnion({
									candidateId: studentId,
									actionBy: "Admin",
									actionByName: "Admin",
									actionDate: moment().format("LL"),
								}),
						})
						.then(() => {
							dispatch({
								type: actionType.REQUEST_INTERVIEW_FOR_GALK_LAB,
								payload: {
									studentIdToUdate: studentId,
									updateForStudent: {
										key: companyId,
										label: companyName,
									},
									updateForCompany: {
										candidateId: studentId,
										actionBy: "Admin",
										actionByName: "Admin",
										actionDate: moment().format("LL"),
									},
								},
							});
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Interview request error:", err);
							dispatch({
								type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Interview request error:", err);
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
						payload: false,
					});
				});
		};

export const getStudentListInInterviewPanel =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
				payload: true,
			});

			const admissionYearForThirdYearStudents =
				getAdmissionYearForThirdYearStudents().toString();
			const admissionYearForFourthYearStudents =
				getAdmissionYearForFourthYearStudents().toString();

			const database = getFirestore();

			const studentListInInterviewPanel =
				getState().company.companyToShow
					.interviewRequestedCandidateForInternship || [];

			const extractedIdList = studentListInInterviewPanel.map(
				(x) => x.candidateId
			);
			const splittedBy10StudentArr = splitArrayByNoOfElement(extractedIdList, 10);

			if (splittedBy10StudentArr.length > 0) {
				const arrLength = splittedBy10StudentArr.length;

				let counter = 0;

				splittedBy10StudentArr.forEach((x) => {
					counter = counter + 1;
					database
						.collection("StudentProfile")
						.where("id", "in", x)
						.get()
						.then((querySnapshot) => {
							let _allStudentArr = [];
							let _thirdYear = [];
							let _fourthYear = [];

							querySnapshot.forEach((doc) => {
								_allStudentArr.push(doc.data());
							});

							_allStudentArr.forEach((x) => {
								if (x.yearOfAdmission === admissionYearForThirdYearStudents) {
									_thirdYear.push(x);
								}
								if (x.yearOfAdmission === admissionYearForFourthYearStudents) {
									_fourthYear.push(x);
								}
							});

							dispatch({
								type: actionType.GET_INTERVIEW_PANEL_LIST,
								payload: {
									thirdYear: _thirdYear,
									fourthYear: _fourthYear,
								},
							});

							if (counter === arrLength) {
								dispatch({
									type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
									payload: false,
								});
							}
						})
						.catch((err) => {
							console.log("Students in interview panel load error:", err);
							dispatch({
								type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
								payload: false,
							});
						});
				});
			} else {
				dispatch({
					type: actionType.GET_INTERVIEW_PANEL_LIST,
					payload: {
						thirdYear: [],
						fourthYear: [],
					},
				});
				dispatch({
					type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
					payload: false,
				});
			}
		};

export const getGalkLabStudentListInInterviewPanel =
	() =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
				payload: true,
			});

			const database = getFirestore();

			const studentListInInterviewPanel =
				getState().company.companyToShow.interviewRequestedCandidateForGalkLab ||
				[];
			const extractedIdList = studentListInInterviewPanel.map(
				(x) => x.candidateId
			);
			const splittedBy10StudentArr = splitArrayByNoOfElement(extractedIdList, 10);

			if (splittedBy10StudentArr.length > 0) {
				const arrLength = splittedBy10StudentArr.length;

				let counter = 0;

				splittedBy10StudentArr.forEach((x) => {
					counter = counter + 1;
					database
						.collection("StudentProfile")
						.where("id", "in", x)
						.get()
						.then((querySnapshot) => {
							let _allStudentArr = [];

							querySnapshot.forEach((doc) => {
								_allStudentArr.push(doc.data());
							});

							dispatch({
								type: actionType.GET_GALK_INTERVIEW_PANEL_LIST,
								payload: {
									galkLabStudentList: _allStudentArr,
								},
							});

							if (counter === arrLength) {
								dispatch({
									type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
									payload: false,
								});
							}
						})
						.catch((err) => {
							console.log("Students in interview panel load error:", err);
							dispatch({
								type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
								payload: false,
							});
						});
				});
			} else {
				dispatch({
					type: actionType.GET_GALK_INTERVIEW_PANEL_LIST,
					payload: {
						galkLabStudentList: [],
					},
				});
				dispatch({
					type: actionType.SET_INTERVIEW_PANEL_LIST_LOADING,
					payload: false,
				});
			}
		};

export const getStudentDetails =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_STUDENT_TO_SHOW_DETAILS_LOADING,
				payload: true,
			});

			const database = getFirestore();

			database
				.collection("StudentProfile")
				.doc(studentId)
				.get()
				.then((doc) => {
					let studentDetails = doc.data();
					dispatch({
						type: actionType.GET_STUDENT_TO_SHOW_DETAILS,
						payload: studentDetails ? { ...studentDetails } : {},
					});
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_DETAILS_LOADING,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Error fetching company details:", err);
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_DETAILS_LOADING,
						payload: false,
					});
				});
		};

export const resetStudentToShowDetails = () => (dispatch) => {
	// dispatch({ type: actionType.RESET_STUDENT_TO_SHOW_DETAILS });
};

export const selectStudentForomInterviewPanel =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
				payload: true,
			});

			const state = getState();

			const companyId = state.company.companyToShow.id;
			const companyName = state.company.companyToShow.name;

			const database = getFirestore();

			database
				.collection("StudentProfile")
				.doc(studentId)
				.update({
					selectedByCompany: {
						id: companyId,
						name: companyName,
					},
					taggedCompanies: [
						{
							key: companyId,
							label: companyName,
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
									company.id !== companyId &&
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
								if (company.id === companyId) {
									database
										.collection("CompanyProfile")
										.doc(companyId)
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
								type: actionType.SELECT_STUDENT_FORM_INTERVIEW_PANEL,
								payload: {
									studentIdToUdate: studentId,
									updateForStudent: {
										id: companyId,
										name: companyName,
									},
									updateForCompany: {
										candidateId: studentId,
										actionBy: "Admin",
										actionByName: "Admin",
										actionDate: moment().format("LL"),
									},
								},
							});
							dispatch({
								type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Select candidate for internship error:", err);
							dispatch({
								type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Interview request error:", err);
					dispatch({
						type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
						payload: false,
					});
				});
		};

export const selectGALKLabStudentFromInterviewPanel =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
				payload: true,
			});

			const state = getState();

			const companyId = state.company.companyToShow.id;
			const companyName = state.company.companyToShow.name;

			const database = getFirestore();

			database
				.collection("StudentProfile")
				.doc(studentId)
				.update({
					selectedByGALKLabCompany: {
						id: companyId,
						name: companyName,
					},
				})
				.then(() => {
					database
						.collection("CompanyProfile")
						.get()
						.then(() => {
							database
								.collection("CompanyProfile")
								.doc(companyId)
								.update({
									selectedCandidateForGalkLab: database.FieldValue.arrayUnion({
										candidateId: studentId,
										actionBy: "Admin",
										actionByName: "Admin",
										actionDate: moment().format("LL"),
									}),
								});

							dispatch({
								type: actionType.SELECT_GALK_STUDENT_FORM_INTERVIEW_PANEL,
								payload: {
									studentIdToUdate: studentId,
									updateForStudent: {
										id: companyId,
										name: companyName,
									},
									updateForCompany: {
										candidateId: studentId,
										actionBy: "Admin",
										actionByName: "Admin",
										actionDate: moment().format("LL"),
									},
								},
							});
							dispatch({
								type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Select candidate for internship error:", err);
							dispatch({
								type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Interview request error:", err);
					dispatch({
						type: actionType.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS,
						payload: false,
					});
				});
		};

export const updateTaggedStudents =
	(taggedStudentArray) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
				payload: true,
			});

			const state = getState();
			const companyId = state.company.companyToShow.id;
			const companyName = state.company.companyToShow.name;
			const database = getFirestore();

			database
				.collection("CompanyProfile")
				.doc(companyId)
				.update({
					taggedCandidatesForInternship: taggedStudentArray.map((x) => x.key),
				})
				.then(() => {
					let _oldTaggedStudentIds =
						state.company.companyToShow.taggedCandidatesForInternship;
					let _newTaggedStudentIds = taggedStudentArray.map((x) => x.key);

					let _newlyAddedStudentIdList = _newTaggedStudentIds.filter(
						(x) => !_oldTaggedStudentIds.includes(x)
					);

					var _differenceInIdArray = _oldTaggedStudentIds
						.filter((x) => !_newTaggedStudentIds.includes(x))
						.concat(_newlyAddedStudentIdList);

					if (_differenceInIdArray.length > 0) {
						_differenceInIdArray.forEach((studentId) => {
							if (_oldTaggedStudentIds.includes(studentId)) {
								//Means this student is untagged for this company
								database
									.collection("StudentProfile")
									.doc(studentId)
									.update({
										taggedCompanies: firebase.firestore.FieldValue.arrayRemove({
											key: companyId,
											label: companyName,
											value: companyId
										}),
									});
							}
							if (_newTaggedStudentIds.includes(studentId)) {
								//Means this student is newly tagged for this company
								database
									.collection("StudentProfile")
									.doc(studentId)
									.update({
										taggedCompanies: firebase.firestore.FieldValue.arrayUnion({
											key: companyId,
											label: companyName,
											value: companyId
										}),
									})
									.then(() => {
										//Code to send email
										// const { name, nameInEnglish, email } = doc.data();
										// axios.post(
										// 	"https://us-central1-piit-52003.cloudfunctions.net/sendStudentTagNotificationToCompanyFromAdmin",
										// 	{
										// 		companyName: `${companyName} ${
										// 			companyNameInEnglish && "/ " + companyNameInEnglish
										// 		}`,
										// 		companyEmail: companyEmail,
										// 		studentName: _studentName,
										// 		studentCollege: _studentCollege,
										// 	}
										// );
									});
							}
						});
					}
					dispatch(getTaggedThirdYearStudentList());

					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Tag update error:", err);
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
						payload: false,
					});
				});
		};

export const updateTaggedGalkLabStudents =
	(taggedStudentArray) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
				payload: true,
			});

			const state = getState();
			const companyId = state.company.companyToShow.id;
			const companyName = state.company.companyToShow.name;
			const database = getFirestore();

			database
				.collection("CompanyProfile")
				.doc(companyId)
				.update({
					taggedCandidatesForGalkLab: taggedStudentArray.map((x) => x.key),
				})
				.then(() => {
					let _oldTaggedStudentIds =
						state.company.companyToShow.taggedCandidatesForGalkLab;
					let _newTaggedStudentIds = taggedStudentArray.map((x) => x.key);

					let _newlyAddedStudentIdList = _newTaggedStudentIds.filter(
						(x) => !_oldTaggedStudentIds.includes(x)
					);

					var _differenceInIdArray = _oldTaggedStudentIds
						.filter((x) => !_newTaggedStudentIds.includes(x))
						.concat(_newlyAddedStudentIdList);

					if (_differenceInIdArray.length > 0) {
						_differenceInIdArray.forEach((studentId) => {
							if (_oldTaggedStudentIds.includes(studentId)) {
								//Means this student is untagged for this company
								database
									.collection("StudentProfile")
									.doc(studentId)
									.update({
										taggedCompaniesForGalkLab:
											firebase.firestore.FieldValue.arrayRemove({
												key: companyId,
												label: companyName,
												value: companyId
											}),
									});
							}
							if (_newTaggedStudentIds.includes(studentId)) {
								//Means this student is newly tagged for this company
								database
									.collection("StudentProfile")
									.doc(studentId)
									.update({
										taggedCompaniesForGalkLab:
											firebase.firestore.FieldValue.arrayUnion({
												key: companyId,
												label: companyName,
												value: companyId
											}),
									});
							}
						});
					}
					dispatch(getTaggedGalkLabStudentList());

					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
						payload: false,
					});
				})
				.catch((err) => {
					console.log("Tag update error:", err);
					dispatch({
						type: actionType.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS,
						payload: false,
					});
				});
		};

export const assignMentorsInProject =
	(jobId, mentorId) => (dispatch, getState) => {
		//const companyId = getState().company.company.id;
		dispatch({ type: actionType.GALK_LAB_MENTOR_ASSIGN_PROCESSING });
		database
			.collection("GalkLabJobs")
			.doc(jobId)
			.update({
				assignedMentors: firebase.firestore.FieldValue.arrayUnion(mentorId),
			})
			.then((res) => {
				dispatch({
					type: actionType.UPDATE_GALK_LAB_MENTOR_ASSIGNED,
					payload: { mentorId, jobId },
				});
			})
			.catch((err) => {
				dispatch({ type: actionType.GALK_LAB_MENTOR_ASSIGN_FAILED });
			});
	};

export const removeTagForGalkLabStudent =
	(studentId) =>
		(dispatch, getState, { getFirebase, getFirestore }) => {
			dispatch({
				type: actionType.SET_GALKLAB_STUDENT_ACTION_IN_PROGRESS,
				payload: true,
			});

			const state = getState();
			const companyId = state.company.companyToShow.id;
			const companyName = state.company.companyToShow.name;
			const database = getFirestore();

			database
				.collection("CompanyProfile")
				.doc(companyId)
				.update({
					taggedCandidatesForGalkLab:
						firebase.firestore.FieldValue.arrayRemove(studentId),
				})
				.then(() => {
					database
						.collection("StudentProfile")
						.doc(studentId)
						.update({
							taggedCompaniesForGalkLab:
								firebase.firestore.FieldValue.arrayRemove({
									key: companyId,
									label: companyName,
								}),
						})
						.then(() => {
							dispatch(getTaggedGalkLabStudentList());
							dispatch({
								type: actionType.REMOVE_GALKLAB_STUDENT_TAG,
								payload: studentId,
							});
							dispatch({
								type: actionType.SET_GALKLAB_STUDENT_ACTION_IN_PROGRESS,
								payload: false,
							});
						})
						.catch((err) => {
							console.log("Tag update error:", err);
							dispatch({
								type: actionType.SET_GALKLAB_STUDENT_ACTION_IN_PROGRESS,
								payload: false,
							});
						});
				})
				.catch((err) => {
					console.log("Tag update error:", err);
					dispatch({
						type: actionType.SET_GALKLAB_STUDENT_ACTION_IN_PROGRESS,
						payload: false,
					});
				});
		};
