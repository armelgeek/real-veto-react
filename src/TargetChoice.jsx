import React, { useState } from "react";

function TargetChoice() {
  const [active, setActive] = useState(0);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Tous",
    },
    {
      id: 2,
      name: "Ambonitsena",
    },
    {
      id: 3,
      name: "Vendeur",
    },
  ]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ 
        height: "100vh",
      }}
    >
      <div
        className="card p-3 text-center"
        style={{
          width: 350,
        }}
      >
        <h1 className="text-uppercase text-lg">OFFICINE AMBALAVAO</h1>
        <h3 className="py-1">Quel partie du logiciel voulez vous gérer ?</h3>
        <div className="d-flex flex-column my-2">
          {data.map((d, index) => (
            <div
              onClick={() => setActive(index)}
              className={`p-3 bg-${
                active == index ? "green" : "default"
              } w-100 mb-2 border-1 text-uppercase 
              `}
              key={index}
              style={{
                cursor:'pointer'
              }}
            >
              <h4>{d.name}</h4>
            </div>
          ))}
          <button className="btn btn-md btn-dark mt-2">
            Valider mon choix
          </button>
        </div>
      </div>
    </div>
  );
}
export default TargetChoice;
