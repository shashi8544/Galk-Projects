import { Divider, List, Avatar } from "antd";
import React from "react";

const ChatRoomInformation = ({
  companyMetaData,
  studentMetaData,
  selectedChatCreatorId,
  selectedChatStudentId,
  selectedChatType,
}) => {
  const companyDetails = companyMetaData.find(
    (company) => company.id === selectedChatCreatorId
  );

  let studentGroupList = null;
  if (selectedChatType === "group") {
    studentGroupList = studentMetaData.filter((stu) =>
      selectedChatStudentId.find((stuChat) => {
        if (stuChat === stu.id) return true;
        return false;
      })
    );
  }

  return (
    <div className="chatRoomInformation-container">
      {selectedChatType === "individual" && companyDetails && (
        <React.Fragment>
          <img
            className="chatRoomInformation-profileImg"
            src={companyDetails.logo}
            alt={companyDetails.name}
          />
          <div className="chatRoomInformation-profileName">
            {companyDetails.nameInEnglish || companyDetails.name}
          </div>
          <div className="chatRoomInformation-collegeName">
            {companyDetails.industry}
          </div>
          <Divider />
        </React.Fragment>
      )}
      {selectedChatType === "group" && companyDetails && studentGroupList && (
        <React.Fragment>
          <span style={{ marginBottom: 5 }}>Creator:</span>
          <img
            className="chatRoomInformation-profileImg"
            src={companyDetails.logo}
            alt={companyDetails.name}
          />
          <div className="chatRoomInformation-profileName">
            {companyDetails.nameInEnglish || companyDetails.name}
          </div>
          <div className="chatRoomInformation-collegeName">
            {companyDetails.industry}
          </div>
          <Divider />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <span style={{ marginBottom: 5 }}>Members:</span>
            <List
              style={{ width: "100%" }}
              size="small"
              itemLayout="horizontal"
              dataSource={studentGroupList}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.img} />}
                    title={item.name}
                    description={
                      <span>
                        {item.collegeName}
                        <br />
                        {item.branchName}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ChatRoomInformation;
