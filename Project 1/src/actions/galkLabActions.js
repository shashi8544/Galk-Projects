import {
    database,
} from "../utils/configs/firebaseConfig"
import * as actionTypes from "./types";
export const getAllJobPostings = (candidateId) => (dispatch) => {

    dispatch({ type: actionTypes.GALKLAB_JOB_LOADING });

    let _companyDataArray = [];
    let jobPostingArray = [];
    let groupedJobObject = {};

    database
        .collection("CompanyProfile")
        .where('taggedCandidatesForGalkLab', "array-contains", candidateId)
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
                            companyWebsite: _data.website
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
                            jobPostingArray.push(value);
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
                            companyWebsite: _data.website
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
                            jobPostingArray.push(value);
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