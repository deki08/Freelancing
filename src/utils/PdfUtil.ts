import { jsPDF } from "jspdf";



const downloadPdf = (filename: string, elementId: string, orientation: string): void => {
  const source = document.getElementById(elementId);
  if (source) {
    let element = source.firstChild as HTMLElement;
    if (element != null) {
      const pageWidth = orientation === 'landscape' ? 297 : 210; // Landscape: 297mm, Portrait: 210mm
      const pageHeight = orientation === 'landscape' ? 210 : 297; // Landscape: 210mm, Portrait: 297mm

      element.style.width = `${pageWidth}mm`;
      element.style.fontSize = '9px';

      const pdf = new jsPDF({
        orientation: orientation === 'landscape' ? 'l' : 'p',
        unit: 'pt',
        format: 'a4',
      });

      pdf.html(element, {
        callback: function (doc) {
          doc.save(`${filename}.pdf`);
        },
        x: 5,
        y: 5,
      });
    }
  }
};

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
