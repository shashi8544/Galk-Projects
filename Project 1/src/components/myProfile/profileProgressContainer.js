import React, { useEffect, useRef } from "react";
import ChooseProgram from "./ChooseProgram";
import {
	getProfileFillProgressStatus,
	goNext,
	goBack,
} from "../../actions/profileActions";
import SocialDetails from "./socialDetails";
import Skillset from "./Skillset";
import { connect } from "react-redux";
import { Button, notification } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "./style.css";
import ImageCrop from "./ImageCrop";
import { getStudentData } from "../../actions/profileActions";
import Education from "./Education";
import Job from "./Job";
import Project from "./Project";
import Certificate from "./Certificate";
import PersonalIntrest from "./PersonalIntrest";
import IntroVideo from "./IntroVideo";
import PublishProfile from "./PublishProfile";
import { Progress } from "antd";
import { checkStatus } from "./goNextCheck";

const ProfileProgressContainer = ({
	getProfileFillProgressStatus,
	activeStep,
	isLoading,
	goNext,
	goBack,
	getStudentData,
	isSaving,
	isEditing,
	user,
}) => {
	const studentSnapshotRef = useRef();
	useEffect(() => {
		if (activeStep === 0) {
			getProfileFillProgressStatus();
		}
	}, [activeStep]);

	///  To get sutdent snapshot data as student data changes and will unsubscribe on unmount of component

	useEffect(() => {
		studentSnapshotRef.current = getStudentData();
		return () => {
			let unsuscribe = studentSnapshotRef.current;
			if (unsuscribe) {
				unsuscribe();
			}
		};
	}, []);

	const displayNotification = () => {
		notification["error"]({
			message: "Warning",
			description:
				"Please provide some information here before you go to next step.",
		});
	};

	const handleGoBack = () => {
		goBack();
	};

	const handleGoNext = () => {
		if (checkStatus([user, activeStep])) {
			goNext();
		} else {
			displayNotification();
		}
	};

	const shouldBackControlBeDisabled = (activeStep) => {
		if (activeStep === 1) return true;
		if (isEditing) return true;
		else {
			////////       other conditions can be added here .........

			return false;
		}
	};

	const shouldFrontControlBeDisabled = (activeStep) => {
		if (isEditing) return true;
		if (activeStep === 10) return true;

		if (user.status == "graduate"){
			if (activeStep === 1) {
				if (user?.img) {
					return false;
				} else return true;
			} else if (activeStep === 9) {
				return true;
			} else {
				////////       other conditions can be added here .........
	
				return false;
			}
		} else {
			if (activeStep === 2) {
				if (user?.img) {
					return false;
				} else return true;
			} else if (activeStep === 9) {
				if (
					!user ||
					(user?.subscribedInInternship && !user?.video) //||
					// (user?.subscribedInGalkLab && !user?.selfIntro)
				)
					return true;
				return false;
			} else {
				////////       other conditions can be added here .........
	
				return false;
			}
		}
	};

	// console.log("USER:", user);

	return (
		<div className="profileFillProgress_container">
			{ user.status != "graduate" &&
				<div id="ProgressBar">
					{activeStep === 10 ? (
						<Progress percent={100} />
					) : (
						<Progress percent={activeStep/10 * 100} />
					)}
				</div>
			}
			{ user.status == "graduate" &&
				<div id="ProgressBar">
					{activeStep === 9 ? (
						<Progress percent={100} />
					) : (
						<Progress percent={Math.round(activeStep/9 * 100)} />
					)}
				</div>
			}
			<div className="profileFillProgress_container_header">
				<Button
					type="dashed"
					style={{ width: "50%" }}
					onClick={handleGoBack}
					disabled={shouldBackControlBeDisabled(activeStep) || isLoading}
				>
					<ArrowLeftOutlined />
					Back
				</Button>
				<Button
					type="dashed"
					style={{ width: "50%" }}
					onClick={handleGoNext}
					disabled={shouldFrontControlBeDisabled(activeStep) || isLoading}
				>
					Next
					<ArrowRightOutlined />
				</Button>
			</div>
			{user && user.id && user.status != "graduate" && (
				<div className="profileFillProgress_container_body">
					{activeStep === 1 && <ChooseProgram />}
					{activeStep === 2 && <ImageCrop />}
					{activeStep === 3 && <SocialDetails />}
					{activeStep === 4 && <Skillset />}
					{activeStep === 5 && <Education />}
					{activeStep === 6 && (
						<Project isSaving={isSaving} userProfile={user} />
					)}
					{activeStep === 7 && (
						<Certificate isSaving={isSaving} userProfile={user} />
					)}
					{activeStep === 8 && (
						<PersonalIntrest isSaving={isSaving} userProfile={user} />
					)}
					{activeStep === 9 && (
						<IntroVideo isSaving={isSaving} userProfile={user} />
					)}
					{activeStep === 10 && <PublishProfile />}
				</div>
			)}
			{user && user.id && user.status == "graduate" && (
				<div className="profileFillProgress_container_body">
					{activeStep === 1 && <ImageCrop />}
					{activeStep === 2 && <SocialDetails />}
					{activeStep === 3 && <Skillset />}
					{activeStep === 4 && <Education />}
					{activeStep === 5 && <Job />}
					{activeStep === 6 && (
						<Project isSaving={isSaving} userProfile={user} />
					)}
					{activeStep === 7 && (
						<Certificate isSaving={isSaving} userProfile={user} />
					)}
					{activeStep === 8 && (
						<PersonalIntrest isSaving={isSaving} userProfile={user} />
					)}
					{activeStep === 9 && <PublishProfile />}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	activeStep: state.profile.activeStep,
	isLoading: state.profile.isLoading,
	isSaving: state.profile.isSaving,
	isEditing: state.profile.isEditing,
	user: state.firebase.profile,
});

export default connect(mapStateToProps, {
	getProfileFillProgressStatus,
	goNext,
	goBack,
	getStudentData,
})(ProfileProgressContainer);
