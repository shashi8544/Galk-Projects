import { getClosedIssues } from "../../../../../../actions/jobProgressActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Avatar, Spin, Tooltip } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import moment from "moment";
import "./open.css";

function ClosedIssues({
	getClosedIssues,
	closedIssues,
	repository,
	timelineControl,
}) {
	useEffect(() => {
		getClosedIssues(repository);
	}, []);

	const handleClick = (selectedIssue) => {
		timelineControl.setSelectedIssue(selectedIssue);
		timelineControl.setIsOpen(true);
	};

	const jsx = closedIssues?.map((issue) => {
		return (
			<div
				key={issue.id}
				className="galkLab_jobPosting_issue"
				onClick={(e) => handleClick(issue)}
			>
				<div>
					<div>{issue.title}</div>
					<span>
						#{issue.number} opened &nbsp;
						{moment(
							new Date(issue.created_at).toLocaleString()
						).fromNow()} by {issue.user.login}
					</span>
				</div>
				<div className="galkLab_jobPosting_info">
					{issue.assignee ? (
						<Tooltip title={`assigned to ${issue.assignee?.login}`}>
							<div>
								<Avatar src={issue.assignee?.avatar_url} />
							</div>
						</Tooltip>
					) : (
						<div></div>
					)}
					{issue.comments ? (
						<div>
							<CommentOutlined /> {issue.comments}
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		);
	});
	if (!closedIssues)
		return (
			<div className="galkLab_jobPosting_loading ">
				<div className="galkLab_jobPosting_loader"></div>{" "}
			</div>
		);
	return (
		<>
			<div className="galkLab_jobPosting_container">{jsx}</div>
		</>
	);
}
const mapStateToProps = (state) => ({
	isLoading: state.jobProgress.isLoading,
	closedIssues: state.jobProgress.closedIssues,
});
export default connect(mapStateToProps, { getClosedIssues })(ClosedIssues);
