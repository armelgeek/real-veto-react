import React from "react";
import CreditMenu from "./CreditMenu";

const TbdCredit = ({ active, setActive, credits }) => {
  return (
    <div className="border p-3  mt-3 d-flex flex-column align-items-start justify-content-center">
      <div className="d-flex mb-2 align-items-center">
        <h3 className="text-md text-uppercase">CREDIT</h3>
      </div>
      <div className="row w-100">
        {credits.length == 0 ? (
          <div className="mt-2">Aucun credit pour le moment </div>
        ) : (
          <CreditMenu active={active} setActive={setActive} credits={credits} />
        )}
      </div>
    </div>
  );
};
export default TbdCredit;
