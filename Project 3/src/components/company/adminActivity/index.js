import { useEffect, useState } from "react";
import { NOTIFICATION_STATES as notificationState } from '../../../actions/types'
import { Button, notification, Spin } from 'antd';
import { connect } from "react-redux";
import { sendNotification, resetNotificationiState } from '../../../actions/adminActivityActions'
//style = {{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'red' }}
import './index.css'
const AdminActivity =
    ({ companyId,
        sendNotification,
        resetNotificationiState,
        activityData
    }) => {
        const [title, setTitle] = useState('')
        const [text, setText] = useState('')
        const spinner = activityData.state === notificationState.processing ? <Spin size="default" />
            : 'Send'
        const openNotification = (type = 'success', title, content) => {
            notification[type]({
                message: title,
                description: content,
                onClick: () => { },
            });
        };
        const onClickSend = () => {
            if (!title || !text) {
                openNotification('info', 'Info', 'All fields are required')
                return;
            }
            if (activityData.state !== notificationState.processing) {
                if (companyId) {
                    sendNotification(companyId, { title, text })
                }
            }
        }
        useEffect(() => {
            if (activityData.state === notificationState.failed) {
                resetNotificationiState()
                openNotification('error', 'Error', 'Notification did not sent something went wrong')
            }
            else if (activityData.state === notificationState.success) {
                resetNotificationiState()
                openNotification('success', 'Success', 'Successfully sent the notification')
                setText('')
                setTitle('')
            }
        }, [activityData, resetNotificationiState])
        return <>
            <div id="containerAdminActivity">
                <div id="boxAdminActivity">
                    <div id="headingAdminActivity">
                        <span>Send Notification</span>
                    </div>
                    <div id="titleAdminActivity">
                        <input value={title}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Subject" />
                    </div>
                    <div id="textAreatAdminActivity">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Message"
                        />
                    </div>
                    <div id="buttonAcminAcitvity">
                        <button onClick={() => onClickSend()} >{spinner}</button>
                    </div>
                </div>
            </div>
        </>
    }

const mapStateToProps = (state) => ({
    companyId: state.company.companyToShow?.id,
    activityData: state.adminActivity
});
const mapDispatchToProps = {
    sendNotification,
    resetNotificationiState
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminActivity)