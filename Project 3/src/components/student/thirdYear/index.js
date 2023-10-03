import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Region } from "../../common/layout/region";
import SearchPanel from "./searchPanel";
import SearchResult from "./searchResult";
import Loading from "../../common/loading";
import { getAllThirdYearStudentList } from "../../../actions/studentAction";

import "./thirdYearStudents.css";

const ThirdYearStudents = ({
	getAllThirdYearStudentList,
	studentList,
	isLoading,
}) => {
	useEffect(() => {
		getAllThirdYearStudentList();
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
	studentList: state.student.thirdYearList,
});

export default connect(mapStateToProps, { getAllThirdYearStudentList })(
	ThirdYearStudents
);
