import React from "react";
import s from "./Status.module.css";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  onStatuschange = (e) => {
    let text = e.currentTarget.value;
    this.setState({
      status: text,
    });    
  };
  deactivateEditMode = () => {
    this.props.updateStatus(this.state.status);
    this.setState({
      editMode: false,
    });
  };
  componentDidUpdate(prevProps, prevState) {    
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }
  render() {
    return (
      <div className={s.status}>
        {!this.state.editMode ? (
          <span
            className={s.status__show}
            onClick={this.activateEditMode || "Change your status"}
          >
            {this.props.status}
          </span>
        ) : (
          <input
            className={s.status__edit}
            autoFocus
            onChange={this.onStatuschange}
            onBlur={this.deactivateEditMode}
            value={this.state.status}
          />
        )}
      </div>
    );
  }
}

export default ProfileStatus;
