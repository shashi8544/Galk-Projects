import React from "react";
import ProfileImage from "./profileImg";
import ProfileVideo from "./profileVideo";
import BasicInformation from "./basicInformation";

const StudentBasicInfo = ({ student }) => {
	return (
		<div>
			<ProfileImage studentImg={student.img} />
			<ProfileVideo videoURL={student.video || null} studentImg={student.img} />
			<BasicInformation studentBasicDetails={student} />
		</div>
	);
};

export default StudentBasicInfo;
