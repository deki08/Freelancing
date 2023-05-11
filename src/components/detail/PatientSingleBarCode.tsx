import React from 'react';
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import BarcodeSticker from "../ui/BarcodeSticker";
import BarcodeSingleSticker from '../ui/BarcodeSingleSticker';

function PatientSingleBarcode(props: any) {
  const { patient } = props;
  const pageStyle = `
      @page {
        size: auto;
        margin: 0;
      }
      @media print {
        html, body {
          width:60mm;
          height: 60mm;
          background-color:#444;
        }
        body {
          margin:0px;
          padding-left: 4px;
          padding-top:4px;
        }
      }
    `;

  return (
    <div className="card">
      <div className="card-content collapse show">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <ReactToPrint
                pageStyle={pageStyle}
                documentTitle={patient.passportNo}
                content={() => document.getElementById('barcodes-single-content')}
                trigger={() => <button className="btn btn-info">Print</button>} />
            </div>
          </div>
          <div id={'barcodes-single-content'}>
            <BarcodeSingleSticker patient={patient} type={'STOOL'} description={'HEL, M, GIAR, BIL, HAR'} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default PatientSingleBarcode;
