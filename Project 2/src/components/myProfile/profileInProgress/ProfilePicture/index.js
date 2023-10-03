import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { notification, Spin } from "antd";

import { resetImageUploadState } from "../../../../actions/profileActions";

import ProfilePicture from "./ProfilePicture";
import "./profilePicture.css";

const ChooseProgramProfile = ({
	isLoading,
	user,
	imageUploadResult,
	resetImageUploadState,
}) => {
	const [file, setFile] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [fileType, setFileType] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);

	const openNotification = (type = "success", title, content) => {
		notification[type]({
			message: title,
			description: content,
			onClick: () => {},
		});
	};

	useEffect(() => {
		if (user) {
			setCroppedImage(user.img);
		}
	}, [user]);

	useEffect(() => {
		if (imageUploadResult === "success") {
			openNotification("success", "Success", "Successfully uploaded the image");
			resetImageUploadState();
		} else if (imageUploadResult === "failed") {
			openNotification("error", "Failed", "Upload failed");
			resetImageUploadState();
		}
	}, [imageUploadResult]); // eslint-disable-line react-hooks/exhaustive-deps

	const defaultSrc = "/user-solid.svg";

	const handleBeforeImageUpload = (file) => {
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		setFileType(file.type);

		if (!isJpgOrPng) {
			openNotification("error", "Error", "file should be in JPG or PNG format");
		}

		const isUnder10MLimit = file.size / 1024 / 1024 < 10;
		if (!isUnder10MLimit) {
			openNotification("error", "Error", "file size should be less than 10 MB");
		}

		if (isJpgOrPng && isUnder10MLimit) {
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
				};
			};
			reader.readAsDataURL(file);
		}
		return false; //to prevent ant default form posting
	};

	const handleImageEdit = () => {
		const input = document.getElementById("myProfileInputFile");

		input.click();
	};

	const handleInputImageChange = (e) => {
		const files = e.target?.files;
		if (files && files.length) {
			handleBeforeImageUpload(files[0]);
			e.target.value = "";
		}
	};

	const spinnerAndEdit = isLoading ? (
		<Spin size="large" />
	) : (
		<img
			className="myProfile_imageCrop_index_image_edit"
			src="/edit-solid.svg"
			onClick={handleImageEdit}
			alt="edit"
		/>
	);

	return (
		<>
			<div className="myProfile_imageCrop_index_container">
				<div className="myProfile_imageCrop_index_heading">
					Professional photo
				</div>
				<div className="myProfile_imageCrop_index_image_container">
					<img
						src={croppedImage || defaultSrc}
						alt="im"
						className="myProfile_imageCrop_index_image"
					/>
					{spinnerAndEdit}
					<input
						className="myProfile_imageCrop_index_image_input"
						type="file"
						id="myProfileInputFile"
						onChange={handleInputImageChange}
						accept="image/png,image/jpeg"
					/>
				</div>
				<div className="myProfile_imageCrop_index_image_guideLines">
					<ol>
						<li>Only JPG or PNG file less than 10 MB of size is allowed.</li>
						<li>
							Your profile picture should reflect a formal and professional
							appearance.
						</li>
						<li>
							Please upload a recent photo that accurately represents your
							current appearance.
						</li>
					</ol>
				</div>
			</div>
			<ProfilePicture
				isOpen={isOpen}
				file={file}
				fileType={fileType}
				setCroppedImage={setCroppedImage}
				setIsOpen={setIsOpen}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.profile.isLoading,
	user: state.user.user,
	imageUploadResult: state.profile.imageUploadResult,
});

export default connect(mapStateToProps, { resetImageUploadState })(
	ChooseProgramProfile
);
