import { async } from "@firebase/util";

import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      window.M.toast({
        html: `welcome ${result.user.email}`,
        classes: "green",
      });

      history.push("/");
    } catch (err) {
      window.M.toast({ html: err.message, classes: "green" });
    }
  };
  return (
    <>
      <div className="center container" style={{ maxWidth: "500px" }}>
        <h3>Please SignUp!</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="email"
              onChange={emailChangeHandler}
              placeholder="email"
              value={email}
            />
            <input
              type="password"
              onChange={passwordChangeHandler}
              placeholder="password"
              value={password}
            />
          </div>
          <button type="submit" className="btn light-blue darken-4 left">
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
