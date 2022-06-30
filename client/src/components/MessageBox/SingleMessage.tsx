import React from "react";
import { useSelector } from "react-redux";
import User_Profile_Icon from "../../assets/svg/User_profile_Icon.svg";
import { AppState } from "../../services/redux";

const SingleMessage = (props): JSX.Element => {
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );

  return (
    <>
      <div
        className="MessageBox_Inner_SingleMessage_Container"
        // styling the position of the message box according the user
        style={
          props.MessageInfo.senderId === userProfileDetailStore.id
            ? {
                left: "31%",
              }
            : {}
        }
      >
        {props.MessageInfo.senderId === userProfileDetailStore.id ? (
          ""
        ) : (
          <img src={props.picture ? props.picture : User_Profile_Icon} alt="" />
        )}
        <div
          className="MessageBox_Inner_SingleMessage"
          // styling the position of the message box according the user
          style={
            props.MessageInfo.senderId === userProfileDetailStore.id
              ? {
                  backgroundColor: "var(--primary-color-point-7)",
                }
              : {}
          }
        >
          <p
            style={
              props.MessageInfo.senderId === userProfileDetailStore.id
                ? {
                    color: "white",
                  }
                : {}
            }
          >
            {props.MessageInfo.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleMessage;
