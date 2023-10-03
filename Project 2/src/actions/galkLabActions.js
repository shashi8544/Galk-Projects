import { database } from "../utils/configs/firebaseConfig";
import * as actionTypes from "./types";

export const getAllJobPostings = (candidateId) => (dispatch) => {
	dispatch({ type: actionTypes.GALKLAB_JOB_LOADING });

	let jobPostingArray = [];
	let groupedJobObject = {};

	database
		.collection("CompanyProfile")
		.where("taggedCandidatesForGalkLab", "array-contains", candidateId)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let _data = doc.data();
				if (_data.galkLabJobsIds && _data.galkLabJobsIds.length > 0) {
					groupedJobObject[`${_data.id}`] = {
						meta: {
							companyId: _data.id,
							companyName: _data.name,
							companyNameInEnglish: _data.nameInEnglish,
							companyLogo: _data.logo,
							companyIndustry: _data.industry,
							companyAddress: _data.address,
							companyWebsite: _data.website,
						},
						jobs: [],
					};
				}
			});

			database
				.collection("GalkLabJobs")
				.where("status", "==", "approved")
				.where("candidateAssignedList", "array-contains", candidateId)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						const _jobData = doc.data();

						if (Object.keys(groupedJobObject).includes(_jobData.companyId)) {
							groupedJobObject[`${_jobData.companyId}`].jobs.push({
								..._jobData,
							});
						}
					});
					for (const [key, value] of Object.entries(groupedJobObject)) {
						if (value.jobs.length > 0) {
							jobPostingArray.push(groupedJobObject[key]);
						}
					}

					dispatch({
						type: actionTypes.GET_GALKLAB_JOBS,
						payload: jobPostingArray,
					});
				})
				.catch((err) => {
					console.log("Job posting data load error: ", err);
					dispatch({ type: actionTypes.GALKLAB_JOB_LOAD_ERROR });
				});
		})
		.catch((err) => {
			console.log("Job posting data load error: ", err);
			dispatch({ type: actionTypes.GALKLAB_JOB_LOAD_ERROR });
		});
};


export const getAllJobs = () => (dispatch) => {
	dispatch({ type: actionTypes.GALKLAB_JOB_LOADING });

	let jobPostingArray = [];
	let groupedJobObject = {};

	database
		.collection("CompanyProfile")
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let _data = doc.data();
				if (_data.galkLabJobsIds && _data.galkLabJobsIds.length > 0) {
					groupedJobObject[`${_data.id}`] = {
						meta: {
							companyId: _data.id,
							companyName: _data.name,
							companyNameInEnglish: _data.nameInEnglish,
							companyLogo: _data.logo,
							companyIndustry: _data.industry,
							companyAddress: _data.address,
							companyWebsite: _data.website,
						},
						jobs: [],
					};
				}
			});

			database
				.collection("GalkLabJobs")
				.where("status", "==", "approved")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						const _jobData = doc.data();

						if (Object.keys(groupedJobObject).includes(_jobData.companyId)) {
							groupedJobObject[`${_jobData.companyId}`].jobs.push({
								..._jobData,
							});
						}
					});
					for (const [key, value] of Object.entries(groupedJobObject)) {
						if (value.jobs.length > 0) {
							jobPostingArray.push(groupedJobObject[key]);
						}
					}

					dispatch({
						type: actionTypes.GET_GALKLAB_ALL_JOBS,
						payload: jobPostingArray,
					});
				})
				.catch((err) => {
					console.log("Job posting data load error: ", err);
					dispatch({ type: actionTypes.GALKLAB_JOB_LOAD_ERROR });
				});
		})
		.catch((err) => {
			console.log("Job posting data load error: ", err);
			dispatch({ type: actionTypes.GALKLAB_JOB_LOAD_ERROR });
		});
};


export const getAllProjects = () =>  (dispatch) => {
    dispatch({ type: actionTypes.GALKRECRUIT_ALL_PROJECTS_LOADING });

    let allProjects = [];

    database
        .collection("InternshipJobs")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) =>{
                allProjects.push(doc.data());
            })
        
        dispatch({
            type: actionTypes.GET_GALKRECRUIT_ALL_PROJECTS,
            payload: allProjects,
        });

		dispatch({
            type: actionTypes.GALKRECRUIT_ALL_PROJECTS_LOADING,
            payload: false,
        });

    })
    .catch((err) => {
        console.log("All Projects data load error: ", err);
        dispatch({ type: actionTypes.GALKRECRUIT_ALL_PROJECTS_ERROR});
		dispatch({
            type: actionTypes.GALKRECRUIT_ALL_PROJECTS_LOADING,
            payload: false,
        });
    });

};


export const getConfidentProjects = (candidateId) =>  async (dispatch) => {
    dispatch({ type: actionTypes.GALKRECRUIT_CONFIDENT_PROJECTS_LOADING});
	let confidentProjectsList = [];
    await database
        .collection("StudentProfile")
		.doc(candidateId)
        .get()
        .then(async (studentDoc) => {
			 let confidentProjectsId = (studentDoc.data().confidentProjects || []);
			for (var i = 0; i < confidentProjectsId.length; i++){
				await database
				.collection("InternshipJobs")
				.doc(confidentProjectsId[i])
				.get()
				.then((confidentJobs) => {
					confidentProjectsList.push(confidentJobs.data());
				})
			}
			dispatch({
				type: actionTypes.GET_GALKRECRUIT_CONFIDENT_PROJECTS,
				payload: confidentProjectsList,
			});
	
			dispatch({
				type: actionTypes.GALKRECRUIT_CONFIDENT_PROJECTS_LOADING,
				payload: false,
			});
    	})
    .catch((err) => {
        console.log("Confident Projects data load error: ", err);
        dispatch({ type: actionTypes.GALKRECRUIT_CONFIDENT_PROJECTS_ERROR});
		dispatch({
            type: actionTypes.GALKRECRUIT_CONFIDENT_PROJECTS_LOADING,
            payload: false,
        });
    });

};


export const getShortlistedProjects = (candidateId) =>  (dispatch) => {
    dispatch({ type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_LOADING});

    let shortlistedProjects = [];

    database
        .collection("StudentProfile")
		.doc(candidateId)
        .get()
        .then(async (studentDoc) => {
			let shortlistedProjectsId = []
			shortlistedProjectsId.push(studentDoc.data().shortlistedProject || []);
			for (var i = 0; i < shortlistedProjectsId.length; i++){
				await database
				.collection("InternshipJobs")
				.doc(shortlistedProjectsId[i])
				.get()
				.then(async (shortlistJobs) => {
					shortlistedProjects.push(shortlistJobs.data());
				})
			}
			dispatch({
				type: actionTypes.GET_GALKRECRUIT_SHORTLISTED_PROJECTS,
				payload: shortlistedProjects,
			});
	
			dispatch({
				type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_LOADING,
				payload: false,
			});
    	})
    .catch((err) => {
        console.log("Shortlisted Projects data load error: ", err);
        dispatch({ type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_ERROR});
		dispatch({
            type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_LOADING,
            payload: false,
        });
    });

};


export const getShortlistedProjectsByCompany = (candidateId) =>  (dispatch) => {
    dispatch({ type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY_LOADING});

    let shortlistedProjectsByCompany = [];

    database
        .collection("StudentProfile")
		.doc(candidateId)
        .get()
        .then(async (studentDoc) => {
			let shortlistedProjectsByCompanyId = []
			shortlistedProjectsByCompanyId.push(studentDoc.data().shortlistedByCompany || []);
			console.log(studentDoc.data().shortlistedByCompany)
			for (var i = 0; i < shortlistedProjectsByCompanyId.length; i++){
				await database
				.collection("InternshipJobs")
				.doc(shortlistedProjectsByCompanyId[i])
				.get()
				.then(async (shortlistJobsByCompany) => {
					shortlistedProjectsByCompany.push(shortlistJobsByCompany.data());
				})
			}
			dispatch({
				type: actionTypes.GET_GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY,
				payload: shortlistedProjectsByCompany,
			});
	
			dispatch({
				type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY_LOADING,
				payload: false,
			});
    	})
    .catch((err) => {
        console.log("Shortlisted Projects By Company data load error: ", err);
        dispatch({ type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY_ERROR});
		dispatch({
            type: actionTypes.GALKRECRUIT_SHORTLISTED_PROJECTS_BY_COMPANY_LOADING,
            payload: false,
        });
    });

};


export const getMatchedJobs = (candidateId) => (dispatch) => {
	dispatch({ type: actionTypes.GALKLAB_JOB_LOADING });
	dispatch({
		type: actionTypes.GALKLAB_MATCHED_JOBS_LOADING,
		payload: true,
	});

	database
		.collection("StudentProfile")
		.doc(candidateId)
		.get()
		.then(async (studentDoc) => {
			let matchedJobsList = studentDoc.data().matchedJobs || [];

			for (var i = 0; i < matchedJobsList.length; i++) {
				await database
					.collection("GalkLabJobs")
					.doc(matchedJobsList[i])
					.get()
					.then(async (matchedJobDoc) => {
						let matchedJobData = matchedJobDoc.data();

						await database
							.collection("CompanyProfile")
							.doc(matchedJobData.companyId)
							.get()
							.then(async (companyDoc) => {
								let companyDetails = companyDoc.data();
								let allJobsIds = companyDetails.galkLabJobsIds;

								var allJobsDetails = [];
								for (var j = 0; j < allJobsIds.length; j++) {
									await database
										.collection("GalkLabJobs")
										.doc(allJobsIds[j])
										.get()
										.then((companyJobDoc) => {
											let companyJobData = companyJobDoc.data();

											allJobsDetails.push({
												title: companyJobData.title,
												skills: companyJobData.skills,
												numLikes: companyJobData.numLikes || 0,
												description: companyJobData.description,
												optionalSkills: companyJobData.optionalSkills,
												shortDescription:
													companyJobData.shortDescription ||
													"Short description of Project",

												companyName: companyDetails.name,
												companyLogo: companyDetails.logo,
												companyAddress:
													companyDetails.address || "Company Address",
												companyWebsite:
													companyDetails.website || "Company Website",
											});
										});
								}

								matchedJobsList[i] = {
									index: i,
									title: matchedJobData.title,
									skills: matchedJobData.skills,
									numLikes: matchedJobData.numLikes || 0,
									description: matchedJobData.description,
									optionalSkills: matchedJobData.optionalSkills,
									shortDescription:
										matchedJobData.shortDescription ||
										"Short description of Project",

									companyDetails: {
										logo: companyDetails.logo,
										name: companyDetails.name,
										address: companyDetails.address || "Company Address",
										website: companyDetails.website || "Company Website",
										industry: companyDetails.industry,
										coverPhoto: companyDetails.coverPhoto,
										nameInEnglish:
											companyDetails.nameInEnglish || "Company name in english",

										do: companyDetails.do,
										size: companyDetails.size || 0,
										vision: companyDetails.vision || "Company Vision",
										policy: companyDetails.policy || "Company Policy",
										culture: companyDetails.culture || "Company Culture",
										description: companyDetails.description || "Company About",
										commentFromWillings:
											companyDetails.commentFromWillings ||
											"Comment from Willings",

										allJobsDetails: allJobsDetails,
									},
								};
							});
					});
			}

			dispatch({
				type: actionTypes.GET_GALKLAB_MATCHED_JOBS,
				payload: matchedJobsList,
			});
			dispatch({
				type: actionTypes.GALKLAB_MATCHED_JOBS_LOADING,
				payload: false,
			});
		})
		.catch((err) => {
			console.log("Matched jobs data load error: ", err);
			dispatch({ type: actionTypes.GALKLAB_JOB_LOAD_ERROR });
			dispatch({
				type: actionTypes.GALKLAB_MATCHED_JOBS_LOADING,
				payload: false,
			});
		});
};