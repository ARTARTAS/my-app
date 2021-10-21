import React from "react";
import { Field, reduxForm } from "redux-form";
import s from "./ProfileDataForm.module.css";
import { Input, Textarea } from "../../../Common/Formcontrols/FormControls";
import {
  maxLenghtCreator,
  required,
} from "../../../../Utils/Validators/Validators";
import style from "../../../Common/Formcontrols/FormControl.module.css";

let maxLength16 = maxLenghtCreator(16);

const ProfileDataForm = ({ profile, handleSubmit, setEditMode, error }) => {
  return (
    <form className={s.contacts}>
      <div className={s.edit_area}>
        <div className={s.field__arrea}>
          <b>Full name:</b>
          <div className={s.fullName}>
            <Field
              component={Input}
              name="fullName"
              placeholder="Full Name"
              validate={[required]}
            />
          </div>
        </div>
        <div className={s.field__arrea}>
          <b>About me: </b>
          <div className={s.aboutMe}>
            <Field
              component={Input}
              name="aboutMe"
              placeholder="About me"
              validate={[required]}
            />
          </div>
        </div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
        <div className={s.lfj}>
          <b>Looking for job</b>:
          <Field
            component={Input}
            type="checkbox"
            name="lookingForAJob"
            validate={[required]}
          />
        </div>
        <div>
          <b>My skills</b>:
          <Field
            className={s.lfjdescr}
            component={Textarea}
            name="lookingForAJobDescription"
            placeholder="My skills"
            validate={[required]}
          />
        </div>
        <div>
          {error && <div className={style.formSummaryError}>{error}</div>}
        </div>
      </div>

      <div className={s.controls}>
        <button className={s.editButtn} onClick={() => setEditMode(false)}>
          Cancel
        </button>

        <button className={s.editButtn} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({
  form: "ProfileData",
})(ProfileDataForm);

const Contact = ({ key, contactTitle, contactValue }) => {
  return (
    <div>
      <div className={s.contact} key={contactTitle}>
        <b>{contactTitle}</b>:
        <Field
          component={Input}
          name={`contacts.${contactTitle}`}
          validate={[]}
        />
      </div>
    </div>
  );
};

export default ProfileDataReduxForm;
