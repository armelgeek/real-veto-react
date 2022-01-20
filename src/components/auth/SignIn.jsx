import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../store/actions/user";
import { Auth, Data } from "../../context/auth-context";
import Form from "../../utils/form";
const SignIn = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Auth>
        <Data>
          {({ auth, isLoggedIn }) => (
            <>
              {auth?.error != null && (
                <div>
                  {auth?.error.message}
                </div>
              )}
              <h3>
                Se connecter
              </h3>
              <div
              >
                {isLoggedIn && <Redirect to="/" />}

                <Form
                  enableReinitialize
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validations={{}}
                  onSubmit={(values, form) => {
                    const { username, password } = values;
                    dispatch(
                      login({
                        username: username,
                        password: password,
                      })
                    );
                    console.log(values);
                  }}
                >
                  <Form.Element>
                    <Form.Field.Input
                      border="1px"
                      name="username"
                      label="Nom d'utilisateur"
                      placeholder={"ex:Nom d'utilisateur"}
                      mb={3}
                    />
                    <Form.Field.Input
                      name="password"
                      label="Mot de passe"
                      placeholder={"Mot de passe"}
                      type={"password"}
                    />
                      <button
                        type={"submit"}
                        mt={4}
                      >
                        Se connecter
                      </button>
                    </Form.Element>
                </Form>
              </div>
        
            </>
          )}
        </Data>
      </Auth>
      <div mt={46} divShadow="md"></div>
    </div>
  );
};

export default SignIn;
