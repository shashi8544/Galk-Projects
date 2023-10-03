import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import { register } from "../../actions/authActions";
import { validatePasswordWithRegEx } from "../../utils/javaScriptHelper";
import { Modal, Form, Input, Alert, Radio, Button } from "antd";

const Register = (props) => {
	const {
		history,
		isUserAuthenticated,
		isAuthLoading,
		isAppLoading,
		error,
		register,
	} = props;
	const [form] = Form.useForm();
	const [password, setPassword] = useState("");
	const [newData, setNewData] = useState(null);

	const [showAgreementModal, setShowAgreementModal] = useState(false);

	if (isUserAuthenticated) {
		return <Redirect to="/Home" />;
	}

	const handleSubmit = () => {
		const { firstName, lastName, gender, status, email, password } = newData;
		let name = "";
		if (firstName) name = name + firstName.trim();
		if (lastName) name = name + " " + lastName.trim();
		register(name, gender, status, email, password, history);
		setShowAgreementModal(false);
	};

	const handleCancel = () => {
		history.push("/");
	};

	const validateAndShowAgreementModal = ({
		firstName,
		lastName,
		gender,
		status,
		email,
		password,
	}) => {
		setShowAgreementModal(true);
		setNewData({ firstName, lastName, gender, status, email, password });
	};

	const validatePasswordFormat = (_, value) => {
		setPassword(value);
		if (value) {
			if (validatePasswordWithRegEx(value)) {
				return Promise.resolve();
			} else {
				return Promise.reject(
					"Password should have minimum eight characters, at least one letter and one number. It may contain special character"
				);
			}
		} else {
			return Promise.reject("Please enter your password !");
		}
	};

	const checkConfirmPassword = (_, value) => {
		if (value) {
			if (password === value) {
				return Promise.resolve();
			} else {
				return Promise.reject("Password should match !");
			}
		} else {
			return Promise.reject("Please re-enter your password !");
		}
	};

	return (
		<div>
			<section className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						<h1 className="x-large" style={{ color: "#fff" }}>
							GALK Portal
						</h1>
						<p className="lead">
							Please have a look on this video to understand our program better.
						</p>
						<div className="buttons">
							<Link to="/login" className="btn btn-primary">
								Login
							</Link>
							<Link to="/register" className="btn">
								Register
							</Link>
						</div>
					</div>
				</div>
			</section>
			<Modal
				title={
					<div style={{ lineHeight: "20px" }}>
						<span style={{ lineHeight: "20px", fontSize: "20px" }}>
							Register
						</span>
						<span
							style={{
								color: "#999999ff",
								fontSize: "10px",
								lineHeight: "20px",
							}}
						>
							(Candidate must be IIT student or IIT college graduate)
						</span>
					</div>
				}
				visible={true}
				onCancel={handleCancel}
				footer={null}
			>
				<React.Fragment>
					{error ? <Alert message={error} type="error" showIcon /> : null}
					<Form
						name="RegisterForm"
						layout="vertical"
						form={form}
						onFinish={validateAndShowAgreementModal}
					>
						<Form.Item
							label="First Name"
							name="firstName"
							rules={[
								{
									required: true,
									message: "Please enter your First name !",
								},
							]}
						>
							<Input placeholder="example: Joh" />
						</Form.Item>
						<Form.Item
							style={{ marginTop: 15 }}
							label="Last Name"
							name="lastName"
						>
							<Input placeholder="example: Doe" />
						</Form.Item>
						<Form.Item
							label="Gender"
							name="gender"
							rules={[
								{
									required: true,
									message: "Please select your gender !",
								},
							]}
							style={{ marginTop: 15 }}
						>
							<Radio.Group buttonStyle="solid">
								<Radio.Button
									value="male"
									style={{ width: "80px", textAlign: "center" }}
								>
									Male
								</Radio.Button>
								<Radio.Button
									value="female"
									style={{ width: "80px", textAlign: "center" }}
								>
									Female
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							label="Current status"
							name="status"
							rules={[
								{
									required: true,
									message: "Please select your current status !",
								},
							]}
							style={{ marginTop: 15 }}
						>
							<Radio.Group buttonStyle="solid">
								<Radio.Button
									value="student"
									style={{ width: "100px", textAlign: "center" }}
								>
									Student
								</Radio.Button>
								<Radio.Button
									value="graduate"
									style={{ width: "100px", textAlign: "center" }}
								>
									Graduate
								</Radio.Button>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							label="Your Email"
							name="email"
							rules={[
								{
									type: "email",
									required: true,
									message: "Please enter your email in valid format !",
								},
							]}
							style={{ marginTop: 15 }}
						>
							<Input placeholder="example: taro_yamada@galk.com" />
						</Form.Item>
						<Form.Item
							style={{ marginTop: 15 }}
							label="Your Password"
							name="password"
							rules={[
								{
									required: true,
									validator: validatePasswordFormat,
								},
							]}
						>
							<Input.Password placeholder="example: yourpassword0111" />
						</Form.Item>
						<Form.Item
							style={{ marginTop: 15 }}
							label="Retype your password"
							name="confirmPassword"
							rules={[
								{
									required: true,
									validator: checkConfirmPassword,
								},
							]}
						>
							<Input placeholder="re-type your password" />
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: "100%", marginTop: 30 }}
								loading={isAuthLoading || isAppLoading ? true : false}
							>
								Register
							</Button>
						</Form.Item>
						<Modal
							title="By using our service, you are agreed to following terms and services:"
							width="800px"
							visible={showAgreementModal}
							onOk={handleSubmit}
							onCancel={() => setShowAgreementModal(false)}
							footer={[
								<Button key="back" onClick={() => setShowAgreementModal(false)}>
									Leave
								</Button>,
								<Button key="submit" type="primary" onClick={handleSubmit}>
									I Agree
								</Button>,
							]}
						>
							<div className="agreementDetails">
								<p>
									1. You should have only one account in this portal. Any
									duplicate portal shall be considered for auto rejection from
									recruitment process any time.
								</p>
								<p>
									2. By any means and terms you are agreed not to contact any of
									the recruiter company registered with us by taking reference
									from our service. Violating this rule may lead to complete
									suspension of your profile from our service.
								</p>
								<p>
									3. Make sure all the information you will be giving as your
									profile details are all true by evidence. Any false
									information report may lead to complete suspension of your
									profile from our service.
								</p>
								<p>
									4. Please make sure you do not provide any information as
									profile details or say in Introduction video which can
									hurt/harm anybody by any means or which are offensive to
									anybody or any culture.
								</p>
							</div>
						</Modal>
					</Form>
					<br />
					<Link to="/login" style={{ color: "#17a2b8", marginLeft: 1 }}>
						Have an account
					</Link>
				</React.Fragment>
			</Modal>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isUserAuthenticated: state.firebase.auth.uid ? true : false,
	error: state.error.error,
	isAppLoading: state.app.isAppLoading,
	isAuthLoading: state.auth.isAuthDataLoading,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
