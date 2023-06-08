import { jsPDF } from "jspdf";

const downloadPdf = (filename: string, elementId: string,orientation: string): void => {
    const source = document.getElementById(elementId);
    if (source){
        let element = source.firstChild as HTMLElement;
        if (element!=null){
            if (orientation === 'potrait') {
                element.style.width = "210mm";
                element.style.fontSize = "9px";
            } else {
                element.style.width = "100%";
                element.style.fontSize = "9px";
                element.style.position = "absolute";
                element.style.left = "50%";
                element.style.top = "50%";
                // element.style.transform = "translate(-50%, -50%) rotate(-90deg)";
                // element.style.transformOrigin = "center";
            }
            const pdf = new jsPDF({orientation: 'l', unit: 'pt', format: 'a4'});
            pdf.html(element, {
                callback: function (doc) {
                    doc.save(filename+".pdf");
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
    pdf.html(source?source:'', {
        callback: function(doc) {
            doc.save(filename+".pdf");
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
