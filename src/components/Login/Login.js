import React, { useState, useReducer, useEffect, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

// function emailReducer(state, action){
//   console.log(action)
//   if(action.type === 'EMAIL_INPUT'){
//     return {value: action.val, isValid: action.val.includes('@') }
//   }
//   if(action.type === 'INPUT_BLUR'){
//     return {value: state.value, isValid: state.value.includes('@')}
//   }
// }

// function passReducer(state, action){

//   if(action.type === 'INPUT_PASS'){
//     return {value: action.val, isValid: action.val.trim().length > 6}
//   }
//   if(action.type === 'PASS_BLUR'){
//     return {value: state.value, isValid: state.value.trim().length > 6}
//   }
//   return {value: '', isValid: false}
// }

const initialState = {
  enteredEmail: "",
  emailIsValid: undefined,
  enteredPassword: "",
  passwordIsValid: undefined,
  formIsValid: false,
};

function reducer(state, action) {
  if (action.type === "EMAIL") {
    return {
      ...state,
      enteredEmail: action.val,
      emailIsValid: action.val.includes("@"),
    };
  }
  if (action.type === "PASS") {
    return {
      ...state,
      enteredPassword: action.val,
      passwordIsValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "EMAIL_BLUR") {
    return { ...state, emailIsValid: state.enteredEmail.includes("@") };
  }
  if (action.type === "PASS_BLUR") {
    return {
      ...state,
      passwordIsValid: state.enteredPassword.trim().length > 6,
    };
  }
  if (action.type === "FORM_VALID") {
    return {
      ...state,
      formIsValid:
        state.enteredEmail.includes("@") &&
        state.enteredPassword.trim().length > 6,
    };
  }
  return initialState;
}

const Login = (props) => {
  const ctx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [enteredCollage, setEnteredCollage] = useState("");
  // const [formIsValid, setFormIsValid] = useState(false);

  // const [emailState, dispatchEmailState] = useReducer(emailReducer, {value: '', isValid: undefined})
  // const [passState, dispatchPass] = useReducer(passReducer, {value: '', isValid : undefined})

  const [currState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("validating");
      dispatch({ type: "FORM_VALID" });
    }, 500);

    return () => {
      clearTimeout(timer);
      console.log("CleanUp");
    };
  }, [currState.emailIsValid, currState.passwordIsValid]);

  const emailChangeHandler = (event) => {
    // dispatchEmailState({type: 'EMAIL_INPUT', val: event.target.value})
    dispatch({
      type: "EMAIL",
      val: event.target.value,
    });

    // setEnteredEmail(event.target.value);
    // setFormIsValid(
    //         emailState.isValid && passState.isValid
    //       );
  };

  const passwordChangeHandler = (event) => {
    dispatch({
      type: "PASS",
      val: event.target.value,
    });
    // dispatchPass({type: 'INPUT_PASS', val: event.target.value})
    // setFormIsValid(
    //   emailState.isValid && passState.isValid
    // );
  };

  const validateEmailHandler = () => {
    //  setEmailIsValid(emailState.value.includes('@'))
    dispatch({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    // console.log(enteredPassword.trim().length > 6)

    //  setPasswordIsValid(enteredPassword.trim().length > 6)
    dispatch({ type: "PASS_BLUR" });
  };

  const collageHandler = (e) => {
    setEnteredCollage(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(emailState.value, enteredPassword)
    ctx.onLogin(
      currState.enteredEmail,
      currState.enteredPassword,
      enteredCollage
    );
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          label="E-Mail"
          isValid={currState.emailIsValid}
          value={currState.enteredEmail}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          type="text"
          id="clg"
          label="Collage"
          value={enteredCollage}
          isValid={currState.emailIsValid}
          onChange={collageHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          type="password"
          id="pass"
          label="Password"
          isValid={currState.passwordIsValid}
          value={currState.enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!currState.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
