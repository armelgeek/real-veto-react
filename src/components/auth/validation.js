import * as Yup from "yup";
export function validationSchema() {
  return Yup.object().shape({
    username: Yup.string().required("Le nom d'utilisateur ne doit pas etre vide")
  });
}
