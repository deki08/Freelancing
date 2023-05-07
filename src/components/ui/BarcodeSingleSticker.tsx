import React from 'react';
import Barcode from "react-barcode";
// IN NEW BUTTON > Patient Id, Name, Passport number
function BarcodeSingleSticker(props: any) {
  const { patient, type, description } = props;
  console.log(patient);
  return (
    <div className={'card mt-1'} style={{ width: '40mm' }}>
      <div className="card-content box-shadow-3">
        <div className="card-body">
          <label className='text-center w-100 text-bold-700 '>{patient.regNo}</label>
          <label className='text-center w-100 text-bold-700'>{patient?.fullName?.slice(0, 10)}</label>
          {/* <label className=''>{patient?.passportNo}</label> */}
          <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginTop={1} displayValue={false}
            width={0.7} height={40} />
          <label className='text-center w-100'>{patient?.passportNo}</label>
        </div>
      </div>
    </div>
  );
}

export default BarcodeSingleSticker;
