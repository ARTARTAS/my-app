import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { login } from "../../redux/auth-reducer";
import { maxLenghtCreator, required } from "../../Utils/Validators/Validators";
import { Input } from "../Common/Formcontrols/FormControls";
import s from "./Login.module.css";
import style from "./../Common/Formcontrols/FormControl.module.css";

let maxLength16 = maxLenghtCreator(16);

export const LoginForm = (props) => {
  return (
    <form className={s.login__form} onSubmit={props.handleSubmit}>
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
      {props.captchaUrl && <div>
        <img src={props.captchaUrl} alt="captcha" />
        <Field
          className={s.captcha}
          component={Input}          
          name="captcha"
          placeholder="captcha"
          validate={[required]}
        />
        </div>
        
        }
        
      {props.error && (
        <div className={style.formSummaryError}>{props.error}</div>
      )}
      <button onClick={props.handleSubmit} className={s.button}>
        Login
      </button>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "Login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
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
let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});
export default connect(mapStateToProps, { login })(Login);
