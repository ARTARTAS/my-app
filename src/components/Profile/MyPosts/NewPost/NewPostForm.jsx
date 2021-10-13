import React from "react";
import { Field, reduxForm } from "redux-form";
import s from "./NewPostForm.module.css";

const NewPostForm = (props) => {
  return (
    <div className={s.NewPost__block}>
      <form onSubmit={props.handleSubmit}>
        <h3>New post</h3>
        <Field
          component="textarea"          
          name="newPostText"
          className={s.newPost}
          placeholder="Enter your message"
        />
        <button className={s.button}>Add post</button>
      </form>
    </div>
  );
};

const NewPostReduxForm = reduxForm({
  form: "profileNewPost",
})(NewPostForm);

export default NewPostReduxForm;
