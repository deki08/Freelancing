import React from 'react';
import Barcode from "react-barcode";

function BarcodeSticker(props: any) {
    const { patient, type, description, bNumber } = props;
    return (
        <div className={'card '} style={{ width: '50mm' }}>
            <div className="card-content box-shadow-3">
                <div className="card-body py-1">
                    <label className='text-center w-100 py-0 my-0 text-bold-600'>{patient.regNo}</label>
                    <label className="text-center py-0 w-100 my-0 text-bold-600">{bNumber}</label>
                    <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginTop={1} marginLeft={1} marginBottom={1} displayValue={false}
                        width={1.1} height={30} />
                    <label className='text-fs-small text-center py-0 my-0 w-100'>{type}</label>
                    <label className={'text-center text-fs-small  w-100 py-0 my-0'}><small>{description}</small></label>
                </div>
            </div>
        </div>
    );
}

export default BarcodeSticker;
