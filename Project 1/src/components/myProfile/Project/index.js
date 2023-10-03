import React from "react";
import { connect } from "react-redux";
import {
    updateCandidateProject,
    addNewCandidateProject,
    deleteCandidateProject,
    resetDataSavingState,
    startEditingData
} from "../../../actions/candidateActions";
import ".././form.css";
import { dataSavingState } from "../../../actions/types";
import moment from "moment";
import {
    countries,
    skillsets,
    projectTypeOptions,
} from "../../../AutoComplete/data";
import {
    AutoComplete,
    Select,
    Modal,
    Card,
    DatePicker,
    Tooltip,
    Form,
    Input,
    Popconfirm,
    Typography,
    Row,
    Col,
    Checkbox,
    Divider,
    notification,
    Button,
    message,
    Empty,
    Space,
} from "antd";
import {
    LeftOutlined,
    RightOutlined,
    ExclamationCircleOutlined,
    InfoCircleTwoTone,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { checkIfFutureDate } from "../../../utils/javaScriptHelper";

const { Title } = Typography;
const { TextArea } = Input;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const { RangePicker } = DatePicker;

const skillOptions = [];
skillsets.forEach((skill) =>
    skillOptions.push(<Option key={skill}>{skill}</Option>)
);

const typeOptions = [];
projectTypeOptions.map((type) =>
    typeOptions.push(<Option key={type}>{type}</Option>)
);
class ProjectDetails extends React.Component {
    state = {
        project: this.props.userProfile.project,
        projectEditIDX: -1,
        newProjectFields: {},
        title: "",
        organization: "",
        place: "",
        type: "",
        description: "",
        link: "",
        newStartDate: null,
        newEndDate: null,
        skillsUsed: [],
        loading: true,
        saveInProgress: false,
        errOrganization: { status: "", msg: "" },
        errPlace: { status: "", msg: "" },
        errTitle: { status: "", msg: "" },
        errDescription: { status: "", msg: "" },
        errSkill: { status: "", msg: "" },
        errType: { status: "", msg: "" },
        editErrOrganization: { status: "", msg: "" },
        editErrPlace: { status: "", msg: "" },
        editErrTitle: { status: "", msg: "" },
        editErrSkill: { status: "", msg: "" },
        editErrDescription: { status: "", msg: "" },
        editErrType: { status: "", msg: "" },
        showModal: false,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.userProfile !== this.props.userProfile) {
            this.setState({
                project: this.props.userProfile.project,
            });
        }
        if (this.props.isSaving === dataSavingState.SAVED) {
            this.setState({ projectEditIDX: -1 })
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
            organization: "",
            place: "",
            type: "",
            description: "",
            newStartDate: null,
            newEndDate: null,
            skillsUsed: [],
            saveInProgress: false,
            showModal: false,
            errOrganization: { status: "", msg: "" },
            errPlace: { status: "", msg: "" },
            errTitle: { status: "", msg: "" },
            errSkill: { status: "", msg: "" },
            errDescription: { status: "", msg: "" },
            errType: { status: "", msg: "" },
        });

        this.onNewProjectFieldChange({
            title: "",
            link: "",
            organization: "",
            place: "",
            type: "",
            description: "",
            newStartDate: null,
            newEndDate: null,
            skillsUsed: [],
        });
    }
    startProjectEditing = (index) => {
        this.setState({ projectEditIDX: index });
        this.props.startEditingData()
    };

    stopProjectEditing = (index) => {
        if (this.validateRequiredFields()) {
            this.setState({ saveInProgress: true });
            this.props.updateCandidateProject(this.state.project);
            this.setState({
                saveInProgress: false,
                editErrOrganization: { status: "", msg: "" },
                editErrPlace: { status: "", msg: "" },
                editErrTitle: { status: "", msg: "" },
                editErrSkill: { status: "", msg: "" },
                editErrDescription: { status: "", msg: "" },
                editErrType: { status: "", msg: "" },
            });
        } else {
            message.error("Please provide required information !");
        }
    };

    handleDeleteProject = (index) => {
        this.props.deleteCandidateProject({
            id: index,
            project: this.state.project,
        });
    };

    handleProjectChange = (e, propName, index) => {
        const { value } = e.target;

        if (propName === "startDate" || propName === "endDate") {
            this.setState({
                project: this.state.project.map((item, j) =>
                    j === index
                        ? {
                            ...item,
                            startDate:
                                value && value[0] ? value[0].format("DD/MM/YYYY") : null,
                            endDate:
                                value && value[1] ? value[1].format("DD/MM/YYYY") : null,
                        }
                        : item
                ),
            });
        } else if (propName === "skillsUsed") {
            if (value && value.length === 0) {
                this.setState({
                    editErrSkill: {
                        status: "error",
                        msg: "Please enter technical skills used in this project",
                    },
                });
            } else {
                this.setState({
                    editErrSkill: { status: "", msg: "" },
                });
            }
            this.setState({
                project: this.state.project.map((item, j) =>
                    j === index
                        ? {
                            ...item,
                            skillsUsed: value,
                        }
                        : item
                ),
            });
        } else {
            if (!value) {
                if (propName === "organization") {
                    this.setState({
                        editErrOrganization: {
                            status: "error",
                            msg: "Please enter organization Name.",
                        },
                    });
                }
                if (propName === "place") {
                    this.setState({
                        editErrPlace: {
                            status: "error",
                            msg: "Please enter location of the organization.",
                        },
                    });
                }
                if (propName === "type") {
                    this.setState({
                        editErrType: {
                            status: "error",
                            msg: "Please enter type of the project.",
                        },
                    });
                }
                if (propName === "title") {
                    this.setState({
                        editErrTitle: {
                            status: "error",
                            msg: "Please enter Project title.",
                        },
                    });
                }
                if (propName === "description") {
                    this.setState({
                        editErrDescription: {
                            status: "error",
                            msg: "Please enter Project description.",
                        },
                    });
                }
            } else {
                if (propName === "organization") {
                    this.setState({
                        editErrOrganization: { status: "", msg: "" },
                    });
                }
                if (propName === "place") {
                    this.setState({
                        editErrPlace: { status: "", msg: "" },
                    });
                }
                if (propName === "type") {
                    this.setState({
                        editErrType: { status: "", msg: "" },
                    });
                }
                if (propName === "title") {
                    this.setState({
                        editErrTitle: { status: "", msg: "" },
                    });
                }
                if (propName === "description") {
                    this.setState({
                        editErrDescription: { status: "", msg: "" },
                    });
                }
            }

            if (!value || (value && value.length < 1000)) {
                this.setState({
                    project: this.state.project.map((item, j) =>
                        j === index ? { ...item, [propName]: value } : item
                    ),
                });
            }
        }
    };

    handleNewProjectChange = (e, propName) => {
        const { value } = e.target;
        //This function is the onChange event of all the fields in new Project
        if (propName === "newStartDate" || propName === "newEndDate") {
            this.setState({
                newProjectFields: {
                    ...this.state.newProjectFields,
                    startDate: value && value[0] ? value[0].format("DD/MM/YYYY") : null,
                    endDate: value && value[1] ? value[1].format("DD/MM/YYYY") : null,
                },
            });
            this.setState({
                newStartDate: value && value[0] ? value[0].format("DD/MM/YYYY") : null,
                newEndDate: value && value[1] ? value[1].format("DD/MM/YYYY") : null,
            });
        } else if (propName === "skillsUsed") {
            if (value && value.length === 0) {
                this.setState({
                    errSkill: {
                        status: "error",
                        msg: "Please enter technical skills used in this project",
                    },
                });
            } else {
                this.setState({
                    errSkill: { status: "", msg: "" },
                });
            }

            this.setState({
                newProjectFields: {
                    ...this.state.newProjectFields,
                    skillsUsed: value,
                },
            });
            this.setState({
                skillsUsed: value,
            });
        } else {
            if (!value) {
                if (propName === "organization") {
                    this.setState({
                        errOrganization: {
                            status: "error",
                            msg: "Please enter organization Name.",
                        },
                    });
                }
                if (propName === "place") {
                    this.setState({
                        errPlace: {
                            status: "error",
                            msg: "Please enter location of the organization.",
                        },
                    });
                }
                if (propName === "type") {
                    this.setState({
                        errType: {
                            status: "error",
                            msg: "Please enter type of the project.",
                        },
                    });
                }
                if (propName === "title") {
                    this.setState({
                        errTitle: { status: "error", msg: "Please enter Project title." },
                    });
                }
                if (propName === "description") {
                    this.setState({
                        errDescription: {
                            status: "error",
                            msg: "Please enter Project description.",
                        },
                    });
                }
            } else {
                if (propName === "organization") {
                    this.setState({
                        errOrganization: { status: "", msg: "" },
                    });
                }
                if (propName === "place") {
                    this.setState({
                        errPlace: { status: "", msg: "" },
                    });
                }
                if (propName === "type") {
                    this.setState({
                        errType: { status: "", msg: "" },
                    });
                }
                if (propName === "title") {
                    this.setState({
                        errTitle: { status: "", msg: "" },
                    });
                }
                if (propName === "description") {
                    this.setState({
                        errDescription: { status: "", msg: "" },
                    });
                }
            }

            if (!value || (value && value.length < 1000)) {
                this.onNewProjectFieldChange({ [propName]: value });
                this.setState({
                    [propName]: value,
                });
            }
        }
    };

    onNewProjectFieldChange = (updatedValue) => {
        //This function is to create the new Project object
        this.setState({
            newProjectFields: {
                ...this.state.newProjectFields,
                ...updatedValue,
            },
        });
    };

    saveNewProject = () => {

        if (this.validateRequiredNewFields()) {


            let newProject = {}
            Object.assign(newProject, this.state.newProjectFields)
            this.props.addNewCandidateProject(newProject);

        } else {
            message.error("Please provide required information !");
        }
    };

    validateRequiredNewFields = () => {
        let flag = true;
        this.setState({
            errOrganization: { status: "", msg: "" },
            errPlace: { status: "", msg: "" },
            errTitle: { status: "", msg: "" },
            errSkill: { status: "", msg: "" },
            errDescription: { status: "", msg: "" },
            errType: { status: "", msg: "" },
        });

        if (!this.state.organization) {
            this.setState({
                errOrganization: {
                    status: "error",
                    msg: "Please enter organization name.",
                },
            });
            flag = false;
        }
        if (!this.state.place) {
            this.setState({
                errPlace: {
                    status: "error",
                    msg: "Please enter location of the organization.",
                },
            });
            flag = false;
        }
        if (!this.state.type) {
            this.setState({
                errType: {
                    status: "error",
                    msg: "Please enter type of the project.",
                },
            });
            flag = false;
        }
        if (this.state.title && this.state.title.length === 0) {
            this.setState({
                errTitle: { status: "error", msg: "Please enter your Project title." },
            });
            flag = false;
        }
        if (this.state.description && this.state.description.length === 0) {
            this.setState({
                errDescription: {
                    status: "error",
                    msg: "Please enter your Project description.",
                },
            });
            flag = false;
        }
        if (this.state.skillsUsed && this.state.skillsUsed.length === 0) {
            this.setState({
                errSkill: {
                    status: "error",
                    msg: "Please enter technical skills used in this project.",
                },
            });
            flag = false;
        }
        return flag;
    };

    validateRequiredFields = () => {
        let flag = true;
        const arr = this.state.project;
        this.setState({
            editErrOrganization: { status: "", msg: "" },
            editErrPlace: { status: "", msg: "" },
            editErrTitle: { status: "", msg: "" },
            editErrSkill: { status: "", msg: "" },
            editErrDescription: { status: "", msg: "" },
            editErrType: { status: "", msg: "" },
        });

        if (!arr[this.state.projectEditIDX].organization) {
            this.setState({
                editErrOrganization: {
                    status: "error",
                    msg: "Please enter organization name.",
                },
            });
            flag = false;
        }
        if (!arr[this.state.projectEditIDX].place) {
            this.setState({
                editErrPlace: {
                    status: "error",
                    msg: "Please enter location of the organization.",
                },
            });
            flag = false;
        }
        if (!arr[this.state.projectEditIDX].type) {
            this.setState({
                editErrType: {
                    status: "error",
                    msg: "Please enter type of the project.",
                },
            });
            flag = false;
        }
        if (!arr[this.state.projectEditIDX].title) {
            this.setState({
                editErrTitle: {
                    status: "error",
                    msg: "Please enter your Project title.",
                },
            });
            flag = false;
        }
        if (!arr[this.state.projectEditIDX].description) {
            this.setState({
                editErrDescription: {
                    status: "error",
                    msg: "Please enter your Project description.",
                },
            });
            flag = false;
        }
        if (arr[this.state.projectEditIDX].skillsUsed.length === 0) {
            this.setState({
                editErrSkill: {
                    status: "error",
                    msg: "Please enter technical skills used in this project.",
                },
            });
            flag = false;
        }

        return flag;
    };

    handleEdit = () => {
        this.setState({ skillInfoEdit: false });
    };

    validateProjectInfoTab = () => {
        if (this.state.projectEditIDX >= 0) {
            notification.open({
                message: "Save your information",
                description:
                    "You have some unsaved data in this page. Please save before proceed to next step.",
                duration: 0,
                icon: <ExclamationCircleOutlined style={{ color: "#FF0000" }} />,
            });
        } else if (this.state.project.length < 1) {
            notification.open({
                message: "Insufficiant information",
                description:
                    "Please provide your project information before proceed to next step.",
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
                        Project Details
                    </Title>
                }
            >
                <Row className="Form">

                    <Col span={24}>
                        {this.state.project.length > 0 ? (
                            <React.Fragment>
                                {this.state.project.map((proj, index) => (
                                    <Card
                                        key={index}
                                        type="inner"
                                        title={"Project #" + (index + 1)}
                                        style={{ marginTop: 10, width: "100%" }}
                                        extra={
                                            <Space>
                                                {this.state.projectEditIDX === index ? (
                                                    <Button
                                                        size="small"
                                                        onClick={() => this.stopProjectEditing(index)}
                                                    >
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="small"
                                                        onClick={() => this.startProjectEditing(index)}
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                {this.state.projectEditIDX !== index && (
                                                    <Popconfirm
                                                        title="Are you sure delete this project?"
                                                        onConfirm={() => this.handleDeleteProject(index)}
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
                                                            this.state.projectEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Organization Name
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrOrganization.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrOrganization.msg
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    placeholder="Example: Willings."
                                                    value={proj.organization}
                                                    id="organization"
                                                    onChange={(e) => {
                                                        this.handleProjectChange(e, "organization", index);
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={
                                                    <span
                                                        className={
                                                            this.state.projectEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Organization Location
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrPlace.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrPlace.msg
                                                        : ""
                                                }
                                            >
                                                <AutoComplete
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    dataSource={countries}
                                                    placeholder="Example: Japan"
                                                    id="place"
                                                    value={proj.place}
                                                    onChange={(value) => {
                                                        this.handleProjectChange(
                                                            { target: { value: value } },
                                                            "place",
                                                            index
                                                        );
                                                    }}
                                                    allowClear={true}
                                                    filterOption={(inputValue, option) =>
                                                        option.props.children
                                                            .toUpperCase()
                                                            .indexOf(inputValue.toUpperCase()) !== -1
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={
                                                    <span>
                                                        Duration&nbsp;
                                                        <Tooltip title="Please select a future date if this is your current project.">
                                                            <InfoCircleTwoTone />
                                                        </Tooltip>
                                                    </span>
                                                }
                                            >
                                                <RangePicker
                                                    allowClear
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    value={
                                                        proj.startDate
                                                            ? [
                                                                moment(proj.startDate, "DD/MM/YYYY"),
                                                                moment(proj.endDate, "DD/MM/YYYY"),
                                                            ]
                                                            : [proj.startDate, proj.endDate]
                                                    }
                                                    format={"DD/MM/YYYY"}
                                                    onChange={(value) => {
                                                        this.handleProjectChange(
                                                            { target: { value: value } },
                                                            "startDate",
                                                            index
                                                        );
                                                    }}
                                                />
                                                <br />
                                                {checkIfFutureDate(proj.endDate) && (
                                                    <Checkbox
                                                        style={{ marginTop: 5 }}
                                                        defaultChecked
                                                        disabled
                                                    >
                                                        Current Project
                                                    </Checkbox>
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                style={{ marginTop: 35 }}
                                                label={
                                                    <span
                                                        className={
                                                            this.state.projectEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Project Title
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrTitle.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrTitle.msg
                                                        : ""
                                                }
                                            >
                                                <Input
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    placeholder="Example: Technical Lead."
                                                    value={proj.title}
                                                    id="title"
                                                    onChange={(e) => {
                                                        this.handleProjectChange(e, "title", index);
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={
                                                    <span
                                                        className={
                                                            this.state.projectEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Project Type
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrType.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrType.msg
                                                        : ""
                                                }
                                            >
                                                <AutoComplete
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    dataSource={typeOptions}
                                                    placeholder="Example: Web development"
                                                    id="type"
                                                    value={proj.type}
                                                    onChange={(value) => {
                                                        this.handleProjectChange(
                                                            { target: { value: value } },
                                                            "type",
                                                            index
                                                        );
                                                    }}
                                                    allowClear={true}
                                                    filterOption={(inputValue, option) =>
                                                        option.props.children
                                                            .toUpperCase()
                                                            .indexOf(inputValue.toUpperCase()) !== -1
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={
                                                    <span
                                                        className={
                                                            this.state.projectEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Description
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrDescription.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrDescription.msg
                                                        : ""
                                                }
                                            >
                                                <TextArea
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    placeholder="Example: Enter additional information like team size, responsibilities etc."
                                                    autosize={{ minRows: 2, maxRows: 5 }}
                                                    value={proj.description}
                                                    id="description"
                                                    onChange={(e) => {
                                                        this.handleProjectChange(e, "description", index);
                                                    }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label={
                                                    <span
                                                        className={
                                                            this.state.projectEditIDX === index
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >
                                                        Skills Used
                                                    </span>
                                                }
                                                validateStatus={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrSkill.status
                                                        : ""
                                                }
                                                help={
                                                    this.state.projectEditIDX === index
                                                        ? this.state.editErrSkill.msg
                                                        : ""
                                                }
                                            >
                                                <Select
                                                    mode="tags"
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    labelInValue={true}
                                                    style={{ width: "100%" }}
                                                    placeholder="Example: HTML CSS"
                                                    id="skills"
                                                    value={proj.skillsUsed}
                                                    onChange={(value) => {
                                                        this.handleProjectChange(
                                                            { target: { value: value } },
                                                            "skillsUsed",
                                                            index
                                                        );
                                                    }}
                                                >
                                                    {skillOptions}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label={
                                                    <span>
                                                        Reference URL (Eg, Github, Google Doc etc.)
                                                    </span>
                                                }
                                            >
                                                <Input
                                                    disabled={
                                                        this.state.projectEditIDX === index ? false : true
                                                    }
                                                    placeholder="Example: github link."
                                                    value={proj.link}
                                                    id="link"
                                                    onChange={(e) => {
                                                        this.handleProjectChange(e, "link", index);
                                                    }}
                                                />
                                            </Form.Item>
                                            {this.state.projectEditIDX === index && (
                                                <React.Fragment>
                                                    <Divider />

                                                    <Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
                                                        <Button
                                                            loading={this.props.isSaving === dataSavingState.SAVING}
                                                            type="primary"
                                                            disabled={
                                                                this.state.projectEditIDX === index
                                                                    ? false
                                                                    : true
                                                            }
                                                            block
                                                            onClick={() => this.stopProjectEditing(index)}
                                                        >
                                                            Save
                                                        </Button>
                                                    </Form.Item>
                                                </React.Fragment>
                                            )}
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
                        Add Project
                    </Button>
                    {this.state.showModal && (
                        <Modal
                            title="Add new Project"
                            style={{ top: 20 }}
                            onOk={() => this.saveNewProject()}
                            onCancel={() => {
                                this.setState({
                                    showModal: false,
                                    title: "",
                                    link: "",
                                    organization: "",
                                    place: "",
                                    type: "",
                                    description: "",
                                    newStartDate: null,
                                    newEndDate: null,
                                    skillsUsed: [],
                                    errOrganization: { status: "", msg: "" },
                                    errPlace: { status: "", msg: "" },
                                    errDescription: { status: "", msg: "" },
                                    errTitle: { status: "", msg: "" },
                                    errSkill: { status: "", msg: "" },
                                    errType: { status: "", msg: "" },
                                });
                            }}
                            visible={true}
                            footer={[
                                <Button
                                    key="back"
                                    onClick={() => {
                                        this.setState({
                                            showModal: false,
                                            title: "",
                                            link: "",
                                            organization: "",
                                            place: "",
                                            type: "",
                                            description: "",
                                            newStartDate: null,
                                            newEndDate: null,
                                            skillsUsed: [],
                                            errOrganization: { status: "", msg: "" },
                                            errPlace: { status: "", msg: "" },
                                            errDescription: { status: "", msg: "" },
                                            errTitle: { status: "", msg: "" },
                                            errSkill: { status: "", msg: "" },
                                            errType: { status: "", msg: "" },
                                        });
                                    }}
                                >
                                    Cancel
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={this.props.isSaving === dataSavingState.SAVING}
                                    onClick={this.saveNewProject}
                                >
                                    Save
                                </Button>,
                            ]}
                        >
                            <Form layout={"vertical"}>
                                <Form.Item
                                    label={<span className="required">Organization Name</span>}
                                    validateStatus={this.state.errOrganization.status}
                                    help={this.state.errOrganization.msg}
                                >
                                    <Input
                                        placeholder="Example: Willings."
                                        value={this.state.organization}
                                        id="organization"
                                        onChange={(e) => {
                                            this.handleNewProjectChange(e, "organization");
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <span className="required">Organization Location</span>
                                    }
                                    validateStatus={this.state.errPlace.status}
                                    help={this.state.errPlace.msg}
                                >
                                    <AutoComplete
                                        dataSource={countries}
                                        placeholder="Example: Japan"
                                        id="place"
                                        value={this.state.place}
                                        onChange={(value) => {
                                            this.handleNewProjectChange(
                                                { target: { value: value } },
                                                "place"
                                            );
                                        }}
                                        allowClear={true}
                                        filterOption={(inputValue, option) =>
                                            option.props.children
                                                .toUpperCase()
                                                .indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <span>
                                            Duration&nbsp;
                                            <Tooltip title="Please select a future date if this is your current organization.">
                                                <InfoCircleTwoTone />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    <RangePicker
                                        allowClear
                                        value={
                                            this.state.newStartDate
                                                ? [
                                                    moment(this.state.newStartDate, "DD/MM/YYYY"),
                                                    moment(this.state.newEndDate, "DD/MM/YYYY"),
                                                ]
                                                : [this.state.newStartDate, this.state.newEndDate]
                                        }
                                        format={"DD/MM/YYYY"}
                                        onChange={(value) => {
                                            this.handleNewProjectChange(
                                                { target: { value: value } },
                                                "newStartDate"
                                            );
                                        }}
                                    />
                                    <br />
                                    {checkIfFutureDate(this.state.newEndDate) && (
                                        <Checkbox style={{ marginTop: 5 }} defaultChecked disabled>
                                            Current Project
                                        </Checkbox>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    style={{ marginTop: 35 }}
                                    label={<span className="required">Project Title</span>}
                                    validateStatus={this.state.errTitle.status}
                                    help={this.state.errTitle.msg}
                                >
                                    <Input
                                        placeholder="Example: AI Chatbot"
                                        value={this.state.title}
                                        id="title"
                                        onChange={(e) => {
                                            this.handleNewProjectChange(e, "title");
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<span className="required">Project Type</span>}
                                    validateStatus={this.state.errType.status}
                                    help={this.state.errType.msg}
                                >
                                    <AutoComplete
                                        dataSource={typeOptions}
                                        placeholder="Example: Web development"
                                        id="type"
                                        value={this.state.type}
                                        onChange={(value) => {
                                            this.handleNewProjectChange(
                                                { target: { value: value } },
                                                "type"
                                            );
                                        }}
                                        allowClear={true}
                                        filterOption={(inputValue, option) =>
                                            option.props.children
                                                .toUpperCase()
                                                .indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<span className="required">Description</span>}
                                    validateStatus={this.state.errDescription.status}
                                    help={this.state.errDescription.msg}
                                >
                                    <TextArea
                                        placeholder="Example: Enter additional information like team size, responsibilities etc."
                                        autosize={{ minRows: 2, maxRows: 5 }}
                                        value={this.state.description}
                                        id="description"
                                        onChange={(e) => {
                                            this.handleNewProjectChange(e, "description");
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<span className="required">Skills Used</span>}
                                    validateStatus={this.state.errSkill.status}
                                    help={this.state.errSkill.msg}
                                >
                                    <Select
                                        mode="tags"
                                        labelInValue={true}
                                        style={{ width: "100%" }}
                                        placeholder="Example: HTML CSS"
                                        value={this.state.skillsUsed}
                                        onChange={(value) => {
                                            this.handleNewProjectChange(
                                                { target: { value: value } },
                                                "skillsUsed"
                                            );
                                        }}
                                    >
                                        {skillOptions}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <span>Reference URL (Eg, Github, Google Doc etc.)</span>
                                    }
                                >
                                    <Input
                                        placeholder="Example: github link"
                                        value={this.state.link}
                                        id="link"
                                        onChange={(e) => {
                                            this.handleNewProjectChange(e, "link");
                                        }}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    )}
                </Row>
            </Card>
        );
    }
}

export default connect(null, {
    addNewCandidateProject,
    updateCandidateProject,
    deleteCandidateProject,
    resetDataSavingState,
    startEditingData
})(ProjectDetails);
