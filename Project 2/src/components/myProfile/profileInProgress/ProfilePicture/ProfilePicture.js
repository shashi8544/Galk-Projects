import Cropper from "react-cropper";
import { Button, Modal } from "antd";
import { connect } from "react-redux";
import React, { useState } from "react";

import { uploadCandidateImage } from "../../../../actions/profileActions";

import "./profilePicture.css";
import "cropperjs/dist/cropper.css";

function ProfilePicture({
	isOpen,
	setIsOpen,
	file,
	uploadCandidateImage,
	setCroppedImage,
	fileType,
}) {
	const [cropper, setCropper] = useState();

	const getCropData = () => {
		if (typeof cropper !== "undefined") {
			let croppedData = cropper.getCroppedCanvas().toDataURL(fileType, 1.0);
			setCroppedImage(croppedData);
			uploadCandidateImage(croppedData);
		}
	};

	const onCancel = () => {
		setIsOpen(false);
	};

	const onSave = () => {
		setIsOpen(false);
		getCropData();
	};

	return (
		<div>
			<Modal
				title="Crop Image"
				footer={[
					<Button key={1} onClick={onSave} type="primary">
						Save
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
		</div>
	);
}

const mapStateToProps = (state) => ({
	isLoading: state.profile.isLoading,
});

export default connect(mapStateToProps, { uploadCandidateImage })(
	ProfilePicture
);
