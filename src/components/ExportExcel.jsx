import React from "react";
import ReactExport from "../components/reactExport/index";
import { saveAs } from 'file-saver';
import { strToArrBuffer } from "./reactExport/ExcelPlugin/utils/DataUtil";

const ExcelFile = ReactExport.ExcelFile;
ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const styledMultiDataSet = [
    {
      columns: [
        {
          value: "Headings",
          widthPx: 160,
          style: { font: { sz: "24", bold: true } },
        },
        {
          value: "Text Style",
          widthPx: 180,
          style: { font: { sz: "24", bold: true } },
        },
        {
          value: "Colors",
          style: { font: { sz: "24", bold: true } }, // if no width set, default excel column width will be used ( 64px )
        },
      ],
      data: [
        [
          { value: "H1", style: { font: { sz: "24", bold: true } } },
          { value: "Bold", style: { font: { bold: true } } },
          {
            value: "Red",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
            },
          },
        ],
        [
          { value: "H2", style: { font: { sz: "18", bold: true } } },
          { value: "underline", style: { font: { underline: true } } },
          {
            value: "Blue",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
            },
          },
        ],
        [
          { value: "H3", style: { font: { sz: "14", bold: true } } },
          { value: "italic", style: { font: { italic: true } } },
          {
            value: "Green",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
            },
          },
        ],
        [
          { value: "H4", style: { font: { sz: "12", bold: true } } },
          { value: "strike", style: { font: { strike: true } } },
          {
            value: "Orange",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
            },
          },
        ],
        [
          { value: "H5", style: { font: { sz: "10.5", bold: true } } },
          { value: "outline", style: { font: { outline: true } } },
          {
            value: "Yellow",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } },
            },
          },
        ],
        [
          { value: "H6", style: { font: { sz: "7.5", bold: true } } },
          { value: "shadow", style: { font: { shadow: true } } },
          {
            value: "Light Blue",
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
            },
          },
        ],
      ],
    },
  ];
  
export default function ExportExcel({title,subtitle}) {
    
        return (
            <ExcelFile title="leka" filename="like" subtitle="likes">
                
                <ExcelSheet  data={styledMultiDataSet} name="Employees">
                <ExcelColumn label="Pays" value="name" />
                    <ExcelColumn label="1" value="name" />
                    <ExcelColumn label="2" value="amount" />
                    <ExcelColumn label="3" value="sex" />
                </ExcelSheet>
            
            </ExcelFile>
        );
   
}