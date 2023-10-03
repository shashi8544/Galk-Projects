import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { dataSavingState } from "../../../actions/types";
import {
    updateCandidateCertificate,
    addNewCandidateCertificate,
    deleteCandidateCertificate,
    resetDataSavingState,
    startEditingData
} from "../../../actions/candidateActions";
import ".././form.css";
import {
    Modal,
    Card,
    DatePicker,
    Form,
    Input,
    Popconfirm,
    Typography,
    Row,
    Col,
    Divider,
    notification,
    Button,
    message,
    Empty,
    Space,
} from "antd";
import {
    ExclamationCircleOutlined,
    LeftOutlined,
    RightOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;
const ButtonGroup = Button.Group;

class CertificateDetails extends React.Component {
    state = {
        certificate: this.props.userProfile.certificate,
        certificateEditIDX: -1,
        newCertificateFields: {},
        title: "",
        link: "",
        description: "",
        issueDate: null,
        loading: true,
        saveInProgress: false,
        errTitle: { status: "", msg: "" },
        errDescription: { status: "", msg: "" },
        errIssueDate: { status: "", msg: "" },
        editErrTitle: { status: "", msg: "" },
        editErrDescription: { status: "", msg: "" },
        editErrIssueDate: { status: "", msg: "" },
        showModal: false,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.userProfile !== this.props.userProfile) {
            this.setState({
                certificate: this.props.userProfile.certificate,
            });
        }
        if (this.props.isSaving === dataSavingState.SAVED) {
            this.setState({ certificateEditIDX: -1 })
            if (this.state.showModal) {
                this.cleanupAndCloseModal()
            }
            this.props.resetDataSavingState();
        }
    }
    cleanupAndCloseModal = () => {
        this.setState({
            title: "",
            link: "",
            issueDate: null,
            description: "",
            saveInProgress: false,
            showModal: false,
            errIssueDate: { status: "", msg: "" },
            errTitle: { status: "", msg: "" },
            errDescription: { status: "", msg: "" },
        });
        this.onNewCertificateFieldChange({
            title: "",
            link: "",
            issueDate: null,
            description: "",
        });
    }

    startCertificateEditing = (index) => {
        this.setState({ certificateEditIDX: index });
        this.props.startEditingData()
    };

    stopCertificateEditing = (index) => {
        if (this.validateRequiredFields()) {

            this.props.updateCandidateCertificate(this.state.certificate);
            this.setState({
                saveInProgress: false,
                editErrTitle: { status: "", msg: "" },
                editErrDescription: { status: "", msg: "" },
                editErrIssueDate: { status: "", msg: "" },
            });
        } else {
            message.error("Please provide required information !");
        }
    };

    handleDeleteCertificate = (index) => {
        this.props.deleteCandidateCertificate({
            id: index,
            certificate: this.state.certificate,
        });
    };
    handleCertificateChange = (e, propName, index) => {
        const { value } = e.target;

        if (propName === "issueDate") {
            if (value) {
                this.setState({
                    editErrIssueDate: { status: "", msg: "" },
                });
            } else {
                this.setState({
                    editErrIssueDate: {
                        status: "error",
                        msg: "Please enter Certificate issue date.",
                    },
                });
            }
            this.setState({
                certificate: this.state.certificate.map((item, j) =>
                    j === index
                        ? { ...item, issueDate: value ? value.format("DD/MM/YYYY") : null }
                        : item
                ),
            });
        } else {
            if (propName === "title") {
                if (!value) {
                    this.setState({
                        editErrTitle: {
                            status: "error",
                            msg: "Please enter Certificate title.",
                        },
                    });
                } else {
                    this.setState({
                        editErrTitle: { status: "", msg: "" },
                    });
                }
            }
            if (propName === "description") {
                if (!value) {
                    this.setState({
                        editErrDescription: {
                            status: "error",
                            msg: "Please enter Certificate description.",
                        },
                    });
                } else {
                    this.setState({
                        editErrDescription: { status: "", msg: "" },
                    });
                }
            }

            if (value.length < 1000)
                this.setState({
                    certificate: this.state.certificate.map((item, j) =>
                        j === index ? { ...item, [propName]: value } : item
                    ),
                });
        }
    };

    handleNewCertificateChange = (e, propName) => {
        const { value } = e.target;
        //This function is the onChange event of all the fields in new certificate
        if (propName === "issueDate") {
            if (value) {
                this.setState({
                    errIssueDate: { status: "", msg: "" },
                });
            } else {
                this.setState({
                    errIssueDate: {
                        status: "error",
                        msg: "Please enter Certificate issue date.",
                    },
                });
            }

            this.onNewCertificateFieldChange({
                issueDate: value ? value.format("DD/MM/YYYY") : null,
            });
            this.setState({
                issueDate: value ? value.format("DD/MM/YYYY") : null,
            });
        } else {
            if (propName === "title") {
                if (!value) {
                    this.setState({
                        errTitle: {
                            status: "error",
                            msg: "Please enter Certificate title.",
                        },
                    });
                } else {
                    this.setState({
                        errTitle: { status: "", msg: "" },
                    });
                }
            }

            if (propName === "description") {
                if (!value) {
                    this.setState({
                        errDescription: {
                            status: "error",
                            msg: "Please enter Certificate description.",
                        },
                    });
                } else {
                    this.setState({
                        errDescription: { status: "", msg: "" },
                    });
                }
            }

            if (value.length < 1000) {
                this.onNewCertificateFieldChange({ [propName]: value });
                this.setState({
                    [propName]: value,
                });
            }
        }
    };

    onNewCertificateFieldChange = (updatedValue) => {
        //This function is to create the new certificate object
        this.setState({
            newCertificateFields: {
                ...this.state.newCertificateFields,
                ...updatedValue,
            },
        });
    };

    saveNewCertificate = (e) => {
        e.preventDefault();
        if (this.validateRequiredNewFields()) {
            this.setState({ saveInProgress: true });
            var newArray = this.state.certificate.slice();
            newArray.push(this.state.newCertificateFields);
            this.props.addNewCandidateCertificate(newArray);
        } else {
            message.error("Please provide required information !");
        }
    };

    validateRequiredNewFields = () => {
        let flag = true;
        this.setState({
            errTitle: { status: "", msg: "" },
            errIssueDate: { status: "", msg: "" },
            errDescription: { status: "", msg: "" },
        });

        if (this.state.title.length === 0) {
            this.setState({
                errTitle: { status: "error", msg: "Please enter Certificate title." },
            });
            flag = false;
        }
        if (this.state.description.length === 0) {
            this.setState({
                errDescription: {
                    status: "error",
                    msg: "Please enter Certificate description.",
                },
            });
            flag = false;
        }
        if (!this.state.issueDate) {
            this.setState({
                errIssueDate: {
                    status: "error",
                    msg: "Please enter certificate issue date.",
                },
            });
            flag = false;
        }
        return flag;
    };

    validateRequiredFields = () => {
        let flag = true;
        const arr = this.state.certificate;
        this.setState({
            editErrTitle: { status: "", msg: "" },
            editErrIssueDate: { status: "", msg: "" },
            editErrDescription: { status: "", msg: "" },
        });

        if (arr[this.state.certificateEditIDX].title.length === 0) {
            this.setState({
                editErrTitle: {
                    status: "error",
                    msg: "Please enter certificate title.",
                },
            });
            flag = false;
        }
        if (arr[this.state.certificateEditIDX].description.length === 0) {
            this.setState({
                editErrDescription: {
                    status: "error",
                    msg: "Please enter certificate description.",
                },
            });
            flag = false;
        }
        if (!arr[this.state.certificateEditIDX].issueDate) {
            this.setState({
                editErrIssueDate: {
                    status: "error",
                    msg: "Please enter certificate issue date.",
                },
            });
            flag = false;
        }
        return flag;
    };

    validateCertificateInfoTab = () => {
        let flagError = false;
        if (this.state.certificateEditIDX >= 0) flagError = true;

        if (flagError) {
            notification.open({
                message: "Save your information",
                description:
                    "You have some unsaved data in this page. Please save before proceed to next step.",
                duration: 0,
                icon: <ExclamationCircleOutlined style={{ color: "#FF0000" }} />,
            });
        } else {
            this.props.nextStep();
        }
    };

    render() {
        return (
            <Card
                style={{ minHeight: 500 }}
                title={
                    <Title level={4} style={{ marginBottom: 0 }}>
                        Certificate Details
                    </Title>
                }
            >
                <Row className="Form">

                    <Col span={24}>
                        {this.state.certificate.length > 0 ? (
                            <React.Fragment>
                                {this.state.certificate.map((certificate, index) => (
                                    <Card
                                        key={index}
                                        type="inner"
                                        title={"Certificate #" + (index + 1)}
                                        style={{ marginTop: 10, width: "100%" }}
                                        extra={
                                            <Space>
                                                {this.state.certificateEditIDX === index ? (
                                                    <Button
                                                        size="small"
                                                        onClick={() => this.stopCertificateEditing(index)}
                                                    >
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="small"
                                                        onClick={() => this.startCertificateEditing(index)}
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                {this.state.certificateEditIDX !== index && (
                                                    <Popconfirm
                                                        title="Are you sure delete this certificate?"
                                                        onConfirm={() =>
                                                            this.handleDeleteCertificate(index)
                                                        }
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button size="small" danger>
                                                            Delete
                                                        </Button>
                                                    </Popconfirm>
                                                )}
                                            </Space>
                                        }
                                    >
                                        <Form layout={"vertical"}>
                                            <Form.Item
                                                label={
                                                    <span
                                                        className={
                                                            this.state.certificateEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Title
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.certificateEditIDX === index
                                                        ? this.state.editErrTitle.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.certificateEditIDX === index
                                                        ? this.state.editErrTitle.msg
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    disabled={
                                                        this.state.certificateEditIDX === index
                                                            ? false
                                                            : true
                                                    }
                                                    placeholder="Example: Microsoft ASP.NET professional certificate"
                                                    value={certificate.title}
                                                    id="title"
                                                    onChange={(e) => {
                                                        this.handleCertificateChange(e, "title", index);
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item label={<span>Certificate Link</span>}>
                                                <Input
                                                    disabled={
                                                        this.state.certificateEditIDX === index
                                                            ? false
                                                            : true
                                                    }
                                                    placeholder="Example: Certificate link"
                                                    value={certificate.link}
                                                    id="link"
                                                    onChange={(e) => {
                                                        this.handleCertificateChange(e, "link", index);
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ marginTop: 30 }}
                                                label={
                                                    <span
                                                        className={
                                                            this.state.certificateEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                        style={{ marginTop: 10 }}
                                                    >
                                                        Issue date
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.certificateEditIDX === index
                                                        ? this.state.editErrIssueDate.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.certificateEditIDX === index
                                                        ? this.state.editErrIssueDate.msg
                                                        : ""
                                                }
                                            >
                                                <DatePicker
                                                    disabled={
                                                        this.state.certificateEditIDX === index
                                                            ? false
                                                            : true
                                                    }
                                                    value={
                                                        certificate.issueDate
                                                            ? moment(certificate.issueDate, "DD/MM/YYYY")
                                                            : certificate.issueDate
                                                    }
                                                    allowClear
                                                    onChange={(value) => {
                                                        this.handleCertificateChange(
                                                            { target: { value: value } },
                                                            "issueDate",
                                                            index
                                                        );
                                                    }}
                                                    format={"DD/MM/YYYY"}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={
                                                    <span
                                                        className={
                                                            this.state.certificateEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Description
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.certificateEditIDX === index
                                                        ? this.state.editErrDescription.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.certificateEditIDX === index
                                                        ? this.state.editErrDescription.msg
                                                        : ""
                                                }
                                            >
                                                <TextArea
                                                    disabled={
                                                        this.state.certificateEditIDX === index
                                                            ? false
                                                            : true
                                                    }
                                                    placeholder="Example: Information about the certificate."
                                                    autosize={{ minRows: 2, maxRows: 5 }}
                                                    value={certificate.description}
                                                    id="description"
                                                    onChange={(e) => {
                                                        this.handleCertificateChange(
                                                            e,
                                                            "description",
                                                            index
                                                        );
                                                    }}
                                                />
                                            </Form.Item>
                                            {this.state.certificateEditIDX === index ? (
                                                <React.Fragment>
                                                    <Divider />

                                                    <Form.Item>
                                                        <Button
                                                            loading={this.props.isSaving === dataSavingState.SAVING}
                                                            type="primary"
                                                            disabled={
                                                                this.state.certificateEditIDX === index
                                                                    ? false
                                                                    : true
                                                            }
                                                            block
                                                            onClick={() => this.stopCertificateEditing(index)}
                                                        >
                                                            Save
                                                        </Button>
                                                    </Form.Item>
                                                </React.Fragment>
                                            ) : null}
                                        </Form>
                                    </Card>
                                ))}
                            </React.Fragment>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <Empty></Empty>
                            </div>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Button
                        style={{ marginTop: 8 }}
                        type="dashed"
                        block
                        onClick={() => {
                            this.setState({ showModal: true });
                        }}
                    >
                        <PlusCircleOutlined />
                        Add Certificate
                    </Button>

                    <Modal
                        title="Add new Certificate"
                        style={{ top: 20 }}
                        onOk={this.saveNewCertificate}
                        onCancel={() => {
                            this.setState({
                                showModal: false,
                                title: "",
                                link: "",
                                description: "",
                                issueDate: null,
                                errIssueDate: { status: "", msg: "" },
                                errTitle: { status: "", msg: "" },
                                errDescription: { status: "", msg: "" },
                            });
                        }}
                        visible={this.state.showModal}
                        footer={[
                            <Button
                                key="back"
                                onClick={() => {
                                    this.setState({
                                        showModal: false,
                                        title: "",
                                        link: "",
                                        description: "",
                                        issueDate: null,
                                        errIssueDate: { status: "", msg: "" },
                                        errTitle: { status: "", msg: "" },
                                        errDescription: { status: "", msg: "" },
                                    });
                                }}
                            >
                                Cancel
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                loading={this.props.isSaving === dataSavingState.SAVING}
                                onClick={this.saveNewCertificate}
                            >
                                Save
                            </Button>,
                        ]}
                    >
                        <Form layout={"vertical"}>
                            <Form.Item
                                label={<span className="required">Certificate Title</span>}
                                validateStatus={this.state.errTitle.status}
                                help={this.state.errTitle.msg}
                            >
                                <Input
                                    placeholder="Example: Microsoft ASP.NET professional certificate"
                                    value={this.state.title}
                                    id="title"
                                    onChange={(e) => {
                                        this.handleNewCertificateChange(e, "title");
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label={<span>Certificate Link</span>}>
                                <Input
                                    placeholder="Example: Certificate link"
                                    value={this.state.link}
                                    id="link"
                                    onChange={(e) => {
                                        this.handleNewCertificateChange(e, "link");
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ marginTop: 30 }}
                                label={<span className="required">Issue Date</span>}
                                validateStatus={this.state.errIssueDate.status}
                                help={this.state.errIssueDate.msg}
                            >
                                <DatePicker
                                    value={
                                        this.state.issueDate
                                            ? moment(this.state.issueDate, "DD/MM/YYYY")
                                            : this.state.issueDate
                                    }
                                    allowClear
                                    onChange={(value) => {
                                        this.handleNewCertificateChange(
                                            { target: { value: value } },
                                            "issueDate"
                                        );
                                    }}
                                    format={"DD/MM/YYYY"}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<span className="required">Description</span>}
                                validateStatus={this.state.errDescription.status}
                                help={this.state.errDescription.msg}
                            >
                                <TextArea
                                    placeholder="Example: Information about the certificate."
                                    autosize={{ minRows: 2, maxRows: 5 }}
                                    value={this.state.description}
                                    id="description"
                                    onChange={(e) => {
                                        this.handleNewCertificateChange(e, "description");
                                    }}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Row>
            </Card>
        );
    }
}

export default connect(null, {
    addNewCandidateCertificate,
    updateCandidateCertificate,
    deleteCandidateCertificate,
    resetDataSavingState,
    startEditingData
})(CertificateDetails);
