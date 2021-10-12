import React from "react";

const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <input type="email" />
        </div>
        <div>
          <input type="password"/>{" "}
        </div>
        <div>
            <input type="checkbox" />
        </div>
        <input type="button" value="" />
      </form>
    </div>
  );
};

export default Login;
