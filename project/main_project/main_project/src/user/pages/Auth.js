import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UI_Elements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./Auth.css";
import { AuthContext } from '../../shared/context/auth-context';

import { useForm } from "../../shared/hooks/form-hook";

const AuthUser = () => {
  const auth = useContext(AuthContext); 
  const [isLoginMode, setLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs, 
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login(); 
  };

  return (
    <Card className="authentication">
      {isLoginMode && <h2>Please Login</h2>}
      {!isLoginMode && <h2>Please Sign-Up</h2>}
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a username"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(7)]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Sign-Up"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Switch to {isLoginMode ? "Sign-Up" : "Login"}
      </Button>
    </Card>
  );
};

export default AuthUser;
