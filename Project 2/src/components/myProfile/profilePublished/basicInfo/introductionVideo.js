import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Upload, message } from "antd";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";

import {
	updateCandidateIntroVideo,
	updateCandidateVideoThumbnail,
	resetDataSavingState,
	startEditingData,
} from "../../../../actions/candidateActions";
import { dataSavingState } from "../../../../actions/types";

import "./style.css";

const { Dragger } = Upload;

const IntroductionVideo = ({
	isSaving,
	videoURL,
	updateCandidateIntroVideo,
}) => {
	const [video, setVideoURL] = useState(videoURL);
	const [videoObject, setVideoObject] = useState(null);
	const [isEditable, setIsEditable] = useState(false);

	useEffect(() => {
		setVideoURL(videoURL);
	}, [videoURL]);

	useEffect(() => {
		if (isSaving === dataSavingState.SAVED) {
			resetDataSavingState();
			startEditingData(false);
			resetAll();
		}
	}, [isSaving]);

	const resetAll = () => {
		setIsEditable(false);
		setVideoObject(null);
	};

	const handleVideoUploadChange = ({ fileList: newFileList }) => {
		if (newFileList.length > 0) {
			let file = newFileList[0].originFileObj;

			const isAcceptableFileType =
				file.type === "video/mp4" || file.type === "video/webm";
			if (!isAcceptableFileType) {
				message.error("You can only upload MP4/WebM file!");
			}

			const isUnder200MLimit = file.size / 1024 / 1024 < 200;
			if (!isUnder200MLimit) {
				message.error("Video must be smaller than 200MB!");
			}

			if (isAcceptableFileType && isUnder200MLimit) {
				let reader = new FileReader();
				reader.onloadend = () => {
					setVideoObject(file);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setVideoObject(null);
		}
	};

	const updateVideo = () => {
		if (videoObject) {
			updateCandidateIntroVideo(videoObject);
		} else {
			message.error("Please selectba new file and then click on save.");
		}
	};

	return (
		<Card
			type="inner"
			title="Introduction video"
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							disabled={isSaving === dataSavingState.SAVING}
							style={{ marginRight: 10 }}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							onClick={updateVideo}
							disabled={!videoObject || isSaving === dataSavingState.SAVING}
							loading={isSaving === dataSavingState.SAVING}
						>
							Save
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>Edit</Button>
				)
			}
		>
			<div className="studentDetails_video_container">
				<div className="studentDetails_introvideo">
					<video
						loop
						height={isEditable ? 300 : 350}
						key={video}
						controls
						controlsList="nodownload"
						onContextMenu={(e) => {
							e.preventDefault();
							return false;
						}}
					>
						<source src={video} type="video/mp4"></source>
						&gt; Your browser does not support HTML5 video.
					</video>
				</div>
				{isEditable && (
					<div className="studentDetails_logo_rule">
						<Badge
							status="warning"
							text="Record the video in landscape orientation."
						/>
						<Badge
							status="warning"
							text="Ensure good lighting and a clean background for a professional video appearance."
						/>
						<Badge
							status="warning"
							text="Use a good quality camera, such as a phone camera, to capture clear footage."
						/>
						<Badge
							status="warning"
							text="Keep the video duration to 1 minute or less, and the file size below 200MB."
						/>
						<Badge
							status="warning"
							text="Speak with good volume and clarity."
						/>
						<Badge
							status="warning"
							text="Maintain a pleasant smile throughout the video."
						/>
						<Badge
							status="warning"
							text="Clearly explain why you are interested in working in Japan."
						/>
						<Badge
							status="warning"
							text="Including a Japanese greeting at the beginning or end can leave a positive impression on companies."
						/>
					</div>
				)}
				<div>
					<Dragger
						name="files"
						beforeUpload={() => false}
						maxCount={1}
						disabled={isSaving === dataSavingState.SAVING || !isEditable}
						style={{ minWidth: isEditable ? 150 : 350 }}
						onChange={handleVideoUploadChange}
						showUploadList={false}
					>
						<p className="ant-upload-drag-icon">
							{isSaving === dataSavingState.SAVING ? (
								<LoadingOutlined size="small" />
							) : (
								<InboxOutlined
									size="small"
									style={!isEditable ? { color: "#f2f2f2" } : {}}
								/>
							)}
						</p>
						<p className="ant-upload-text">Click to upload</p>
						{videoObject && (
							<>
								File to upload:{" "}
								<span style={{ color: "blue" }}>{videoObject.name}</span>
							</>
						)}
					</Dragger>
				</div>
			</div>
		</Card>
	);
};
const mapStateToProps = (state) => ({
	isSaving: state.profile.isSaving,
});

export default connect(mapStateToProps, {
	updateCandidateIntroVideo,
	updateCandidateVideoThumbnail,
})(IntroductionVideo);
