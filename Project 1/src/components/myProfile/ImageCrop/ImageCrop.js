import React, { useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./imageCrop.css";
import { Button, Modal, Progress } from "antd";
import { connect } from "react-redux";
import { uploadCandidateImage } from "../../../actions/profileActions";
const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

function ImageCrop({ isOpen,
    setIsOpen,
    file,
    uploadCandidateImage,
    setCroppedImage,
    fileType }) {
    const [cropper, setCropper] = useState();
    // const onChange = (e) => {
    //     e.preventDefault();
    //     let files;
    //     if (e.dataTransfer) {
    //         files = e.dataTransfer.files;
    //     } else if (e.target) {
    //         files = e.target.files;
    //     }
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         let img = new Image();
    //         img.src = reader.result;
    //         img.onload = function () {
    //             const canvas = document.createElement("canvas");
    //             const ctx = canvas.getContext("2d");

    //             const width = Math.min(800, img.width);
    //             canvas.height = width * (img.height / img.width);
    //             canvas.width = width;
    //             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //             canvas.toDataURL(fileType, 1.0)
    //         }
    //         setImage(reader.result);
    //     };
    //     reader.readAsDataURL(files[0]);
    // };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            let croppedData = cropper.getCroppedCanvas().toDataURL(fileType, 1.0)
            setCroppedImage(croppedData)
            uploadCandidateImage(croppedData)
        }
    };
    const onCancel = () => {
        setIsOpen(false)
    }
    const onSave = () => {
        setIsOpen(false)
        getCropData()

    }

    return (
        <div>
            <Modal title="Crop Image"
                footer={[
                    <Button key={1}
                        onClick={onSave}
                        type="primary"  >Save</Button>,
                    <Button key={2} type="default" onClick={onCancel} >Cancel</Button>
                ]}
                visible={isOpen} onOk={onSave} onCancel={onCancel} >
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
                        background={false}
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
};

const mapStateToProps = (state) => ({
    isLoading: state.profile.isLoading,
});

export default connect(mapStateToProps, { uploadCandidateImage })(ImageCrop);
