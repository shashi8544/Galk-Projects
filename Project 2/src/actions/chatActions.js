import uuid from "uuid";
import store from "../store";
import { message } from "antd";
import * as actionTypes from "./types";

import { database, storage } from "../utils/configs/firebaseConfig";

export const getAvailableChatLists = (userId) => (dispatch) => {
	dispatch({ type: actionTypes.START_CHAT_LIST_LOADING });

	database
		.collection("CompanyProfile")
		.get()
		.then((snapShot) => {
			let _companyMetaData = [];

			snapShot.forEach((doc) => {
				const _data = doc.data();
				_companyMetaData.push({
					id: _data.id,
					email: _data.email,
					name: _data.name,
					nameInEnglish: _data.nameInEnglish,
					logo: _data.logo,
					industry: _data.industry,
				});
			});

			dispatch({
				type: actionTypes.GET_COMPANY_METADATA,
				payload: _companyMetaData,
			});
		})
		.then(() => {
			database
				.collection("StudentProfile")
				.where("profileCompletionStatus", "==", true)
				.get()
				.then((snapShot) => {
					let _studentMetaData = [];

					snapShot.forEach((doc) => {
						const _data = doc.data();
						_studentMetaData.push({
							id: _data.id,
							email: _data.email,
							name: _data.name,
							collegeName: _data.collegeName,
							img: _data.img,
							branchName: _data.branchName,
						});
					});

					dispatch({
						type: actionTypes.GET_STUDENT_METADATA,
						payload: _studentMetaData,
					});
				})
				.then(() => {
					database
						.collection("ChatRoomGalkLab")
						.where("participants", "array-contains", userId)
						.onSnapshot((querySnapshot) => {
							let _allChatList = [];
							let _individualChatList = [];
							let _groupChatList = [];

							querySnapshot.forEach((doc) => {
								_allChatList.push({ ...doc.data(), chatId: doc.id });
							});

							_allChatList.forEach((chat) => {
								if (chat.type === "individual") {
									_individualChatList.push(chat);
								} else {
									_groupChatList.push(chat);
								}
							});

							dispatch({
								type: actionTypes.GET_AVAILABLE_CHAT_LISTS,
								payload: {
									individualChatList: _individualChatList,
									groupChatList: _groupChatList,
								},
							});

							dispatch({ type: actionTypes.STOP_CHAT_LIST_LOADING });
						});
				});
		});
};

export const getCompanyMetaData = () => (dispatch) => {};

export const getStudentMetaData = () => (dispatch) => {};

export const setSelectedChat = (key) => (dispatch) => {
	const selectedChatId = key;

	// database.collection("ChatRoomGalkLab").doc(selectedChatId).update({
	//   hasReceiverReceived: true,
	// });

	dispatch({
		type: actionTypes.SET_SELECTED_CHAT,
		payload: selectedChatId,
	});
};

export const setChatReadStatus = (chatId, chatType) => (dispatch) => {
	if (chatType === "individual") {
		database.collection("ChatRoomGalkLab").doc(chatId).update({
			hasReceiverReceived: true,
		});
	}
	if (chatType === "group") {
		const senderId = store.getState().firebase.auth.uid;

		database
			.collection("ChatRoomGalkLab")
			.doc(chatId)
			.get()
			.then((doc) => {
				let participantStatusList = doc.data().participantStatusList;
				let updatedParticipantStatusList = participantStatusList.map((x) => {
					if (x.id === senderId) {
						return {
							...x,
							hasReceiverReceived: true,
						};
					}
					return x;
				});

				database.collection("ChatRoomGalkLab").doc(chatId).update({
					participantStatusList: updatedParticipantStatusList,
				});
			});
	}
};

// const pushNotification = (text) => {
//   const chatId = store.getState().chatRoom.selectedChatId;
//   const senderId = store.getState().firebase.auth.uid;
//   const chatRoom = store.getState().chatRoom
//   const userDetails = chatRoom?.studentMetaData?.find((stu) => stu.id === senderId);

//   database
//     .collection("ChatRoomGalkLab")
//     .doc(chatId)
//     .get().then(doc => {
//       let data = doc.data();
//       const companyId = data?.creator;
//       const updateData = {
//         date: database.FieldValue.serverTimestamp(),
//         id: senderId,
//         chatId: chatId,
//         image: userDetails?.img,
//         isRead: false,
//         name: userDetails?.name,
//         text: text,
//         title: "Unread message from " + userDetails?.name,
//         type: "candidate"
//       }
//       database
//         .collection("Notifications")
//         .doc(companyId)
//         .update({ [chatId]: updateData })
//     })

// }

const pushNotificationGroup = (text, chatData) => {
	const chatId = store.getState().chatRoom.selectedChatId;
	const senderId = store.getState().firebase.auth.uid;
	const companyId = chatData?.creator;
	const name = chatData?.chatName;

	const updateData = {
		date: database.FieldValue.serverTimestamp(),
		id: senderId,
		chatId: chatId,
		image: "",
		isRead: false,
		name: name,
		text: text,
		title: `Unread message from ${name} `,
		type: "candidate",
	};
	database
		.collection("Notifications")
		.doc(companyId)
		.update({ [chatId]: updateData });
};

export const submitChatMsg = (msg, type) => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;
	const senderId = store.getState().firebase.auth.uid;

	if (type === "text") {
		database
			.collection("ChatRoomGalkLab")
			.doc(chatId)
			.update({
				messages: database.FieldValue.arrayUnion({
					message: msg,
					sender: senderId,
					timeStamp: database.Timestamp.now(),
				}),
				hasReceiverReceived: false,
			})
			.then((res) => {
				//pushNotification(msg)
			});
	}
	if (type === "image") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const fileExtension = fileToUpload.type.split("/")[1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Image/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "image",
						sender: senderId,
						timeStamp: database.Timestamp.now(),
					};

					database
						.collection("ChatRoomGalkLab")
						.doc(chatId)
						.update({
							messages: database.FieldValue.arrayUnion({
								...msgToAdd,
							}),
							hasReceiverReceived: false,
						})
						.then(() => {
							//pushNotification("An Image file attatchment")
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
								payload: false,
							});
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
								payload: 0,
							});
						});
				});
			}
		);
	}
	if (type === "video") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const fileExtension = fileToUpload.type.split("/")[1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Video/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "video",
						sender: senderId,
						timeStamp: database.Timestamp.now(),
					};

					database
						.collection("ChatRoomGalkLab")
						.doc(chatId)
						.update({
							messages: database.FieldValue.arrayUnion({
								...msgToAdd,
							}),
							hasReceiverReceived: false,
						})
						.then(() => {
							//pushNotification("A Video file attatchment")
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
								payload: false,
							});
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
								payload: 0,
							});
						});
				});
			}
		);
	}
	if (type === "document") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const splittedName = fileToUpload.name.split(".");
		// const fileExtension = splittedName[splittedName.length - 1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Document/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "document",
						sender: senderId,
						timeStamp: database.Timestamp.now(),
					};

					database
						.collection("ChatRoomGalkLab")
						.doc(chatId)
						.update({
							messages: database.FieldValue.arrayUnion({
								...msgToAdd,
							}),
							hasReceiverReceived: false,
						})
						.then(() => {
							//pushNotification("A Document file attatchment")
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
								payload: false,
							});
							dispatch({
								type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
								payload: 0,
							});
						});
				});
			}
		);
	}
};

export const submitGroupChatMsg = (msg, type) => (dispatch) => {
	const chatId = store.getState().chatRoom.selectedChatId;
	const senderId = store.getState().firebase.auth.uid;

	if (type === "text") {
		database
			.collection("ChatRoomGalkLab")
			.doc(chatId)
			.get()
			.then((doc) => {
				let participantStatusList = doc.data().participantStatusList;
				let updatedParticipantStatusList = participantStatusList.map((x) => ({
					...x,
					hasReceiverReceived: x.id === senderId ? true : false,
				}));

				database
					.collection("ChatRoomGalkLab")
					.doc(chatId)
					.update({
						messages: database.FieldValue.arrayUnion({
							message: msg,
							sender: senderId,
							timeStamp: database.Timestamp.now(),
						}),
						participantStatusList: updatedParticipantStatusList,
						hasReceiverReceived: false,
					})
					.then(() => {
						pushNotificationGroup(msg, doc.data());
					});
			});
	}
	if (type === "image") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Image/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "image",
						sender: senderId,
						timeStamp: database.Timestamp.now(),
					};

					database
						.collection("ChatRoomGalkLab")
						.doc(chatId)
						.get()
						.then((doc) => {
							let participantStatusList = doc.data().participantStatusList;
							let updatedParticipantStatusList = participantStatusList.map(
								(x) => ({
									...x,
									hasReceiverReceived: x.id === senderId ? true : false,
								})
							);

							database
								.collection("ChatRoomGalkLab")
								.doc(chatId)
								.update({
									messages: database.FieldValue.arrayUnion({
										...msgToAdd,
									}),
									participantStatusList: updatedParticipantStatusList,
									hasReceiverReceived: false,
								})
								.then(() => {
									pushNotificationGroup(
										"An Image file attatchment",
										doc.data()
									);
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
										payload: false,
									});
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
										payload: 0,
									});
								});
						});
				});
			}
		);
	}
	if (type === "video") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const fileExtension = fileToUpload.type.split("/")[1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Video/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "video",
						sender: senderId,
						timeStamp: database.Timestamp.now(),
					};

					database
						.collection("ChatRoomGalkLab")
						.doc(chatId)
						.get()
						.then((doc) => {
							let participantStatusList = doc.data().participantStatusList;
							let updatedParticipantStatusList = participantStatusList.map(
								(x) => ({
									...x,
									hasReceiverReceived: x.id === senderId ? true : false,
								})
							);

							database
								.collection("ChatRoomGalkLab")
								.doc(chatId)
								.update({
									messages: database.FieldValue.arrayUnion({
										...msgToAdd,
									}),
									participantStatusList: updatedParticipantStatusList,
									hasReceiverReceived: false,
								})
								.then(() => {
									pushNotificationGroup("A Video file attatchment", doc.data());
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
										payload: false,
									});
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
										payload: 0,
									});
								});
						});
				});
			}
		);
	}
	if (type === "document") {
		dispatch({
			type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
			payload: true,
		});
		const fileToUpload = msg.originFileObj;
		// const splittedName = fileToUpload.name.split(".");
		// const fileExtension = splittedName[splittedName.length - 1];

		const storageRef = storage.ref();
		const uploadTask = storageRef
			.child(
				`ChatRoom/Document/${chatId}/${senderId}/${uuid()}/${fileToUpload.name}`
			)
			.put(fileToUpload, { contentType: fileToUpload.type });

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: progress,
				});
			},
			(err) => {
				message.error("Error in updating data !");
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
					payload: false,
				});
				dispatch({
					type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
					payload: 0,
				});
			},
			() => {
				// Handle successful uploads on complete
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					const msgToAdd = {
						message: downloadURL,
						fileName: fileToUpload.name,
						msgType: "document",
						sender: senderId,
						timeStamp: database.Timestamp.now(),
					};

					database
						.collection("ChatRoomGalkLab")
						.doc(chatId)
						.get()
						.then((doc) => {
							let participantStatusList = doc.data().participantStatusList;
							let updatedParticipantStatusList = participantStatusList.map(
								(x) => ({
									...x,
									hasReceiverReceived: x.id === senderId ? true : false,
								})
							);

							database
								.collection("ChatRoomGalkLab")
								.doc(chatId)
								.update({
									messages: database.FieldValue.arrayUnion({
										...msgToAdd,
									}),
									participantStatusList: updatedParticipantStatusList,
									hasReceiverReceived: false,
								})
								.then(() => {
									pushNotificationGroup(
										"A Document file attatchment",
										doc.data()
									);
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_LOADING,
										payload: false,
									});
									dispatch({
										type: actionTypes.SET_CHAT_FILEUPLOAD_PROGRESS,
										payload: 0,
									});
								});
						});
				});
			}
		);
	}
};

export const clearChatRoomData = () => (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_CHAT_ROOM_DATA });
};
