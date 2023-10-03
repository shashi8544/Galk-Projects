import { Modal } from "antd";
import { connect } from "react-redux";
import { } from "@ant-design/icons";
import { useEffect, useState } from "react";

import "./index.css";
import SelectedStudents from "./selectedStudents";
import Calendar from "./Calendar";
import EmptyCalendar from "./Calendar/emptyCalendar";
import EmptyStudents from "./selectedStudents/emptyStudents";

function AttendanceModule({ thisModalControl, selectedJob, userid }) {

    const handleOk = () => {
        thisModalControl.setIsOpen(false);
    };

    return (
        <>
            <Modal
                title={"Attendance"}
                bodyStyle={{ height: window?.innerHeight - 160 || 700 }}
                width={1200}
                style={{ top: 20 }}
                visible={thisModalControl.isOpen}
                onOk={handleOk}
                onCancel={handleOk}
            >
                <div className="attendance-system-main-container">

                    <div className="attendance-system-student-attendance">
                        <Calendar
                            userid={userid}
                            selectedJob={selectedJob} />

                    </div>
                </div>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    userid: state.firebase.auth.uid,

});

export default connect(mapStateToProps, {})(AttendanceModule);
