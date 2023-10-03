import { Card, Divider } from "antd";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";

import locationIcon from "./images/location.png";
import websiteIcon from "./images/website.png";

import "./style.css";
import "./individualCompany.css";

const IndividualCompany = ({ matchedJobsList, companyProfileIndex }) => {
	const [follow, setfollow] = useState("Follow");
	const [isfollow, setIsFollowed] = useState(false);

	if (companyProfileIndex === -1) return <Redirect to="/GALKLab/Jobs" />;
	const companyDetails = matchedJobsList[companyProfileIndex].companyDetails;

	const {
		logo,
		name,
		address,
		website,
		industry,
		coverPhoto,

		size,
		vision,
		policy,
		culture,
		description,
		commentFromWillings,

		allJobsDetails,
	} = companyDetails;

	const onfollowButtonClick = () => {
		setfollow(isfollow ? "Follow" : "Following");
		setIsFollowed(!isfollow);
	};

	return (
		<Card>
			<div className="forback">
				<Link to={`/GALKLab/Jobs`}>
					<p className="forbackpara">Matched Jobs </p>
				</Link>
				<p className="forbackpara">&gt;</p>
				<p className="forbackpara">{name}</p>
			</div>
			<div
				className="shascompimage"
				style={{
					background: `url(${coverPhoto}) no-repeat center center/cover`,
				}}
			>
				<p className={"" + (isfollow ? "text-primary" : "")}>
					<p
						className="shasfoll"
						style={{ float: "right" }}
						onClick={onfollowButtonClick}
					>
						{follow}
					</p>
					<br />
					<br />
					<br />
					<br />
					<div className="shashicomp">
						<a href={website} target="_blank" rel="noreferrer">
							<img id="logoimageshas" src={logo} alt="icon" />
						</a>
						<p id="logoparashas">{name}</p>
					</div>
					<p className="movepara">{industry}</p>
					<div className="shashicomp">
						<a id="logoparashas1">
							<img
								id="logoimageshas1"
								src={locationIcon}
								alt="Location Pin"
								style={{
									width: 10,
									height: 10,
									color: "white",
									fontSize: "small",
								}}
							/>
							&nbsp;&nbsp;&nbsp;{address}
						</a>
						<a
							id="logoparashas2"
							style={{ float: "right" }}
							href={website}
							target="_blank"
						>
							<img
								id="logoimageshas1"
								src={websiteIcon}
								alt="Website icon"
								style={{
									width: 10,
									height: 10,
									color: "white",
									fontSize: "small",
								}}
							/>
							&nbsp;&nbsp;&nbsp;{website}
						</a>
					</div>
				</p>
			</div>

			<div className="shascomppage">
				<br />
				<div>
					<span className="shasinfoemp">Number of Employee: {size}</span>
					<span className="shasinfoemp">
						Number of Internship Posted:{allJobsDetails.length}
					</span>
				</div>
				<br />
				<div>
					<p className="parastrong">1 - About our Company</p>
					<p id="underpara">{description}</p>
				</div>
				<div>
					<p className="parastrong">2 - About our Vision</p>
					<p id="underpara">{vision}</p>
				</div>
				<div>
					<p className="parastrong">3 - About our Policy</p>
					<p id="underpara">{policy}</p>
				</div>
				<div>
					<p className="parastrong">4 - About our Culture</p>
					<p id="underpara">{culture}</p>
				</div>

				<Divider />

				<div className="shasinternshipinfo">
					<p className="parastrong">Jobs Information</p>
					{allJobsDetails &&
						allJobsDetails.map((jobDetails, inx) => {
							if (inx > 3) return <></>;
							return (
								<div className="interncard">
									<div className="shashitopic">
										<p id="ppp1">Project {inx + 1}</p>
										<p id="ppp2">{jobDetails.title}</p>
									</div>
									<p className="pppp1">{jobDetails.shortDescription}</p>
									<>
										{jobDetails.skills && jobDetails.skills.length > 0 ? (
											<div className="internshipJob_card_skillRoot">
												<strong id="istrong">Required:</strong>
												{jobDetails.skills.map((skill, i) => (
													<div
														className="internshipJob_card_skill1"
														key={`skill${inx}_${i}`}
													>
														{skill}
													</div>
												))}
											</div>
										) : (
											"No skills required"
										)}
									</>
								</div>
							);
						})}
				</div>
				<div className="moreintern">
					<Link to={`/GALKLab/AllJobs/${name}`}>
						<p id="morepara">See All Internship Posted &gt;</p>
					</Link>
				</div>

				<Divider />

				<div className="shascomment">
					<p className="parastrong">Comment From Us</p>
					<p id="underpara">{commentFromWillings}</p>
				</div>
			</div>
		</Card>
	);
};

const mapStateToProps = (state) => ({
	matchedJobsList: state.galkLab.matchedJobsList,
	companyProfileIndex: state.galkLab.companyProfileIndex,
});

export default connect(mapStateToProps, {})(IndividualCompany);
