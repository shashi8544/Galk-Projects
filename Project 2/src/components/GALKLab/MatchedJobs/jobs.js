import { Card } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import locationIcon from "./images/location.png";
import * as actionTypes from "../../../actions/types";

import "./style.css";

const Jobs = ({ jobDetails }) => {
	const {
		index,
		title,
		skills,
		description,
		numLikes,
		shortDescription,
		companyDetails,
	} = jobDetails;
	const dispatch = useDispatch();

	const [like, setLike] = useState(numLikes);
	const [isLiked, setIsLiked] = useState(false);
	const onLikeButtonClick = () => {
		setLike(like + (isLiked ? -1 : 1));
		setIsLiked(!isLiked);
	};

	const [showMore, setShowMore] = useState(false);
	const showDescription = () => {
		if (showMore && description.length > 0) {
			return (
				<div style={{ marginTop: "25px" }}>
					<p>{description}</p>
					<div className="description_button">
						<button
							style={{ border: "none", background: "none", cursor: "pointer" }}
							onClick={() => setShowMore(false)}
						>
							Show Less
						</button>
					</div>
				</div>
			);
		}

		if (!showMore) {
			return (
				<>
					<div className="description_button">
						<button
							style={{ border: "none", background: "none", cursor: "pointer" }}
							onClick={() => setShowMore(true)}
						>
							Expand
						</button>
					</div>
				</>
			);
		}
	};

	const mystyle = {
		// position: "absolute",
		width: "327px",
		height: "8px",
		left: "286px",
		top: "224px",
		marginBottom: "32px",
		fontFamily: "Roboto, sans-serif",
		fontStyle: "normal",
		fontWeight: "700",
		fontSize: "24px",
		lineHeight: "28px",

		/* System Gray/900 */

		color: "#212121",
	};
	const newstyle = {
		// position: absolute;
		width: "887px",
		height: "20px",
		left: "286px",
		top: "264px",
		marginBottom: "20px",
		fontFamily: "Roboto, sans-serif",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: "14px",
		lineHeight: "160%",
		color: "#212121",
	};

	return (
		<Card
			className="internshipJob_card_cardRoot"
			size="small"
			type="inner"
			title={
				<>
					<div>
						<p style={mystyle}>{title}</p>
						<p style={newstyle}>{shortDescription}</p>
					</div>
					<div className="name-location">
						<div className="address">
							<Link
								style={{ color: "#696969" }}
								to={`/GALKLab/CompanyDetails/${companyDetails.name}`}
								onClick={() => {
									dispatch({
										type: actionTypes.GALKLAB_MATCHED_JOBS_INDEX,
										payload: index,
									});
								}}
							>
								<img
									style={{ marginRight: 20 }}
									src={companyDetails.logo}
									alt=""
								/>
								{companyDetails.name}
							</Link>

							<img className="spacing" src={locationIcon} alt="" />
							{companyDetails.address}
						</div>

						<div className="likes">
							<div className={"" + (isLiked ? "text-primary" : "")}>
								<i
									style={{ fontSize: "20px", color: isLiked ? "blue" : "grey" }}
									className="fa fa-thumbs-up"
									onClick={onLikeButtonClick}
								></i>
								<div
									className="text-dark"
									style={{ display: "inline", marginLeft: "5px" }}
								>
									{like}
								</div>
							</div>
						</div>
					</div>
				</>
			}
			style={{ marginBottom: 15 }}
			extra={
				<div style={{ display: "flex" }}>
					<span></span>
				</div>
			}
		>
			<>
				<div className="jobCard_title">Required technical skills:</div>
				{skills && skills.length > 0 ? (
					<div className="internshipJob_card_skillRoot">
						{skills.map((skill, i) => (
							<div
								style={{
									color: "#FFFFFF",
									background: "#8B97A5",
									marginTop: "-5px",
								}}
								className="internshipJob_card_skill"
								key={i}
							>
								{skill}
							</div>
						))}
					</div>
				) : (
					"No skills required"
				)}
			</>

			<div
				className="internshipJob_card_description"
				style={{ color: "black" }}
			>
				{showDescription()}
			</div>
		</Card>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Jobs);
