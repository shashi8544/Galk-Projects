import Cropper from "react-cropper";
import { connect } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Upload, message, Modal } from "antd";

import { uploadCandidateImage } from "../../../../actions/profileActions";
import defaultStudentPic from "../../../../assets/images/defaultStudentPic.jpeg";

import "./style.css";

const { Dragger } = Upload;

const ProfilePicture = ({ studentImg, uploadCandidateImage, isLoading }) => {
	const [logo, setLogo] = useState(studentImg);

	const [file, setFile] = useState(null);
	const [cropper, setCropper] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [fileType, setFileType] = useState(null);
	const [logoObject, setLogoObject] = useState(null);
	const [toUpload, setToUpload] = useState(undefined);
	const [isEditable, setIsEditable] = useState(false);

	const getCropData = () => {
		if (typeof cropper !== "undefined") {
			let croppedData = cropper.getCroppedCanvas().toDataURL(fileType, 1.0);
			setToUpload(croppedData);
		}
	};

	const onCancel = () => {
		setIsOpen(false);
	};

	const onSave = () => {
		setIsOpen(false);
		getCropData();
	};

	useEffect(() => {
		setLogo(studentImg);
	}, [studentImg]);

	useEffect(() => {
		if (!isLoading) resetAll();
	}, [isLoading]);

	const resetAll = () => {
		setIsEditable(false);
		setLogoObject(null);
		setToUpload(undefined);
	};

	const updateLogo = () => {
		if (logoObject) {
			uploadCandidateImage(toUpload);
		} else {
			message.error("Please select new file and then click on save.");
		}
	};

	const handleInputImageChange = ({ fileList: newFileList }) => {
		if (newFileList && newFileList.length) {
			handleBeforeImageUpload(
				newFileList[newFileList.length - 1].originFileObj
			);
		}
	};

	const handleBeforeImageUpload = (file) => {
		const isAcceptableFileType =
			file.type === "image/jpeg" || file.type === "image/png";

		setFileType(file.type);

		if (!isAcceptableFileType) {
			message.error("You can only upload jpeg/png file!");
			return;
		}

		const isUnder10MLimit = file.size / 1024 / 1024 < 10;
		if (!isUnder10MLimit) {
			message.error("Image must be smaller than 10MB!");
			return;
		}

		if (isAcceptableFileType && isUnder10MLimit) {
			var reader = new FileReader();
			reader.onloadend = () => {
				let img = new Image();
				img.src = reader.result;
				img.onload = function () {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");

					if (img.width > img.height) {
						const width = Math.min(800, img.width);
						canvas.width = width;
						canvas.height = width * (img.height / img.width);
					} else {
						const height = Math.min(800, img.height);
						canvas.height = height;
						canvas.width = height * (img.width / img.height);
					}

					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
					setFile(canvas.toDataURL(fileType, 1.0));
					setIsOpen(true);

					setLogoObject(file);
					setToUpload(reader.result);
				};
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Card
			type="inner"
			title="Professional photo"
			extra={
				isEditable ? (
					<>
						<Button
							onClick={resetAll}
							style={{ marginRight: 10 }}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button
							type="primary"
							onClick={updateLogo}
							disabled={!logoObject}
							loading={isLoading}
						>
							Save
						</Button>
					</>
				) : (
					<Button onClick={() => setIsEditable(true)}>Edit</Button>
				)
			}
			bodyStyle={{ height: 230 }}
		>
			<Modal
				title="Crop Image"
				footer={[
					<Button key={1} onClick={onSave} type="primary">
						{" "}
						OK{" "}
					</Button>,
					<Button key={2} type="default" onClick={onCancel}>
						Cancel
					</Button>,
				]}
				visible={isOpen}
				onOk={onSave}
				onCancel={onCancel}
			>
				<div style={{ width: "100%" }}>
					<Cropper
						style={{ height: 400, width: "100%" }}
						zoomTo={0.5}
						initialAspectRatio={1}
						aspectRatio={1}
						preview=".img-preview"
						src={file}
						viewMode={1}
						minCropBoxHeight={100}
						minCropBoxWidth={100}
						background={true}
						responsive={true}
						autoCropArea={1}
						checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
						onInitialized={(instance) => {
							setCropper(instance);
						}}
						guides={true}
					/>
				</div>
			</Modal>
			<div className="studentDetails_logo_container">
				<div className="studentDetails_logo_image_container">
					<img
						alt="student img"
						className="studentDetails_logo_image"
						src={logo || defaultStudentPic}
					/>
				</div>
				<div className="studentDetails_logo_rule">
					<Badge
						status="warning"
						text="Only JPG or PNG file less than 10 MB of size is allowed."
					/>
					<Badge
						status="warning"
						text="Your profile picture should reflect a formal and professional appearance."
					/>
					<Badge
						status="warning"
						text="Please upload a recent photo that accurately represents your current appearance."
					/>
				</div>
				<div>
					<Dragger
						disabled={!isEditable}
						style={{ minWidth: 350 }}
						onChange={handleInputImageChange}
						showUploadList={false}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined
								size="small"
								style={!isEditable ? { color: "#f2f2f2" } : {}}
							/>
						</p>
						<p className="ant-upload-text">Click on this area to upload</p>
						<p className="ant-upload-hint">Support for a single upload.</p>
						{logoObject && (
							<>
								File to upload:{" "}
								<span style={{ color: "blue" }}>{logoObject.name}</span>
							</>
						)}
					</Dragger>
				</div>
			</div>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.profile.isLoading,
});

export default connect(mapStateToProps, { uploadCandidateImage })(
	ProfilePicture
);
