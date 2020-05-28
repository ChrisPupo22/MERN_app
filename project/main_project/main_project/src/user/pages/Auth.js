import React from "react";
import Input from "../../shared/components/FormElements/input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from "../../shared/util/validators"; 

import './Auth.css'; 

import { useForm } from "../../shared/hooks/form-hook";

const AuthUser = () => {
  const [formState, inputHandler] = useForm(
    {
      Email: {
        value: "",
        isValid: false,
      },
      Password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form>
      <Input
        id="email"
        element="input"
        type="text"
        label="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email."
        onInput={inputHandler}
      />
      <Input
        id="password"
        element="input"
        type="text"
        label="Password"
        validators={(VALIDATOR_MINLENGTH(7))}
        errorText="Please enter a valid password."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Login
      </Button>
    </form>
  );
};

export default AuthUser;
