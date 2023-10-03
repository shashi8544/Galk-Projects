import React, { useEffect, useState } from "react";
import preview from "../../../assets/img/introPreview.png";
import { connect } from "react-redux";
import {
    updateCandidateIntroVideo, updateCandidateVideoThumbnail,
    resetDataSavingState,
    startEditingData,
    stopLoading,
    updateIntroOnly,
} from "../../../actions/candidateActions";
import { dataSavingState } from "../../../actions/types";
import ThumbnailGenerator from "../../../utils/thumbnailGenerator";
import {
    Upload,
    Card,
    Typography,
    Row,
    Col,
    Modal,
    notification,
    Button,
    Collapse,
    Alert,
    Spin,
    message,
    Progress,
} from "antd";
import {
    UploadOutlined,
    ExclamationCircleOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import './index.css';
const { Title } = Typography;
const { Panel } = Collapse;

const ButtonGroup = Button.Group;

const IntroductionVideo = ({
    updateCandidateIntroVideo,
    updateCandidateVideoThumbnail,
    userProfile,
    nextStep,
    prevStep,
    isLoading,
    stopLoading,
    uploadProgress,
    resetDataSavingState,
    isSaving,
    startEditingData,
    updateIntroOnly
}) => {
    const [introVideoEdit, setIntroVideoEdit] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [instructionVideo, setInstructionVideo] = useState("");
    const [showInstructionVideo, setShowInstructionVideo] = useState(false);
    const [thumbnail, setThumbnai] = useState("")
    const [selfIntro, setSelfIntro] = useState(userProfile?.selfIntro);
    const [onlySelfIntro, setOnlySelfIntro] = useState(false)
    const { video } = userProfile;

    const startintroVideoEditing = () => {
        setIntroVideoEdit(true);
        startEditingData()
    };
    useEffect(() => {
        if (isSaving === dataSavingState.SAVED) {
            resetDataSavingState();
            startEditingData(false)
            setIntroVideoEdit(false);
            setOnlySelfIntro(false)
        }
    }, [isSaving, resetDataSavingState, startEditingData])
    const stopintroVideoEditing = () => {
        if (fileList.length > 0) {
            updateCandidateVideoThumbnail(thumbnail)
            updateCandidateIntroVideo(fileList[0], selfIntro);
            setIntroVideoEdit(false);
            setFileList([]);
        } else {
            if (selfIntro || userProfile?.selfIntro) {
                setOnlySelfIntro(true)
                updateIntroOnly(selfIntro)
            }
            else {
                stopLoading()
                resetDataSavingState();
                startEditingData(false)
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
        let Generator = new ThumbnailGenerator()
        Generator.video.onpause = function () {
            setThumbnai(Generator.thumbnailBlob)
            //console.log(Generator.thumbnailBlob)
            //console.log(Generator.thumbnail)
            URL.revokeObjectURL(Generator.url)
        }
        Generator.createThumbnail(file, 300)
    }
    const validateIntroVideoInfoTab = () => {
        if (video) {
            if (introVideoEdit) {
                notification.open({
                    message: "Save your information",
                    description: "Please save your data before proceed to next step.",
                    duration: 0,
                    icon: <ExclamationCircleOutlined style={{ color: "#FF0000" }} />,
                });
            } else {
                nextStep();
            }
        } else {
            notification.open({
                message: "Missing information",
                description:
                    "Please upload your Introduction video before proceed to next step.",
                duration: 0,
                icon: <ExclamationCircleOutlined style={{ color: "#FF0000" }} />,
            });
        }
    };

    const validateVideoFileBeforeUpload = (file) => {
        const isLt200M = file.size / 1024 / 1024 < 200;
        if (!isLt200M) {
            message.error("Video file size must smaller than 200MB!");
        }
        if (isLt200M) {
            setFileList([file]);
            generateThumbnail(file)
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
                        type="primary" onClick={() => stopintroVideoEditing()}>
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
                            {((isSaving === dataSavingState.SAVING) && !onlySelfIntro) && (
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
                                // description="Introduction video is mandatory to take part in internship program. If you wish to skip this step, you will only be able to take part in our freelance program. However, anytime you can come back and upload your video and then you will be automatically placed in Internship program."
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
                                                1. Video should be in Landscape
                                                <br />
                                                2. It should be made in good lighting.
                                                <br />
                                                3. It is only a 1 minute video and size should be less
                                                than 200MB
                                                <br />
                                                4. Should be shot through a good camera, can be a phone
                                                camera as long as the quality is clear.
                                                <br />
                                                5. First/Last greeting in Japanese gives better
                                                impression to the companies.
                                                <br />
                                                6. Mention why you would like to work in Japan.
                                                <br />
                                                7. Good Smile
                                                <br />
                                                8. Good Volume of your speak
                                            </small>
                                            <br />
                                            <br />
                                            <br />
                                            Here is an introduction video guideline for a reference
                                            <div
                                                className="btn btn-sm btn-outline-info"
                                                onClick={() => renderInstructionVideo()}
                                            >
                                                <span>Instruction Video</span>
                                            </div>
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
                    {(userProfile?.subscribedInGalkLab) ? <div>
                        <div className="self-intro-heading">Self Introduction</div>
                        <textarea
                            disabled={introVideoEdit === false}
                            placeholder="Enter self introduction"
                            className="text-area-intro"
                            value={selfIntro}
                            onChange={(e) => setSelfIntro(e.target.value)}
                        />
                    </div> : null
                    }
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
    updateIntroOnly
})(IntroductionVideo);
