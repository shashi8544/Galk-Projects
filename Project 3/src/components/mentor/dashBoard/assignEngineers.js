import { Modal, Button, Avatar } from "antd"
import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { PlusCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { assignEngineeorInProject, unAssignEngineeorFromProject } from '../../../actions/mentorAction';
import StudentDetailsDialog from "../../student/common/studentDetailsDialog";
import './assignEngineers.css'
function AssignEngineers({ isModalOpen,
    setIsModalOpen,
    assignEngineeorInProject,
    unAssignEngineeorFromProject, assignProcessing,
    selectedJob, jobList, company,
    studentList }) {
    const [studentDetailModal, setStudentDetailsMoal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleView = (student) => {
        setStudentDetailsMoal(true)
        setSelectedStudent(student)
    }
    const closeStudentDetailsHandler = () => {
        setStudentDetailsMoal(false)
    }
    const handleAdd = (studentId) => {
        setSelectedStudent(studentId)
        if (isAssigned(studentId))
            unAssignEngineeorFromProject(selectedJob.jobId, studentId, company.name, company.id)
        else
            assignEngineeorInProject(selectedJob.jobId, studentId, company.name, company.id)
    }
    const isAssigned = (studentId) => {
        const index = selectedJob.candidateAssignedList.indexOf(studentId)
        if (index === -1)
            return false;
        return true;
    }
    const studenListjsx = studentList?.map((elm) => {
        return <div className="mentor_assignEngineeors_listContainer" key={elm.id}>
            <div className="mentor_assignEngineeors_avatar_container">
                <Avatar src={elm.img} />
            </div>
            <div className="mentor_assignEngineeors_student_details">
                <div className="mentor_assignEngineeors_student_name">
                    {elm.name}
                </div>
                <div className="mentor_assignEngineeors_student_college">
                    {elm.collegeName} , &nbsp;{elm.branchName}
                </div>
            </div>
            <div className="mentor_assignEngineeors_student_control">
                <button
                    // disabled={isAssigned(elm.id)}
                    onClick={() => handleAdd(elm.id)} >
                    {assignProcessing && selectedStudent === elm.id ?
                        <div className="mentor_assignEngineeors_loader"></div> :
                        (isAssigned(elm.id) ? <CheckOutlined style={{ fontSize: 20 }} /> :
                            <PlusCircleOutlined style={{ fontSize: 20 }} />)
                    }
                </button>
                <button onClick={() => handleView(elm)}>View</button>
            </div>
        </div>
    })
    return <>
        <Modal
            title={'Assign Engineers'}
            footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                    Ok
                </Button>,
            ]}
            width={700}
            visible={isModalOpen}
            onCancel={handleOk}
        >
            <div className="mentor_assignEngineeors_modalContainer">
                {studenListjsx}

            </div>
        </Modal>
        {studentDetailModal &&
            <StudentDetailsDialog
                onCloseHandler={closeStudentDetailsHandler}
                studentDetails={selectedStudent}
            //isLoading={isLoading}
            />}
    </>
}

const mapStateToProps = (state) => ({
    studentList: state.mentor.studentList,
    studentLoading: state.mentor.studentLoading,
    jobList: state.company.galkJobListToShow,
    assignProcessing: state.mentor.assignProcessing
});

export default connect(mapStateToProps, {
    assignEngineeorInProject,
    unAssignEngineeorFromProject
})(AssignEngineers);