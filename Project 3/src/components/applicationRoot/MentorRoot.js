import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import RestrictedRoute from "../../utils/components/RestrictedRoute";
import CompanyList from "../company";
import CompanyDetails from "../company/companyDetails";
import CompanyDashboard from "../company/dashboard";
import MentorDashboard from "../mentor/dashBoard";

const MentorRoot = ({ match }) => {
    return (
        <>
            <Redirect
                // from={`${match.path}`}
                to={`${match.path}/Dashboard`}
            />
            <RestrictedRoute path={`${match.path}/Dashboard`}>
                <MentorDashboard />
            </RestrictedRoute>
        </>
    );
};

export default connect(null, {})(withRouter(MentorRoot));