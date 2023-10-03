import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Region } from "../../../common/layout/region";
import Loading from "../../../common/loading";
import { List } from "antd";
import "./matchStudents.css";

const MatchStudents = ({ companyId, isLoading, companyName }) => {
	const [matchedStudents, setMatchedStudents] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchMatchedStudents();
	}, []);

	const fetchMatchedStudents = () => {
		setLoading(true);
		var params = new URLSearchParams();
		// params.append("jobID", "00m9qZ6wU3gLtTUknjmE");
		params.append("jobID", "6rUXQeh46XRlAKKQLAdS");
		var request = {
			params: params,
		};

		axios
			.get(
				"https://us-central1-piit-52003.cloudfunctions.net/topStudentsWithFilters?jobID=6rUXQeh46XRlAKKQLAdS"
			)
			.then((response) => {
				// console.log("RES:", JSON.parse(JSON.stringify(response.data)));
				console.log("Response:", response);
				console.log(
					"ResponseJSON:",
					JSON.parse(JSON.stringify(response.data)).response
				);
				setMatchedStudents(response.data);
				setLoading(false);
			})
			.catch((ex) => {
				console.log("Error:", ex);
				setLoading(false);
			});
	};

	return (
		<Region>
			{loading && <Loading />}
			{
				<div className="galkLab_matchedStudents_modal_container">
					{/* <List
						grid={{ gutter: 100, column: 3 }}
						dataSource={matchedStudents}
						renderItem={(item) => (
							<List.Item>
								<Card title={item} cover={<img src={item} />}>
								{item.name}
								</Card>
							</List.Item>
						)}
					/> */}
				</div>
			}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	companyId: state.company.company.id,
	companyName: state.company.company.name,
});

export default MatchStudents;
