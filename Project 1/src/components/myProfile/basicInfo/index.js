import React from "react";
import BasicInformation from "./basicInformation";
import ProfileImage from "./profileImg";
import ProfileVideo from "./profileVideo";

const StudentBasicInfo = ({ student }) => {
	return (
		<div>
			<ProfileImage studentImg={student.img} />
			{student.status != "graduate" && <ProfileVideo videoURL={student.video || null} studentImg={student.img} />}
			<BasicInformation />
		</div>
	);
};

export default StudentBasicInfo;
