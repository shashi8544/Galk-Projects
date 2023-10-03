import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { defaultCompanyCoverPhoto } from "../../../utils/constants";
import { updateCompanyCoverPhoto } from "../../../actions/companyActions";
import { usePreviousState } from "../../../utils/customHooks";
import { Card, Button, Badge, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { InboxOutlined } from "@ant-design/icons";
import "./style.css";

const { Dragger } = Upload;

const CoverPhoto = ({
	coverPhoto,
	updateCompanyCoverPhoto,
	isActionProgress,
}) => {
	const prevActionInProgressValue = usePreviousState(isActionProgress);

	const [photo, setCoverPhoto] = useState(coverPhoto);
	const [coverPhotoObject, setCoverPhotoObject] = useState(null);
	const [isEditable, setIsEditable] = useState(false);

	useEffect(() => {
		setCoverPhoto(coverPhoto);
	}, [coverPhoto]);

	useEffect(() => {
		if (!isActionProgress && prevActionInProgressValue) {
			resetAll();
		}
	}, [isActionProgress]);

	const resetAll = () => {
		setIsEditable(false);
		setCoverPhotoObject(null);
	};

	const handleCoverPhotoUploadChange = ({ fileList: newFileList }) => {
		if (newFileList.length > 0) {
			let file = newFileList[0].originFileObj;
			const isAcceptableFileType =
				file.type === "image/jpeg" ||
				file.type === "image/svg+xml" ||
				file.type === "image/gif" ||
				file.type === "image/png";
			if (!isAcceptableFileType) {
				message.error("You can only upload jpeg/png/svg/gif file!");
			}
			const isLt10M = file.size / 1024 / 1024 < 10;
			if (!isLt10M) {
				message.error("Image must be smaller than 10MB!");
			}
			if (isAcceptableFileType && isLt10M) {
				let reader = new FileReader();
				reader.onloadend = () => {
					setCoverPhotoObject(file);
					// setCoverPhoto(reader.result);
				};
				reader.readAsDataURL(file);
			}
		} else {
			setCoverPhotoObject(null);
		}
	};

	const updateCoverPhoto = () => {
		if (coverPhotoObject) {
			updateCompanyCoverPhoto(coverPhotoObject);
		} else {
			message.error("Please selectba new file and then click on save.");
		}
	};

	return (
		<Card
			type="inner"
			title="Cover photo"
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
							onClick={updateCoverPhoto}
							disabled={!coverPhotoObject}
							loading={isActionProgress}
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
			<div className="companyDetails_logo_container">
				<div className="companyDetails_coverPhoto_image_container">
					<img
						className="companyDetails_coverPhoto_image"
						src={photo || defaultCompanyCoverPhoto}
					/>
				</div>
				<div>
					<ImgCrop rotate aspect={2 / 1}>
						<Dragger
							name="files"
							beforeUpload={() => false}
							maxCount={1}
							disabled={!isEditable}
							style={{ minWidth: 450 }}
							onChange={handleCoverPhotoUploadChange}
							showUploadList={false}
						>
							<p className="ant-upload-drag-icon">
								<InboxOutlined
									size="small"
									style={!isEditable ? { color: "#f2f2f2" } : {}}
								/>
							</p>
							<p className="ant-upload-text">Click to this area to upload</p>
							<p className="ant-upload-hint">Support for a single upload.</p>
							<p className="ant-upload-hint">
								Type should be jpeg/png/gif/svg and size should be less than
								10MB
							</p>
							{coverPhotoObject && (
								<>
									File to upload:{" "}
									<span style={{ color: "blue" }}>{coverPhotoObject.name}</span>
								</>
							)}
						</Dragger>
					</ImgCrop>
				</div>
			</div>
		</Card>
	);
};
const mapStateToProps = (state) => ({
	isActionProgress: state.company.actionInProgress,
});

export default connect(mapStateToProps, { updateCompanyCoverPhoto })(
	CoverPhoto
);
