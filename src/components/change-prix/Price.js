import React, { useState, useEffect } from "react";
import { FieldArray, useFormikContext } from "formik";
import Form from "../../utils/form/index";
export const Price = () => {
  const { values, setValues } = useFormikContext();
  return (
    <>
      <table className="table table-bordered">
        <thead className=" bg-thead">
          <tr>
            <th>Date debut</th>
            <th>Date fin</th>
            <th style={{
              width:"60%"
            }}>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {values?.prices.length == 0 && (
            <tr>
              <td colspan={4} className="text-center">
                Aucun prix ajouté
              </td>
            </tr>
          )}
          <FieldArray
            name="prices"
            render={(arrayHelpers) => (
              <>
                <tr>
                  <td colspan={4}>
                    <button
                      className="bg-primary py-1 px-2"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Ajouter plus
                    </button>
                  </td>
                </tr>

                {values?.prices &&
                  values?.prices?.map((disc, index) => (
                    <tr>
                      <td>
                        <Form.Field.Date
                          placeholder="date de debut."
                          name={`prices.${index}.deb`}
                        />
                      </td>
                      <td>
                        <Form.Field.Date
                          placeholder="date de debut."
                          name={`prices.${index}.fin`}
                        />
                      </td>
                      <td className="d-flex flex-row justify-content-between">
                        <div className="mr-2">
                          <Form.Field.Input
                            placeholder="Prix du litre"
                            name={`prices.${index}.prixlitre`}
                          />
                        </div>
                        <div className="mr-2">
                          <Form.Field.Input
                            placeholder="prix par quantité"
                            name={`prices.${index}.montant`}
                          />
                        </div>
                        <Form.Field.Input
                          placeholder="prix par cc"
                          name={`prices.${index}.prixparcc`}
                        />
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Retirer
                        </button>
                      </td>
                    </tr>
                  ))}
              </>
            )}
          />
        </tbody>
      </table>
    </>
  );
};
