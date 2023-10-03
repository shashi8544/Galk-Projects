import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchPanel from "./searchPanel";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { getAllGraduateStudentList } from "../../../actions/studentAction";

import "./graduateStudents.css";

const GraduateStudents = ({
	getAllGraduateStudentList,
	studentList,
	isLoading,
}) => {
	useEffect(() => {
		getAllGraduateStudentList();
	}, []);

	return (
		<Region>
			<div className="thirdYearStudents-container">
				<div className="thirdYearStudents-searchPanel">
					<SearchPanel isLoading={isLoading} />
				</div>
				<div className="thirdYearStudents-searchResult">
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
	studentList: state.student.graduateList,
});

export default connect(mapStateToProps, { getAllGraduateStudentList })(
	GraduateStudents
);
