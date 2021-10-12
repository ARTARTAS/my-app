import React from "react";
import { Field, reduxForm } from "redux-form";
import s from "./Login.module.css";

export const LoginForm = (props) => {
  return (
    <form className={s.login__form} onSubmit={props.handleSubmit}>
      <div>
        <Field
          className={s.login}
          component={"input"}
          type="email"
          name="login"
          placeholder="Email"
        />
      </div>
      <div>
        <Field
          className={s.password}
          component={"input"}
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div>
        <Field component={"input"} type="checkbox" name="rememberMe" />
        Remember me
      </div>
      <button className={s.button}>Login</button>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "Login",
})(LoginForm);

const Login = (props) => {
  return (
    <div className={s.login__wrapper}>
      <h1 className={s.login__title}>Login</h1>
      <LoginReduxForm  />
    </div>
  );
};

export default Login;
