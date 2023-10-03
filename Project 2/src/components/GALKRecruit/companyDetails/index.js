import { Card, Divider } from "antd";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";

import locationIcon from "./images/location.png";
import websiteIcon from "./images/website.png";
import Record from "./companyInfo.json"
import "./style.css";
import "./index.css";
import rectangle from "./images/Rectangle.png";
import willingsLogo from "./images/Group 562.png";
const IndividualCompany = (props) => {
	const [follow, setfollow] = useState("Follow");
	const [isfollow, setIsFollowed] = useState(false);

	// if (companyProfileIndex === -1) return <Redirect to="/GALKLab/Jobs" />;
	// const companyDetails = Record.companyDetails;

	// const {
	// 	name,
	// 	address,
	// 	website,
	// 	industry,

	// 	size,
	// 	vision,
	// 	policy,
	// 	culture,
	// 	description,
	// 	commentFromWillings,

	// 	length
	// } = companyDetails;

	// const onfollowButtonClick = () => {
	// 	setfollow(isfollow ? "Follow" : "Following");
	// 	setIsFollowed(!isfollow);
	// };

	return (
		
			<>

			{Record.map((item, index) =>(
				<Card> 
			<div className="forback">
				<Link to={`/GALKRecruit/SecondarySelection`}>
					<p className="forbackpara">Process to interview</p>
				</Link>
				<p className="forbackpara">&gt;</p>
				<p className="forbackpara">{item.name}</p>
			</div>
			<div
				className="compimage"
				style={{
					background: `url(${rectangle}) no-repeat center center/cover`,				}}
			>
				<p className={"" + (isfollow ? "text-primary" : "")}>
					{/* <p
						className="shasfoll"
						style={{ float: "right" }}
						onClick={onfollowButtonClick}
					>
						{follow}
					</p> */}
					<br />
					<br />
					<br />
					<br />
					<div className="shashicomp">
						<a href={item.website} target="_blank" rel="noreferrer">
							<img id="logoimageshas" src={willingsLogo} alt="icon" />
						</a>
						<p id="logoparashas">{item.name}</p>
					</div>
					<p className="movepara">{item.industry}</p>
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
							&nbsp;&nbsp;&nbsp;{item.address}
						</a>
						<a
							id="logoparashas2"
							style={{ float: "right" }}
							href={item.website}
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
							&nbsp;&nbsp;&nbsp;{item.website}
						</a>
					</div>
				</p>
			</div>

			<div className="comppage">
				<br />
				<div>
					<span className="shasinfoemp">Number of Employee: {item.size}</span>
					<span className="shasinfoemp">
						Number of Internship Posted:{item.length}
					</span>
				</div>
				<br />
				<div>
					<p className="parastrong">1 - About our Company</p>
					<p id="underpara">{item.description}</p>
				</div>
				<div>
					<p className="parastrong">2 - About our Vision</p>
					<p id="underpara">{item.vision}</p>
				</div>
				<div>
					<p className="parastrong">3 - About our Policy</p>
					<p id="underpara">{item.policy}</p>
				</div>
				<div>
					<p className="parastrong">4 - About our Culture</p>
					<p id="underpara">{item.culture}</p>
				</div>

				<Divider />
				<div className="shascomment">
					<p className="parastrong">Comment From Us</p>
					<p id="underpara">{item.commentFromWillings}</p>
				</div>
			</div>
		</Card>
			))
			}
		
		</>
	);
};

const mapStateToProps = (state) => ({
	matchedJobsList: state.galkLab.matchedJobsList,
	companyProfileIndex: state.galkLab.companyProfileIndex,
});

export default connect(mapStateToProps, {})(IndividualCompany);
