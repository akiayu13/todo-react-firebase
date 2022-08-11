import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
const googleProvider = new firebase.auth.GoogleAuthProvider();
const Login = () => {
  const history = useHistory();
  // const navigate = useNavigate();
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
      const result = await auth.signInWithEmailAndPassword(email, password);
      window.M.toast({
        html: `welcome ${result.user.email}`,
        classes: "green",
      });

      history.push("/");
    } catch (err) {
      window.M.toast({ html: err.message, classes: "green" });
    }
  };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signInWithPopup(googleProvider);
      console.log(res.user);
      window.M.toast({
        html: `welcome ${res.user.displayName}`,
        classes: "green",
      });

      history.push("/");
    } catch (error) {
      window.M.toast({ html: err.message, classes: "green" });
    }
  };
  return (
    <>
      <div className="center container" style={{ maxWidth: "500px" }}>
        <h3>Please Login!</h3>
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
          <button
            type="submit"
            className="btn blue light-blue darken-4 p-6 left h20"
          >
            Login
          </button>
          <div className="google-btn right" onClick={signInWithGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
