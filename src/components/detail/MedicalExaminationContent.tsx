import React, { useEffect, useState } from 'react';
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { MODEL } from "../../utils/FormFields";
import PatientService from "../../services/PatientService";
import RefValuesService from "../../services/RefValuesService";
import moment from "moment";
import ReactToPrint from "react-to-print";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";

function MedicalExaminationContent(props: any) {
  const configuration = AuthService.getConfiguration();
  console.log(configuration);
  const [loaded, setLoaded] = useState(false);
  const [patient, setPatient] = useState(props.patient);
  const [report, setReport] = useState(MODEL.REPORT);
  const [refValue, setRefValue] = useState(MODEL.REF_VALUE);
  console.log(patient);
  const pageStyle = `
      @page {
        size: auto;
        margin: 0;
      }
      @media print {
        html, body {
          width: 210mm;
          height: 297mm;
        }
        body {
          margin: 0;
        }
      }
    `;

  useEffect(() => {
    PatientService.findById(patient.id).then(response => {
      setPatient(response.data);
      setReport(response.data.report);
    })
    RefValuesService.find().then(response => {
      setRefValue(response.data);
    })
  }, [])

  return (
    <div className="card mb-0">
      <div className="card-content collapse show">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <h3 className="font-size mb-2">Medical Examination Report of {patient.fullName}</h3>
            </div>
            <div className="col-4">
              <ReactToPrint
                pageStyle={pageStyle}
                documentTitle={patient.passportNo}
                content={() => document.getElementById('patient-report-print-content')}
                trigger={() => <button className="btn btn-info pull-right">Print</button>} />
            </div>
          </div>
          <div className={'printable mx-3 my-2'} id={'patient-report-print-content'}>
            <div className={'row'}>
              <div className="col-12 text-center">
                <div className="px-0 row  list-unstyled black">
                  <div className='col border py-2 border-right-0 '>
                    {/* <img src={configuration.reportCompanyLogo} className="mb-0" alt='' height={60} /> */}
                    <img src="https://assets.turbologo.com/blog/en/2019/11/19084834/gaming-logo-cover.jpg" className="mb-0 rounded-circle " alt='' width={100} height={100} />
                  </div>
                  <div className='col-6 py-2 border'>
                    <div>
                      <h1 className='text-bold-700'>{configuration.businessName}</h1>
                      <h4>Address : {configuration.invoiceAddress}</h4>

                    </div>
                    <div className='d-flex justify-content-around'>
                      <p>PHONE : {configuration.reportContactNumber} </p>
                      <p>Website :{configuration.websiteUrl} </p>
                      <p>Report Download : {configuration.reportUrl}</p>
                    </div>
                  </div>


                  <div className='col py-2 border border-left-0'>
                    <div><span>Phone : </span> <span>Email : {configuration.reportEmail}</span></div>
                  </div>

                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12 text-center">
                <h4 className={'font-weight-bolder'}>Medical Examination
                  Report</h4>
                <p className='text-bold-600'>Foreign Worker
                </p>
              </div>
            </div>
            {/* <table className="table-bordered table report-header">
              <tbody>
                <tr className={'text-center'}>
                  <td className="black width-20-per text-center">
                    <span>PATIENT ID : {patient.regNo}</span>
                    <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginTop={10} displayValue={false} width={2} height={50} />
                    <br />
                    <span>REG DATE : {moment(FuncUtil.toDateTime(patient.createdDate)).format('DD-MM-YYYY')}
                    </span>
                  </td>
                  <td className="black width-20-per text-center">
                    <img src={patient.photo} alt="" style={{ height: 120, maxWidth: 150 }} />
                  </td>
                  <td className="black width-20-per text-center">
                    <img src={patient.fingerPrint} alt="" style={{ height: 120, maxWidth: 150 }} />
                  </td>
                  <td className="black width-20-per text-center">
                    <img src={report.xrayImage} alt="" style={{ height: 120, maxWidth: 150 }} />
                  </td>
                  <td className="black width-20-per text-center">
                    <QRCode size={100} className={'qr-image mt-1'} value={patient.qr ? patient.qr : ''} />
                  </td>
                </tr>
                <tr>
                  <td className="text-center font-weight-bolder font-size black">DATE : {moment(FuncUtil.toDateTime(report.modifiedDate)).format('DD-MM-YYYY hh:mm A')}</td>
                  <td className="text-center font-weight-bolder font-size black">PHOTO</td>
                  <td className="text-center font-weight-bolder font-size black">THUMB PRINT</td>
                  <td className="text-center font-weight-bolder font-size black">X –RAY IMAGE</td>
                  <td className="text-center font-weight-bolder font-size black">QR CODE</td>
                </tr>
              </tbody>
            </table> */}
            <h6 className='text-black-deep text-bold-700'>Part: I, Personal Information</h6>
            <table className="table-bordered table">
              <tbody>


                <tr >
                  <td colSpan={1} w-25 className="font-size black">REGISTRATION NUMBER</td>
                  <td colSpan={1} w-25 className="font-size black">{patient.regNo}</td>
                  <td colSpan={1} w-25 className="font-size black">COUNTRY NAME</td>
                  <td colSpan={1} w-25 className="font-size black">{patient.nationality}ASDADA</td>


                </tr>
                <tr>
                  <td colSpan={1} w-25 className="font-size black">NAME</td>
                  <td colSpan={1} w-25 className="font-size black">{patient.fullName}</td>
                  <td colSpan={1} w-25 className="font-size black">FATHER'S NAME</td>
                  <td colSpan={1} w-25 className="font-size black">{patient.fathersName}</td>

                </tr>
                <tr>

                  <td className="font-size w-25 black">PASSPORT NO.</td>
                  <td className="font-size w-25 black">{patient?.passportNo}</td>
                  <td className="font-size w-25 black">DATE OF BIRTH</td>
                  <td className="font-size w-25 black">{patient?.dateOfBirth}</td>

                </tr>
                <tr>
                  <td className="font-size w-25 black">AGENCY</td>
                  <td className="font-size w-25 black">{patient?.agentOrAgencyName}</td>

                  <td className='w-25'>
                    <tr className='w-100'>
                      <td className="font-size border-border-left-0 border-top-0 border-bottom-0 black" style={{ width: '100px' }}>AGE</td>
                      <td className="font-size border-0 w-50 black">25</td>

                    </tr>
                  </td>


                  <tr className='w-25'>
                    <td className="font-size border-top-0 border-left-0 border-bottom-0 black" style={{ width: '100px' }}>Sex</td>
                    <td className="font-size border-0 w-50 black">Mail</td>

                  </tr>

                </tr>
                <tr>
                  <td className="font-size black">ADDRESS</td>
                  <td colSpan={3} className="w-full font-size black">{patient?.presentAddress}</td>

                </tr>
              </tbody>
            </table>
            <h6 className='text-black-deep text-bold-700'>Personal Medical History
            </h6>

            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td className="font-size w-25  black">ASTHMA</td>
                  <td className="font-size  black"> </td>
                  <td className="font-size  black"> </td>
                  <td className="font-size w-25 black">EPILEPSY /FITS</td>
                  <td className="font-size  black"> </td>
                  <td className="font-size  black"> </td>
                </tr>
              </tbody>
            </table>

            <h6 className='text-black-deep text-bold-700'>Admitted to hospital (within 6 months) Yes/NO
            </h6>

            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td rowSpan={5} className="font-size black">If yes remarks:
                  </td>
                </tr>
              </tbody>
            </table>




            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td className="font-size w-25 black">Diabetes</td>
                  <td className="font-size black"> </td>
                  <td className="font-size black"> </td>
                  <td className="font-size w-25 black">Blood Pressure</td>
                  <td className="font-size black"> </td>
                  <td className="font-size black"> </td>
                </tr>
              </tbody>
            </table>
            {/**heart diseases)
 */}
            {/*  */}
            <h6 className='text-black-deep text-bold-700'>Family History (Parents with history of diabetes, blood pressure and heart diseases)
            </h6>
            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td rowSpan={5} className="font-size black">
                    .
                  </td>
                </tr>
              </tbody>
            </table>


            {/* signature */}
            <div className='pt-2 text-black-50 pb-3'>

              {/* <span>_________________________</span> */}
              <div className='' style={{ width: '240px', textAlign: 'start', paddingBottom: '0.5px' }}>

                <hr className=' bg-black ' />
              </div>
              <div className='pl-3'>
                {/* <span className='pl-5'>_________________________</span> */}
                <div style={{ width: '240px', textAlign: 'start', }}>

                  <hr className=' bg-black ' />
                </div>

                <h6 className='text-black'>Signature of worker</h6>
              </div>
              <h6>Date:</h6>

            </div>

            {/* part: 2 */}
            <div>
              <h6 className='text-black-deep text-bold-600'> <strong className='font-weight-bolder'>Part: II, Medical History</strong> (to be filled by the attending doctor)
              </h6>
              <h6 className='text-black-deep text-bold-600'>Has the worker suffered or experienced the following symptoms: If yes, please indicate date of detection.
              </h6>
            </div>

            {/* disease */}
            <h6 className='text-black-deep text-bold-700'>Disease</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '20%', paddingLeft: '5px' }}>DISEASES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '10%', }}>COMMENT</th>
                  <th className="font-size black border border-black py-0" style={{ width: '10%', }}>DATE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '20%', paddingLeft: '5px' }}>DISEASES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '10%', }}>COMMENT</th>
                  <th className="font-size black border border-black py-0" style={{ width: '10%', }}>DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    HIV/ AIDS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   HYPERTENSION
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    TUBERCULOSIS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   HEART DISEASES
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    LEPROSY
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   BRONCHIAL ASTHMA
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    VIRAL HEPATITIS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   DIABETES MELLITUS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    PSYCHIATRIC ILLNESS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   PEPTIC ULCER
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    EPILEPSY
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   KIDNEY DISEASES
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    CANCER
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   OTHERS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    SEXTUALLY TRANSMITED <br /> DISEASES
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    MALARIA
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black">
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td colSpan={3} className="font-size text-bold-600 black">
                    Foreign workers found with diseases /conditions where the workers are considered unsuitable for employment in Malaysia, if the medical test /examination is positive
                  </td>

                  <td colSpan={3} className="font-size text-bold-600 black">Foreign workers found with incurable or chronic diseases / conditions where they need prolonged and extensive treatment may also be found unsuitable for employment in Malaysia.</td>
                </tr>
              </tbody>
            </table>





            {/* ----------------------------------- */}
            {/* part: 3 */}
            <div>
              <h6 className='text-black-deep text-bold-600'> <strong className='text-bold-700'>Part: III. Physical Examination & Investigations </strong>(to be filled by the examining doctor)
              </h6>
              <h6 className='text-black-deep text-bold-600'>Section A: General Examination

              </h6>
            </div>





            <h6 className='text-black-deep text-bold-700'>Disease</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>HEIGHT</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DEFOMITIES OF LIMBS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    WEIGHT
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   ANAEMIA
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    WEIGHT
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   ANAEMIA
                  </td>
                  <td className="font-size black"></td>
                </tr>

                <tr>
                  <td className="font-size black">
                    PULSE
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   JAUNDICE
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    BLOOD PRESSURE   A - SYSTOLIC
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   LYMPH NODE ENLARGEMENT
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    B - DIASTOLIC
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   Vision test A – Unaided
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    LAST MENSTRUAL PERIOD DATE
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   B – Aided
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    CHRONIC SKIN RASH
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   HEARING
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    ANAESTHETIC SKIN PATCH
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   OTHERS (if abnormal, describe under comment)
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td colSpan={4} rowSpan={3} className="font-size text-bold-600 black">
                    COMMENTS (Refer To Part- III,<br /> Sec-A)
                  </td>
                </tr>
              </tbody>
            </table>

            {/* section b system examination */}

            <h6 className='text-black-deep text-bold-700'>Section B: System Examination
            </h6>
            <h6 className='text-black-deep text-bold-700 '>CARDIO VASCULAR SYSTEM
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HEART SIZE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SOUND</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>

                </tr>
              </thead>
            </table>

            {/* RESPIRATORY SYSTEM */}

            <h6 className='text-black-deep text-bold-700 '>RESPIRATORY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. BREATH SOUNDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER RINDINGS </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>

                </tr>
              </thead>
            </table>

            {/* GASTROINTESTINAL */}
            <h6 className='text-black-deep text-bold-700 '>RGASTROINTESTINAL</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. LIVER</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPLEEN </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>

            {/* NERVOUS SYSTEM & MENTAL STATUS */}
            <h6 className='text-black-deep text-bold-700 '>NERVOUS SYSTEM & MENTAL STATUS
            </h6>
            <h6 className='text-black-deep text-bold-700 '>GENERAL MENTAL
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. STATUS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPEECH  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. MOTOR POWER
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">
                    D. SENSORY
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. REFLESES
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>


            {/*GENITOURINARY SYSTEM */}
            <h6 className='text-black-deep text-bold-700 '>GENITOURINARY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. KIDNEY</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DISCHARGE </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. SORES/ ULCER
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>


            {/*Section C: Laboratory results */}
            <h6 className='text-black-deep text-bold-700 '>GENITOURINARY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. SPECIMEN RECEIVED DATE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DATE OF LAB REPORT </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>


            {/*Blood Tests*/}
            <h6 className='text-black-deep text-bold-700 '>GENITOURINARY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>BLOOD Group</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>


            {/*Serology */}
            <h6 className='text-black-deep text-bold-700 '>Serology</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV ANTIBODY</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HBsAG</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. VDRL
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">D. MALARIA PARASITE</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. F.B.S.
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>



            {/*Urine Drug Screening */}
            <h6 className='text-black-deep text-bold-700 '>Urine Drug Screening</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. OPIATES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. CANNABINOIDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. URINE HCG
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. F.B.S.
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>



            {/*A PREGNANCY TEST URINE FEME */}
            <h6 className='text-black-deep text-bold-700 '>A PREGNANCY TEST URINE FEME</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>SPECIFIC GRAVITY</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>COLOUR</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    PH
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">LEUCOCYTES</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    GLUCOSE
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">PROTEIN</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    BLOOD
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">MICROSCOPY</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    RED BLOOD CELL
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">WHITE BLOOD CELL</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    EPITHELIAL CELL</td>
                  <td className="font-size black"></td>
                  <td className="font-size black">CASTS</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    CRYSTAL
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">BACTERIA</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    OTHERS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>




            {/*Section D: X-RAY FINDINGS*/}
            <h6 className='text-black-deep text-bold-700 '>DATE OF X-RAY TAKEN</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY TAKEN</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY REPORTED</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>


            {/*REPORT*/}
            <h6 className='text-black-deep text-bold-700 '>REPORT</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HEART SHAPE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SIZE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. LUNG FIELDS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">D. MEDIASTINUM & HILA</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. PLEURAL / HEMIDIAPHRAGMS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">F. COSTO-PHRENIC ANGLES</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    G. TORACIC CASE
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>




            {/*FINDINGS*/}
            <h6 className='text-black-deep text-bold-700 '>FINDINGS</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. FOCAL LESION</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER ABNORMALITIES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>



            {/*CONCLUTION OF MEDICAL STATUS:*/}
            <h6 className='text-black-deep text-bold-700 '>CONCLUTION OF MEDICAL STATUS:
            </h6>
            <h6 className='text-black-deep text-bold-600 '>I have examined Mr./Ms. (PATIENT NAME DURING REGISTRATION), Passport Number – (DURING <br /> REGISTRATION), He/She are free from the following diseases.
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV /AIDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. TB</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. MALARIA
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">D. HEPATITIS</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. STD
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">F. EPILEPSY</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    G. CANCER
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">H. DRUGS</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    I. LEPROSY
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">J. PREGNANCY</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    K. PSYCHIATRIC ILLENESS
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black">L. OTHERS </td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>



            {/* other details */}
            <div>
              {/*FINDINGS*/}
              <h6 className='text-black-deep text-bold-700 '>( &nbsp;&nbsp;&nbsp;     ) Certify him/her as FIT for employment.
              </h6>
              <h6 className='text-black-deep text-bold-700 '>(   &nbsp;&nbsp;&nbsp;   ) He/ She is found to be UNFIT as per Malaysia ministry of health standards.
              </h6>
            </div>
            <div className='row border mx-0 '>
              <div className='col-3 pb-4  border-bottom '>
                &nbsp;&nbsp;&nbsp;
              </div>

              <div className='col-9'>
                <table
                  className=" table">
                  <thead style={{ textAlign: 'left' }}>
                    <tr>
                      <th className="font-size black border border-black border-top-0 py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>Dr. Name</th>
                      <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}></th>
                      <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>Date</th>
                      <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-size black">
                        Qualification
                      </td>
                      <td className="font-size black"></td>
                      <td className="font-size black">Hospital Address</td>
                      <td className="font-size black"></td>
                    </tr>

                  </tbody>
                </table>

              </div>
            </div>


          </div>
        </div>
      </div>
    </div >
  );
}

export default MedicalExaminationContent;
