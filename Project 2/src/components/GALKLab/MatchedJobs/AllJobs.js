import React from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import JobCard from "./jobCard";

import "./style.css";
import "./individualCompany.css";

const AllJobs = ({ matchedJobsList, companyProfileIndex }) => {
	if (companyProfileIndex === -1) return <Redirect to="/GALKLab/Jobs" />;
	const companyDetails = matchedJobsList[companyProfileIndex].companyDetails;

	const { allJobsDetails } = companyDetails;

	return (
		<Card>
			<div className="forback">
				<Link to={`/GALKLab/Jobs`}>
					<p className="forbackpara">Matched Jobs </p>
				</Link>
				<p className="forbackpara">&gt;</p>
				<Link to={`/GALKLab/CompanyDetails/${allJobsDetails.companyName}`}>
					<p className="forbackpara">{allJobsDetails[0].companyName}</p>
				</Link>
				<p className="forbackpara">&gt;</p>
				<Link to={`/GALKLab/AllJobs/${allJobsDetails.companyName}`}>
					<p className="forbackpara">All Jobs</p>
				</Link>
			</div>
			<p id="spp1">All Jobs Posted</p>

			{allJobsDetails &&
				allJobsDetails.map((jobDetails, inx) => {
					return <JobCard jobDetails={jobDetails} inx={inx} />;
				})}
		</Card>
	);
};

const mapStateToProps = (state) => ({
	matchedJobsList: state.galkLab.matchedJobsList,
	companyProfileIndex: state.galkLab.companyProfileIndex,
});

export default connect(mapStateToProps, {})(AllJobs);
