import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import { login } from "../../actions/authActions";
import { Modal, Form, Input, Alert, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = (props) => {
	const {
		history,
		clearErrors,
		login,
		isUserAuthenticated,
		isAuthLoading,
		error,
	} = props;

	if (isUserAuthenticated) {
		return <Redirect to="/Home" />;
	}

	const handleSubmit = ({ email, password }) => {
		login(email, password, history);
	};

	const handleClose = () => {
		clearErrors();
		history.push("/");
	};
	return (
		<div>
			<section className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						<h1 className="x-large" style={{ color: "#fff" }}>
							GALK Portal
						</h1>
					</div>
				</div>
			</section>
			<Modal title="Login" visible={true} onCancel={handleClose} footer={null}>
				<React.Fragment>
					{error ? <Alert message={error} type="error" showIcon /> : null}

					<Form
						name="LoginForm"
						layout="vertical"
						onFinish={handleSubmit}
						// validateMessages={setValidationMessages}
					>
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
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="example: taro_yamada@galk.com"
							/>
						</Form.Item>
						<Form.Item
							style={{ marginTop: 20 }}
							label="Your Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please enter your password !",
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className="site-form-item-icon" />}
								placeholder="example: yourpassword0111"
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: "100%", marginTop: 30 }}
								loading={isAuthLoading}
							>
								Login
							</Button>
						</Form.Item>
					</Form>
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Link to="/register" style={{ color: "#17a2b8", marginLeft: 1 }}>
							Dont't have an account
						</Link>
						<Link
							to="/PasswordReset"
							style={{ color: "#17a2b8", marginLeft: 1 }}
						>
							Forgot password ?
						</Link>
					</div>
				</React.Fragment>
			</Modal>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isUserAuthenticated: state.firebase.auth.uid ? true : false,
	error: state.error.error,
	isAuthLoading: state.auth.isAuthDataLoading,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
