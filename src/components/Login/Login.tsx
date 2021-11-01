import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { maxLenghtCreator, required } from "../../Utils/Validators/Validators";
import { Input } from "../Common/Formcontrols/FormControls";
import s from "./Login.module.css";
import style from "./../Common/Formcontrols/FormControl.module.css";
import { AppStateType } from "../../redux/redux-store";

let maxLength16 = maxLenghtCreator(16);

type LoginformOwnProps = {
  captchaUrl: string | null
}

export const LoginForm: React.FC<InjectedFormProps<LoginformValuesType, LoginformOwnProps> & LoginformOwnProps> = ({ handleSubmit, captchaUrl, error }) => {
  return (
    <form className={s.login__form} onSubmit={handleSubmit}>
      <div>
        <Field
          className={s.login}
          component={Input}
          type="email"
          name="email"
          placeholder="Email"
          validate={[required]}
        />
      </div>
      <div>
        <Field
          className={s.password}
          component={Input}
          type="password"
          name="password"
          placeholder="Password"
          validate={[required, maxLength16]}
        />
      </div>
      <div>
        <Field component={"input"} type="checkbox" name="rememberMe" />
        Remember me
      </div>
      {captchaUrl && <div>
        <img src={captchaUrl} alt="captcha" />
        <Field
          className={s.captcha}
          component={Input}
          name="captcha"
          placeholder="captcha"
          validate={[required]}
        />
      </div>
      }
      {error && (<div className={style.formSummaryError}>{error}</div>)}
      <button className={s.button} onClick={handleSubmit} >Login</button>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginformValuesType, LoginformOwnProps>({ form: "Login" })(LoginForm);

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginformValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string 
}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginformValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile/"} />;
  }
  return (
    <div className={s.login__wrapper}>
      <h1 className={s.login__title}>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});
export default connect(mapStateToProps, { login })(Login);
