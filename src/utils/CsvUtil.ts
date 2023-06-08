import * as XLSX from 'xlsx';
import { RowInfo, WorkSheet } from "xlsx";
import moment from 'moment';
const generateCsv = (filename: string, rows: object[], headers?: string[]): void => {
    if (!rows || !rows.length) {
        return;
    }
    const separator: string = ",";
    const csvContent =
        headers?.map((record: any) => {
            // console.log(record)
            return record.data ? record.name : '';
        }).join(separator) +
        '\n' +
        rows.map((record: any, index: number) => {
            return [
              index + 1,
              ...(headers ?? [])
                .slice(1) // Exclude the first column from the iteration
                .map(function (k: any) {
                  let cell = record[k.data] === null || record[k.data] === undefined ? '' : record[k.data];
                  if (typeof cell === 'string' && cell.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2}$/)) {
                    const date = new Date(cell);
                    cell = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString()}`;
                  } else if (cell instanceof Date) {
                    cell = cell.toDateString();
                  } else {
                    cell = cell.toString().replace(/"/g, '""');
                    if (cell.search(/([",\n])/g) >= 0) {
                      cell = `"${cell}"`;
                    }
                  }
                  return cell;
                })
            ].join(separator);
          }).join('\n').replace(/(^\[)|(\]$)/mg, '');
          
          
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    // @ts-ignore
    if (window.navigator.msSaveBlob) { // In case of IE 10+
        // @ts-ignore
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
const generateExcel = (filename: string, data: object[], orientation: string): void => {
    const dataWithSrno = data.map((obj, index) => {
        const newObj: any = { ...obj };
        newObj[Object.keys(newObj)[0]] = index + 1;
    
        // Format date fields
        for (const key in newObj) {
          if (Object.prototype.hasOwnProperty.call(newObj, key)) {
            const value = newObj[key];
            if (value instanceof Date) {
              newObj[key] = value.toLocaleDateString('en-GB'); // Change date format to dd-mm-yyyy
            } else if (typeof value === 'string' && value.includes('T')) {
              const dateValue = new Date(value);
              if (!isNaN(dateValue.getTime())) {
                newObj[key] = dateValue.toLocaleDateString('en-GB'); // Change date format to dd-mm-yyyy
              }
            }
          }
        }
    
        return newObj;
      });
      const worksheet = XLSX.utils.json_to_sheet(dataWithSrno, { header: Object.keys(dataWithSrno[0]) });

    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    // @ts-ignore
    if (window.navigator.msSaveBlob) { // In case of IE 10+
        // @ts-ignore
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
const FileUtil = {
    generateCsv,
    generateExcel
}
export default FileUtil;
