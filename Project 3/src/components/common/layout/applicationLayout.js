import React from "react";
import Logo from "../../../assets/images/logo.png";
import { logout } from "../../../actions/authActions";
import LeftNavigation from "../navigation/leftNavigationContainer";
import { Layout, Tooltip, Button, Affix } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./applicationLayout.css";

const { Header, Content, Sider } = Layout;

const ApplicationLayout = ({ children, history, logout }) => {
	const _logout = () => {
		logout(history);
	};

	return (
		<Layout>
			<Affix offsetTop={0}>
				<Header className="applicationLayout-header">
					<Link to={"/Home"}>
						<div className="applicationLayout-header-logo">
							<img src={Logo} alt="Logo" />
						</div>
					</Link>
					<div className="applicationLayout-header-menu">
						<div>
							<span>
								<b>Welcome, ADMIN</b>
							</span>
						</div>
						<div>
							<Tooltip title="Logout" placement="bottomLeft">
								<Button
									type="primary"
									icon={<ExportOutlined />}
									onClick={_logout}
									style={{ marginLeft: 10 }}
								/>
							</Tooltip>
						</div>
					</div>
				</Header>
			</Affix>
			<Layout>
				<Sider width={235} className="applicationLayout-sider">
					<LeftNavigation />
				</Sider>
				<Layout
					style={{
						padding: 0,
						backgroundColor: "#f2f2f2 !important",
					}}
				>
					<Content className="applicationLayout-content">{children}</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	userId: state.firebase.auth.uid,
});

export default connect(mapStateToProps, { logout })(
	withRouter(ApplicationLayout)
);
