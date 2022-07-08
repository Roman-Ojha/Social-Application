import GlobalApi from "../services/api/global";
import { ProfilePageDataState } from "../services/redux/pages/profile/profilePageData/types";
import { bindActionCreators } from "redux";
import { actionCreators, AppState } from "../services/redux";
import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../services/toast";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import constant from "../constant/constant";
import { AxiosError } from "axios";

type CallingFrom = "postBox" | undefined;
type ReturnFuncArgument = {
  userID: string;
  from?: CallingFrom;
};

const useRouteToProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMax850px = useMediaQuery({
    query: `(max-width:${constant.mediaQueryRes.screen850}px)`,
  });
  const userProfileDetailStore = useSelector(
    (state: AppState) => state.setUserProfileDetailReducer
  );

  const {
    profilePageDataAction,
    startProgressBar,
    stopProgressBar,
    openRightPartDrawer,
    setRootUserProfileDataState,
  } = bindActionCreators(actionCreators, dispatch);

  return async (obj: ReturnFuncArgument): Promise<void> => {
    try {
      startProgressBar();
      const res = await GlobalApi.getFriendData(obj.userID);
      const userData = await res.data;
      if (res.status === 200 && userData.success) {
        // success
        const userObj: ProfilePageDataState = {
          ...userData.searchedUser,
          isRootUserFollowed: userData.isRootUserFollowed,
          throughRouting: true,
        };
        profilePageDataAction(userObj);
        if (isMax850px) {
          openRightPartDrawer(false);
        }
        if (obj.from === "postBox") {
          if (obj.userID === userProfileDetailStore.userID) {
            setRootUserProfileDataState({
              fetchedRootUserProfileData: true,
              getRootUserProfileData: false,
            });
          }
        }
        history.push(`/u/profile/${obj.userID}/posts`);
      } else {
        // error
        toastError(userData.msg);
      }
      stopProgressBar();
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (err.response.data.success === false) {
          toastError(err.response.data.msg);
        }
      } else {
        toastError("Some Problem Occur, Please Try again later!!!");
      }
      stopProgressBar();
    }
  };
};

export default useRouteToProfilePage;
