import React from "react";

const ChatRoomLanding = ({ userId, metaData }) => {
  const userDetails = metaData.find((stu) => stu.id === userId);

  return (
    <div className="chatRoomLaning-container">
      <img
        className="chatRoomLanding-profileImg"
        src={userDetails.img}
        alt={userDetails.name}
      />
      <div className="chatRoomLanding-profileName">{userDetails.name}</div>
      <div className="chatRoomLanding-collegeName">
        {userDetails.collegeName}
        {", "}
        {userDetails.branchName}
      </div>
      <div className="chatRoomLanding-notice-primary">
        You will only be able to chat with any company, once that has been
        initiated by them.
      </div>
      <div className="chatRoomLanding-notice-secondary">
        This chat system has no end to end encryption. Hence please do not share
        any confidential data. Also when required GALK Admin can monitor all
        messages.
      </div>
    </div>
  );
};

export default ChatRoomLanding;
