import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import {
	Upload,
	Card,
	Typography,
	Row,
	Col,
	Modal,
	Button,
	Collapse,
	Alert,
	Spin,
	message,
	Progress,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
	updateCandidateIntroVideo,
	updateCandidateVideoThumbnail,
	resetDataSavingState,
	startEditingData,
	stopLoading,
	updateIntroOnly,
} from "../../../../actions/candidateActions";
import { dataSavingState } from "../../../../actions/types";
import ThumbnailGenerator from "../../../../utils/thumbnailGenerator";

import preview from "../../../../assets/img/introPreview.png";

import "./style.css";

const { Title } = Typography;
const { Panel } = Collapse;

const IntroductionVideo = ({
	updateCandidateIntroVideo,
	updateCandidateVideoThumbnail,
	userProfile,
	nextStep,
	stopLoading,
	uploadProgress,
	resetDataSavingState,
	isSaving,
	startEditingData,
	updateIntroOnly,
}) => {
	const [introVideoEdit, setIntroVideoEdit] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [instructionVideo, setInstructionVideo] = useState("");
	const [showInstructionVideo, setShowInstructionVideo] = useState(false);
	const [thumbnail, setThumbnai] = useState("");
	const [selfIntro, setSelfIntro] = useState(userProfile?.selfIntro);
	const [onlySelfIntro, setOnlySelfIntro] = useState(false);
	const { video } = userProfile;

	const startintroVideoEditing = () => {
		setIntroVideoEdit(true);
		startEditingData();
	};

	useEffect(() => {
		if (isSaving === dataSavingState.SAVED) {
			resetDataSavingState();
			startEditingData(false);
			setIntroVideoEdit(false);
			setOnlySelfIntro(false);
		}
	}, [isSaving, resetDataSavingState, startEditingData]);

	const stopintroVideoEditing = () => {
		if (fileList.length > 0) {
			updateCandidateVideoThumbnail(thumbnail);
			updateCandidateIntroVideo(fileList[0], selfIntro);
			setIntroVideoEdit(false);
			setFileList([]);
		} else {
			if (selfIntro || userProfile?.selfIntro) {
				setOnlySelfIntro(true);
				updateIntroOnly(selfIntro);
			} else {
				stopLoading();
				resetDataSavingState();
				startEditingData(false);
				setIntroVideoEdit(false);
			}
		}
	};

	const renderInstructionVideo = () => {
		setInstructionVideo(
			"https://s3-ap-northeast-1.amazonaws.com/galk.public/File+from+iOS.MP4"
		);
		setShowInstructionVideo(true);
	};

	const stopRenderInstructionVideo = () => {
		setInstructionVideo("");
		setShowInstructionVideo(false);
	};

	const generateThumbnail = (file) => {
		let Generator = new ThumbnailGenerator();
		Generator.video.onpause = function () {
			setThumbnai(Generator.thumbnailBlob);
			URL.revokeObjectURL(Generator.url);
		};
		Generator.createThumbnail(file, 300);
	};

	const validateVideoFileBeforeUpload = (file) => {
		const isLt200M = file.size / 1024 / 1024 < 200;
		if (!isLt200M) {
			message.error("Video file size must smaller than 200MB!");
		}
		if (isLt200M) {
			setFileList([file]);
			generateThumbnail(file);
		}

		return false;
	};

	return (
		<Card
			style={{ minHeight: 500 }}
			title={
				<Title level={4} style={{ marginBottom: 0 }}>
					Introduction Video
				</Title>
			}
			extra={
				introVideoEdit === true ? (
					<Button
						loading={onlySelfIntro}
						type="primary"
						onClick={() => stopintroVideoEditing()}
					>
						Save
					</Button>
				) : (
					<Button type="primary" onClick={() => startintroVideoEditing()}>
						Edit
					</Button>
				)
			}
		>
			<Row>
				<Col span={24}>
					<div style={{ display: "flex", justifyContent: "start" }}>
						<div>
							{introVideoEdit && (
								<div>
									<Upload
										fileList={fileList}
										multiple={false}
										beforeUpload={validateVideoFileBeforeUpload}
										onRemove={() => {
											setFileList([]);
										}}
									>
										<Button>
											<UploadOutlined />
											Select File
										</Button>
									</Upload>
								</div>
							)}
						</div>
						<div>
							{isSaving === dataSavingState.SAVING && !onlySelfIntro && (
								<React.Fragment>
									<Spin tip="Please wait..." />
									<Progress percent={uploadProgress} size="small" />
								</React.Fragment>
							)}
						</div>
					</div>
					{video ? (
						<video
							className="introVideo"
							controls
							controlsList="nodownload"
							key={video}
						>
							<source src={video} type="video/mp4" />
							Your browser does not support HTML5 video.
						</video>
					) : (
						<React.Fragment>
							<Alert
								showIcon
								closable
								message="Please read carefully !!"
								description="Introduction video is mandatory to take part in internship program. Without introduction video your profile will not be published and visible to the recruiters."
								type="warning"
							/>
							<Collapse accordion style={{ width: "100%" }}>
								<Panel
									header="Expand to see instructions for introduction video"
									key="1"
								>
									<div className="introVideoBlank col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<span className="introVideoUploadInstruction">
											<small>
												Please click on "Edit video" option above and upload
												your introduction video.
												<br />
												Tips:
												<br />
												1. Record the video in landscape orientation.
												<br />
												2. Ensure good lighting and a clean background for a
												professional video appearance.
												<br />
												3. Use a good quality camera, such as a phone camera, to
												capture clear footage.
												<br />
												4. Keep the video duration to 1 minute or less, and the
												file size below 200MB.
												<br />
												5. Speak with good volume and clarity.
												<br />
												6. Maintain a pleasant smile throughout the video.
												<br />
												7. Clearly explain why you are interested in working in
												Japan.
												<br />
												8. Including a Japanese greeting at the beginning or end
												can leave a positive impression on companies.
											</small>
											<br />
											<br />
											<br />
											Here is an introduction video guideline for a reference
											<button
												// className="btn btn-sm btn-outline-info"
												onClick={() => renderInstructionVideo()}
											>
												Instruction Video
											</button>
										</span>
										<br />
										{showInstructionVideo && (
											<Modal
												title="Instruction Video"
												visible={true}
												onOk={stopRenderInstructionVideo}
												onCancel={stopRenderInstructionVideo}
											>
												{instructionVideo.length > 0 && (
													<video
														className="introVideo"
														poster={preview}
														controls
														controlsList="nodownload"
													>
														<source src={instructionVideo} type="video/mp4" />
														Your browser does not support HTML5 video.
													</video>
												)}
											</Modal>
										)}
									</div>
								</Panel>
							</Collapse>
						</React.Fragment>
					)}
					{userProfile?.subscribedInGalkLab ? (
						<div>
							<div className="self-intro-heading">Self Introduction</div>
							<textarea
								disabled={introVideoEdit === false}
								placeholder="Enter self introduction"
								className="text-area-intro"
								value={selfIntro}
								onChange={(e) => setSelfIntro(e.target.value)}
							/>
						</div>
					) : null}
				</Col>
			</Row>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	uploadProgress: state.user.videoUploadProgress,
});

export default connect(mapStateToProps, {
	updateCandidateIntroVideo,
	updateCandidateVideoThumbnail,
	resetDataSavingState,
	startEditingData,
	stopLoading,
	updateIntroOnly,
})(IntroductionVideo);
