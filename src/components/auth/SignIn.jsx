import React from "react";
import { useDispatch } from "react-redux";

import { createBrowserHistory } from "history";
import { login } from "../../store/actions/user";
import { useHistory } from "react-router-dom";
import Form from "../../utils/form";
import {validationSchema} from './validation';
const SignIn = () => {
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  return (
    <div>
      <Form
        id={`login-form`}
        enableReinitialize
        initialValues={{
          username: "",
          password: "",
        }}
        validations={validationSchema}
        onSubmit={(values, form) => {
            const { username, password } = values;
          
        }}
        render={({ values }) => (
          <Form.Element>
            <div className="login-box">
              <div className="login-container  col-4">
                <div className="card">
                  <div className="card-header d-flex flex-row justify-content-center bg-dark  text-white">
                    <div className="card-title text-uppercase">Connexion</div>
                  </div>
                  <div className="card-body login-card-body">
                    <Form.Field.Input
                      name="username"
                      label="Nom d'utilisateur"
                      placeholder="Nom d'utilisateur"
                    />
                    <Form.Field.Password
                      name="password"
                      label="Mot de passe"
                      placeholder="Mot de passe"
                    />
                    <div className="d-flex flex-row justify-content-end mt-3">
                      <button className="btn btn-green btn-md" type="submit">
                        Se connecter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form.Element>
        )}
      />
    </div>
  );
};

export default SignIn;
