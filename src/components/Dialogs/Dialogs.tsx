import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLenghtCreator, required } from "../../Utils/Validators/Validators";
import { Textarea } from "../Common/Formcontrols/FormControls";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import { InitialStateType } from "../../redux/dialogs-reducer"

let maxLength40 = maxLenghtCreator(40);

type MapPropsType = {
  messagesPage: InitialStateType

}
type MapDispatchPropsType = {
  sendMessage: (newMessageText: string) => void
}

const Dialogs: React.FC<MapPropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: AddMessageFormValuesType) => props.sendMessage(formData.newMessageText)
  let dialogsElement = props.messagesPage.dialogData.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));

  let messagesElement = props.messagesPage.messagesData.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogs__Items}>{dialogsElement}</div>
      <div className={s.messages}>
        <div className={s.Message_Area}>{messagesElement}</div>
        <div className={s.New_Message_Area}>
          <AddMessageReduxForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

type AddMessageFormPropsType = {
  onSubmit: (formData: AddMessageFormValuesType) => void
}
type AddMessageFormValuesType = {
  newMessageText: string
}
export const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValuesType, AddMessageFormPropsType> & AddMessageFormPropsType> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        className={s.textarea}
        name="newMessageText"
        component={Textarea}
        placeholder="Enter your message"
        validate={[required, maxLength40]}
      ></Field>
      <div>
        <button className={s.send_button}>Send Message</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm<AddMessageFormValuesType, AddMessageFormPropsType>({
  form: "dialogAddMessageForm",
})(AddMessageForm);

export default Dialogs;
