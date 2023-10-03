export const skillSets = [
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

export const projectCategories = [
	"Personal Project",
	"College Project",
	"Industry Project",
];

export const certificateCategories = [
	"Course Completion",
	"Skill Completion",
	"Project Completion",
];

export const profileProgressSteps = [
	{
		step: 1,
		title: "GALK Subscription",
	},
	{
		step: 2,
		title: "Profile Picture",
	},
	{
		step: 3,
		title: "Social Details",
	},
	{
		step: 4,
		title: "Skillsets",
	},
	{
		step: 5,
		title: "Education",
	},
	{
		step: 6,
		title: "Projects",
	},
	{
		step: 7,
		title: "Certificates",
	},
	{
		step: 8,
		title: "Other Details",
	},
	{
		step: 9,
		title: "Intro Video",
	},
	{
		step: 10,
		title: "Publish",
	},
];

export const graduateProfileProgressSteps = [
	{
		step: 1,
		title: "Profile Picture",
	},
	{
		step: 2,
		title: "Social Details",
	},
	{
		step: 3,
		title: "Skillsets",
	},
	{
		step: 4,
		title: "Education",
	},
	{
		step: 5,
		title: "Job",
	},
	{
		step: 6,
		title: "Projects",
	},
	{
		step: 7,
		title: "Certificates",
	},
	{
		step: 8,
		title: "Other Details",
	},
	{
		step: 9,
		title: "Publish",
	},
];
