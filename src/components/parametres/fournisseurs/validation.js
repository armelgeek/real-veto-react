import * as Yup from "yup";
export function validationSchema() {
  return Yup.object().shape({
    nom: Yup.string().required("Le champ est requis")
  });
}
