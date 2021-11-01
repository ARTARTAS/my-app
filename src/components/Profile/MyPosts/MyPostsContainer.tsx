import { connect } from "react-redux";
import { actions } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import MyPosts from "./MyPosts";

let mapStateToProps = (state:AppStateType) => {
  return {
    PostData: state.profilePage.PostData,
    newPostText: state.profilePage.newPostText,
  };
};

const MyPostsContainer = connect(mapStateToProps, {...actions})(MyPosts);
export default MyPostsContainer;
