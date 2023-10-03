import React from "react";
import BasicInformation from "./basicInformation";
import ProfilePicture from "./profilePicture";
import IntroductionVideo from "./introductionVideo";

const StudentBasicInfo = ({ student }) => {
	return (
		<div>
			<ProfilePicture studentImg={student.img} />
			{student.status !== "graduate" && (
				<IntroductionVideo
					videoURL={student.video || null}
					studentImg={student.img}
				/>
			)}
			<BasicInformation />
		</div>
	);
};

export default StudentBasicInfo;
