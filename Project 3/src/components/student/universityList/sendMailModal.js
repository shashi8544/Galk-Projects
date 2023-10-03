import React, { useState, useEffect } from "react";
import { collegeNames } from "../../../utils/constants";
import { database } from "../../../utils/configs/firebaseConfig";
import { Form, Button, Divider, Input, Select, Modal, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { testPromise } from "../../../utils/functions/httpServices";

const { TextArea } = Input;
const { Option } = Select;

const SendMailModal = ({ toUniversityList, modalCloseHandler }) => {
	const [form] = Form.useForm();

	const [isSendingMail, setIsSendingMail] = useState(false);
	const [totalMailToSent, setTotalMailToSent] = useState(null);
	var [mailSentSuccess, setMailSentSuccess] = useState(0);
	const [progressMsg, setProgressMsg] = useState(null);
	const [errMsg, setErrMsg] = useState([]);
	const [success, setSuccess] = useState(null);
	const [failure, setFailure] = useState(null);

	useEffect(() => {
		if (success) {
			setMailSentSuccess(mailSentSuccess + 1);
		}
	}, [success]);

	useEffect(() => {
		if (failure) {
			let errList = [...errMsg];
			errList.push(failure);
			setErrMsg(errList);
		}
	}, [failure]);

	useEffect(() => {
		return () => {
			form.resetFields();
			setTotalMailToSent(null);
			setMailSentSuccess(0);
			setProgressMsg(null);
			setErrMsg([]);
		};
	}, []);

	const sendMail = (formValues) => {
		setIsSendingMail(true);
		var msgToSent = formValues.message;
		var recepientUniversities = [...formValues.toUniversityList];
		var recepientStudentList = [];
		var promises = [];

		recepientUniversities.forEach((uni) => {
			promises.push(
				database
					.collection("StudentProfile")
					.where("collegeName", "==", uni)
					.get()
					.then((snapList) => {
						let toEmailList = [];
						snapList.forEach((doc) => {
							toEmailList.push(doc.data().email);
						});

						return toEmailList;
					})
			);
		});

		Promise.all(promises)
			.then((listOfEmailArr) => {
				let recipientList = [];
				listOfEmailArr.forEach((arrList) => {
					recipientList = [...recipientList, ...arrList];
				});
				recipientList = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
				setTotalMailToSent(recipientList.length);
				// setProgressMsg(
				// 	`${mailSentSuccess} out of ${recipientList.length} mails sent...`
				// );
				// console.log("FINAL TO:", recipientList);
				for (let i = 0; i < recipientList.length; i++) {
					setTimeout(() => {
						testPromise(recipientList[i])
							.then((res) => {
								console.log("RES SUCCESS:", res);
								setSuccess(res);
							})
							.catch((err) => {
								console.log("RES ERR:", err);
								setFailure(err);
							});

						// setMailSentSuccess(mailSentSuccess + i + 1);
						// if (i === recipientList.length - 1) {
						// 	setTotalMailToSent(null);
						// 	setIsSendingMail(false);
						// 	modalCloseHandler();
						// }
					}, 3000 + 3000 * i);
				}
			})
			.catch((err) => {
				setIsSendingMail(false);
			});
	};

	return (
		<Modal
			title="Send bulk emails to universities."
			visible={true}
			onCancel={modalCloseHandler}
			footer={null}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					toUniversityList: [...toUniversityList],
					message: "",
				}}
				onFinish={sendMail}
			>
				<Form.Item
					name="toUniversityList"
					label="To:"
					rules={[
						{
							type: "array",
							required: true,
							message: "Please select atleast one university from list!",
						},
					]}
					extra="Select university name to send mail to all of its students registered with GALK."
				>
					<Select mode="tags" placeholder="Please select university names..">
						{collegeNames &&
							collegeNames.map((university, i) => (
								<Option key={i} value={university}>
									{university}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Email body:"
					name="message"
					// extra="This describes the purpose of this mail."
					rules={[{ required: true, message: "Please enter email body!" }]}
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 5 }}
						placeholder="Email body.."
					/>
				</Form.Item>
				<Divider />
				<Form.Item style={{ marginTop: 20 }}>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={isSendingMail}
						disabled
					>
						Send mail
					</Button>
				</Form.Item>
			</Form>
			{totalMailToSent && (
				<Alert
					message={`${mailSentSuccess} out of ${totalMailToSent} mails sent successfully...`}
					type="info"
					icon={<LoadingOutlined />}
					showIcon
				/>
			)}
			{errMsg.length > 0 &&
				errMsg.map((err, i) => (
					<Alert message={err} key={i} type="error" showIcon />
				))}
		</Modal>
	);
};

export default SendMailModal;
