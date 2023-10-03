import { CompanyAccountType } from "../utils/models/accountTypes";

export const getFollowingStudentList = (state) => {
	if (state.company.company.followingStudents) {
		return state.company.company.followingStudents.map(
			(student) => student.studentId
		);
	}
	return [];
};

export const getFollowComments = (state) => {
	if (state.company.company.followingStudents) {
		return state.company.company.followingStudents.map((student) => {
			return {
				studentId: student.studentId,
				followReason: student.followReason,
			};
		});
	}
	return [];
};

export const getCompanyAccountType = (state) => {
	if (state.company.companyToShow.accountType)
		return state.company.companyToShow.accountType;
	return CompanyAccountType.Unknown;
};

export const getStudentWhoFollowed = (state) => {
	let _companyId = state.company.company.id;
	var _list = state.students.secondYearStudents.filter((student) => {
		if (student.followingCompanies) {
			let index = student.followingCompanies.findIndex(
				(company) => company.companyId === _companyId && company.approvedByAdmin
			);
			if (index >= 0) return true;
		}
		return false;
	});
	return _list;
};

export const getAllShortlistedStudentList = (state) => {
	var _allStudentList = state.students.thirdYearStudents;
	var _shortlistedStudentList = state.company.company.shortListedStudents || [];

	var _interviewRequestedStudentList =
		state.company.company.shortListedStudentsToInterview || [];

	var _studentIdListToFilter = Array.from(
		new Set(
			[..._shortlistedStudentList, ..._interviewRequestedStudentList].map(
				(x) => x.studentId
			)
		)
	);

	return _allStudentList.filter((x) => {
		let idx = _studentIdListToFilter.findIndex((y) => y === x.id);
		if (idx >= 0) return true;
		return false;
	});
};

export const getAllShortlistedFulltimeStudentList = (state) => {
	var _allStudentList = state.students.allPastTaggedStudents;
	var _shortlistedStudentList = state.company.company.shortListedStudents || [];

	var _interviewRequestedStudentList =
		state.company.company.shortListedStudentsToInterview || [];

	var _studentIdListToFilter = Array.from(
		new Set(
			[..._shortlistedStudentList, ..._interviewRequestedStudentList].map(
				(x) => x.studentId
			)
		)
	);

	return _allStudentList.filter((x) => {
		let idx = _studentIdListToFilter.findIndex((y) => y === x.id);
		if (idx >= 0) return true;
		return false;
	});
};

export const getRequiredSkillListByJobPosting = (state) => {
	return state.company.company.jobPostings
		? [
				...new Set(
					state.company.company.jobPostings
						.map((job) => job.skills)
						.flatMap((skill) => skill)
				),
		  ]
		: [];
};

// Selectors for Admin-v2
export const checkIfStudentAvailable = (state, studentId) => {
	const companyDetails = state.company.companyToShow;

	const interviewRequestedList =
		companyDetails.interviewRequestedCandidateForInternship || [];

	const selectedCandidateList =
		companyDetails.selectedCandidateForInternship || [];

	if (
		[...interviewRequestedList, ...selectedCandidateList].find(
			(x) => x.candidateId === studentId
		)
	) {
		return false;
	}

	return true;
};

export const checkIfStudentInterviewRequested = (state, studentId) => {
	const companyDetails = state.company.companyToShow;

	const interviewRequestedList =
		companyDetails.interviewRequestedCandidateForInternship || [];

	if (interviewRequestedList.find((x) => x.candidateId === studentId)) {
		return true;
	}

	return false;
};

export const checkIfGALKStudentInterviewRequested = (state, studentId) => {
	const companyDetails = state.company.companyToShow;

	const interviewRequestedList =
		companyDetails.interviewRequestedCandidateForGalkLab || [];

	if (interviewRequestedList.find((x) => x.candidateId === studentId)) {
		return true;
	}

	return false;
};

export const checkIfStudentSelected = (state, studentId) => {
	const companyDetails = state.company.companyToShow;

	const selectedList = companyDetails.selectedCandidateForInternship || [];

	if (selectedList.find((x) => x.candidateId === studentId)) {
		return true;
	}

	return false;
};

export const checkIfGALKLabStudentSelected = (state, studentId) => {
	const companyDetails = state.company.companyToShow;

	const selectedList = companyDetails.selectedCandidateForGalkLab || [];

	if (selectedList.find((x) => x.candidateId === studentId)) {
		return true;
	}

	return false;
};
