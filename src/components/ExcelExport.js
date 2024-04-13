import exportFromJSON from 'export-from-json'
import React, { memo, useCallback } from "react";
const ExcelExport = ({excelData,fileName}) => {
 
  const exportType =  exportFromJSON.types.xls
  const exportToExcel = () =>{
    console.log(excelData);
    exportFromJSON({ data:excelData, fileName, exportType})
  }
  return <button className="btn btn-green btn-sm mb-2" onClick={exportToExcel}>Télecharger en (.xlsx)</button>;
};
export default ExcelExport;
