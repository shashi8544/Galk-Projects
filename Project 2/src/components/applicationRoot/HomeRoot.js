import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setApplicationModule } from "../../actions/appActions";
import { ApplicationModule } from "../../utils/models/applicationModules";
import internshipIcon from "../../assets/images/internshipLogo.png";
import freelanceIcon from "../../assets/images/galkLabLogo.png";
import developmentIcon from "../../assets/images/GALKCompanyLogo.png";
import { connect } from "react-redux";

import "antd/dist/antd.css";
import "./style.css";

const HomeRoot = ({ setApplicationModule, userProfile }) => {
	useEffect(() => {
		setApplicationModule(ApplicationModule.Default);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<section className="appRoot_homePageBG">
			<div className="appRoot_indexContainer">
				<div className="appRoot_title-heading">
					<h3>What are you interested in ?</h3>
					<p>Please choose your preferred option and go-ahead</p>
					<ul className="appRoot_grpBtns">
						{userProfile?.profileCompletionStatus &&
						userProfile?.subscribedInInternship ? (
							<li key={ApplicationModule.GALKRecruit}>
								<Link to="/GALKRecruit/ScreeningForm">
									<button
										onClick={() =>
											setApplicationModule(ApplicationModule.GALKRecruit)
										}
									>
										<p>
											<img src={internshipIcon} alt="internshipIcon" />
										</p>
										GALK Recruit
									</button>
								</Link>
							</li>
						) : (
							<></>
						)}
						{userProfile?.profileCompletionStatus &&
						userProfile?.subscribedInGalkLab ? (
							<li key={ApplicationModule.GALKLab}>
								<Link to="/GALKLab/Jobs">
									<button
										onClick={() =>
											setApplicationModule(ApplicationModule.GALKLab)
										}
										//className="appRoot_disabledBTN"
									>
										<p>
											<img src={freelanceIcon} alt="freelanceIcon" />
										</p>
										GALK Lab
									</button>
								</Link>
							</li>
						) : (
							<></>
						)}
						<li key={ApplicationModule.AccountSetting}>
							<Link to="/AccountSetting">
								<button
									onClick={() =>
										setApplicationModule(ApplicationModule.AccountSetting)
									}
								>
									<p>
										<img src={developmentIcon} alt="settingIcon" />
									</p>
									Account setting
								</button>
							</Link>
						</li>
					</ul>
				</div>
				<div className="appRoot_clearfix"></div>
			</div>
			<div className="appRoot_clearfix"></div>
		</section>
	);
};
const mapStateToProps = (state) => ({
	userProfile: state.firebase.profile,
});
export default connect(mapStateToProps, {
	setApplicationModule,
})(HomeRoot);
