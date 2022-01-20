### Fornik bundle

```
<Form
                enableReinitialize
                initialValues={{
                    password:''
                }}
                validations={{
                    password:[Form.is.required()]
                }}
                onSubmit={async (values, form) => {
                    const {password} = values;
                    try {
                        await sendResetPassword({
                            password: password,
                            resetToken: router.query.token,
                        })
                    } catch (error) {
                        Form.handleAPIError(error, form);
                    }
                }
                }
            >
                <Form.Element>
                    <Form.Field.Input
                        name="password"
                        label="Nouveau mot de passe"
                        placeholder={"Mot de passe"}
                        type={"password"}
                    />
                    <button className={"border mt-3"} type="submit">{isCreating ? 'En cours ...' : 'Valider'}</button>
                </Form.Element>
            </Form>



<Create
          initialValues={{
            name: 'red',
          }}
          validations={{
            name: [Form.is.required()],
          }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          <Form.Field.Input name="name" label="armel" tip={"hello ceci est un texte"}/>
          <Form.Field.File label="armel" name="logo" type="single" />
        </Create>









```
