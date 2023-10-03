import { ifTimeOver } from "../utils/javaScriptHelper";
import store from "../store";
import axios from "axios";
import { message } from "antd";
import moment from "moment";

export const splitIntoAppliedAndOpenProjects = (allProjects) => {
	var _loggedInStudentId = store.getState().auth.userId;
	var _allProjects = [...allProjects];
	var _appliedProjects = [];
	var _openProjects = [];
	_allProjects.forEach((project) => {
		if (
			project.openForStudentsList.some(
				(student) => student.studentId === _loggedInStudentId
			)
		) {
			_appliedProjects.push(project);
		} else {
			if (
				project.status === "OpenForStudents" &&
				!ifTimeOver(project.openForStudentsEndDate)
			) {
				_openProjects.push(project);
			}
		}
	});

	return {
		openProjects: _openProjects,
		AppliedProjects: _appliedProjects,
	};
};

export const setAuthorizationHeader = (token) => {
	const galkToken = `Bearer ${token}`;
	localStorage.setItem("GalkApiToken_student", galkToken);
	axios.defaults.headers.common["Authorization"] = galkToken;
};

export const clearAuthorizationData = () => {
	if (localStorage.GalkApiToken_student)
		localStorage.removeItem("GalkApiToken_student");
	if (axios.defaults.headers.common["Authorization"])
		delete axios.defaults.headers.common["Authorization"];
};

export const evaluateProfessionType = (yearOfAdmission) => {
	if (yearOfAdmission) {
		let _generalAdmissionDate = yearOfAdmission.split("/")[0] + "/07";

		let _studentAdmissionDate = moment(_generalAdmissionDate);

		let currentYear = new Date().getFullYear();

		var currentDate = moment(currentYear + "/07");

		if (currentDate.diff(_studentAdmissionDate, "days") >= 1460) {
			return "Professional";
		} else {
			return "Student";
		}
	} else {
		return "Student";
	}
};

export const CompanyAccountType = Object.freeze({
	Guest: "GCA", //Guest Company Account
	Free: "FCA", //Free Company Account
	Paid: "PCA", //Paid Company Account
	GALKAdmin: "ADMN", //GALK ADMIN Company Account
	Unknown: "UCA", //Unknown Company Account
});

export const CompanyUserAccountType = Object.freeze({
	Member: "CMU", //Company Member User
	Admin: "CAU", //Company Admin User
	Unknown: "CUU", //Company Unknown User
});

export const getLastFilledStep = (studentData) => {
	if (!studentData) return 0;

	if (studentData.video) return 9;
	if (studentData.personalInterest && studentData.personalInterest.length > 0)
		return 8;
	if (studentData.certificate && studentData.certificate.length > 0) return 7;
	if (studentData.project && studentData.project.length > 0) return 6;
	if (studentData.education && studentData.education.length > 0) return 5;
	if (studentData.skills && studentData.skills.length > 0) return 4;
	if (
		studentData.name &&
		studentData.gender &&
		studentData.collegeName &&
		studentData.branchName &&
		studentData.yearOfAdmission &&
		studentData.JEERank
	)
		return 3;
	if (studentData.img) return 2;
	if (studentData.subscribedInInternship || studentData.subscribedInGalkLab)
		return 1;

	return 0;
};

export const getGraduateLastFilledStep = (studentData) => {
	if (!studentData) return 0;

	if (studentData.personalInterest && studentData.personalInterest.length > 0)
		return 8;
	if (studentData.certificate && studentData.certificate.length > 0) return 7;
	if (studentData.project && studentData.project.length > 0) return 6;
	if (studentData.job && studentData.job.length > 0) return 5;
	if (studentData.education && studentData.education.length > 0) return 4;
	if (studentData.skills && studentData.skills.length > 0) return 3;
	if (
		studentData.name &&
		studentData.gender &&
		studentData.collegeName &&
		studentData.branchName &&
		studentData.yearOfGraduation &&
		studentData.JEERank
	)
		return 2;
	if (studentData.img) return 1;
	return 0;
};

export const filterStudentBasedOnSkillArr = (_studentArr, _searchSkillArr) => {
	const skillArr = [..._searchSkillArr].map((x) => x.toLowerCase());
	const studentArr = [..._studentArr];
	let filteredStudentArr = [];
	// console.log("STU ARR:", studentArr);
	filteredStudentArr = studentArr.filter((stu) => {
		const studentSkillset = stu.skills || [];
		const textOnlySkills = studentSkillset.map((x) => {
			if (typeof x === "object") {
				return x.label.toLowerCase();
			}
			return x.toLowerCase();
		});
		// console.log("STUDENT SKILLSET:", textOnlySkills);
		// console.log("SKILLARR:", skillArr);
		let foundTrueFalseArr = [];
		foundTrueFalseArr = textOnlySkills.map((sk) => {
			if (skillArr.find((x) => x.includes(sk) || sk.includes(x))) {
				return true;
			}
			return false;
		});

		return foundTrueFalseArr.find((x) => x === true) || false;
	});
	// console.log("FLT STU ARR:", filteredStudentArr);

	return filteredStudentArr;
};
