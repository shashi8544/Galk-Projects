export const collegeNames = [
	"IIT Dhanbad",
	"IIT Kharagpur",
	"IIT Bombay",
	"IIT Kanpur",
	"IIT Madras",
	"IIT Delhi",
	"IIT Guwahati",
	"IIT Roorkee",
	"IIT Bhubaneswar",
	"IIT Gandhinagar",
	"IIT Hyderabad",
	"IIT Jodhpur",
	"IIT Patna",
	"IIT Ropar",
	"IIT Varanasi",
	"IIT Indore",
	"IIT Mandi",
	"IIT Palakkad",
	"IIT Tirupati",
	"IIT Bhilai",
	"IIT Jammu",
	"IIT Dharwad",
	"IIT Goa",
];

export const fieldOfStudies = [
	"Mechanical Engineering",
	"Aerospace Engineering",
	"Biomedical Engineering",
	"Biomechanical Engineering",
	"Automotive Engineering",
	"Civil Engineering",
	"Structural Engineering",
	"Architectural Engineering",
	"Electrical Engineering",
	"Computer Engineering",
	"Electronics Engineering",
	"Mechatronics Engineering",
	"Robotics Engineering",
	"Microelectronic Engineering",
	"Chemical Engineering",
	"Environmental Engineering",
	"Materials Science Engineering",
	"Agricultural Engineering",
	"Paper Engineering",
	"Industrial Engineering",
	"Manufacturing Engineering",
	"Petroleum Engineering",
	"Geological Engineering",
	"Nuclear Engineering",
	"Marine Engineering",
	"Nanotechnology Engineering",
	"Mining Engineering",
	"Ceramics Engineering",
	"Metallurgical Engineering",
];

export const skillsets = [
	"C",
	"C++",
	"C#",
	"Java",
	"Python",
	"PostgresSQL",
	"HTML",
	"CSS",
	"Assembly Language",
	"JavaScript",
	"NodeJS",
	"AngularJS",
	"ReactJS",
	"SQL",
	"ADO.NET",
	"ASP.NET",
	"MVC",
	"WCF",
	"WPF",
	"WebService",
	"Firebase",
	"Azure",
	"AWS",
	"Blockchain",
	"AI",
	"Redux",
	"Kotlin",
	"SpringBoot",
	"Golang",
	"VueJs",
	"Ionic",
	"Ruby",
	"TypeScript",
	"Ada",
	"Cobol",
	"Erlang",
	"PHP",
	"MATLAB",
	"Scala",
	"SQLServer",
	"MySQL",
	"PLSQL",
	"Julia",
	"Ballerina",
	"Speakeasy",
	"VBScript",
	"VisualBasic",
	"Abap",
	"Haskell",
	"FORTRAN",
	"Simula",
	"Eiffel",
	"Rust",
	"Groovy",
	"Delphi",
	"Elixir",
	"Basic",
	"Smalltalk",
	"Rebol",
	"Swift",
	"Dart",
	"Perl",
	"Pascal",
	"Alice",
	"Prolog",
	"Scratch",
	"WebAssembly",
	"Clojure",
	"F#",
	"Shell",
	"Bash",
	"Assembly",
	"NextJS",
	"Bootstrap",
	"MaterialUI",
	"AntDesign",
	"Bumla",
	"less",
	"sass",
	"DevOps",
	"GoogleCloud",
	"GCP",
	"Azure",
	"AWS",
];

export const CompanyAccountType = Object.freeze({
	Guest: "GCA", //Guest Company Account
	Free: "FCA", //Free Company Account
	Paid: "PCA", //Paid Company Account
	GALKAdmin: "ADMN", //GALK ADMIN Company Account
	Unknown: "UCA", //Unknown Company Account
	Mentor: "MENTOR", //GalkLab Mentor
});

export const CompanyUserAccountType = Object.freeze({
	Member: "CMU", //Company Member User
	Admin: "CAU", //Company Admin User
	Unknown: "CUU", //Company Unknown User
});

export const AuthTypeEmails = Object.freeze({
	SuperAdminEmail: "galkadmn@gmail.com", //Company Member User
});

export const displayRestrictionAccounts = [
	CompanyAccountType.Free,
	CompanyAccountType.Guest,
	CompanyAccountType.Unknown,
	// CompanyAccountType.GALKAdmin
];

export const actionRestrictionAccounts = [
	CompanyAccountType.Free,
	CompanyAccountType.Guest,
	CompanyAccountType.Unknown,
];

export const defaultCompanyLogoURL =
	"https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CompanyLogo%2FDefaultCompanyLogo.png?alt=media&token=78a96b07-1061-4985-9cee-fd695c857759";

export const defaultCompanyCoverPhoto =
	"https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CompanyCoverPhoto%2FDefaultCompanyCoverPhoto.jpg?alt=media&token=5953ae3a-b737-46e7-8d52-28f56c3065bf";

export const defaultAccountUserListEntry = {
	id: "",
	role: "Admin",
	active: true,
	name: "",
	email: "",
	approvalStatus: "Approved",
	accountType: CompanyUserAccountType.Admin,
};

export const newCompanyDefaultData = {
	id: "",
	name: "",
	nameInEnglish: "",
	email: "",
	website: "",
	do: "",
	description: "",
	address: "",
	founder: "",
	size: "",
	industry: "",
	logo: defaultCompanyLogoURL,
	coverPhoto: defaultCompanyCoverPhoto,
	accountUserList: [],
	points: 0,
	rank: 0,
	paidAccount: false,
	accountType: CompanyAccountType.Guest,
	taggedCandidatesForInternship: [],
	taggedCandidatesForGalkLab: [],
	freelanceJobsIds: [],
	followingCandidateForFreelance: [],
	followingCandidateForGALKLab: [],
	shortlistedCandidateForFreelance: [],
	shortlistedCandidateForGALKLab: [],
	interviewRequestedCandidateForFreelance: [],
	interviewRequestedCandidateForGALKLab: [],
	selectedCandidateForFreelance: [],
	selectedCandidateForGALKLab: [],
	internshipJobsIds: [],
	galkLabJobsIds: [],
	followingCandidateForInternship: [],
	shortlistedCandidateForInternship: [],
	interviewRequestedCandidateForInternship: [],
	selectedCandidateForInternship: [],
	internshipLiveProjectIds: [],
	recommendedCurrentStudents: [],
	recommendedPastStudents: [],
	visitorList: [],
};

export const spokenLanguages = [
	"Emglish",
	"Hindi",
	"Japanese",
	"Spanish",
	"Bengali",
	"French",
];

export const emailTemplateNames = {
	MAIL_FROM_ADMIN: "mail_from_admin",
	ADD_TEAMMEMBER: "add_teammember",
	SETUDENT_SELECTION_CONIRMATION_TO_COMPANY: "student_selected_to_company",
	STUDENT_SELECTION_CONFIRMATION_TO_STUDENT: "selection_mail_to_candidate",
	INTERVIEW_REQUESTED_CONFIRMATION_TO_COMPANY: "interview_requested_to_company",
	INTERVIEW_REQUESTED_CONFIRMATION_TO_STUDENT: "interview_request_to_student",
	STUDENT_TAGGED_INTIMATION_TO_COMPANY: "tag_student_to_company",
	STUDENT_REGISTRATION: "student_registration",
};

export const GALKStudentImportURL =
	"https://docs.google.com/spreadsheets/d/138rVi9k1AuM9LvXAZIHzi-4t3ZBRcuh7/edit?usp=sharing&ouid=104955637491525810047&rtpof=true&sd=true";

export const emailTemplateVariables = [
	"studentName",
	"studentEmail",
	"userName",
	"userEmail",
	"userPassword",
	"companyName",
	"companyEmail",
	"message",
	"companyAdminName",
];

export const studentStrengthEntries = [
	"Quick learner",
	"Critical thinker",
	"Hard worker",
	"Leadership quality",
];

export const languageCode = {
	ENGLISH: "EN",
	JAPANESE: "JA",
};

export const projectTypeOptions = [
	"Web development",
	"Android development",
	"Backend development",
	"iOS app development",
	"AI",
	"NLP",
];

export const matchedStudents =
	'[{"certificate": [{"title": "Neural Networks and Deep Learning", "description": "I have completed a course on the neural network by Andrew Ng", "link": "https://www.coursera.org/account/accomplishments/certificate/M3XZJPJ7JWXR", "issueDate": "29/12/2020"}], "spokenLanguages": ["English", "Hindi"], "active": true, "dob": "22/08/2001", "testScore": "85.19", "yearOfAdmission": "2018", "branchName": "Metallurgical and Materials engineering with minors in Computer Science", "gender": "male", "profileCompletionStatus": true, "skills": ["C++", "C", "Python", "HTML", "CSS", "SQL", "JavaScript", "Neural network", "Data structures"], "education": [{"place": "India", "degree": "B.Tech", "instituteName": "IIT, Ropar", "startDate": "21/07/2018", "endDate": "15/06/2022"}], "project": [{"skillsUsed": [{"value": "JavaScript", "label": "JavaScript", "key": "JavaScript"}, {"key": "HTML", "value": "HTML", "label": "HTML"}], "startDate": "20/07/2020", "organization": "MiM Mentor", "title": "Data driven business analytics and SEO", "endDate": "30/08/2020", "description": "I was working in a team whose responsibility was to increase traffics on the website. My work was to find broken links in HTML codes and find buggy javascript codes that were degrading the page ranking of the website by hindering the smooth crawling by web crawlers.", "place": "India"}], "JEERank": "8739", "collegeGrade": "8.90", "emailVerified": true, "img": "https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CandidateProfilePic%2FghaV6pZxWdRbdrbK3Z42D8ayque2?alt=media&token=78eef168-4e54-4e7f-9418-1d5eb3b39068", "eatingHabbit": "veg", "video": "https://firebasestorage.googleapis.com/v0/b/galk-test.appspot.com/o/galk-test_studentintrovideo%2FghaV6pZxWdRbdrbK3Z42D8ayque2.mp4?alt=media&token=0728fdfc-6fb9-466c-bb16-9c12ee785f91", "newArrived": true, "taggedCompanies": [], "yearOfRegistration": "2020", "adminComments": "", "githubProfileLink": "https://github.com/shrish1294", "personalInterest": [{"description": "In my free time, I love to read about astronomy. I have been elected as coordinator of the Astronomy club of IIT Ropar, where I, with my team, have conducted sky watching sessions, presentations, talks,  and documentry sessions.", "title": "Astronomy"}], "selectedByCompany": {}, "expertise": [], "interviewCount": [], "id": "ghaV6pZxWdRbdrbK3Z42D8ayque2", "starsEarned": [], "name": "Shrish Tripathi", "collegeName": "IIT Ropar", "linkedinURL": "", "email": "2018mmb1294@iitrpr.ac.in", "personalEmail": "shrishtripathi1111@gmail.com", "experience": "", "skypeId": "", "hrInterviewScore": "30"},{"certificate": [{"title": "Neural Networks and Deep Learning", "description": "I have completed a course on the neural network by Andrew Ng", "link": "https://www.coursera.org/account/accomplishments/certificate/M3XZJPJ7JWXR", "issueDate": "29/12/2020"}], "spokenLanguages": ["English", "Hindi"], "active": true, "dob": "26/05/1988", "testScore": "85.19", "yearOfAdmission": "2018", "branchName": "Computer Science", "gender": "male", "profileCompletionStatus": true, "skills": ["C++", "C", "Python", "HTML", "CSS", "SQL", "JavaScript"], "education": [{"place": "India", "degree": "B.Tech", "instituteName": "IIT, Ropar", "startDate": "21/07/2018", "endDate": "15/06/2022"}], "project": [{"skillsUsed": [{"value": "JavaScript", "label": "JavaScript", "key": "JavaScript"}, {"key": "HTML", "value": "HTML", "label": "HTML"}], "startDate": "20/07/2020", "organization": "MiM Mentor", "title": "Data driven business analytics and SEO", "endDate": "30/08/2020", "description": "I was working in a team whose responsibility was to increase traffics on the website. My work was to find broken links in HTML codes and find buggy javascript codes that were degrading the page ranking of the website by hindering the smooth crawling by web crawlers.", "place": "India"}], "JEERank": "2002", "collegeGrade": "8.90", "emailVerified": true, "img": "https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CandidateProfilePic%2FyJHUa1bgSXavKD39bCdoceq1zTp2?alt=media&token=0790329f-5bb3-4dd4-ae32-eeec9508ba7d", "eatingHabbit": "veg", "video": "https://firebasestorage.googleapis.com/v0/b/piit-52003.appspot.com/o/CandidateIntroVideo%2FyJHUa1bgSXavKD39bCdoceq1zTp2?alt=media&token=c9e7079c-4872-4136-bb59-79e6e4135bf9", "newArrived": true, "taggedCompanies": [], "yearOfRegistration": "2020", "adminComments": "", "githubProfileLink": "https://github.com/shrish1294", "personalInterest": [{"description": "In my free time, I love to read about astronomy. I have been elected as coordinator of the Astronomy club of IIT Ropar, where I, with my team, have conducted sky watching sessions, presentations, talks,  and documentry sessions.", "title": "Astronomy"}], "selectedByCompany": {}, "expertise": [], "interviewCount": [], "id": "yJHUa1bgSXavKD39bCdoceq1zTp2", "starsEarned": [], "name": "Arpan Sardar", "collegeName": "IIT Mandi", "linkedinURL": "", "email": "arpan.sardar@quintiles.com", "personalEmail": "arpansardar1988@gmail.com", "experience": "", "skypeId": "", "hrInterviewScore": "30"}]';
