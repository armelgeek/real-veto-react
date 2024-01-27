import XLSX from "tempa-xlsx";

const strToArrBuffer = (s) => {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);

    for (var i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
};

const dateToNumber = (v, date1904) => {
    if (date1904) {
        v += 1462;
    }

    var epoch = Date.parse(v);

    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

const excelSheetFromDataSet = (dataSet) => {
    /*
    Assuming the structure of dataset
    {
        xSteps?: number; //How many cells to skips from left
        ySteps?: number; //How many rows to skips from last data
        columns: [array | string]
        data: [array_of_array | string|boolean|number | CellObject]
        fill, font, numFmt, alignment, and border
    }
     */
    if (dataSet === undefined || dataSet.length === 0) {
        return {};
    }

    var ws = {};
    var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
    var rowCount = 0;

    dataSet.forEach(dataSetItem => {
        var columns = dataSetItem.columns;
        var xSteps = typeof(dataSetItem.xSteps) === 'number' ? dataSetItem.xSteps : 0;
        var ySteps = typeof(dataSetItem.ySteps) === 'number' ? dataSetItem.ySteps : 0;
        var data = dataSetItem.data;
        if (dataSet === undefined || dataSet.length === 0) {
            return;
        }

        rowCount += ySteps;

        var columnsWidth = []
        if (columns.length >= 0) {
            columns.forEach((col, index) => {
                var cellRef = XLSX.utils.encode_cell({c: xSteps + index, r: rowCount});
                fixRange(range, 0, 0, rowCount, xSteps, ySteps);
                var colTitle = col;
                if (typeof col === 'object'){
                    //colTitle = col.title; //moved to getHeaderCell
                    columnsWidth.push(col.width || {wpx:80}); /* wch (chars), wpx (pixels) - e.g. [{wch:6},{wpx:50}] */
                }
                getHeaderCell(colTitle, cellRef, ws);
            });

            rowCount += 1;
        }

        if (columnsWidth.length > 0){
            ws['!cols'] = columnsWidth;
        }

        for (var R = 0; R != data.length; ++R, rowCount++) {
            for (var C = 0; C != data[R].length; ++C) {
                var cellRef = XLSX.utils.encode_cell({c: C + xSteps, r: rowCount});
                fixRange(range, R, C, rowCount, xSteps, ySteps);
                getCell(data[R][C], cellRef, ws);
            }
        }
    });

    if (range.s.c < 10000000) {
        ws['!ref'] = XLSX.utils.encode_range(range);
    }

    return ws;
};

function getHeaderCell(v, cellRef, ws) {
    var cell = {};
    var headerCellStyle = v.style ? v.style : { font: { bold: true } }; //if style is then use it
    cell.v = v.title;
    cell.t = 's';
    cell.s = headerCellStyle;
    ws[cellRef] = cell;
}

function getCell(v, cellRef, ws) {
    //assume v is indeed the value. for other cases (object, date...) it will be overriden.
    var cell = {v};
    if (v === null) {
        return;
    }


    var isDate = (v instanceof Date);
    if (!isDate && (typeof v === 'object')) {
        cell.s = v.style;
        cell.v = v.value;
        v = v.value;
    }

    if (typeof v === 'number') {
        cell.t = 'n';
    } else if (typeof v === 'boolean') {
        cell.t = 'b';
    } else if (isDate) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = dateToNumber(cell.v);
    } else {
        cell.t = 's';
    }
    ws[cellRef] = cell;
}

function fixRange(range, R, C, rowCount, xSteps, ySteps) {
    if (range.s.r > R + rowCount) {
        range.s.r = R + rowCount;
    }

    if (range.s.c > C + xSteps) {
        range.s.c = C + xSteps;
    }

    if (range.e.r < R + rowCount) {
        range.e.r = R + rowCount;
    }

    if (range.e.c < C + xSteps) {
        range.e.c = C + xSteps;
    }
}

// A
const excelSheetFromAoA = (data, title, subtitle) => {
    const ws = {};
    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    /**const data = [
        ['Pays', '1', '2'],
        ['France', 20 , 1500],
        ['France', ',
        ['France', 'Cc : 1 ML: 1 L:1', 800],
        ['Allemagne', 'Cc : 1 ML: 1 L:1', 2000],
        ['Allemagne', 'Cc : 1 ML: 1 L:1', 1800],
        ['Allemagne', 'Cc : 1 ML: 1 L:1', 1000],
      ];
**/

    // Ajouter le titre du tableau
    if (title) {
      // Insérer une nouvelle ligne pour le titre
      data.unshift([title]);
  
      // Mettre à jour les indices de la plage pour inclure la ligne du titre
      range.s.r = 0;
      range.e.r = data.length - 1;
    }
  
    // Ajouter le sous-titre du tableau
    if (subtitle) {
      // Insérer une nouvelle ligne pour le sous-titre
      data.splice(1, 0, [subtitle]);
  
      // Mettre à jour les indices de la plage pour inclure la ligne du sous-titre
      if (range.s.r === 0) {
        range.s.r = 1;
      }
      range.e.r = data.length - 1;
    }
  
    for (let R = 0; R < data.length; ++R) {
      for (let C = 0; C < data[R].length; ++C) {
        if (range.s.r > R) {
          range.s.r = R;
        }
  
        if (range.s.c > C) {
          range.s.c = C;
        }
  
        if (range.e.r < R) {
          range.e.r = R;
        }
  
        if (range.e.c < C) {
          range.e.c = C;
        }
  
        const cell = { v: data[R][C] };
        if (cell.v === null) {
          continue;
        }
  
        const cellRef = XLSX.utils.encode_cell({ c: C, r: R });
        if (typeof cell.v === 'number') {
          cell.t = 'n';
        } else if (typeof cell.v === 'boolean') {
          cell.t = 'b';
        } else if (cell.v instanceof Date) {
          cell.t = 'n';
          cell.z = XLSX.SSF._table[14];
          cell.v = dateToNumber(cell.v);
        } else {
          cell.t = 's';
        }
  
        const columnStyles = [
          { alignment: { horizontal: 'left' } },
          { alignment: { horizontal: 'center' } },
          { alignment: { vertical: 'top' } }
        ];
  
        // Appliquer des styles aux colonnes
        if (C === 0) {
          // Première colonne : alignement à gauche et largeur augmentée
          cell.s = Object.assign({}, columnStyles[0], { width: 20 });
        } else if (C === 2) {
          // Troisième colonne : alignement vertical en haut
          cell.s = columnStyles[2];
        } else {
          // Autres colonnes : centrées
          cell.s = columnStyles[1];
        }
  
        ws[cellRef] = cell;
      }
    }
  
    if (range.s.c < 10000000) {
      ws['!ref'] = XLSX.utils.encode_range(range);
    }
  
    return ws;
  };


export {strToArrBuffer, dateToNumber, excelSheetFromAoA, excelSheetFromDataSet};
