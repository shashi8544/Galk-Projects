import { database } from "../utils/configs/firebaseConfig";
import { getFirebase } from "react-redux-firebase";
import * as actionType from "./types";
const BASE_URL = 'https://api.github.com/repos'

export const getOpenIssues = (repository) => (dispatch) => {
    dispatch({
        type: actionType.JOB_PROGRESS_LOADING,
    });
    const url = repository + `/issues?state=open`;
    const options = {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }
    fetch(url, options)
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json()
            else
                throw new Error('error')
        })
        .then(res => {
            dispatch({ type: actionType.JOB_PROGRESS_OPEN_ISSUES, payload: res })
        }).catch(err => { dispatch({ type: actionType.JOB_PROGRESS_FAILED }) })
};

export const getClosedIssues = (repository) => (dispatch) => {
    dispatch({
        type: actionType.JOB_PROGRESS_LOADING,
    });
    const url = repository + `/issues?state=closed`;
    const options = {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }
    fetch(url, options)
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json()
            else
                throw new Error('error')
        })
        .then(res => {
            dispatch({ type: actionType.JOB_PROGRESS_CLOSED_ISSUES, payload: res })
        }).catch(err => { dispatch({ type: actionType.JOB_PROGRESS_FAILED }) })
};

export const getOpenPulls = (repository) => (dispatch) => {
    dispatch({
        type: actionType.JOB_PROGRESS_LOADING,
    });
    const url = repository + `/pulls?state=open`;
    const options = {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }
    fetch(url, options)
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json()
            else
                throw new Error('error')
        })
        .then(res => {
            dispatch({ type: actionType.JOB_PROGRESS_OPEN_PULL, payload: res })

        }).catch(err => { dispatch({ type: actionType.JOB_PROGRESS_FAILED }) })
};

export const getClosedPulls = (repository) => (dispatch) => {
    dispatch({
        type: actionType.JOB_PROGRESS_LOADING,
    });
    const url = repository + `/pulls?state=closed`;
    const options = {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }
    fetch(url, options)
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json()
            else
                throw new Error('error')
        })
        .then(res => {
            dispatch({ type: actionType.JOB_PROGRESS_CLOSED_PULL, payload: res })

        }).catch(err => { dispatch({ type: actionType.JOB_PROGRESS_FAILED }) })
};
export const addRepo = (jobId, data) => (dispatch) => {
    const reporUrl = BASE_URL + `/${data.userName}/${data.repo}`
    dispatch({ type: actionType.ADD_REPO_PROCESSING })
    database.collection('GalkLabJobs').doc(jobId).update({ repositoryUrl: reporUrl }).then(res => {
        dispatch({ type: actionType.UPDATE_ADD_REPO_IN_JOB, payload: { jobId, reporUrl } })
        dispatch({ type: actionType.ADD_REPO_SUCCESS })

    }).catch(err => {
        dispatch({ type: actionType.ADD_REPO_FAILED })
        console.log(err)
    })
}
export const resetAddRepoState = () => (dispatch) => {
    dispatch({ type: actionType.ADD_REPO_IDLE })
}

export const loadTimeline = (repository) => (dispatch) => {
    dispatch({ type: actionType.ISSUE_LOADING, payload: true })
    const url = repository;
    const options = {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }
    fetch(url, options)
        .then(res => {
            if (res.ok && res.status === 200)
                return res.json()
            else
                throw new Error('error')
        })
        .then(res => {
            dispatch({ type: actionType.TIMELINE_LOADED, payload: res })

        }).catch(err => { dispatch({ type: actionType.ISSUE_LOADING, payload: false }) })
}
export const resetTimeline = () => (dispatch) => {
    dispatch({ type: actionType.RESET_TIMELINE })
}

export const resetError = (state) => (dispatch) => {
    dispatch({ type: actionType.RESET_ERROR, payload: state })
}