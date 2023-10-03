import { Modal, Button, Avatar, Spin } from "antd"
import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { PlusCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { assignMentorsInProject } from "../../../../actions/companyActions";
import StudentDetailsDialog from "../../../student/common/studentDetailsDialog";
function AssignMentors({ isModalOpen,
    setIsModalOpen,
    assignMentorsInProject,
    selectedJob,
    jobList,
    mentorAssignProcessing,
    mentorsList }) {
    const [studentDetailModal, setStudentDetailsMoal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [currentId, setCurrentId] = useState(null)
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
    const handleAdd = (mentorId) => {
        setCurrentId(mentorId)
        assignMentorsInProject(selectedJob.jobId, mentorId)
    }
    const isAssigned = (mentorId) => {
        if (!selectedJob.assignedMentors)
            selectedJob.assignedMentors = []
        const index = selectedJob.assignedMentors.indexOf(mentorId)
        if (index === -1)
            return false;
        return true;
    }
    const studenListjsx = mentorsList?.map((elm) => {
        return <div className="listContainer" key={elm.id}>
            <div className="avatar_container">
                <Avatar src={elm.img} />
            </div>
            <div className="student_details">
                <div className="student_name">
                    {elm.name}
                </div>
                <div className="student_college">
                    {elm.designation}
                </div>
            </div>
            <div className="student_control">
                <button
                    disabled={isAssigned(elm.id)}
                    onClick={() => handleAdd(elm.id)} >
                    {(mentorAssignProcessing && currentId === elm.id) ? <Spin /> : (isAssigned(elm.id) ? <CheckOutlined style={{ fontSize: 20 }} /> :
                        <PlusCircleOutlined style={{ fontSize: 20 }} />)}
                </button>
            </div>
        </div>
    })
    return <>
        <Modal
            title={'Assign Mentors'}
            footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                    Ok
                </Button>,
            ]}
            width={700}
            visible={isModalOpen}
            onCancel={handleOk}
        >
            <div className="modalContainer">
                {studenListjsx}

            </div>
        </Modal>

    </>
}

const mapStateToProps = (state) => ({
    mentorsList: mentors,
    jobList: state.company.galkJobListToShow, // to force update on vhange
    mentorAssignProcessing: state.company.galkLabMentorAssigneProcessing
});

export default connect(mapStateToProps, { assignMentorsInProject })(AssignMentors);

const mentors = [{
    id: 'YIYdBSrwdOTZNebwvjechrXCvSx1',
    name: 'Mentor One',
    img: 'https://i.pravatar.cc/150?img=3',
    designation: 'System Engineeor Speclist'
},
{
    id: '2',
    name: 'Mentor Two',
    img: 'https://i.pravatar.cc/150?img=4',
    designation: 'Software Engineeor Speclist'
}]