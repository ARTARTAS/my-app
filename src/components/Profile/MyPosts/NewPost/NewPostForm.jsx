import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLenghtCreator, required } from "../../../../Utils/Validators/Validators";
import { Textarea } from "../../../Common/Formcontrols/FormControls";
import s from "./NewPostForm.module.css";

let maxLength20 = maxLenghtCreator(20);

const NewPostForm = (props) => {
  return (
    <div className={s.NewPost__block}>
      <form onSubmit={props.handleSubmit}>
        <h3>New post</h3>
        <Field
          component={Textarea}          
          name="newPostText"
          className={s.newPost}
          placeholder="Enter your message"
          validate = {[required, maxLength20]}
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
