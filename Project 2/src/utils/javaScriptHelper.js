import moment from "moment";
import { googleTranslate } from "./configs/googleTranslateConfig";

export const getNameWithTimeStamp = (name) => {
	let currentMoment = new Date();
	return (
		name +
		"_" +
		currentMoment.getDate() +
		currentMoment.getMonth() +
		currentMoment.getFullYear() +
		currentMoment.getTime()
	);
};

export const ifTimeOver = (dateString) => {
	if (moment().isAfter(moment(dateString))) {
		return true;
	}
	return false;
};

export const isItemPresent = (item, sourceArray) => {
	return sourceArray.includes(item);
};

export const checkIfSecondYearStudent = (yearOfAdmission) => {
	var currentDate = moment();
	var admissionYearToCalculate = 0;
	var currentMonth = currentDate.format("M");
	var currentYear = currentDate.format("YYYY");

	if (currentMonth < 8) {
		admissionYearToCalculate = parseInt(currentYear) - 2;
	} else {
		admissionYearToCalculate = parseInt(currentYear) - 1;
	}

	if (yearOfAdmission.split("/")[0] === admissionYearToCalculate.toString()) {
		return true;
	} else {
		return false;
	}
};

export const checkIfThirdYearStudent = (yearOfAdmission) => {
	var currentDate = moment();
	var admissionYearToCalculate = 0;
	var currentMonth = currentDate.format("M");
	var currentYear = currentDate.format("YYYY");

	if (currentMonth < 8) {
		admissionYearToCalculate = parseInt(currentYear) - 3;
	} else {
		admissionYearToCalculate = parseInt(currentYear) - 2;
	}

	if (yearOfAdmission.split("/")[0] === admissionYearToCalculate.toString()) {
		return true;
	} else {
		return false;
	}
};

export const checkIfPassoutYearStudent = (yearOfAdmission) => {
	var currentDate = moment();
	var admissionYearToCalculate = 0;
	var currentMonth = currentDate.format("M");
	var currentYear = currentDate.format("YYYY");

	if (currentMonth < 8) {
		admissionYearToCalculate = parseInt(currentYear) - 4;
	} else {
		admissionYearToCalculate = parseInt(currentYear) - 3;
	}

	if (parseInt(yearOfAdmission.split("/")[0]) <= admissionYearToCalculate) {
		return true;
	} else {
		return false;
	}
};

export const checkIfFutureDate = (date) => {
	if (date) {
		if (moment().isAfter(moment(date, "DD/MM/YYYY"))) {
			return false;
		} else {
			return true;
		}
	}
	return false;
};

export const translateToEnglish = async (text) => {
	await googleTranslate.translate(text, "en", function (err, translation) {
		console.log("TEXT:", translation.translatedText);
		return translation.translatedText || text;
	});
};

export const validateEmailWithRegEx = (emailText) => {
	const emailRegEx = RegExp(
		/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
	);

	return emailRegEx.test(emailText);
};

export const validatePasswordWithRegEx = (passwordText) => {
	const passwordRegEx = RegExp(
		//Minimum eight characters, at least one letter and one number. It may contain special character
		/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/

		//Minimum eight characters, at least one letter, one number and one special character
		// /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

		// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
		// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

		// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
		// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

		// Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
		// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
	);

	return passwordRegEx.test(passwordText);
};

export const getAdmissionYearForThirdYearStudents = () => {
	const d = new Date();
	const currentYear = d.getFullYear();
	//0-Jan to 11-Dec
	const currentMonth = d.getMonth();

	if (currentMonth <= 6) {
		return currentYear - 3;
	} else {
		return currentYear - 2;
	}
};

export const getAdmissionYearForSecondYearStudents = () => {
	const d = new Date();
	const currentYear = d.getFullYear();
	//0-Jan to 11-Dec
	const currentMonth = d.getMonth();

	if (currentMonth <= 6) {
		return currentYear - 2;
	} else {
		return currentYear - 1;
	}
};

export const getAdmissionYearForFourthYearStudents = () => {
	const d = new Date();
	const currentYear = d.getFullYear();
	//0-Jan to 11-Dec
	const currentMonth = d.getMonth();

	if (currentMonth <= 6) {
		return currentYear - 4;
	} else {
		return currentYear - 3;
	}
};

export const searchArrayItemByText = (searchText, sourceArr) => {
	if (sourceArr) {
		let result = sourceArr.filter(
			(x) => x.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1
		);
		result.unshift(searchText);
		return result;
	}
	return [];
};
