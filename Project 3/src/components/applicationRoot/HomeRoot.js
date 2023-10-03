import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setApplicationModule } from "../../actions/appActions";
import { ApplicationModule } from "../../utils/models/applicationModules";
import internshipIcon from "../../assets/images/internshipLogo.png";
import developmentIcon from "../../assets/images/GALKCompanyLogo.png";
import { connect } from "react-redux";
import { CompanyAccountType } from "../../utils/constants";
import "antd/dist/antd.css";
import "./style.css";

const HomeRoot = ({ setApplicationModule, userType }) => {
	useEffect(() => {
		setApplicationModule(ApplicationModule.Default);
	}, []);

	return (
		<section className="appRoot_homePageBG">
			<div className="appRoot_indexContainer">
				<div className="appRoot_title-heading">
					<h3>What are you interested in ?</h3>
					<p>Please choose your preferred option and go-ahead</p>
					<ul className="appRoot_grpBtns">
						{userType === CompanyAccountType.GALKAdmin && (
							<>
								<li key={ApplicationModule.Company}>
									<Link to="/Company">
										<button
											onClick={() =>
												setApplicationModule(ApplicationModule.Company)
											}
										>
											<p>
												<img
													style={{ width: 40, height: 40 }}
													src={internshipIcon}
													alt="internshipIcon"
												/>
											</p>
											Company
										</button>
									</Link>
								</li>
								<li key={ApplicationModule.Student}>
									<Link to="/Student">
										<button
											onClick={() =>
												setApplicationModule(ApplicationModule.Student)
											}
										>
											<p>
												<img
													style={{ width: 40, height: 40 }}
													src={internshipIcon}
													alt="internshipIcon"
												/>
											</p>
											Student
										</button>
									</Link>
								</li>
								<li key={ApplicationModule.AccountManagement}>
									<Link to="/Management">
										<button
											onClick={() =>
												setApplicationModule(
													ApplicationModule.AccountManagement
												)
											}
										>
											<p>
												<img
													style={{ width: 40, height: 40 }}
													src={developmentIcon}
													alt="settingIcon"
												/>
											</p>
											Account management
										</button>
									</Link>
								</li>
							</>
						)}
						{userType === CompanyAccountType.Mentor && (
							<li key={ApplicationModule.GalkLabMentor}>
								<Link to="/Mentor">
									<button
										onClick={() =>
											setApplicationModule(ApplicationModule.GalkLabMentor)
										}
									>
										<p>
											<img
												style={{ width: 40, height: 40 }}
												src={developmentIcon}
												alt="settingIcon"
											/>
										</p>
										Galk Mentor
									</button>
								</Link>
							</li>
						)}
						{userType === null && <p>Please wait ...</p>}
					</ul>
				</div>
				<div className="appRoot_clearfix"></div>
			</div>
			<div className="appRoot_clearfix"></div>
		</section>
	);
};

export default connect(null, {
	setApplicationModule,
})(HomeRoot);
