import "./open.css";
import { getOpenPulls } from "../../../../../../actions/jobProgressActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Avatar, Spin, Tooltip } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import moment from "moment";
function Open({ getOpenPulls, openPulls, repository, timelineControl }) {
	useEffect(() => {
		getOpenPulls(repository);
	}, []);
	const handleClick = (selectedIssue) => {
		timelineControl.setSelectedIssue(selectedIssue);
		timelineControl.setIsOpen(true);
		timelineControl.resetTimeline();
	};
	const jsx = openPulls?.map((issue) => {
		return (
			<div
				key={issue.id}
				className="galkLab_jobPosting_pulls_issue"
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
				<div className="galkLab_jobPosting_pulls_info">
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
	if (!openPulls)
		return (
			<div className="galkLab_jobPosting_pulls_loading ">
				<div className="galkLab_jobPosting_pulls_loader"></div>{" "}
			</div>
		);
	return (
		<>
			<div className="galkLab_jobPosting_pulls_container">{jsx}</div>
		</>
	);
}
const mapStateToProps = (state) => ({
	isLoading: state.jobProgress.isLoading,
	openPulls: state.jobProgress.openPulls,
});
export default connect(mapStateToProps, { getOpenPulls })(Open);
