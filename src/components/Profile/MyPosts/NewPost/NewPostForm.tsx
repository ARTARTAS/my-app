import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLenghtCreator, required } from "../../../../Utils/Validators/Validators";
import { Textarea } from "../../../Common/Formcontrols/FormControls";
import s from "./NewPostForm.module.css";

let maxLength20 = maxLenghtCreator(20);

type PropsType = {
  
}
export type NewPostFormValuesType = {
  newPostText: string
}

const NewPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <div className={s.NewPost__block}>
      <form onSubmit={props.handleSubmit}>
        <Field
          component={Textarea}
          name="newPostText"
          className={s.newPost}
          placeholder="Enter your message"
          validate={[required, maxLength20]}
        />
        <button className={s.button}>Add post</button>
      </form>
    </div>
  );
};

const NewPostReduxForm = reduxForm<NewPostFormValuesType, PropsType>({
  form: "profileNewPost",
})(NewPostForm);

export default NewPostReduxForm;
