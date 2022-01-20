import React from "react";
import { useColorModeValue as mode } from "@chakra-ui/system";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { login, register } from "../../store/actions/user";
import { Auth, Data as DataAuth } from "../../context/auth-context";
import Form from "../../utils/form";
const SignUp = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Auth>
        <DataAuth>
          {({ user, isLoggedIn }) => (
            <>
              {isLoggedIn && (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      notification: {
                        message: "Vous vous  etes connecté avec succes",
                        type: "success",
                      },
                    },
                  }}
                />
              )}
              {user?.error != null && (
                <div>
                  {user?.error.message}
                </div>
              )}
              <h3>
                creer un compte
              </h3>
              <div
                borderTop="4px"
                boxShadow="md"
                bg={"white"}
                px={8}
                py={3}
                w={400}
              >
                {isLoggedIn && <Redirect to="/" />}

                <Form
                  enableReinitialize
                  initialValues={{
                    username: "",
                    password: "",
                    role: "ROLE_VENDEUR",
                  }}
                  validations={{}}
                  onSubmit={(values, form) => {
                    const { username, password, role } = values;
                 //   console.log(values);
                  dispatch(
                      register({
                        username: username,
                        password: password,
                        role: role
                      })
                    );
                  }}
                >
                  <Form.Element>
                    <Form.Field.Input
                      border="1px"
                      name="username"
                      label="Nom d'utilisateur"
                      placeholder={"ex: Nom d'utilisateur"}
                      mb={3}
                    />

                    <Form.Field.Input
                      name="password"
                      label="Mot de passe"
                      placeholder={"Mot de passe"}
                      type={"password"}
                    />
                    <Form.Field.Select
                      label="Role"
                      name="role"
                      valueKey={"name"}
                      options={[
                        {
                          id: "ROLE_VENDEUR",
                          name: "VENDEUR",
                        },
                        {
                          id: "ROLE_ADMIN",
                          name: "ADMIN",
                        },
                        {
                          id: "ROLE_SEMI_ADMIN",
                          name: "ROLE_SEMI_ADMIN",
                        }
                      ]}
                    />
                   
                    <div>
                      <button color={"white"} type={"submit"} mt={4}>
                        Se connecter
                      </button>
                    </div>
                  </Form.Element>
                </Form>
              </div>

            </>
          )}
        </DataAuth>
      </Auth>
    </div>
  );
};

export default SignUp;
