import { any } from "@tensorflow/tfjs-node";
import { jsPDF } from "jspdf";

const downloadPdf = (filename: string, elementId: string, type: string,font:string): void => {
    const source = document.getElementById(elementId);
    if (source) {
        let element = source.firstChild as HTMLElement;
        let pdf = null;
        if (element != null) {
            const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{2}:\d{2}/; // Regex pattern for matching the date in the format yyyy-mm-ddThh:mm:ss.sss+hh:mm

            const replaceDate = (match: string): string => {
              const parts = match.split('T')[0].split('-');
              const year = parts[0];
              const month = parts[1];
              const day = parts[2];
              return `${day}-${month}-${year}`;
            };
      
            // Recursively traverse through each text node and replace the date format
            const traverseAndReplace = (node: Node): void => {
              if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                node.textContent = text.replace(dateRegex, replaceDate);
              } else if (node.hasChildNodes()) {
                node.childNodes.forEach((childNode) => {
                  traverseAndReplace(childNode);
                });
              }
            };
      
            // Replace the date format in the element's content
            traverseAndReplace(element);


            if (type === 'act') {
                element.style.width = "180mm";
                element.style.fontSize = "4.9px";
                pdf = new jsPDF({ orientation: 'l', unit: 'pt', format: 'a4' });
            } else {
                element.style.width = "145mm";
                element.style.fontSize = font;
                pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
            }

            pdf.html(element, {
                callback: function (doc) {
                    doc.save(filename + ".pdf");
                },
                x: 5,
                y: 5,
            });
        }
    }
}

const printReport = (filename: string, elementId: string): void => {
    const source = document.getElementById(elementId);
    const pdf = new jsPDF("p");
    pdf.html(source ? source : '', {
        callback: function (doc) {
            doc.save(filename + ".pdf");
        },
        x: 30,
        y: 30
    });
}
const PdfUtil = {
    downloadPdf,
    printReport
}
export default PdfUtil;
