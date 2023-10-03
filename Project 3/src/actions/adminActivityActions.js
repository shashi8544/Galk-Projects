import * as actionType from "./types";
import { database } from "../utils/configs/firebaseConfig";
import { getFirebase } from "react-redux-firebase";

export const sendNotification = (companyId, data) => (dispatch) => {
    const firebase = getFirebase()
    dispatch({ type: actionType.NOTIFICATION_PROCESSING })
    let uniqueId = new Date().getTime()
    const updateObj = {
        key: uniqueId,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        id: '',
        isRead: false,
        name: 'Admin',
        title: data.title,
        text: data.text,
        type: 'admin',
        image: ''
    }
    database.collection('Notifications').doc(companyId).set({ [uniqueId]: updateObj }, { merge: true })
        .then(res => {
            dispatch({ type: actionType.NOTIFICATION_SUCCESS })
        }).catch(err => {
            console.log(err)
            dispatch({ type: actionType.NOTIFICATION_FAILED })
        })
}
export const resetNotificationiState = () => (dispatch) => {
    dispatch({ type: actionType.NOTIFICATION_IDLE })
}
