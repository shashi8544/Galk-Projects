import { connect } from "react-redux";
import React, { useEffect } from "react";
import {
	Card,
	Typography,
	Row,
	Col,
	Layout,
	Progress,
	Button,
	Modal,
} from "antd";
import {
	VerticalAlignTopOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
	publishCandidateProfile,
	resetDataSavingState,
} from "../../../../actions/candidateActions";
import { dataSavingState } from "../../../../actions/types";

const { Title } = Typography;
const { Footer, Content } = Layout;

const ButtonGroup = Button.Group;

const { confirm } = Modal;

const PublishProfile = ({
	publishCandidateProfile,
	resetDataSavingState,
	isSaving,
}) => {
	const publishStudentProfile = () => {
		confirm({
			title: "Are you sure want to publish your profile ?",
			icon: <ExclamationCircleOutlined />,
			content: "Once published, it can not be reverted back.",
			onOk() {
				publishCandidateProfile();
			},
			onCancel() {},
		});
	};
	useEffect(() => {
		if (isSaving === dataSavingState.SAVED) {
			resetDataSavingState();
		}
	}, [isSaving, resetDataSavingState]);
	return (
		<Card
			style={{ minHeight: 500 }}
			title={
				<Title level={4} style={{ marginBottom: 0, textAlign: "center" }}>
					Profile Completed !
				</Title>
			}
		>
			<Row className="Forms">
				<Col span={24}>
					<ButtonGroup style={{ width: "100%", marginBottom: 15 }}>
						<Button
							loading={isSaving === dataSavingState.SAVING}
							style={{ width: "100%" }}
							type="primary"
							onClick={() => publishStudentProfile()}
						>
							Publish
							<VerticalAlignTopOutlined />
						</Button>
					</ButtonGroup>
				</Col>
				<Col span={24}>
					<Layout style={{ margin: "0" }}>
						<Content className="contentClass">
							<Progress type="circle" percent={100} />
						</Content>
						<Footer className="contentClass">
							<Title level={3} style={{ marginBottom: 0 }}>
								You' re all set !
							</Title>
							<p>
								Thanks for registering on GALK. We are working on bringing the
								best for you to be able to get an internship in Japan. We will
								contact you soon with further steps. Again thanks for your
								coopration.
								<br />
								If you have any queries, please contact <br />
								<big>
									<b>"galk_support@willings.co.jp"</b>
								</big>
							</p>
							<Title level={3} style={{ marginBottom: 0 }}>
								- Click on 'Publish' to make your profile live -
							</Title>
						</Footer>
					</Layout>
				</Col>
			</Row>
		</Card>
	);
};
const mapStateToProps = (state) => ({
	isLoading: state.profile.isLoading,
	isSaving: state.profile.isSaving,
	user: state.user.user,
});
export default connect(mapStateToProps, {
	publishCandidateProfile,
	resetDataSavingState,
})(PublishProfile);
