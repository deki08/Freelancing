import React from 'react';
import Barcode from "react-barcode";
// IN NEW BUTTON > Patient Id, Name, Passport number
function BarcodeSingleSticker(props: any) {
  const { patient, type, description } = props;
  return (
    <div className={'card mt-1'} style={{ width: '58mm' }}>
      <div className="card-content box-shadow-3">
        <div className="card-body">
          <label className=''>Patient Id : {patient.id}</label>
          <label className=''>Name: {patient?.fullName}</label>
          {/* <label className=''>{patient?.passportNo}</label> */}
          <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginTop={1} displayValue={false}
            width={1.3} height={50} />
          <label className=''>{patient?.passportNo}</label>
          {/* <label className={'text-center w-100'}>{type}</label> */}
          <label className=''><small>{description}</small></label>
        </div>
      </div>
    </div>
  );
}

export default BarcodeSingleSticker;
