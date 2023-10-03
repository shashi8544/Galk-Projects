import React from "react";
import { connect } from "react-redux";
import {
    updateCandidatePersonalInterest,
    addNewCandidatePersonalInterest,
    deleteCandidatePersonalInterest,
    resetDataSavingState,
    startEditingData
} from "../../../actions/candidateActions";
import ".././form.css";
import {
    Modal,
    Card,
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
    PlusCircleOutlined,
    ExclamationCircleOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { dataSavingState } from "../../../actions/types";
const { Title } = Typography;
const { TextArea } = Input;
const ButtonGroup = Button.Group;

class PersonalInterest extends React.Component {
    state = {
        personalInterest: this.props.userProfile.personalInterest || [],
        personalInterestEditIDX: -1,
        newPersonalInterestFields: {},
        title: "",
        description: "",
        loading: true,
        saveInProgress: false,
        errTitle: { status: "", msg: "" },
        editErrTitle: { status: "", msg: "" },
        showModal: false,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.userProfile !== this.props.userProfile) {
            this.setState({
                personalInterest: this.props.userProfile.personalInterest,
            });
        }
        if (this.props.isSaving === dataSavingState.SAVED) {
            this.setState({ personalInterestEditIDX: -1 })
            if (this.state.showModal) {
                this.cleanupAndCloseModal()
            }
            this.props.resetDataSavingState();
        }
    }
    cleanupAndCloseModal = () => {
        this.setState({
            title: "",
            description: "",
            saveInProgress: false,
            showModal: false,
            errTitle: { status: "", msg: "" },
        });
        this.onNewPersonalInterestFieldChange({
            title: "",
            description: "",
        });
    }
    startPersonalInterestEditing = (index) => {
        this.setState({ personalInterestEditIDX: index });
        this.props.startEditingData()
    };
    stopPersonalInterestEditing = (index) => {
        if (this.validateRequiredFields()) {
            this.setState({ saveInProgress: true });
            this.props.updateCandidatePersonalInterest(this.state.personalInterest);
            this.setState({
                editErrTitle: { status: "", msg: "" },
            });
        } else {
            message.error("Please provide required information !");
        }
    };
    handleDeletePersonalInterest = (index) => {
        this.props.deleteCandidatePersonalInterest({
            id: index,
            personalInterest: this.state.personalInterest,
        });
    };
    handlePersonalInterestChange = (e, propName, index) => {
        const { value } = e.target;
        if (!value) {
            if (propName === "title") {
                this.setState({
                    editErrTitle: {
                        status: "error",
                        msg: "Please enter title of your hobby.",
                    },
                });
            }
        } else {
            if (propName === "title") {
                this.setState({
                    editErrTitle: { status: "", msg: "" },
                });
            }
        }
        this.setState({
            personalInterest: this.state.personalInterest.map((item, j) =>
                j === index ? { ...item, [propName]: value } : item
            ),
        });
    };
    handleNewPersonalInterestChange = (e, propName) => {
        //This function is the onChange event of all the fields in new PersonalInterest
        const { value } = e.target;
        if (!value) {
            if (propName === "title") {
                this.setState({
                    errTitle: { status: "error", msg: "Please enter Hobby title." },
                });
            }
        } else {
            if (propName === "title") {
                this.setState({
                    errTitle: { status: "", msg: "" },
                });
            }
        }
        this.onNewPersonalInterestFieldChange({ [propName]: value });
        this.setState({
            [propName]: value,
        });
    };
    onNewPersonalInterestFieldChange = (updatedValue) => {
        //This function is to create the new PersonalInterest object
        this.setState({
            newPersonalInterestFields: {
                ...this.state.newPersonalInterestFields,
                ...updatedValue,
            },
        });
    };

    saveNewPersonalInterest = (e) => {
        e.preventDefault();
        if (this.validateRequiredNewFields()) {
            this.setState({ saveInProgress: true });
            var newArray = this.state.personalInterest.slice();
            newArray.push(this.state.newPersonalInterestFields);
            this.props.addNewCandidatePersonalInterest(newArray);


        } else {
            message.error("Please provide required information !");
        }
    };

    validateRequiredNewFields = () => {
        let flag = true;
        this.setState({
            errTitle: { status: "", msg: "" },
        });

        if (!this.state.title) {
            this.setState({
                errTitle: { status: "error", msg: "Please enter your hobby title." },
            });
            flag = false;
        }
        return flag;
    };
    validateRequiredFields = () => {
        let flag = true;
        const arr = this.state.personalInterest;
        this.setState({
            editErrTitle: { status: "", msg: "" },
        });
        if (arr[this.state.personalInterestEditIDX].title.length === 0) {
            this.setState({
                editErrTitle: {
                    status: "error",
                    msg: "Please enter your hobby title.",
                },
            });
            flag = false;
        }
        return flag;
    };
    validatePersonalInterestInfoTab = () => {
        let flagError = false;
        if (this.state.personalInterestEditIDX >= 0) flagError = true;

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
                        Personal Interests/Hobbies
                    </Title>
                }
            >
                <Row className="Form">
                    <Col span={24}>
                        {this.state.personalInterest.length > 0 ? (
                            <React.Fragment>
                                {this.state.personalInterest.map((interest, index) => (
                                    <Card
                                        key={index}
                                        type="inner"
                                        title={"Personal Interest #" + (index + 1)}
                                        style={{ marginTop: 10, width: "100%" }}
                                        extra={
                                            <Space>
                                                {this.state.personalInterestEditIDX === index ? (
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            this.stopPersonalInterestEditing(index)
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            this.startPersonalInterestEditing(index)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                {this.state.personalInterestEditIDX !== index && (
                                                    <Popconfirm
                                                        title="Are you sure delete this education?"
                                                        onConfirm={() =>
                                                            this.handleDeletePersonalInterest(index)
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
                                                            this.state.personalInterestEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Title
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.personalInterestEditIDX === index
                                                        ? this.state.editErrTitle.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.personalInterestEditIDX === index
                                                        ? this.state.editErrTitle.msg
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    disabled={
                                                        this.state.personalInterestEditIDX === index
                                                            ? false
                                                            : true
                                                    }
                                                    placeholder="Example: Aquarium hobbist"
                                                    value={interest.title}
                                                    id="title"
                                                    onChange={(e) => {
                                                        this.handlePersonalInterestChange(
                                                            e,
                                                            "title",
                                                            index
                                                        );
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Description">
                                                <TextArea
                                                    disabled={
                                                        this.state.personalInterestEditIDX === index
                                                            ? false
                                                            : true
                                                    }
                                                    placeholder="Example: Enter additional information like at what age you started, if you have any achievement in this field etc."
                                                    autosize={{ minRows: 2, maxRows: 5 }}
                                                    value={interest.description}
                                                    id="description"
                                                    onChange={(e) => {
                                                        this.handlePersonalInterestChange(
                                                            e,
                                                            "description",
                                                            index
                                                        );
                                                    }}
                                                />
                                            </Form.Item>
                                            {this.state.personalInterestEditIDX === index ? (
                                                <React.Fragment>
                                                    <Divider
                                                        style={{ marginBottom: 10, marginTop: 10 }}
                                                    />
                                                    <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                                                        <Button
                                                            loading={this.props.isSaving === dataSavingState.SAVING}
                                                            type="primary"
                                                            disabled={
                                                                this.state.personalInterestEditIDX === index
                                                                    ? false
                                                                    : true
                                                            }
                                                            block
                                                            onClick={() =>
                                                                this.stopPersonalInterestEditing(index)
                                                            }
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
                        Add Personal Interest / Hobby
                    </Button>
                    <Modal
                        title="Add new Hobby"
                        style={{ top: 20 }}
                        onOk={this.saveNewPersonalInterest}
                        onCancel={() => {
                            this.setState({
                                showModal: false,
                                title: "",
                                description: "",
                                errTitle: { status: "", msg: "" },
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
                                        description: "",
                                        errTitle: { status: "", msg: "" },
                                    });
                                }}
                            >
                                Cancel
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                loading={this.props.isSaving === dataSavingState.SAVING}
                                onClick={this.saveNewPersonalInterest}
                            >
                                Save
                            </Button>,
                        ]}
                    >
                        <Form layout={"vertical"}>
                            <Form.Item
                                label={<span className="required">Hobby Title</span>}
                                style={{ marginBottom: 5, marginTop: 5 }}
                                validateStatus={this.state.errTitle.status}
                                help={this.state.errTitle.msg}
                            >
                                <Input
                                    placeholder="Example: Aquarium Hobbist"
                                    value={this.state.title}
                                    id="title"
                                    onChange={(e) => {
                                        this.handleNewPersonalInterestChange(e, "title");
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                style={{ marginBottom: 5, marginTop: 5 }}
                            >
                                <TextArea
                                    placeholder="Example: Enter additional information like your achievements in this field, since what age you are in this etc."
                                    autosize={{ minRows: 2, maxRows: 5 }}
                                    value={this.state.description}
                                    id="description"
                                    onChange={(e) => {
                                        this.handleNewPersonalInterestChange(e, "description");
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
    addNewCandidatePersonalInterest,
    updateCandidatePersonalInterest,
    deleteCandidatePersonalInterest,
    resetDataSavingState,
    startEditingData
})(PersonalInterest);
