import React from "react";
import s from "./Status.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
  };
  render() {
    return (
      <div className={s.aboutMe}>
        {!this.state.editMode ? (
          <div>
            <div className={s.aboutMe__show} onClick={this.activateEditMode}>
              {this.props.status}
            </div>
          </div>
        ) : (
          <div>
            <input
              className={s.aboutMe__edit}
              autoFocus
              onBlur={this.deactivateEditMode}
              value={this.props.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
