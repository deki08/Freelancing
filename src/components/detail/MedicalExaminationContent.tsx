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
import MalaysiService from '../../services/MalaysiaService';

function MedicalExaminationContent(props: any) {
  const configuration = AuthService.getConfiguration();
  const [loaded, setLoaded] = useState(false);
  const [patient, setPatient] = useState(props.patient);
  const [report, setReport] = useState(MODEL.REPORT);
  const [refValue, setRefValue] = useState(MODEL.MEDICALEXAMINATION);

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
      console.log(patient);
    })
    MalaysiService.findById(patient.id).then(response => {
      setRefValue(response.data);
    })
  }, [])
  const calculateAge = (dob: any) => {
    const currentDate = moment();
    const dobDate = moment(dob, 'DD-MM-YYYY');

    const age = currentDate.diff(dobDate, 'years');

    return age;
  };


  return (
    <div className="card mb-0">
      <div className="card-content collapse show">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <h3 className="font-size mb-2">Medical Examination Form of   {patient.fullName}


              </h3>

            </div>
            <div className="col-4">
              <ReactToPrint
                pageStyle={pageStyle}
                documentTitle={patient.passportNo}
                content={() => document.getElementById('patient-medicalExam-report')}
                trigger={() => <button className="btn btn-info pull-right">Print</button>} />
            </div>
          </div>
          <div className={'printable mx-3 my-2'} id={'patient-medicalExam-report'}>

            {/* <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginTop={10} displayValue={false} width={2} height={50} /> */}
            {/* <QRCode size={130} className={'qr-image mt-1'} value={patient?.qr ? patient.qr : ''} /> */}
            <div className={'row'}>
              {/* <Barcode value={patient.regNo ? patient.regNo : 'NA'} marginTop={10} displayValue={false} width={2} height={50} /> */}
              <div className="col-12 text-center">
                <div className="px-0 row  list-unstyled black">
                  <div className='col-2  py-2 border-right-0 '>
                    <img src={configuration.reportCompanyLogo} className="mb-0" alt='' height={100} />
                  </div>
                  <div className='col-10 py-2 '>
                    <div>
                      <h3 className='text-bold-600'>{configuration.businessName}</h3>
                      <h4>Address : {configuration.invoiceAddress}</h4>
                    </div>
                    <div className='d-flex justify-content-around'>
                      <p>CONTACT NO : {configuration.reportContactNumber} </p>
                      <p>Website :{configuration.websiteUrl} </p>
                      <p>Report Download : {configuration.reportUrl}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className='col-md-2'>
                <h4 className='text-fs-medium text-black-deep'>APPENDIX - C</h4>
              </div>
              <div className="w-100 col-md-8  mr-1 text-center">
                <h4 className={'font-weight-bolder'}>Medical Examination
                  Report</h4>
                <p className='text-bold-600'>Foreign Worker
                </p>
              </div>
            </div>
            <table className="table-bordered table report-header">
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
            </table>
            <h6 className='text-black-deep mt-3 text-bold-700'>Part: I, Personal Information</h6>
            <table className="table-bordered table">
              <tbody>


                <tr >
                  <td colSpan={1} w-25 className="font-size black">REGISTRATION NO.</td>
                  <td colSpan={1} w-25 className="font-size black">{patient.regNo}</td>
                  <td colSpan={1} w-25 className="font-size black">COUNTRY NAME</td>
                  <td colSpan={1} w-25 className="font-size black">Bangladesh</td>


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
                  <td className="font-size w-25 black">{moment(patient?.dateOfBirth).format('DD-MM-YYYY')}</td>

                </tr>
                <tr>
                  <td className="font-size w-25 black">AGENCY</td>
                  <td className="font-size w-25 black">{patient?.agentOrAgencyName}</td>

                  <td className='w-25'>
                    <tr className='w-100'>
                      <td className="font-size border-border-left-0 border-top-0 border-bottom-0 black" style={{ width: '100px' }}>AGE</td>
                      <td className="font-size border-0 w-50 black">{calculateAge(moment(patient?.dateOfBirth).format('DD-MM-YYYY'))} </td>

                    </tr>
                  </td>


                  <tr className='w-25'>
                    <td className="font-size border-top-0 border-left-0 border-bottom-0 black" style={{ width: '100px' }}>Sex</td>
                    <td className="font-size border-0 w-50 black">{patient?.gender}</td>
                  </tr>

                </tr>
                <tr>
                  <td className="font-size black">ADDRESS</td>
                  <td colSpan={3} className="w-full font-size black">{patient?.presentAddress}</td>

                </tr>
              </tbody>
            </table>
            <h6 className='text-black-deep mt-3 text-bold-700'>Personal Medical History
            </h6>

            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td className="font-size w-25  black">ASTHMA</td>
                  <td className="font-size  black">{refValue?.asthama} </td>

                  <td className="font-size w-25 black">EPILEPSY /FITS</td>
                  <td className="font-size  black"> {refValue?.epilepsy}</td>
                </tr>
              </tbody>
            </table>

            <h6 className='text-black-deep mt-3 text-bold-700'>Admitted to hospital (within 6 months) Yes/NO
            </h6>

            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td colSpan={1} className="font-size black">If yes remarks:
                  </td>
                  <td className="font-size  w-50 black">{refValue?.remark}</td>
                </tr>
              </tbody>
            </table>




            <table className="mt-3 table-bordered table">
              <tbody>
                <tr>
                  <td className="font-size w-25 black">Diabetes</td>
                  <td className="font-size black"> {refValue?.diabetes}</td>

                  <td className="font-size w-25 black">Blood Pressure</td>
                  <td className="font-size black">{refValue?.bloodPressure} </td>

                </tr>
              </tbody>
            </table>
            {/**heart diseases)
 */}
            {/*  */}
            <h6 className='text-black-deep text-bold-700 mt-3'>Family History (Parents with history of diabetes, blood pressure and heart diseases)
            </h6>
            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td className="font-size black"> {refValue?.familyHistory} </td>
                </tr>
              </tbody>
            </table>


            {/* signature */}
            <div className='py-5 my-5 d-flex justify-content-between text-center text-black-50 '>

              {/* <span>_________________________</span> */}
              <div className='pl-3'>
                {/* <span className='pl-5'>_________________________</span> */}
                <div style={{ width: '240px', textAlign: 'start', }}>

                  <hr style={{ borderTop: "1px solid #000" }} />
                </div>

                <h6 className='text-black'>Signature of worker</h6>
              </div>

              <div>
                <div className='' style={{ width: '240px', textAlign: 'start', paddingBottom: '0.5px' }}>
                  <hr style={{ borderTop: "1px solid #000" }} />
                </div>
                <h6>Date:</h6>
              </div>


            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* part: 2 */}
            <div className='mt-5 pt-5'>
              <h6 className='text-black-deep '> <strong className='font-weight-bolder'>Part: II, Medical History</strong> (to be filled by the attending doctor)
              </h6>
              <h6 className='text-black-deep '>Has the worker suffered or experienced the following symptoms: If yes, please indicate date of detection.
              </h6>
            </div>

            {/* disease */}
            <h6 className='text-black-deep text-bold-700 mt-3'>Disease</h6>
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
                  <td className="font-size black">{refValue?.hiv}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   HYPERTENSION
                  </td>
                  <td className="font-size black">{refValue?.hypertension}</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    TUBERCULOSIS
                  </td>
                  <td className="font-size black">{refValue?.tuberclosis}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   HEART DISEASES
                  </td>
                  <td className="font-size black">{refValue?.heartDisease}</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    LEPROSY
                  </td>
                  <td className="font-size black">{refValue?.leporsy
                  }</td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   BRONCHIAL ASTHMA
                  </td>
                  <td className="font-size black">{refValue?.bronchialAsthama}</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    VIRAL HEPATITIS
                  </td>
                  <td className="font-size black">{refValue?.viralHeptites}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   DIABETES MELLITUS
                  </td>
                  <td className="font-size black">{refValue?.diabetesMellitus}</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    PSYCHIATRIC ILLNESS
                  </td>
                  <td className="font-size black">{refValue?.psychitricIllness}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   PEPTIC ULCER
                  </td>
                  <td className="font-size black">{refValue?.pepticUlcer}</td>
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
                  <td className="font-size black">{refValue?.kidneyDeasese}</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    CANCER
                  </td>
                  <td className="font-size black">{refValue?.cancer}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black">                   OTHERS
                  </td>
                  <td className="font-size black">{refValue?.others}</td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    SEXTUALLY TRANSMITED <br /> DISEASES
                  </td>
                  <td className="font-size black">{refValue?.sexTransDisease}</td>
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
                  <td className="font-size black">{refValue?.malaria}</td>
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
            <div className='mt-3'>
              <h6 className='text-black-deep'> <strong className='text-bold-700'>Part: III. Physical Examination & Investigations </strong>(to be filled by the examining doctor)
              </h6>
              <h6 className='text-black-deep text-bold-600'>Section A: General Examination

              </h6>
            </div>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>HEIGHT</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.height}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DEFOMITIES OF LIMBS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.deformities}</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    WEIGHT
                  </td>
                  <td className="font-size black">{refValue?.weight}</td>
                  <td className="font-size black">                   ANAEMIA
                  </td>
                  <td className="font-size black">{refValue?.anemia}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    PULSE
                  </td>
                  <td className="font-size black">{refValue?.pulse}</td>
                  <td className="font-size black">                   JAUNDICE
                  </td>
                  <td className="font-size black">{refValue?.jaudice}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    BLOOD PRESSURE   A - SYSTOLIC
                  </td>
                  <td className="font-size black">{refValue?.bp}</td>
                  <td className="font-size black">                   LYMPH NODE ENLARGEMENT
                  </td>
                  <td className="font-size black">{refValue?.lne}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    B - DIASTOLIC
                  </td>
                  <td className="font-size black">{refValue?.bd}</td>
                  <td className="font-size black">                   Vision test A – Unaided
                  </td>
                  <td className="font-size black">{refValue?.vaunaided}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    LAST MENSTRUAL PERIOD DATE
                  </td>
                  <td className="font-size black">{refValue?.lmp}</td>
                  <td className="font-size black">                   B – Aided
                  </td>
                  <td className="font-size black">{refValue?.baided}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    CHRONIC SKIN RASH
                  </td>
                  <td className="font-size black">{refValue?.chronicSkinRash}</td>
                  <td className="font-size black">                   HEARING
                  </td>
                  <td className="font-size black">{refValue?.hearing}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    ANAESTHETIC SKIN PATCH
                  </td>
                  <td className="font-size black">{refValue?.anSkinPatch}</td>
                  <td className="font-size black">                   OTHERS (if abnormal, describe under comment)
                  </td>
                  <td className="font-size black">{refValue?.otherIfabNormalCOndition}</td>
                </tr>
                <tr>
                  <td className="font-size text-bold-600 black">
                    COMMENTS (Refer To Part- III,<br /> Sec-A)
                  </td>
                  <td colSpan={4} rowSpan={4} className="font-size text-bold-600 black">

                  </td>
                </tr>
              </tbody>
            </table>

            {/* section b system examination */}

            <h6 className='text-black-deep mt-2 text-bold-700'>Section B: System Examination
            </h6>
            <h6 className='text-black-deep text-bold-700 '>CARDIO VASCULAR SYSTEM
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HEART SIZE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.heartSize}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SOUND</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.heartSound}</th>

                </tr>
              </thead>
            </table>

            {/* RESPIRATORY SYSTEM */}

            <h6 className='text-black-deep text-bold-700 '>RESPIRATORY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. BREATH SOUNDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.breathSound}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER RINDINGS </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.otherRindings}</th>

                </tr>
              </thead>
            </table>

            {/* GASTROINTESTINAL */}
            <h6 className='text-black-deep text-bold-700 '>RGASTROINTESTINAL</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. LIVER</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.liver}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPLEEN </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.spleen}</th>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.mentalStatus}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPEECH  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.mentalSpeech}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. MOTOR POWER
                  </td>
                  <td className="font-size black">{refValue?.mentalMotorPower}</td>
                  <td className="font-size black">
                    D. SENSORY
                  </td>
                  <td className="font-size black"></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. REFLESES
                  </td>
                  <td className="font-size black">{refValue?.mentalRefleses}</td>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.genitourinaryKidney}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DISCHARGE </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.genitourinaryDischarge}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. SORES/ ULCER
                  </td>
                  <td className="font-size black">{refValue?.genitourinarySoresOrUlcer}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>


            {/*Section C: Laboratory results */}
            <h6 className='text-black-deep text-bold-700 '>Section C: Laboratory results
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. SPECIMEN RECEIVED DATE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.laboratoryReceivedDate}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DATE OF LAB REPORT </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.laboratoryReportDateOfLab}</th>
                </tr>
              </thead>
            </table>


            {/*Blood Tests*/}
            <h6 className='text-black-deep text-bold-700 '>Blood Tests
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>BLOOD Group</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.bloodGroup}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>


            {/*Serology */}
            <h6 className='text-black-deep text-bold-700 mt-5 pt-4'>Serology</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV ANTIBODY</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.serologyHivAntibody}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HB<small>s</small>AG</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.serologyHbsAG}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. VDRL
                  </td>
                  <td className="font-size black">{refValue?.serologyVdrl}</td>
                  <td className="font-size black">D. MALARIA PARASITE</td>
                  <td className="font-size black">{refValue?.serologyMalariaParasite}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. F.B.S.
                  </td>
                  <td className="font-size black">{refValue?.serologyFBS}</td>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.urineOpiates}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. CANNABINOIDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.cannabinoids}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. URINE HCG
                  </td>
                  <td className="font-size black">{refValue?.urineHcg}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>

              </tbody>
            </table>



            {/*A PREGNANCY TEST URINE FEME */}
            <h6 className='text-black-deep text-bold-700 '>A PREGNANCY TEST URINE FEMALE</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>SPECIFIC GRAVITY</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.femaleSpecificGravity}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>COLOUR</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.femaleUrineColor}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    PH
                  </td>
                  <td className="font-size black">{refValue?.femaleUrinePh}</td>
                  <td className="font-size black">LEUCOCYTES</td>
                  <td className="font-size black">{refValue?.femaleUrineLeucocytes}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    GLUCOSE
                  </td>
                  <td className="font-size black">{refValue?.femaleGlucose}</td>
                  <td className="font-size black">PROTEIN</td>
                  <td className="font-size black">{refValue?.femaleProtein}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    BLOOD
                  </td>
                  <td className="font-size black">{refValue?.femaleBlood}</td>
                  <td className="font-size black">MICROSCOPY</td>
                  <td className="font-size black">{refValue?.femaleMicroscopy}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    RED BLOOD CELL
                  </td>
                  <td className="font-size black">{refValue?.femaleRedBloodCell}</td>
                  <td className="font-size black">WHITE BLOOD CELL</td>
                  <td className="font-size black">{refValue?.femaleWhiteBloodCell}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    EPITHELIAL CELL</td>
                  <td className="font-size black">{refValue?.femaleEpithelialCell}</td>
                  <td className="font-size black">CASTS</td>
                  <td className="font-size black">{refValue?.femaleCasts}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    CRYSTAL
                  </td>
                  <td className="font-size black">{refValue?.femaleCrystal}</td>
                  <td className="font-size black">BACTERIA</td>
                  <td className="font-size black">{refValue?.femaleBacteria}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    OTHERS
                  </td>
                  <td className="font-size black">{refValue?.otherRindings}</td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>




            {/*Section D: X-RAY FINDINGS*/}
            <h6 className='text-black-deep text-bold-700 '>Section D: X-RAY FINDINGS
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY TAKEN</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.dateOfXrayTaken}
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY REPORTED</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.dateOfXrayReported}</th>
                </tr>
              </thead>
            </table>


            {/*REPORT*/}
            <h6 className='text-black-deep text-bold-700 '>REPORT</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HEART SHAPE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.reportOfHeartShape}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SIZE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.reportOfHeartSize}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. LUNG FIELDS
                  </td>
                  <td className="font-size black">{refValue?.reportOfLungFields}</td>
                  <td className="font-size black">D. MEDIASTINUM & HILA</td>
                  <td className="font-size black">{refValue?.reportOfMediastinum}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. PLEURAL / HEMIDIAPHRAGMS
                  </td>
                  <td className="font-size black">{refValue?.reportOfPleuralHemidiaphragms}</td>
                  <td className="font-size black">F. COSTO-PHRENIC ANGLES</td>
                  <td className="font-size black">{refValue?.reportOfCostoPhrenic}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    G. TORACIC CASE
                  </td>
                  <td className="font-size black">{refValue?.reportOfToracicCase}</td>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.findingsOfFocalLesion}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER ABNORMALITIES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.findingsOfAbnormalities}</th>
                </tr>
              </thead>
            </table>



            {/*CONCLUTION OF MEDICAL STATUS:*/}
            <h6 className='text-black-deep text-bold-700 '>CONCLUTION OF MEDICAL STATUS:
            </h6>
            <h6 className='text-black-deep'>I have examined <strong> {`${patient?.gender === "MALE" ? "Mr." : ""} ${patient?.gender === "FEMALE" ? "Ms." : ""}  `} {patient?.fullName}
            </strong> , Passport Number – {patient?.passportNo}, <br /> <span>{`${patient?.gender === "MALE" ? "He is" : ""} ${patient?.gender === "FEMALE" ? "She is" : ""}  ${patient?.gender !== "MALE" && patient?.gender !== "FEMALE" ? "He/She are" : ""}   free from the following diseases.`}</span>
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV /AIDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.statusOfHivOrAids}</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. TB</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.statusOfTB}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. MALARIA
                  </td>
                  <td className="font-size black">{refValue?.statusOfMalaria}</td>
                  <td className="font-size black">D. HEPATITIS</td>
                  <td className="font-size black">{refValue?.statusOfHepatitis}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. STD
                  </td>
                  <td className="font-size black">{refValue?.statusOfSTD}</td>
                  <td className="font-size black">F. EPILEPSY</td>
                  <td className="font-size black">{refValue?.statusOfEpilepsy}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    G. CANCER
                  </td>
                  <td className="font-size black">{refValue?.statusOfCancer}</td>
                  <td className="font-size black">H. DRUGS</td>
                  <td className="font-size black">{refValue?.statusOfDrugs}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    I. LEPROSY
                  </td>
                  <td className="font-size black">{refValue?.statusOfLeprosy}</td>
                  <td className="font-size black">J. PREGNANCY</td>
                  <td className="font-size black">{refValue?.statusOfPregnancy}</td>
                </tr>
                <tr>
                  <td className="font-size black">
                    K. PSYCHIATRIC ILLENESS
                  </td>
                  <td className="font-size black">{refValue?.statusOfPsychiatricIll}</td>
                  <td className="font-size black">L. OTHERS </td>
                  <td className="font-size black">{refValue?.otherRindings}</td>
                </tr>
              </tbody>
            </table>



            {/* other details */}
            {report?.status ?
              <table className="table-bordered table ">
                <tbody>
                  <tr>
                    <td className="font-size black">
                      Mentioned above is the medical report for {patient.gender == 'MALE' || patient.gender == 'male' || patient.gender == 'Male' ? 'Mr' : 'Mrs'}. {patient.fullName}, Who is <span className={"font-weight-bolder"}>{report.status}</span> for the above mentioned job according to the Medical criteria.
                    </td>
                    <td className="font-weight-bolder font-size black" style={{ whiteSpace: "pre-line" }}>
                      {report?.status != null ? <img src={configuration.reportDoctorSeal} className={'width-100'} alt='' /> : ''}
                    </td>
                  </tr>
                  <tr>

                    <td className="font-size black">REMARK : {refValue.remark}</td>
                    <td className="font-size black">FINAL CHECKED BY : {refValue.modifiedDate}</td>
                  </tr>
                </tbody>
              </table> :

              <div>
                {/*FINDINGS*/}
                <h6 className='text-black-deep text-bold-700 '>( &nbsp;&nbsp;&nbsp;     ) Certify him/her as FIT for employment.
                </h6>
                <h6 className='text-black-deep text-bold-700 '>(   &nbsp;&nbsp;&nbsp;   ) He/ She is found to be UNFIT as per Malaysia ministry of health standards.
                </h6>
              </div>

            }

            <div className='mt-5 pt-4'>

              <div className='d-flex justify-content flex-column align-items-center' >
                <hr style={{ width: "200px", borderTop: "1px solid black" }} />
                <p className='text-black-deep '>Doctor’s Signature</p>
              </div>
              <div>
                <table
                  className=" table">
                  <thead style={{ textAlign: 'left' }}>
                    <tr>
                      <th className="font-size black border border-black border-top-0 py-0 " style={{ width: '15%', paddingLeft: '5px', fontWeight: "normal" }}>Dr. Name</th>
                      <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal" }}>{refValue?.nameOfDoctor}</th>
                      <th className="font-size black border border-black py-0" style={{ width: '15%', paddingLeft: '5px', fontWeight: "normal" }}>Date</th>
                      <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>{refValue?.date}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-size black">
                        Qualification
                      </td>
                      <td className="font-size black">{refValue?.qualification}</td>
                      <td className="font-size black">Hospital Address</td>
                      <td className="font-size black">{refValue?.hospitaladdress}</td>
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
