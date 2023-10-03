export const getFollowingCompanyList = (state) => {
	if (state.user.user && state.user.user.followingCompanies) {
		return state.user.user.followingCompanies.map(
			(company) => company.companyId
		);
	}
	return [];
};

export const getFollowedByCompanyList = (state) => {
	var _followedByCompanyList = [];
	if (state.user.user && state.companies.companyList.length > 0) {
		var _allCompanyList = state.companies.companyList;
		_allCompanyList.forEach((company) => {
			if (company.followingStudents) {
				company.followingStudents.forEach((student) => {
					if (
						student.studentId === state.user.user.id &&
						student.approvedByAdmin
					) {
						_followedByCompanyList.push(company.id);
					}
				});
			}
		});
	}

	return _followedByCompanyList;
};

export const getBadgeData = (state) => {
	const studentData = state.user.user;

	let badgeData = {
		collegeGrade: "",
		branchName: "",
		certificateLength: 0,
		projectLength: 0,
	};

	if (studentData) {
		badgeData.collegeGrade = studentData.collegeGrade;
		badgeData.branchName = studentData.branchName;
		badgeData.certificateLength = studentData.certificate
			? studentData.certificate.length
			: 0;
		badgeData.projectLength = studentData.project
			? studentData.project.length
			: 0;
	}

	return badgeData;
};

export const evaluateCurrentTab = (state) => {
	const profile = state.firebase.profile;

	if (profile.isLoaded && !profile.isEmpty) {
		var tabNo = 0;
		if (
			profile.name &&
			profile.gender &&
			profile.dob &&
			profile.collegeName &&
			profile.branchName &&
			profile.collegeGrade &&
			profile.yearOfAdmission &&
			profile.JEERank &&
			profile.personalEmail &&
			profile.img
		) {
			tabNo = 1;
		}
		if (
			profile.skills.length > 0 &&
			profile.selfStrength &&
			profile.whyInJapan
		) {
			tabNo = 2;
		}
		if (profile.education.length > 0) {
			tabNo = 3;
		}
		if (profile.project.length > 0) {
			tabNo = 4;
		}
		if (profile.certificate.length > 0) {
			tabNo = 5;
		}
		if (profile.personalInterest) {
			if (profile.personalInterest.length > 0) tabNo = 6;
		}
		if (profile.video) tabNo = 7;

		return {
			currentTab: tabNo,
			tabProgress: Math.round((tabNo / 7) * 100),
		};
	} else {
		return {
			currentTab: 0,
			tabProgress: 0,
		};
	}
};
