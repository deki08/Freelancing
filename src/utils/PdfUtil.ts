import { any } from "@tensorflow/tfjs-node";
import { jsPDF } from "jspdf";

const downloadPdf = (filename: string, elementId: string, type: string): void => {
    const source = document.getElementById(elementId);
    if (source) {
        let element = source.firstChild as HTMLElement;
        let pdf = null;
        if (element != null) {


            if (type === 'act') {
                element.style.width = "130mm";
                element.style.fontSize = "4.8px";
                pdf = new jsPDF({ orientation: 'l', unit: 'pt', format: 'a4' });
            } else {
                element.style.width = "145mm";
                element.style.fontSize = "8px";
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
