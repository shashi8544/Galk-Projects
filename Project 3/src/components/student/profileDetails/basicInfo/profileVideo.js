import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateStudentVideo } from "../../../../actions/studentAction";
import { usePreviousState } from "../../../../utils/customHooks";
import { Card, Button, Badge, Upload, message } from "antd";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import "./style.css";

const { Dragger } = Upload;

const ProfileVideo = ({
	studentImg,
	videoURL,
	updateStudentVideo,
	isActionProgress,
}) => {
	const prevActionInProgressValue = usePreviousState(isActionProgress);

	const [video, setVideoURL] = useState(videoURL);
	const [videoObject, setVideoObject] = useState(null);
	const [isEditable, setIsEditable] = useState(false);

	useEffect(() => {
		setVideoURL(videoURL);
	}, [videoURL]);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			resetAll();
		}
	}, [isActionProgress]);

	const resetAll = () => {
		setIsEditable(false);
		setVideoObject(null);
	};

	const handleVideoUploadChange = ({ fileList: newFileList }) => {
		if (newFileList.length > 0) {
			let file = newFileList[0].originFileObj;
			// const isAcceptableFileType =
			// 	file.type === "image/jpeg" ||
			// 	file.type === "image/svg+xml" ||
			// 	file.type === "image/gif" ||
			// 	file.type === "image/png";
			// if (!isAcceptableFileType) {
			// 	message.error("You can only upload jpeg/png/svg/gif file!");
			// }
			const isLt10M = file.size / 1024 / 1024 < 200;
			if (!isLt10M) {
				message.error("Video must be smaller than 200MB!");
			}
			if (isLt10M) {
				let reader = new FileReader();
				reader.onloadend = () => {
					setVideoObject(file);
					// setVideoURL(reader.result);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setVideoObject(null);
		}
	};

	const updateVideo = () => {
		if (videoObject) {
			updateStudentVideo(videoObject);
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
							disabled={isActionProgress}
							// loading={isActionProgress}
							style={{ marginRight: 10 }}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							onClick={updateVideo}
							disabled={!videoObject}
							loading={isActionProgress}
						>
							Save
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>Edit</Button>
				)
			}
			// bodyStyle={{ height: 230 }}
		>
			<div className="studentDetails_video_container">
				<div className="studentDetails_introvideo">
					<video
						loop
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
				<div>
					<Dragger
						name="files"
						beforeUpload={() => false}
						maxCount={1}
						disabled={!isEditable}
						// style={{ minWidth: 450 }}
						onChange={handleVideoUploadChange}
						showUploadList={false}
					>
						<p className="ant-upload-drag-icon">
							{isActionProgress ? (
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
	isActionProgress: state.student.studentToShowActionInProgress,
});

export default connect(mapStateToProps, { updateStudentVideo })(ProfileVideo);
