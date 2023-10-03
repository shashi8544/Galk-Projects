import React from "react";
import { Link, withRouter, matchPath } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import Logo from "../../assets/img/logo.png";

const Header = (props) => {
	const { auth, logout, history, location, user } = props;
	const signOut = () => {
		logout();
		history.push("/");
	};

	return (
		<nav className="navbar bg-dark-x">
			<h1 style={{ marginBottom: 0 }}>
				<Link to="/">
					<img src={Logo} alt="Logo" className="brand-logo" />
				</Link>
			</h1>
			{auth.uid && user ? (
				<ul style={{ marginBottom: 0 }}>
					{user.profileCompletionStatus && (
						<React.Fragment>
							<li
								className={
									matchPath(location.pathname, {
										path: "/HomePage",
									})
										? "active"
										: ""
								}
							>
								<Link to="/HomePage">Home</Link>
							</li>
						</React.Fragment>
					)}
					<li
						className={
							matchPath(location.pathname, {
								path: "/Profile",
							})
								? "active"
								: ""
						}
					>
						<Link to="/Profile">My Profile</Link>
					</li>
					<li
						style={{ padding: 0, minWidth: 0, cursor: "pointer" }}
						onClick={signOut}
					>
						SIGN OUT
					</li>
					<li>
						<span className="navbar-username">{user ? user.name : ""}</span>
					</li>
				</ul>
			) : (
				<ul style={{ marginBottom: 0 }}>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	user: state.firebase.profile,
});

export default connect(mapStateToProps, { logout })(withRouter(Header));
