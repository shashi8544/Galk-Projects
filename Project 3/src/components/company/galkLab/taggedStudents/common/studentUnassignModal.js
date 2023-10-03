import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const StudentUnAssignModal = ({ isModalVisible,
    removeTagForGalkLabStudent,
    setIsModalVisible, student }) => {
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleYes = () => {
        setIsModalVisible(false);
        removeTagForGalkLabStudent(student?.id)
    };

    const handleNo = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal
                footer={[
                    <Button key="yes" type="primary" onClick={handleYes}>
                        Yes
                    </Button>,
                    <Button key="no" type="ghost" onClick={handleNo}>
                        No
                    </Button>,
                ]}
                onOk={handleYes} onCancel={handleNo}
                title={`Removing ${student.name}`} visible={isModalVisible} >
                <p>Are you sure to remove this tag, This operation can not be undone and this will also remove this student from all ongoing projects where he is working....</p>

            </Modal>
        </>
    );
};

export default StudentUnAssignModal;