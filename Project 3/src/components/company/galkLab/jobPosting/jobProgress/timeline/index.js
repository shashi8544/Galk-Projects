import { Modal, Button, Avatar } from "antd";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import moment from "moment";
import Markdown from "markdown-to-jsx";
import { loadTimeline } from "../../../../../../actions/jobProgressActions";
import "./style.css";

function Timeline({ thisModalControl, loadTimeline, timeline }) {
	const handleOk = () => {
		thisModalControl.setIsOpen(false);
	};
	useEffect(() => {
		loadTimeline(thisModalControl.selectedIssue?.timeline_url);
	}, [thisModalControl]);
	const issue = thisModalControl.selectedIssue;
	const MyImg = ({ children, ...props }) => {
		console.log(props)
		return <img {...props} alt="img" />

	};
	const markDownOptions = {
		overrides: {
			img: {
				component: MyImg,
				props: {
					width: '100%',
					height: '500px',
				},
			},
		},
	}
	const timelineJsx = timeline?.map((issue) => {
		return (
			<div className="galkLab_timeline_msg_body_container" key={issue?.id}>
				<div className="galkLab_timeline_avatar">
					<Avatar src={issue?.user?.avatar_url} />
				</div>
				<div className="galkLab_timeline_content">
					<div className="galkLab_timeline_content_header">
						<div className="galkLab_timeline_speaker"></div>
						<span className="galkLab_timeline_login_user">
							{issue?.user?.login}
						</span>
						<span>
							&nbsp; &nbsp; commented{" "}
							{moment(new Date(issue?.created_at)).fromNow()}
						</span>
					</div>
					<div className="galkLab_timeline_content_body">
						<Markdown
							options={markDownOptions}
						>
							{issue?.body || ""}
						</Markdown>
					</div>
				</div>
			</div>
		);
	});
	return (
		<>
			<Modal
				title={thisModalControl.selectedIssue?.title}
				footer={[]}
				bodyStyle={{ height: window?.innerHeight - 150 || 700 }}
				width={1800}
				style={{ top: 20 }}
				visible={thisModalControl.isOpen}
				onCancel={handleOk}
			>
				<div className="galkLab_timeline_main_container">
					<div className="galkLab_timeline_left">
						<div className="galkLab_timeline_left_inner">
							<div className="galkLab_timeline_msg_body_container">
								<div className="galkLab_timeline_avatar">
									<Avatar
										src={thisModalControl.selectedIssue?.user?.avatar_url}
									/>
								</div>
								<div className="galkLab_timeline_content">
									<div className="galkLab_timeline_content_header">
										<div className="galkLab_timeline_speaker"></div>
										<span className="galkLab_timeline_login_user">
											{issue?.user?.login}
										</span>
										<span>
											&nbsp; &nbsp; commented{" "}
											{moment(new Date(issue?.created_at)).fromNow()}
										</span>
									</div>
									<div className="galkLab_timeline_content_body">
										<Markdown options={markDownOptions} >{issue?.body || ""}</Markdown>
									</div>
								</div>
							</div>
							{timeline ? timelineJsx : null}
						</div>
					</div>
					<div className="galkLab_timeline_right">
						<div className="galkLab_timeline_assign_heading">Assignees</div>
						{issue?.assignee ? (
							<div>
								<Avatar src={issue?.assignee?.avatar_url} />
								<span className="galkLab_timeline_assign_title">
									{issue?.assignee?.login}
								</span>
							</div>
						) : null}
					</div>
				</div>
			</Modal>
		</>
	);
}

const mapStateToProps = (state) => ({
	timelineLoading: state.jobProgress.timelineLoading,
	timeline: state.jobProgress.timeline,
});

export default connect(mapStateToProps, { loadTimeline })(Timeline);
