import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchPanel from "./searchPanel";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { getAllStudentList } from "../../../actions/studentAction";

import "./allStudents.css";

const AllStudents = ({ getAllStudentList, studentList, isLoading }) => {
	useEffect(() => {
		getAllStudentList();
	}, []);

	return (
		<Region>
			<div className="allStudents_container">
				<div className="allStudents_searchPanel">
					<SearchPanel isLoading={isLoading} />
				</div>
				<div className="allStudents_searchResult">
					{isLoading && <Loading size="large" />}
					{!isLoading && studentList && (
						<SearchResult studentList={studentList} />
					)}
				</div>
			</div>
		</Region>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.student.studentListLoading,
	studentList: state.student.allStudentList,
});

export default connect(mapStateToProps, { getAllStudentList })(AllStudents);
