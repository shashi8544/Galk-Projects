import React, { useState, useEffect } from "react";
import { Region } from "../../common/layout/region";
import { database } from "../../../utils/configs/firebaseConfig";
import SendMailModal from "./sendMailModal";
import { Card, Avatar, Row, Col, Badge, Tooltip, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Meta } = Card;
const gridStyle = {
	width: "33.3%",
};

const UniversityList = () => {
	const [universityList, setUniversityList] = useState(null);
	const [universityListToMail, setUniversityListToMail] = useState([]);
	const [openSendEmailModal, setOpenSendEmailModal] = useState(false);

	useEffect(() => {
		database
			.collection("Universities")
			.get()
			.then((snapList) => {
				let universityList = [];
				snapList.forEach((doc) => universityList.push(doc.data()));
				setUniversityList(universityList);
			});
	}, []);

	const openSendEmailModalHandler = (e, universityName) => {
		e.preventDefault();
		setUniversityListToMail([universityName]);
		setOpenSendEmailModal(true);
	};

	const closeSendMailModal = () => {
		setOpenSendEmailModal(false);
	};

	return (
		<Region>
			<div style={{ height: "100%", overflowY: "auto" }}>
				<Card title="All Universities">
					<Row gutter={16}>
						{universityList &&
							universityList.map((uni, i) => (
								<Col span={8} key={i} style={{ marginBottom: 16 }}>
									<Badge.Ribbon
										text={`Estd: ${uni.established}`}
										color="#999999"
									>
										<Card
											hoverable={true}
											actions={[
												<a href={uni.website} target="_blank">
													Click to open website
												</a>,
												<Tooltip
													title={`Send mail to all students of ${uni.name}`}
													key={`${uni.name}_sendMail`}
												>
													<Button
														icon={<MailOutlined />}
														size="small"
														onClick={(e) =>
															openSendEmailModalHandler(e, uni.name)
														}
													>
														Send mail
													</Button>
												</Tooltip>,
											]}
										>
											<Meta
												avatar={<Avatar src={uni.logo} size={65} />}
												title={uni.name}
												description={uni.address}
											/>
										</Card>
									</Badge.Ribbon>
								</Col>
							))}
					</Row>
				</Card>
				{openSendEmailModal && (
					<SendMailModal
						toUniversityList={universityListToMail}
						modalCloseHandler={closeSendMailModal}
					/>
				)}
			</div>
		</Region>
	);
};

export default UniversityList;
