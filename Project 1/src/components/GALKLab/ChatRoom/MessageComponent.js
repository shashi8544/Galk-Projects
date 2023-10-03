import React, { useEffect } from "react";
import moment from "moment";
import { getName } from "./helperFunction";
import ChatRoomLanding from "./ChatRoomLanding";
import { clearChatRoomData } from "../../../actions/chatActions";
import { connect } from "react-redux";
import { Image } from "antd";
import { fallBackImage } from "./helperFunction";

const renderMsgBasedOnType = (msg) => {
  if (msg.msgType) {
    switch (msg.msgType) {
      case "image":
        return (
          <Image
            className="chatRoom-msgImage"
            width={150}
            height={140}
            src={msg.message}
            fallback={fallBackImage}
          />
        );
      case "video":
        return <video width="250" height="160" controls src={msg.message} />;
      case "document":
        return (
          <a
            href={msg.message}
            target="_blank"
            rel="noreferrer noopener"
            download={msg.fileName}
          >
            {msg.fileName || "Click to see the file"}
          </a>
        );
      case "system":
        return <span className="chatRoom-systemMsg-msg">{msg.message}</span>;
      default:
        return <span>{msg.message}</span>;
    }
  } else {
    return <span>{msg.message}</span>;
  }
};

const renderMsgHeader = (
  msg,
  loggedInUserId,
  companyMetaData,
  studentMetaData
) => {
  if (msg.sender === "system") {
    return <div style={{ paddingTop: 20 }}></div>;
  }
  if (msg.sender === loggedInUserId) {
    return (
      <div className="msg-title-container">
        <div className="msg-title-own">You</div>
        <div className="msg-own-date">
          ~ {moment(msg.timeStamp.toDate()).fromNow()}
        </div>
      </div>
    );
  }

  return (
    <div className="msg-title-container">
      <div className="msg-title">
        {getName(msg.sender, [...companyMetaData, ...studentMetaData])}
      </div>
      <div className="msg-date">
        ~ {moment(msg.timeStamp.toDate()).fromNow()}
      </div>
    </div>
  );
};

const getSentMsgClassName = (senderId, loggedInUserId) => {
  if (senderId === "system") {
    return "messageList-sentBySystem";
  }

  if (senderId === loggedInUserId) {
    return "messageList-sentByMe";
  }

  return "messageList-notSentByMe";
};

const MessageComponent = ({
  messageList,
  companyMetaData,
  studentMetaData,
  userId,
  clearChatRoomData,
}) => {
  useEffect(() => {
    return () => {
      clearChatRoomData();
    };
  }, []);

  return (
    <React.Fragment>
      {messageList ? (
        messageList.map((msg, i) => (
          <div key={i} className={getSentMsgClassName(msg.sender, userId)}>
            {renderMsgHeader(msg, userId, companyMetaData, studentMetaData)}
            {renderMsgBasedOnType(msg)}
          </div>
        ))
      ) : (
        <ChatRoomLanding userId={userId} metaData={studentMetaData} />
      )}
    </React.Fragment>
  );
};

// export default MessageComponent;
export default connect(null, {
  clearChatRoomData,
})(MessageComponent);
