import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../common/RestrictedRoute";
import AllJobs from "../internship/AllJobs";
import { Region } from "../common/layout/region";
import IndividualCompany from "../internship/AllJobs/individual_comapny";
import Moreinternship from "../internship/AllJobs/moreinternship";
import Record from '../internship/AllJobs/record';
import Record1 from '../internship/AllJobs/record1';
const _intershipRoot = ({ match }) => {
	return (
		<>
			<RestrictedRoute path={`${match.path}/Jobs`}>Jobs
				<Region>
					<AllJobs />
				</Region>
			</RestrictedRoute>
			{
				Record.map((data,key)=>{
					return(
						<RestrictedRoute path={`${match.path}/${data.jobDetails.title}`}>
							<Region>
								<IndividualCompany jobDetails={data.jobDetails} index={data.index} key={key} />
							</Region>
						</RestrictedRoute>
					)	
				})
				
			}
			{
				Record1.map((data,key)=>{
					return(
						<RestrictedRoute path={`${match.path}/moreinternship`}>
							
							<Region>
								<Moreinternship internshipDetails={data.internshipDetails} index={data.index} key={key} />
							</Region>
						</RestrictedRoute>
					)	
				})
				
			}
			
		</>
	);
};

export default connect(null, {})(withRouter(_intershipRoot));