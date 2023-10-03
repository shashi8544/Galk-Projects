import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import { login } from "../../actions/authActions";
import { Modal, Form, Input, Alert, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const SignInForm = (props) => {
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
		<Modal
			title='Sign In'
			visible={true}
			onCancel={handleClose}
			footer={null}
		>
			<React.Fragment>
				{error ? <Alert message={error} type="error" showIcon /> : null}

				<Form name="LoginForm" layout="vertical" onFinish={handleSubmit}>
					<Form.Item
						label='Email'
						name="email"
						rules={[
							{
								type: "email",
								required: true,
								message: 'Enter email in proper format',
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
						label='Password'
						name="password"
						rules={[
							{
								required: true,
								message: 'Enter password',
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
							style={{ width: "100%", marginTop: 20 }}
							loading={isAuthLoading}
						>
							Sign In
						</Button>
					</Form.Item>
				</Form>
			</React.Fragment>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	isUserAuthenticated:
		state.firebase.auth.uid && state.auth.isUserAuthenticated ? true : false,
	isAuthLoading: state.auth.isAuthDataLoading,
	error: state.error.error,
});

export default connect(mapStateToProps, { login, clearErrors })(SignInForm);
