import "./style.css";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NOTIFICATION_STATES as notificationState } from "../../../../../../actions/types";
import {
	addRepo,
	resetAddRepoState,
} from "../../../../../../actions/jobProgressActions";
function AddRepository({
	addRepoState,
	selectedJob,
	resetAddRepoState,
	addRepo,
}) {
	const [userName, setUserName] = useState("");
	const [repo, setRepo] = useState("");
	const openNotification = (type = "success", title, content) => {
		notification[type]({
			message: title,
			description: content,
			onClick: () => {},
		});
	};
	useEffect(() => {
		if (addRepoState === notificationState.failed) {
			resetAddRepoState();
			openNotification("error", "Error", "Something went wrong");
		} else if (addRepoState === notificationState.success) {
			resetAddRepoState();
			//openNotification('success', 'Success', 'Successfully added the repository')
		}
	}, [addRepoState, resetAddRepoState]);
	const onClickAdd = () => {
		if (!userName || !repo) {
			openNotification("info", "Info", "All fields are required");
			return;
		}
		if (addRepoState !== notificationState.processing) {
			if (selectedJob?.jobId) {
				addRepo(selectedJob?.jobId, { userName, repo });
			}
		}
	};
	const spinner =
		addRepoState === notificationState.processing ? (
			<div className="galkLab_spinner"></div>
		) : (
			"Add"
		);
	return (
		<>
			<div className="galkLab_repo_container">
				<div className="galkLab_input_box">
					<div className="galkLab_repo_title">
						Please Add the github repository
					</div>
					<input
						value={userName}
						onChange={(e) => setUserName(e.target.value.trim())}
						placeholder="Enter Git hub user name"
					/>
					<input
						value={repo}
						onChange={(e) => setRepo(e.target.value.trim())}
						placeholder="Enter Git hub repository"
					/>
					<button onClick={onClickAdd}>{spinner} </button>
				</div>
			</div>
		</>
	);
}
const mapStateToProps = (state) => ({
	addRepoState: state.jobProgress.addRepoState,
});
export default connect(mapStateToProps, {
	addRepo,
	resetAddRepoState,
})(AddRepository);
