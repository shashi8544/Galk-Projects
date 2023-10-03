import countryList from "react-select-country-list";

export const countryOptions = countryList()
	.getData()
	.map((name) => {
		return { value: name.label, label: name.label };
	});
export const countries = countryList().getLabels();

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

export const jobProfileOptions = [
	{ value: "Open For All Positions", label: "Open For All Positions" },
	{ value: "Software Developer", label: "Software Developer" },
	{ value: "Web Developer", label: "Web Developer" },
	{ value: "FrontEnd Developer", label: "FrontEnd Developer" },
	{ value: "Programmer", label: "Programmer" },
	{ value: "Database Administrator", label: "Database Administrator" },
	{ value: "Testing Professional", label: "Testing Professional" },
	{ value: "Network Admin", label: "Network Admin" },
	{ value: "UX/UI Designer", label: "UX/UI Designer" },
	{ value: "Hardware Engineer", label: "Hardware Engineer" },
	{ value: "Computer Systems Analyst", label: "Computer Systems Analyst" },
	{ value: "Network Architect", label: "Network Architect" },
	{
		value: "Information Security Analyst",
		label: "Information Security Analyst",
	},
	{
		value: "Computer and Information Research Scientists",
		label: "Computer and Information Research Scientists",
	},
	{
		value: "Computer and Information Systems Managers",
		label: "Computer and Information Systems Managers",
	},
	{ value: "IT Project Manager", label: "IT Project Manager" },
	{ value: "Data Scientist ", label: "Data Scientist " },
	{ value: "Software Engineer", label: "Software Engineer" },
	{ value: "System Engineer", label: "System Engineer" },
	{ value: "Security Engineer", label: "Security Engineer" },
	{ value: "Business Analyst", label: "Business Analyst" },
	{ value: "Delivery manager", label: "Delivery manager" },
	{ value: "Release manager", label: "Release manager" },
	{ value: "DevOps", label: "DevOps" },
	{ value: "Full Stack", label: "Full Stack" },
	{ value: "Data Analyst", label: "Data Analyst" },
	{ value: "Database Developer", label: "Database Developer" },
	{ value: "Digital Designer", label: "Digital Designer" },
	{ value: "Game Designer", label: "Game Designer" },
	{
		value: "Mobile Application Developer",
		label: "Mobile Application Developer",
	},
	{ value: "Network Engineer", label: "Network Engineer" },
	{ value: "IT Engineer", label: "IT Engineer" },
	{ value: "IT Executive", label: "IT Executive" },
	{ value: "CCNA", label: "CCNA" },
	{ value: "Graphic Designer", label: "Graphic Designer" },
	{ value: "Computer Network Engineer", label: "Computer Network Engineer" },
	{ value: "Applications Architect", label: "Applications Architect" },
	{
		value: "Manager, Applications Development",
		label: "Manager, Applications Development",
	},
	{
		value: "Manager, Information Systems Security",
		label: "Manager, Information Systems Security",
	},
	{ value: "Manager, Data Warehouse", label: "Manager, Data Warehouse" },
	{ value: "Data Architect", label: "Data Architect" },
	{
		value: "Software Quality Assurance (QA)",
		label: "Software Quality Assurance (QA)",
	},
	{ value: "Database Manager", label: "Database Manager" },
	{
		value: "Information Technology Auditor",
		label: "Information Technology Auditor",
	},
	{
		value: "Mobile Applications Developer",
		label: "Mobile Applications Developer",
	},
	{
		value: "Business Intelligence Analyst",
		label: "Business Intelligence Analyst",
	},
	{
		value: "Information Technology Manager",
		label: "Information Technology Manager",
	},
	{
		value: "Manager, Technical Services",
		label: "Manager, Technical Services",
	},
	{ value: "Manager, Design & UX", label: "Manager, Design & UX" },
	{ value: "Technical Support", label: "Technical Support" },
	{ value: "Applications Developer", label: "Applications Developer" },
	{ value: "Data Security Analyst", label: "Data Security Analyst" },
	{ value: "Product Manager", label: "Product Manager" },
	{ value: "Project Manager", label: "Project Manager" },
	{ value: "Data Modeler", label: "Data Modeler" },
	{ value: "Data Warehouse Developer", label: "Data Warehouse Developer" },
	{ value: "Network Security Engineer", label: "Network Security Engineer" },
	{
		value: "Systems Security Administrator",
		label: "Systems Security Administrator",
	},
	{
		value: "Network Security Administrator",
		label: "Network Security Administrator",
	},
	{ value: "Network Manager", label: "Network Manager" },
	{ value: "ERP Technical Developer", label: "ERP Technical Developer" },
	{ value: "Telecommunications Manager", label: "Telecommunications Manager" },
	{ value: "Programmer Analyst", label: "Programmer Analyst" },
	{ value: "Portal Administrator", label: "Portal Administrator" },
	{ value: "Technical Engineer", label: "Technical Engineer" },
	{ value: "Pre-Sales Engineer", label: "Pre-Sales Engineer" },
	{ value: "ERP Business Analyst", label: "ERP Business Analyst" },
	{ value: "E-Commerce Analyst", label: "E-Commerce Analyst" },
	{ value: "Solutions Architect", label: "Solutions Architect" },
	{ value: "Software Systems Engineer", label: "Software Systems Engineer" },
	{ value: "CRM Business Analyst", label: "CRM Business Analyst" },
	{ value: "Business Systems Analyst", label: "Business Systems Analyst" },
	{ value: "Systems Analyst", label: "Systems Analyst" },
	{ value: "Systems Engineer", label: "Systems Engineer" },
	{ value: "Computer Programmer", label: "Computer Programmer" },
	{ value: "Consultant", label: "Consultant" },
	{ value: "System Designer", label: "System Designer" },
	{ value: "E-commerce Specialist", label: "E-commerce Specialist" },
	{ value: "ARTIFICIAL INTELLIGENCE", label: "ARTIFICIAL INTELLIGENCE" },
	{ value: "Blockchain engineer", label: "Blockchain engineer" },
	{ value: "Robotics", label: "Robotics" },
	{ value: "Operating systems", label: "Operating systems" },
	{
		value: "Network & Computer Systems Administrators",
		label: "Network & Computer Systems Administrators",
	},
	{ value: "IT", label: "IT" },
	{ value: "Computer Engineer", label: "Computer Engineer" },
	{ value: "Full Stack Web Developer", label: "Full Stack Web Developer" },
	{ value: "Machine Learning Engineer", label: "Machine Learning Engineer" },
	{ value: "Data Engineer", label: "Data Engineer" },
	{ value: "Others", label: "Others" },
];

export const jobProfiles = [
	"Open For All Positions",
	"Software Developer",
	"Web Developer",
	"FrontEnd Developer",
	"Programmer",
	"Database Administrator",
	"Testing Professional",
	"Network Admin",
	"UX/UI Designer",
	"Hardware Engineer",
	"Computer Systems Analyst",
	"Network Architect",
	"Information Security Analyst",
	"Computer and Information Research Scientists",
	"Computer and Information Systems Managers",
	"IT Project Manager",
	"Data Scientist ",
	"Software Engineer",
	"System Engineer",
	"Security Engineer",
	"Business Analyst",
	"Delivery manager",
	"Release manager",
	"DevOps",
	"Full Stack",
	"Data Analyst",
	"Database Developer",
	"Digital Designer",
	"Game Designer",
	"Mobile Application Developer",
	"Network Engineer",
	"IT Engineer",
	"IT Executive",
	"CCNA",
	"Graphic Designer",
	"Computer Network Engineer",
	"Applications Architect",
	"Applications Development",
	"Information Systems Security",
	"Manager, Data Warehouse",
	"Data Architect",
	"Software Quality Assurance (QA)",
	"Database Manager",
	"Information Technology Auditor",
	"Mobile Applications Developer",
	"BusBusiness Intelligence Analyst",
	"Information Technology Manager",
	"Manager, Technical Services",
	"Manager, Design & UX",
	"Technical Support",
	"Applications Developer",
	"Data Security Analyst",
	"Product Manager",
	"Project Manager",
	"Data Modeler",
	"Data Warehouse Developer",
	"Network Security Engineer",
	"Systems Security Administrator",
	"Network Security Administrator",
	"Network Manager",
	"ERP Technical Developer",
	"Telecommunications Manager",
	"Programmer Analyst",
	"Portal Administrator",
	"Technical Engineer",
	"Pre-Sales Engineer",
	"ERP Business Analyst",
	"E-Commerce Analyst",
	"Solutions Architect",
	"Software Systems Engineer",
	"CRM Business Analyst",
	"Business Systems Analyst",
	"Systems Analyst",
	"Systems Engineer",
	"Computer Programmer",
	"Consultant",
	"System Designer",
	"E-commerce Specialist",
	"ARTIFICIAL INTELLIGENCE",
	"Blockchain engineer",
	"Robotics",
	"Operating systems",
	"Network & Computer Systems Administrators",
	"IT",
	"Computer Engineer",
	"Full Stack Web Developer",
	"Machine Learning Engineer",
	"Data Engineer",
	"Others",
];
export const workExperienceOptions = [
	{ value: "Freshers", label: "Freshers" },
	{ value: "1+ Years", label: "1+ Years" },
	{ value: "2+ Years", label: "2+ Years" },
	{ value: "3+ Years", label: "3+ Years" },
	{ value: "4+ Years", label: "4+ Years" },
	{ value: "5+ Years", label: "5+ Years" },
	{ value: "6+ Years", label: "6+ Years" },
	{ value: "7+ Years", label: "7+ Years" },
	{ value: "8+ Years", label: "8+ Years" },
	{ value: "9+ Years", label: "9+ Years" },
	{ value: "10+ Years", label: "10+ Years" },
	{ value: "20+ Years", label: "20+ Years" },
];

export const noOfInternships = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10+",
];
export const languages = [
	"English",
	"Japanese",
	"Spanish",
	"Chinese",
	"Mandarin",
	"Russian",
	"Hindi",
	"Arabic",
	"Bengali",
	"Portuguese",
	"Korean",
	"Italian",
	"Indonesian",
	"Polish",
	"Dutch",
	"German",
	"Thai",
	"Greek",
	"Czech",
	"Javanese",
	"Vietnamese",
	"Romanian",
	"Urdu",
	"French",
];
export const expertisationOptions = [
	"Swimming",
	"Cricket",
	"Football",
	"Photography",
	"Client Managementgement",
	"Motivation SpeakerSpeaker",
	"Computer Hackingcking",
	"Singing",
	"Guitar",
];

export const universities = [
	"IIT Madras",
	"IIT Delhi",
	"IIT Bombay",
	"IIT Kharagpur",
	"IIT Kanpur",
	"IIT Roorkee",
	"IIT Guwahati",
	"IIT Hyderabad",
	"IIT Varanasi",
	"IIT Indore",
	"IIT Dhanbad",
	"IIT Bhubaneswar",
	"IIT Mandi",
	"IIT Patna",
	"IIT Gandhinagar",
	"IIT Ropar",
	"IIT Jodhpur",
];

export const studyFields = [
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

export const projectTypeOptions = [
	"Web development",
	"Android development",
	"Backend development",
	"iOS app development",
	"AI",
	"NLP",
];
