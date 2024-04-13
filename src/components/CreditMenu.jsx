import React from "react";
const CreditMenu = ({ active, setActive, credits }) => {
 
  return (
    <div className="d-flex my-2 w-100">
      <div className="w-100">
        {credits.map((c, index) => (
          <div
            onClick={()=>setActive(index)}
            className={`d-flex flex-row justify-content-between align-items-center btn btn-${
              active == index ? "dark" : "default"
            } w-100 mb-3 text-left text-uppercase`}
          >
            <div>{index+1} - {c.emprunter.name}</div>
            <div>
              <p className="btn btn-success btn-sm">{c.contenu.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CreditMenu;
