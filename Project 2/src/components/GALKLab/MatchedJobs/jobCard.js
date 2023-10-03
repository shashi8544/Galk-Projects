import { connect } from "react-redux";
import React, { useState } from "react";

import locationIcon from "./images/location.png";

import "./style.css";
import "./individualCompany.css";

const AllJobs = ({ jobDetails, inx }) => {
	const {
		title,
		skills,
		numLikes,
		description,
		shortDescription,

		companyName,
		companyLogo,
		companyAddress,
		companyWebsite,
	} = jobDetails;

	const [like, setLike] = useState(numLikes);
	const [isLiked, setIsLiked] = useState(false);
	const onLikeButtonClick = () => {
		setLike(like + (isLiked ? -1 : 1));
		setIsLiked(!isLiked);
	};

	const [expandMore, setExpandMore] = useState(false);
	const showDescription = () => {
		if (expandMore) {
			return (
				<>
					<p>{description}</p>
					<p id="expandpara" onClick={() => setExpandMore(false)}>
						Show Less
					</p>
				</>
			);
		} else {
			return (
				<>
					<p id="expandpara" onClick={() => setExpandMore(true)}>
						Expand
					</p>
				</>
			);
		}
	};

	return (
		<div className="moreinterncontainer">
			<div className="shashitopic1">
				<p id="sspp1">Project {inx + 1}</p>
				<p id="sspp2">{title}</p>
			</div>
			<p id="sspp3">{shortDescription}</p>

			<div className="featureelement">
				<a href={companyWebsite} target="_blank" rel="noreferrer">
					<img id="ssppimg" src={companyLogo} alt="icon" />
				</a>
				<p id="sppcompname">{companyName}</p>
				<div id="ssadd">
					<img id="logoimageshas1" src={locationIcon} alt="icon" />
					{companyAddress}
				</div>
				<p></p>
				<p className={"" + (isLiked ? "text-primary" : "")}>
					<i
						style={{
							fontSize: "20px",
							float: "right",
							color: isLiked ? "blue" : "",
						}}
						class="fa fa-thumbs-up"
						onClick={onLikeButtonClick}
					>
						{numLikes}
					</i>
				</p>
			</div>

			<div></div>
			<div className="box1"></div>

			<div className="ssppjobcardtitle">Required technical skills:</div>
			{skills && skills.length > 0 ? (
				<div className="internshipJob_card_skillRoot">
					{skills.map((skill, i) => (
						<div
							className="internshipJob_card_skill1"
							id="skillscards"
							key={`skill${i}`}
						>
							{skill}
						</div>
					))}
				</div>
			) : (
				"No skills"
			)}
			<br />
			<div>{showDescription(inx)}</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	companyDetails: state.galkLab.matchedJobsList,
	companyDetailsIndex: state.galkLab.companyProfileIndex,
});

export default connect(mapStateToProps, {})(AllJobs);
