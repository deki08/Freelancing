import React from 'react';
import Barcode from "react-barcode";
// IN NEW BUTTON > Patient Id, Name, Passport number
function BarcodeSingleSticker(props: any) {
  const { patient, type, description } = props;
  console.log(patient);
  return (
    <div className={'card'} style={{ width: '48mm' }}>
      <div className="card-content py-0 box-shadow-3">
        <div className="card-body py-1 px-1">
          <label className='text-center w-100 my-0 text-bold-600 '>{patient.regNo}</label>
          <label className='text-center py-0 w-100 text-bold-600'>{patient?.fullName?.slice(0, 16)}</label>
          {/* <label className=''>{patient?.passportNo}</label> */}
          <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginLeft={1} marginRight={0} marginTop={1} displayValue={false}
            width={1.13} height={25} />
          <label className='text-center mb-0 w-100'>{patient?.passportNo}</label>
        </div>
      </div>
    </div>
  );
}

export default BarcodeSingleSticker;
