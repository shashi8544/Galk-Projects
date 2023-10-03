import React from "react";
import { Redirect } from "react-router-dom";
import ProfileProgressContainer from "../profileFillProgress/ProfileProgressContainer";
import { connect } from "react-redux";
import Loading from "../common/ApplicationLoading";
import { Row, Col } from "antd";
import Login from "../auth/login";

const MyProfile = (props) => {
  const { isUserAuthenticated, isAppLoading, user } = props;
  console.log("HI check props")
  console.log(props);
  const { isEmpty, isLoaded } = user;
  console.log(user.profileCompletionStatus);
  console.log(user.isEmpty);
  console.log(user.isLoaded);

  if (!isUserAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Row style={{backgroundColor: 'white'}}>
      <Col span={24}>
        {
          isAppLoading || !isLoaded ? (
            <div style={{ marginTop: 40 }}>
              <Loading />
            </div>
          ) : (
            <React.Fragment>
              {!isEmpty && isLoaded && (
                <React.Fragment>
                  {/* {user.profileCompletionStatus ? (
                    <div className="profile-grid-candidate">
                      <IntroVideo userProfile={user} />
                      <ProfileBadge userProfile={user} />
                      <ProfileBio userProfile={user} />
                      <EarnedStars />
                      <SelfDeclaration />
                      <ExperienceContainer userProfile={user} />
                    </div>
                  ) : ( */}
                    <ProfileProgressContainer userProfile={user} />
                  {/* )} */}
                </React.Fragment>
              )}
            </React.Fragment>
          )
        }
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  user: state.firebase.profile,
  isUserAuthenticated: state.firebase.auth.uid ? true : false,
  isAppLoading: state.app.isLoading,
});

export default connect(mapStateToProps, {})(MyProfile);
