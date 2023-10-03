import { List } from "antd";
import {FieldValue} from '../utils/configs/firebaseConfig'
import * as actionType from "./types";
import moment from "moment";
import { every } from "lodash";

export const calculateDaysOfWeek = (currentWeek) => {
  const daysOfWeek = [];
  // Generate an array of 7 days in the current week
  let startOfWeek = moment(currentWeek).startOf("week");
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(moment(startOfWeek));
    startOfWeek.add(1, "day");
  }
  return daysOfWeek;
};

const arraysToObj = (array) => {
  const result = {};
  const anotherList = {};
  array.forEach(([date, time, action]) => {
    if (action == 1) {
      if (!result[date]) {
        result[date] = {};
      }
      result[date][time] = false;
    } else if (action == -1) {
      if (!anotherList[date]) {
        anotherList[date] = [];
      }
      anotherList[date].push(time);
    }
  });

  return [result, anotherList];
};

export const goToPreviousWeekB =
  (currentWeek) =>
  async (dispatch, getState, { getFirestore }) => {
    dispatch({ type: actionType.GO_TO_PREVIOUS_WEEK, payload: currentWeek });
  };

export const goToNextWeekB =
  (currentWeek) =>
  (dispatch, getState, { getFirestore }) => {
    dispatch({ type: actionType.GO_TO_NEXT_WEEK, payload: currentWeek });
  
  };
export const getMeetingLink =
  (userId) =>
  async (dispatch, getState, { getFirestore }) => {
    const database = getFirestore();
    // dispatch({ type: actionType.DATA_LOADING, payload: true });
    await database
      .collection("AdminProfiles")
      .doc(userId)
      .get()
      .then((doc) => {
   
        dispatch({
          type: actionType.UPDATE_MEETING_LINK,
          payload: doc.data()["zoomLink"],
        });
      });
    //   dispatch({ type: actionType.DATA_LOADING, payload: false });
  };

export const updateMeetingLink =
  (userId, link) =>
  async (dispatch, getState, { getFirestore }) => {
    const database = getFirestore();

    dispatch({ type: actionType.UPDATE_MEETING_LINK, payload: link });
    await database
      .collection("AdminProfiles")
      .doc(userId)
      .update({ zoomLink: link })
      .then(() => {});
  };
export const handleConfirm =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    dispatch({ type: actionType.MODAL_DISPLAY, payload: false });
  };
export const handleConfirm2 =
  () =>
  async (dispatch, getState, { getFirestore }) => {
  
    dispatch({ type: actionType.MODAL_DISPLAY, payload: true });
  };
export const getSlotsData =
  (userId, daysOfWeek) =>
  async (dispatch, getState, { getFirestore }) => {
    let slotsData = {};
    const database = getFirestore();
    dispatch({ type: actionType.DATA_LOADING, payload: true });

    for (let date of daysOfWeek) {
      await database
        .collection("AdminProfiles")
        .doc(userId)
        .collection("QuickInterviewAllSlots")
        .doc(moment(date).format("YYYYMMDD"))
        .get()
        .then((doc) => {
          if (doc.exists) {
            slotsData[moment(date).format("YYYYMMDD")] = doc.data();
          } else {
            slotsData[moment(date).format("YYYYMMDD")] = {};
          }
        });
    }
    dispatch({ type: actionType.UPDATE_SLOTS_DATA, payload: slotsData });
    dispatch({ type: actionType.DATA_LOADING, payload: false });
  };

export const updateSlotData =
  (userId, slotsDatas, oldSlotsData) =>
  async (dispatch, getState, { getFirestore}) => {
    let data = arraysToObj(slotsDatas);
    let newSlotsData = data[0];
    let deleteData = data[1];


    dispatch({ type: actionType.DATA_LOADING, payload: true });
    const database = getFirestore();
    for (let [date, timeData] of Object.entries(newSlotsData)) {
      await database
        .collection("AdminProfiles")
        .doc(userId)
        .collection("QuickInterviewAllSlots")
        .doc(date)
        .set(timeData, { merge: true })
        .then(() => {
          dispatch({
            type: actionType.UPDATE_SLOTS_DATA,
            payload: Object.assign({}, oldSlotsData, newSlotsData),
          });
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
    }
    for (let [date, Data] of Object.entries(deleteData)) {
      Data.map(async (time) => {await database
        .collection("AdminProfiles")
        .doc(userId)
        .collection("QuickInterviewAllSlots")
        .doc(date)
        .update({
          [time]: FieldValue.delete(),
        })
        .then(() => {
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        })})
    }

    dispatch({ type: actionType.DATA_LOADING, payload: false });
  };
