import * as Yup from "yup";
export function validationSchema() {
  return Yup.object().shape({
    name: Yup.string().required("Le champ est requis")
  });
}
