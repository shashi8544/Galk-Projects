import { Modal } from "antd";
import { connect } from "react-redux";
import {} from "@ant-design/icons";
import { useEffect, useState } from "react";
import MainView from "./mainView";
import AddRepository from "./addRepository";
import "./style.css";

function JobProgress({ thisModalControl, selectedJob, err, company }) {
	const [repository, setRepository] = useState(undefined);
	const handleOk = () => {
		thisModalControl.setIsOpen(false);
	};
	useEffect(() => {
		if (selectedJob?.repositoryUrl) {
			setRepository(selectedJob?.repositoryUrl);
		}
	}, [selectedJob?.repositoryUrl]);
	return (
		<>
			<Modal
				title={"Project Progress"}
				bodyStyle={{ height: window?.innerHeight - 150 || 700 }}
				width={1800}
				style={{ top: 20 }}
				visible={thisModalControl.isOpen}
				onCancel={handleOk}
			>
				<div className="jgalkLab_jobPosting_jobModalClass">
					{repository && !err && <MainView repository={repository} />}
					{(!repository || err) && (
						<AddRepository
							setRepository={setRepository}
							selectedJob={selectedJob}
						/>
					)}
				</div>
			</Modal>
		</>
	);
}

const mapStateToProps = (state) => ({
	err: state.jobProgress.err,
	company: state.company.companyToShow,
});

export default connect(mapStateToProps, {})(JobProgress);
