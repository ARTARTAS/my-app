import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import s from "./ProfileDataForm.module.css";
import { Input, Textarea } from "../../../Common/Formcontrols/FormControls";
import { required } from "../../../../Utils/Validators/Validators";
import style from "../../../Common/Formcontrols/FormControl.module.css";
import { ContactsType, ProfileType } from "../../../../redux/profile-reducer";

type ProfileDataformOwnProps = {
  setEditMode: (editMode: boolean) => void
  profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataformValuesType, ProfileDataformOwnProps> & ProfileDataformOwnProps> = ({ profile, handleSubmit, setEditMode, error }) => {
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
              contactTitle={key} />
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

const ProfileDataReduxForm = reduxForm<ProfileDataformValuesType, ProfileDataformOwnProps>({
  form: "ProfileData",
})(ProfileDataForm);

type ProfileDataformValuesType = {
  aboutMe: string;
  contacts: ContactsType;
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;    
}

type ContactPropsType = {
  contactTitle: React.Key
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle }) => {
  return (
    <div>
      <div className={s.contact} key={contactTitle}>
        <b>{contactTitle}</b>:
        <Field
          component={Input}
          placeholder={contactTitle}
          name={`contacts.${contactTitle}`}
          validate={[]}
        />
      </div>
    </div>
  );
};



export default ProfileDataReduxForm;
