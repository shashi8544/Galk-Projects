import * as actionTypes from "../actions/types";

const initialState = {
	companyList: null,
	isCompanyListLoading: false,
	companyToShow: null,

	internshipJobListToShow: null,
	galkJobListToShow: null,
	isCompanyDetailsLoading: false,
	isInternshipJobListLoading: false,
	actionInProgress: false,
	internshipJobActionInProgress: false,
	galkJobActionInProgress: false,
	taggedThirdYearStudentList: null,
	taggedGalkLabStudentList: null,
	isThirdYearStudentListLoading: false,
	isGalkStudentListLoading: false,
	thirdYearStudentActionInProgress: false,
	galkLabStudentActionInProgress: false,

	interviewPanelThirdYearList: null,
	interviewPanelFourthYearList: null,
	interviewPanelGALKLabList: null,
	isInterviewPanelListLoading: false,
	interviewPanelActionInProgress: false,

	studentToShowDetails: null,
	studentToShowDetailsLoading: false,

	thirdYearStudentMeta: [],
	galkLabMentorAssigneProcessing: false,
};

const companyReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.GET_ALL_COMPANY_LIST:
			return {
				...state,
				companyList: payload,
				isCompanyListLoading: false,
			};
		case actionTypes.SET_COMPANY_LIST_LOADING:
			return {
				...state,
				isCompanyListLoading: payload,
			};
		case actionTypes.RESET_COMPANY_LIST:
			return {
				...state,
				companyList: null,
			};

		case actionTypes.GET_COMPANY_DETAILS:
			return {
				...state,
				companyToShow: payload,
				isCompanyDetailsLoading: false,
			};
		case actionTypes.SET_COMPANY_DETAILS_LOADING:
			return {
				...state,
				isCompanyDetailsLoading: payload,
			};
		case actionTypes.RESET_COMPANY_DETAILS:
			return {
				...state,
				companyToShow: null,
				internshipJobListToShow: null,
				galkJobListToShow: null,
				taggedThirdYearStudentList: null,
				taggedGalkLabStudentList: null,
				studentToShowDetails: null,
				interviewPanelThirdYearList: null,
				interviewPanelFourthYearList: null,
				interviewPanelGALKLabList: null,
			};
		case actionTypes.SET_ACTION_IN_PRROGRESS_FOR_COMPANY_PROFILE:
			return {
				...state,
				actionInProgress: payload,
			};
		case actionTypes.SET_COMPANY_PROFILE_LOGO:
			let _logo_companyToShow = state.companyToShow;
			let _logo_companyList = state.companyList;
			return {
				...state,
				companyToShow: {
					..._logo_companyToShow,
					logo: payload,
				},
				companyList: _logo_companyList
					? [
							..._logo_companyList.map((company) => {
								if (company.id === _logo_companyToShow.id) {
									company.logo = payload;
								}
							}),
					  ]
					: null,
			};
		case actionTypes.SET_COMPANY_PROFILE_COVER_PHOTO:
			let _coverPhoto_companyToShow = state.companyToShow;
			let _coverPhoto_companyList = state.companyList;
			return {
				...state,
				companyToShow: {
					..._coverPhoto_companyToShow,
					coverPhoto: payload,
				},
				companyList: _coverPhoto_companyList
					? [
							..._coverPhoto_companyList.map((company) => {
								if (company.id === _coverPhoto_companyToShow.id) {
									company.coverPhoto = payload;
								}
							}),
					  ]
					: null,
			};
		case actionTypes.UPDATE_COMPANY_BASIC_INFORMATION:
			let _basicInfo_companyToShow = state.companyToShow;
			let _basicInfo_companyList = state.companyList;
			return {
				...state,
				companyToShow: {
					..._basicInfo_companyToShow,
					...payload,
				},
				companyList: _basicInfo_companyList
					? [
							..._basicInfo_companyList.map((company) => {
								if (company.id === _basicInfo_companyToShow.id) {
									let companyDetails = { ...company };
									company = {
										...companyDetails,
										...payload,
									};
								}
							}),
					  ]
					: null,
			};
		case actionTypes.UPDATE_ACCOUNT_USER_AUTHORIZATION:
			let _teamMember_companyToShow = state.companyToShow;
			let _teamMember_companyList = state.companyList;
			return {
				...state,
				companyToShow: {
					..._teamMember_companyToShow,
					accountUserList: payload,
				},
				companyList: _teamMember_companyList
					? [
							..._teamMember_companyList.map((company) => {
								if (company.id === _teamMember_companyToShow.id) {
									let companyDetails = { ...company };
									company = {
										...companyDetails,
										accountUserList: payload,
									};
								}
							}),
					  ]
					: null,
			};

		case actionTypes.GET_INTERNSHIP_JOB_LIST_TO_SHOW:
			return {
				...state,
				internshipJobListToShow: state.internshipJobListToShow
					? [...state.internshipJobListToShow, ...payload]
					: [...payload],
			};
		case actionTypes.GET_GALK_JOB_LIST_TO_SHOW:
			return {
				...state,
				galkJobListToShow: state.galkJobListToShow
					? [...state.galkJobListToShow, ...payload]
					: [...payload],
			};
		case actionTypes.UPDATE_TIMESHEET_IN_GALKLAB_JOB:
			const jobListOld = state.galkJobListToShow?.map((elm) => {
				if (elm.jobId === payload.jobId) {
					const studentId = payload.studentId;
					const date = payload.selectedDate;
					const data = payload.updateObj;
					if (!elm.timesheet) {
						elm.timesheet = { [studentId]: { [date]: data } };
					} else if (!elm.timesheet[studentId]) {
						elm.timesheet[studentId] = { [date]: data };
					} else {
						elm.timesheet[studentId][date] = data;
					}
				}
				return elm;
			});
			return {
				...state,
				galkJobListToShow: jobListOld,
			};
		case actionTypes.APPROVE_TIMESHEET_WEEKLY_IN_GALKLAB:
			let updatedGalkLabJobList = state.galkJobListToShow?.map((elm) => {
				if (elm.jobId === payload.jobId) {
					const studentId = payload.studentId;
					const datesToApprove = payload.datesToApprove;

					let timeObject = {};
					datesToApprove.forEach((dt) => {
						const key = dt.key;
						timeObject[key] = { ...dt };
					});

					if (!elm.timesheet) {
						elm.timesheet = { [studentId]: { ...timeObject } };
					} else if (!elm.timesheet[studentId]) {
						elm.timesheet[studentId] = { ...timeObject };
					} else {
						datesToApprove.forEach((dt) => {
							const key = dt.key;
							elm.timesheet[studentId][key] = { ...dt };
						});
					}
				}
				return elm;
			});
			return {
				...state,
				galkJobListToShow: [...updatedGalkLabJobList],
			};
		case actionTypes.UPDATE_GALK_LAB_JOB_ASSIGNED_ENGINEER:
			const __jobList = state.galkJobListToShow?.map((elm) => {
				if (elm.jobId === payload.jobId) {
					elm.candidateAssignedList.push(payload.studentId);
					elm.assignedStudentCount++;
				}
				return elm;
			});
			return {
				...state,
				jobAssignProcessing: false,
				galkJobListToShow: __jobList,
				companyToShow: {
					...state.companyToShow,
					taggedCandidatesForGalkLab: [
						...state.companyToShow.taggedCandidatesForGalkLab,
						payload.studentId,
					],
				},
			};
		case actionTypes.GALK_LAB_MENTOR_ASSIGN_PROCESSING:
			return {
				...state,
				galkLabMentorAssigneProcessing: true,
			};
		case actionTypes.GALK_LAB_MENTOR_ASSIGN_FAILED:
			return {
				...state,
				galkLabMentorAssigneProcessing: false,
			};
		case actionTypes.UPDATE_ADD_REPO_IN_JOB:
			const temp = state.galkJobListToShow?.map((elm) => {
				if (elm.jobId === payload.jobId) {
					elm.repositoryUrl = payload.reporUrl;
					return elm;
				} else {
					return elm;
				}
			});
			return {
				...state,
				galkJobListToShow: temp,
			};
		case actionTypes.UPDATE_GALK_LAB_MENTOR_ASSIGNED:
			const newJobs = state.galkJobListToShow?.map((elm) => {
				if (elm.jobId === payload.jobId) {
					if (elm.assignedMentors) {
						elm.assignedMentors.push(payload.mentorId);
					} else elm.assignedMentors = [payload.mentorId];
					return elm;
				} else {
					return elm;
				}
			});
			return {
				...state,
				galkJobListToShow: newJobs,
				galkLabMentorAssigneProcessing: false,
			};
		case actionTypes.SET_INTERNSHIP_JOB_LIST_LOADING:
			return {
				...state,
				isInternshipJobListLoading: payload,
			};
		case actionTypes.SET_GALK_JOB_LIST_LOADING:
			return {
				...state,
				isGalkJobListLoading: payload,
			};
		case actionTypes.DELETE_INTERNSHIP_JOB_TO_SHOW:
			let _delete_internshipJob_companyToShow = state.companyToShow;
			return {
				...state,
				internshipJobListToShow: payload,
				companyToShow: {
					..._delete_internshipJob_companyToShow,
					internshipJobsIds: payload.map((x) => x.jobId),
				},
			};
		case actionTypes.DELETE_GALK_JOB_TO_SHOW:
			let _delete_galkJob_companyToShow = state.companyToShow;
			return {
				...state,
				galkJobListToShow: payload,
				companyToShow: {
					..._delete_galkJob_companyToShow,
					galkLabJobsIds: payload.map((x) => x.jobId),
				},
			};
		case actionTypes.UPDATE_INTERNSHIP_JOB_TO_SHOW:
			let existingJobList = state.internshipJobListToShow || [];
			let jobToUpdate = payload;
			existingJobList.forEach((x) => {
				if (x.jobId === jobToUpdate.jobId) {
					if (jobToUpdate.attachmentURL) {
						x.attachmentURL = jobToUpdate.attachmentURL;
					}
					x.title = jobToUpdate.title;
					x.description = jobToUpdate.description;
					x.location = jobToUpdate.location;
					x.skills = jobToUpdate.skills;
					x.optionalSkills = jobToUpdate.optionalSkills;
				}
			});
			return {
				...state,
				internshipJobListToShow: [...existingJobList],
			};
		case actionTypes.UPDATE_GALK_JOB_TO_SHOW:
			let existingGalkJobList = state.galkJobListToShow || [];
			let galkJobToUpdate = payload;
			existingGalkJobList.forEach((x) => {
				if (x.jobId === galkJobToUpdate.jobId) {
					if (galkJobToUpdate.attachmentURL) {
						x.attachmentURL = galkJobToUpdate.attachmentURL;
					}
					x.title = galkJobToUpdate.title;
					x.description = galkJobToUpdate.description;
					x.location = galkJobToUpdate.location;
					x.skills = galkJobToUpdate.skills;
					x.optionalSkills = galkJobToUpdate.optionalSkills;
					x.requiredEngineerCount = galkJobToUpdate.requiredEngineerCount;
				}
			});
			return {
				...state,
				galkJobListToShow: [...existingGalkJobList],
			};
		case actionTypes.UPDATE_GALK_LAB_JOB_UNASSIGNED:
			const _jobList = state.galkJobListToShow?.map((elm) => {
				if (elm.jobId === payload.jobId) {
					elm.candidateAssignedList = elm.candidateAssignedList.filter(
						(student) => student !== payload.studentId
					);
					elm.assignedStudentCount--;
				}
				return elm;
			});
			return {
				...state,
				galkJobListToShow: _jobList,
				jobAssignProcessing: false,
			};
		case actionTypes.UPDATE_GALK_LAB_JOB_ASSIGN_PORCESSING:
			return {
				...state,
				jobAssignProcessing: payload,
			};
		case actionTypes.ADD_INTERNSHIP_JOB_TO_SHOW:
			let _add_existingJobList = state.internshipJobListToShow || [];
			let _add_internshipJob_companyToShow = state.companyToShow;

			_add_existingJobList.unshift({ ...payload });
			return {
				...state,
				internshipJobListToShow: [..._add_existingJobList],
				companyToShow: {
					..._add_internshipJob_companyToShow,
					internshipJobsIds: [
						..._add_internshipJob_companyToShow.internshipJobsIds,
						payload.jobId,
					],
				},
			};
		case actionTypes.ADD_GALK_JOB_TO_SHOW:
			let _add_existingGalkJobList = state.galkJobListToShow || [];
			let _add_galkJob_companyToShow = state.companyToShow;

			_add_existingGalkJobList.unshift({ ...payload });
			return {
				...state,
				galkJobListToShow: [..._add_existingGalkJobList],
				companyToShow: {
					..._add_galkJob_companyToShow,
					galkJobsIds: [
						..._add_galkJob_companyToShow.galkLabJobsIds,
						payload.jobId,
					],
				},
			};
		case actionTypes.SET_ACTION_IN_PRROGRESS_FOR_INTERNSHIP_JOB_TO_SHOW:
			return {
				...state,
				internshipJobActionInProgress: payload,
			};
		case actionTypes.SET_ACTION_IN_PRROGRESS_FOR_GALK_JOB_TO_SHOW:
			return {
				...state,
				galkJobActionInProgress: payload,
			};
		case actionTypes.SET_INTERNSHIP_JOB_TO_SHOW_STATUS:
			return {
				...state,
				internshipJobListToShow: [
					...state.internshipJobListToShow.map((x) => {
						if (x.jobId === payload.jobId) {
							x.status = payload.status;
						}
						return x;
					}),
				],
			};
		case actionTypes.SET_GALK_JOB_TO_SHOW_STATUS:
			return {
				...state,
				galkJobListToShow: [
					...state.galkJobListToShow.map((x) => {
						if (x.jobId === payload.jobId) {
							x.status = payload.status;
						}
						return x;
					}),
				],
			};
		case actionTypes.REQUEST_INTERVIEW_FOR_THIRD_YEAR:
			let _oldInterviewRequestedList =
				state.companyToShow.interviewRequestedCandidateForInternship || [];

			let oldTaggedThirdYearStudents = state.taggedThirdYearStudentList
				? [...state.taggedThirdYearStudentList]
				: [];

			let updatedTaggedThirdYearStudents = oldTaggedThirdYearStudents.map(
				(x) => {
					if (x.id === payload.studentIdToUdate) {
						let existingInterviewCount = [...x.interviewCount] || [];
						let a = {
							...x,
							interviewCount: [
								...existingInterviewCount,
								payload.updateForStudent,
							],
						};
						return { ...a };
					}
					return x;
				}
			);

			const studentForWhomInterviewRequested =
				updatedTaggedThirdYearStudents.find(
					(x) => x.id === payload.studentIdToUdate
				);
			let oldThirdYearInterviewPanelList = state.interviewPanelThirdYearList
				? state.interviewPanelThirdYearList
				: [];

			let updatedThirdYearInterviewPanelList = [];
			if (oldThirdYearInterviewPanelList.length > 0) {
				if (
					oldThirdYearInterviewPanelList.findIndex(
						(x) => x.id === payload.studentIdToUpdate
					) !== -1
				) {
					updatedThirdYearInterviewPanelList =
						oldThirdYearInterviewPanelList.map((x) => {
							if (x.id === payload.studentIdToUdate) {
								let existingInterviewCount = [...x.interviewCount] || [];
								let e = {
									...x,
									interviewCount: [
										...existingInterviewCount,
										payload.updateForStudent,
									],
								};
								return { ...e };
							}
							return x;
						});
				} else {
					updatedThirdYearInterviewPanelList = [
						...oldThirdYearInterviewPanelList,
						{ ...studentForWhomInterviewRequested },
					];
				}
			} else {
				updatedThirdYearInterviewPanelList.push({
					...studentForWhomInterviewRequested,
				});
			}

			return {
				...state,
				taggedThirdYearStudentList: [...updatedTaggedThirdYearStudents],
				companyToShow: {
					...state.companyToShow,
					interviewRequestedCandidateForInternship: [
						..._oldInterviewRequestedList,
						payload.updateForCompany,
					],
				},
				interviewPanelThirdYearList: [...updatedThirdYearInterviewPanelList],
			};
		// Doesn't have any use right now but added just in case
		case actionTypes.REQUEST_INTERVIEW_FOR_GALK_LAB:
			let _oldGALKInterviewRequestedList =
				state.companyToShow.interviewRequestedCandidateForGALKLab || [];

			const galkStudentForWhomInterviewRequested =
				_oldGALKInterviewRequestedList.find(
					(x) => x.id === payload.studentIdToUpdate
				);
			let oldGALKInterviewPanelList = state.interviewPanelGALKLabList
				? state.interviewPanelGALKLabList
				: [];

			let updatedGALKInterviewPanelList = [];
			if (oldGALKInterviewPanelList.length > 0) {
				if (
					oldGALKInterviewPanelList.findIndex(
						(x) => x.id === payload.studentIdToUdate
					) !== -1
				) {
					updatedGALKInterviewPanelList = oldGALKInterviewPanelList.map((x) => {
						if (x.id === payload.studentIdToUdate) {
							let existingInterviewCount = [...x.interviewCount] || [];
							let e = {
								...x,
								interviewCount: [
									...existingInterviewCount,
									payload.updateForStudent,
								],
							};
							return { ...e };
						}
						return x;
					});
				} else {
					updatedGALKInterviewPanelList = [
						...oldGALKInterviewPanelList,
						{ ...galkStudentForWhomInterviewRequested },
					];
				}
			} else {
				updatedGALKInterviewPanelList.push({
					...galkStudentForWhomInterviewRequested,
				});
			}

			return {
				...state,
				companyToShow: {
					...state.companyToShow,
					interviewRequestedCandidateGALKLab: [
						..._oldGALKInterviewRequestedList,
						payload.updateForCompany,
					],
				},
				interviewPanelGALKLabList: [...updatedGALKInterviewPanelList],
			};
		case actionTypes.SET_THIRDYEAR_TAGGED_STUDENT_LIST_LOADING:
			return {
				...state,
				isThirdYearStudentListLoading: payload,
			};
		case actionTypes.SET_GALK_TAGGED_STUDENT_LIST_LOADING:
			return {
				...state,
				isGalkStudentListLoading: payload,
			};
		case actionTypes.GET_THIRDYEAR_TAGGED_STUDENT_LIST:
			return {
				...state,
				taggedThirdYearStudentList: payload,
			};
		case actionTypes.GET_GALK_TAGGED_STUDENT_LIST:
			return {
				...state,
				taggedGalkLabStudentList: payload,
			};

		case actionTypes.GET_INTERVIEW_PANEL_LIST:
			return {
				...state,
				interviewPanelThirdYearList: payload.thirdYear,
				interviewPanelFourthYearList: payload.fourthYear,
			};
		case actionTypes.GET_GALK_INTERVIEW_PANEL_LIST:
			return {
				...state,
				interviewPanelGALKLabList: payload.galkLabStudentList,
			};
		case actionTypes.SET_INTERVIEW_PANEL_ACTION_IN_PROGRESS:
			return {
				...state,
				interviewPanelActionInProgress: payload,
			};
		case actionTypes.SET_INTERVIEW_PANEL_LIST_LOADING:
			return {
				...state,
				isInterviewPanelListLoading: payload,
			};
		case actionTypes.SELECT_STUDENT_FORM_INTERVIEW_PANEL:
			let select_old_taggedStudentList = state.taggedThirdYearStudentList
				? [...state.taggedThirdYearStudentList]
				: [];
			let updated_select_old_taggedStudentList =
				select_old_taggedStudentList.map((x) => {
					if (x.id === payload.studentIdToUdate) {
						let b = {
							...x,
							selectedByCompany: { ...payload.updateForStudent },
							taggedCompanies: [
								{
									key: payload.updateForStudent.id,
									label: payload.updateForStudent.name,
								},
							],
						};
						return { ...b };
					}
					return x;
				});

			let select_old_interviewPanel_thirdYear_list =
				state.interviewPanelThirdYearList
					? [...state.interviewPanelThirdYearList]
					: [];
			let updated_select_old_interviewPanel_thirdYear_list =
				select_old_interviewPanel_thirdYear_list.map((x) => {
					if (x.id === payload.studentIdToUdate) {
						let c = {
							...x,
							selectedByCompany: { ...payload.updateForStudent },
							taggedCompanies: [
								{
									key: payload.updateForStudent.id,
									label: payload.updateForStudent.name,
								},
							],
						};
						return { ...c };
					}
					return x;
				});

			let select_old_interviewPanel_fourth_list =
				state.interviewPanelFourthYearList
					? [...state.interviewPanelFourthYearList]
					: [];
			let updated_select_old_interviewPanel_fourth_list =
				select_old_interviewPanel_fourth_list.map((x) => {
					if (x.id === payload.studentIdToUdate) {
						let d = {
							...x,
							selectedByCompany: { ...payload.updateForStudent },
							taggedCompanies: [
								{
									key: payload.updateForStudent.id,
									label: payload.updateForStudent.name,
								},
							],
						};
						return { ...d };
					}
					return x;
				});

			let select_oldInterviewRequestedList =
				state.companyToShow.selectedCandidateForInternship || [];

			return {
				...state,
				companyToShow: {
					...state.companyToShow,
					selectedCandidateForInternship: [
						...select_oldInterviewRequestedList,
						payload.updateForCompany,
					],
				},
				taggedThirdYearStudentList: [...updated_select_old_taggedStudentList],
				interviewPanelThirdYearList: [
					...updated_select_old_interviewPanel_thirdYear_list,
				],
				interviewPanelFourthYearList: [
					...updated_select_old_interviewPanel_fourth_list,
				],
			};

		case actionTypes.SELECT_GALK_STUDENT_FORM_INTERVIEW_PANEL:
			let select_old_interviewPanel_galkLab_list =
				state.interviewPanelGALKLabList
					? [...state.interviewPanelGALKLabList]
					: [];
			let updated_select_old_interviewPanel_galkLab_list =
				select_old_interviewPanel_galkLab_list.map((x) => {
					if (x.id === payload.studentIdToUdate) {
						let c = {
							...x,
							selectedByGALKLabCompany: { ...payload.updateForStudent },
						};
						return { ...c };
					}
					return x;
				});
			let select_oldGALKLabInterviewRequestedList =
				state.companyToShow.selectedCandidateForGalkLab || [];
			return {
				...state,
				companyToShow: {
					...state.companyToShow,
					selectedCandidateForGalkLab: [
						...select_oldGALKLabInterviewRequestedList,
						payload.updateForCompany,
					],
				},
				interviewPanelGALKLabList: [
					...updated_select_old_interviewPanel_galkLab_list,
				],
			};
		case actionTypes.GET_STUDENT_TO_SHOW_DETAILS:
			return {
				...state,
				studentToShowDetails: payload,
			};
		case actionTypes.SET_STUDENT_TO_SHOW_DETAILS_LOADING:
			return {
				...state,
				studentToShowDetailsLoading: payload,
			};
		case actionTypes.SET_STUDENT_TO_SHOW_ACTION_IN_PROGRESS:
			return {
				...state,
				thirdYearStudentActionInProgress: payload,
			};
		case actionTypes.SET_GALK_STUDENT_TO_SHOW_ACTION_IN_PROGRESS:
			return {
				...state,
				galkLabStudentActionInProgress: payload,
			};
		case actionTypes.SET_GALKLAB_STUDENT_ACTION_IN_PROGRESS:
			return {
				...state,
				galkLabStudentActionInProgress: payload,
			};
		case actionTypes.REMOVE_GALKLAB_STUDENT_TAG:
			return {
				...state,
				companyToShow: {
					...state.companyToShow,
					taggedCandidatesForGalkLab: [
						...state.companyToShow.taggedCandidatesForGalkLab,
					].filter((x) => x !== payload),
				},
				taggedGalkLabStudentList: [...state.taggedGalkLabStudentList].filter(
					(x) => x.id !== payload
				),
			};

		case actionTypes.SET_THIRD_YEAR_STUDENT_META:
			return {
				...state,
				thirdYearStudentMeta: payload,
			};
		default:
			return state;
	}
};

export default companyReducer;
