import { firebase } from "../configs/firebaseConfig";

export const sendMail = (templateName, data) => {
	const sent = firebase.functions().httpsCallable("sendMail");
	return sent({
		templateName: templateName,
		...data,
	});
};

export const testPromise = (data) => {
	return new Promise((resolve, reject) => {
		if (data === "a" || data === "c" || data === "f" || data === "h") {
			reject(`ERROR: ${data}`);
		} else {
			resolve(`SUCCESS:${data}`);
		}
	});
};
