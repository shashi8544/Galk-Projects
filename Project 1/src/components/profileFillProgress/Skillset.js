import React, { Component } from "react";
import { connect } from "react-redux";
import { skillsets, languages } from "../../AutoComplete/data";
import { updateCandidateSkillSet } from "../../actions/candidateActions";
import {
	Select,
	Form,
	Card,
	Typography,
	Row,
	Col,
	Divider,
	notification,
	Button,
	message,
	Input,
} from "antd";
import {
	ExclamationCircleOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;
const Option = Select.Option;

const ButtonGroup = Button.Group;

const skillOptions = [];
skillsets.map((skill) =>
	skillOptions.push(<Option key={skill}>{skill}</Option>)
);
const languageOptions = [];
languages.map((language) =>
	languageOptions.push(<Option key={language}>{language}</Option>)
);

class Skillset extends Component {
	state = {
		candidate: this.props.userProfile,
		skillInfoEdit: true,
		loading: true,
		saveInProgress: false,
		errSkill: { status: "", msg: "" },
		errSpokenLanguage: { status: "", msg: "" },
		errSelfIntro: { status: "", msg: "" },
		errWhyInJapan: { status: "", msg: "" },
		errWhatToContribute: { status: "", msg: "" },
	};

	componentDidUpdate(prevProps) {
		if (prevProps.userProfile !== this.props.userProfile) {
			this.setState({
				candidate: this.props.userProfile,
			});
		}
	}

	handletextAreaChange = (e) => {
		let targetId = e.target.id;
		let value = e.target.value;

		if (targetId === "selfIntro") {
			if (!value) {
				this.setState({
					errSelfIntro: {
						status: "error",
						msg: "Please provide some information.",
					},
				});
			} else {
				if (value.length < 20) {
					this.setState({
						errSelfIntro: {
							status: "error",
							msg: "This information should be atleast 10 character long.",
						},
					});
				} else {
					this.setState({
						errSelfIntro: {
							status: "",
							msg: "",
						},
					});
				}
			}
		}

		if (targetId === "whyInJapan") {
			if (!value) {
				this.setState({
					errWhyInJapan: {
						status: "error",
						msg: "Please provide some information.",
					},
				});
			} else {
				if (value.length < 20) {
					this.setState({
						errWhyInJapan: {
							status: "error",
							msg: "This information should be atleast 20 character long.",
						},
					});
				} else {
					this.setState({
						errWhyInJapan: {
							status: "",
							msg: "",
						},
					});
				}
			}
		}

		if (targetId === "whatToContribute") {
			if (!value) {
				this.setState({
					errWhatToContribute: {
						status: "error",
						msg: "Please provide some information.",
					},
				});
			} else {
				if (value.length < 20) {
					this.setState({
						errWhatToContribute: {
							status: "error",
							msg: "This information should be atleast 20 character long.",
						},
					});
				} else {
					this.setState({
						errWhatToContribute: {
							status: "",
							msg: "",
						},
					});
				}
			}
		}

		if (value.length <= 1000) {
			this.setState({
				candidate: { ...this.state.candidate, [targetId]: value },
			});
		}
	};

	handlePrimaryTechnicalSkillChange = (value) => {
		if (value.length === 0) {
			this.setState({
				errSkill: {
					status: "error",
					msg: "Please enter your technical skills.",
				},
			});
		} else {
			this.setState({
				errSkill: { status: "", msg: "" },
			});
		}
		this.setState({
			candidate: { ...this.state.candidate, skills: value },
		});
	};

	handleSecondaryTechnicalSkillChange = (value) => {
		this.setState({
			candidate: { ...this.state.candidate, secondarySkills: value },
		});
	};

	handleSpokenLanguageChange = (value) => {
		if (value.length === 0) {
			this.setState({
				errSpokenLanguage: {
					status: "error",
					msg: "Please enter your spoken language.",
				},
			});
		} else {
			this.setState({
				errSpokenLanguage: { status: "", msg: "" },
			});
		}
		this.setState({
			candidate: { ...this.state.candidate, spokenLanguages: value },
		});
	};

	validateRequiredFields = () => {
		let flag = true;

		this.setState({
			errSkill: { status: "", msg: "" },
			errSpokenLanguage: { status: "", msg: "" },
			errSelfIntro: { status: "", msg: "" },
			errWhyInJapan: { status: "", msg: "" },
			errWhatToContribute: { status: "", msg: "" },
		});

		if (this.state.candidate.skills.length === 0) {
			this.setState({
				errSkill: {
					status: "error",
					msg: "Please enter your technical skills.",
				},
			});
			flag = false;
		}

		if (this.state.candidate.spokenLanguages.length === 0) {
			this.setState({
				errSpokenLanguage: {
					status: "error",
					msg: "Please enter your spoken languages.",
				},
			});
			flag = false;
		}

		if (!this.state.candidate.selfIntro) {
			this.setState({
				errSelfIntro: {
					status: "error",
					msg: "Please enter some information.",
				},
			});
			flag = false;
		} else {
			if (this.state.candidate.selfIntro.length < 20) {
				this.setState({
					errSelfIntro: {
						status: "error",
						msg: "This information should be atleast 20 character long.",
					},
				});
				flag = false;
			}
		}

		if (!this.state.candidate.whyInJapan) {
			this.setState({
				errWhyInJapan: {
					status: "error",
					msg: "Please enter some information.",
				},
			});
			flag = false;
		} else {
			if (this.state.candidate.whyInJapan.length < 20) {
				this.setState({
					errWhyInJapan: {
						status: "error",
						msg: "This information should be atleast 20 character long.",
					},
				});
				flag = false;
			}
		}

		if (!this.state.candidate.whatToContribute) {
			this.setState({
				errWhatToContribute: {
					status: "error",
					msg: "Please enter some information.",
				},
			});
			flag = false;
		} else {
			if (this.state.candidate.whatToContribute.length < 20) {
				this.setState({
					errWhatToContribute: {
						status: "error",
						msg: "This information should be atleast 20 character long.",
					},
				});
				flag = false;
			}
		}

		return flag;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.validateRequiredFields()) {
			var _skillSet = {
				skills: this.state.candidate.skills,
				secondarySkills: this.state.candidate.secondarySkills,
				spokenLanguages: this.state.candidate.spokenLanguages,
				selfIntro: this.state.candidate.selfIntro || "",
				whyInJapan: this.state.candidate.whyInJapan,
				minorDegree: this.state.candidate.minorDegree,
				whatToContribute: this.state.candidate.whatToContribute,
			};
			this.props.updateCandidateSkillSet(_skillSet);
			this.setState({
				skillInfoEdit: true,
				saveInProgress: false,
			});
		} else {
			message.error("Error in updating data !");
			this.setState({ skillInfoEdit: false });
		}
	};

	handleEdit = () => {
		this.setState({ skillInfoEdit: false });
	};

	openNotificationWithIcon = () => {
		notification.open({
			message: "Insufficient Information",
			description:
				"Please update missing information in this page to proceed in next page.",
			duration: 0,
			icon: <ExclamationCircleOutlined style={{ color: "#FF0000" }} />,
		});
	};

	validateSkillInfoTab = () => {
		let flagError = false;

		if (!this.validateRequiredFields()) flagError = true;

		if (flagError) {
			this.openNotificationWithIcon();
			this.setState({ skillInfoEdit: false });
		} else {
			const editFlag = this.state.skillInfoEdit;
			if (!editFlag) {
				notification.open({
					message: "Save your information",
					description: "Please save your data before proceed to next step.",
					duration: 0,
					icon: <ExclamationCircleOutlined style={{ color: "#FF0000" }} />,
				});
			} else {
				this.props.nextStep();
			}
		}
	};

	render() {
		return (
			<Card
				style={{ minHeight: 500 }}
				title={
					<Title level={4} style={{ marginBottom: 0 }}>
						Your Introduction & Skill sets
					</Title>
				}
				extra={
					<Button
						type="primary"
						onClick={this.handleEdit}
						disabled={!this.state.skillInfoEdit}
					>
						Edit
					</Button>
				}
			>
				<Row>
					<Col span={24}>
						<ButtonGroup style={{ width: "100%", marginBottom: 15 }}>
							<Button
								style={{ width: "50%" }}
								type="default"
								onClick={() => this.props.prevStep()}
							>
								<LeftOutlined />
								Go back
							</Button>
							<Button
								style={{ width: "50%" }}
								type="default"
								onClick={() => this.validateSkillInfoTab()}
							>
								Go forward
								<RightOutlined />
							</Button>
						</ButtonGroup>
					</Col>
					<Col span={24}>
						<Form layout={"vertical"}>
							<Form.Item
								label={
									<span className={!this.state.skillInfoEdit ? "required" : ""}>
										Self Introduction
									</span>
								}
								style={{ textAlign: "left" }}
								validateStatus={this.state.errSelfIntro.status}
								help={this.state.errSelfIntro.msg}
							>
								<TextArea
									disabled={this.state.skillInfoEdit}
									placeholder="Your brief introduction."
									autosize={{ minRows: 3, maxRows: 5 }}
									value={this.state.candidate.selfIntro || ""}
									id="selfIntro"
									onChange={this.handletextAreaChange}
								/>
							</Form.Item>
							<Form.Item
								label={
									<span className={!this.state.skillInfoEdit ? "required" : ""}>
										Primary Technical Skills
									</span>
								}
								style={{ textAlign: "left" }}
								validateStatus={this.state.errSkill.status}
								help={this.state.errSkill.msg}
							>
								<Select
									mode="tags"
									disabled={this.state.skillInfoEdit}
									labelInValue={false}
									style={{ width: "100%" }}
									placeholder="Example: HTML CSS"
									id="skills"
									value={this.state.candidate.skills}
									onChange={this.handlePrimaryTechnicalSkillChange}
								>
									{skillOptions}
								</Select>
							</Form.Item>
							<Form.Item
								label={<span>Secondary Technical Skills</span>}
								style={{ textAlign: "left" }}
							>
								<Select
									mode="tags"
									disabled={this.state.skillInfoEdit}
									labelInValue={false}
									style={{ width: "100%" }}
									placeholder="Example: HTML CSS"
									id="secondarySkills"
									value={this.state.candidate.secondarySkills || []}
									onChange={this.handleSecondaryTechnicalSkillChange}
								>
									{skillOptions}
								</Select>
							</Form.Item>
							<Form.Item
								label={
									<span className={!this.state.skillInfoEdit ? "required" : ""}>
										Spoken Languages
									</span>
								}
								style={{ textAlign: "left" }}
								validateStatus={this.state.errSpokenLanguage.status}
								help={this.state.errSpokenLanguage.msg}
							>
								<Select
									mode="tags"
									maxTagCount={5}
									disabled={this.state.skillInfoEdit}
									labelInValue={false}
									style={{ width: "100%" }}
									placeholder="Example: English Japanese"
									id="spokenLanguages"
									value={this.state.candidate.spokenLanguages}
									onChange={this.handleSpokenLanguageChange}
								>
									{languageOptions}
								</Select>
							</Form.Item>
							<Form.Item
								label={<span>Minor degree</span>}
								style={{ textAlign: "left", marginBottom: 15 }}
							>
								<Input
									disabled={this.state.skillInfoEdit}
									placeholder="Example: Germany Language"
									value={this.state.candidate.minorDegree}
									id="minorDegree"
									onChange={this.handletextAreaChange}
								/>
							</Form.Item>
							{/* <Form.Item
								label={
									<span className={!this.state.skillInfoEdit ? "required" : ""}>
										Your strength
									</span>
								}
								style={{ textAlign: "left" }}
								validateStatus={this.state.errSelfStrength.status}
								help={this.state.errSelfStrength.msg}
							>
								<TextArea
									disabled={this.state.skillInfoEdit}
									placeholder="We would like to know some of your strength."
									autosize={{ minRows: 3, maxRows: 5 }}
									value={this.state.candidate.selfStrength}
									id="selfStrength"
									onChange={this.handletextAreaChange}
								/>
							</Form.Item> */}
							{/* <Form.Item
								label={
									<span className={!this.state.skillInfoEdit ? "required" : ""}>
										Your weakness
									</span>
								}
								style={{ textAlign: "left" }}
								validateStatus={this.state.errSelfWeakness.status}
								help={this.state.errSelfWeakness.msg}
							>
								<TextArea
									disabled={this.state.skillInfoEdit}
									placeholder="We would like to know some of your strength."
									autosize={{ minRows: 3, maxRows: 5 }}
									value={this.state.candidate.selfWeakness}
									id="selfWeakness"
									onChange={this.handletextAreaChange}
								/>
							</Form.Item> */}
							<Form.Item
								label={
									<span className={!this.state.skillInfoEdit ? "required" : ""}>
										Why you want to work in Japan
									</span>
								}
								style={{ textAlign: "left" }}
								validateStatus={this.state.errWhyInJapan.status}
								help={this.state.errWhyInJapan.msg}
							>
								<TextArea
									disabled={this.state.skillInfoEdit}
									placeholder="We would like to know why you want to work in Japan."
									autosize={{ minRows: 3, maxRows: 5 }}
									value={this.state.candidate.whyInJapan}
									id="whyInJapan"
									onChange={this.handletextAreaChange}
								/>
							</Form.Item>
							<Form.Item
								label={
									<span className={!this.state.skillInfoEdit ? "required" : ""}>
										What can you contribute to Japan
									</span>
								}
								style={{ textAlign: "left" }}
								validateStatus={this.state.errWhatToContribute.status}
								help={this.state.errWhatToContribute.msg}
							>
								<TextArea
									disabled={this.state.skillInfoEdit}
									placeholder="We would like to know what can you contribute to Japan."
									autosize={{ minRows: 3, maxRows: 5 }}
									value={this.state.candidate.whatToContribute}
									id="whatToContribute"
									onChange={this.handletextAreaChange}
								/>
							</Form.Item>
							<Divider style={{ marginBottom: 10 }} />

							<Form.Item style={{ marginBottom: 5, marginTop: 5 }}>
								<Button
									loading={this.state.saveInProgress}
									type="primary"
									size="large"
									disabled={this.state.skillInfoEdit}
									block
									onClick={this.handleSubmit}
								>
									Save
								</Button>
							</Form.Item>
						</Form>
						<Divider style={{ marginBottom: 10, marginTop: 10 }} />
					</Col>
				</Row>
			</Card>
		);
	}
}

export default connect(null, {
	updateCandidateSkillSet,
})(Skillset);
