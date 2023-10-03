import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "antd";
import willingsLogo from "../../assets/img/willingsLogo.svg";

const Landing = (props) => {
	if (props.isUserAuthenticated) {
		return <Redirect to="/Home" />;
	}

	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<iframe
						title="liveVideo"
						// src="https://www.youtube.com/watch?v=vyKAWmFn2cs&t=700s"
						src="https://www.youtube.com/embed/vyKAWmFn2cs"
					/>
					<div>
						<p className="lead">
							Please have a look on this video to understand our program better.
						</p>
					</div>
					<div>
						<div className="landing-buttonContainer">
							<Button type="primary" style={{ width: 150 }}>
								<Link to="/login">Login</Link>
							</Button>
							<Button
								type="primary"
								ghost
								style={{ border: ".5px solid #17A2B8", width: 150 }}
							>
								<Link to="/register">Register</Link>
							</Button>
						</div>
					</div>
					{/* <div>
						<p className="landing_techSupport">
							Having any trouble using this website ? Join our tech support
							group <span onClick={changeGroupJoinModalDisplay}>here</span>.
						</p>
					</div> */}
					<div className="landing-bottom">
						<span>Powred by </span>
						<img src={willingsLogo} alt="willing logo" />
					</div>
				</div>
			</div>
		</section>
	);
};

const mapStateToProps = (state) => ({
	isUserAuthenticated: state.firebase.auth.uid ? true : false,
});

export default connect(mapStateToProps)(Landing);
