import * as Yup from 'yup';
export function validationSchema() {
  return Yup.object().shape({
    prices: Yup.array().of(
      Yup.object().shape({
        montant: Yup.string().required('Required')
      })
    ),
  });
}
