import React, { useEffect, useState } from 'react';
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { FORM, MODEL } from "../../utils/FormFields";
import PatientService from "../../services/PatientService";
import RefValuesService from "../../services/RefValuesService";
import moment from "moment";
import ReactToPrint from "react-to-print";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import FormField from '../ui/FormField';

function MedicalExaminationEditing(props: any) {
  const configuration = AuthService.getConfiguration();
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [patient, setPatient] = useState(props.patient);
  const [medicalReport, setMedicalReport] = useState(MODEL.MEDICALEXAMINATION);
  const [refValue, setRefValue] = useState(MODEL.REF_VALUE);
  const [values, setValues] = useState({
    id: null,
    heartSize: "",
    heartSound: "",
    breathSound: "",
    otherRindings: "",
    liver: "",
    spleen: "",
    mentalStatus: "",
    mentalSpeech: "",
    mentalMotorPower: "",
    varicoseVeins: "",
    mentalRefleses: "",
    dateOfXrayTaken: "",
    dateOfXrayReported: "",
    urineOpiates: "",
    cannabinoids: "",
    urineHcg: "",
    statusOfHivOrAids: "",
    statusOfTB: "",
    statusOfMalaria: "",
    statusOfHepatitis: "",
    statusOfSTD: "",
    statusOfEpilepsy: "",
    statusOfCancer: "",
    statusOfDrugs: "",
    statusOfLeprosy: "",
    statusOfPregnancy: "",
    statusOfPsychiatricIll: "",
    statusOfOther: "",
    genitourinaryKidney: "",
    genitourinaryDischarge: "",
    genitourinarySoresOrUlcer: "",
    laboratoryReceivedDate: "",
    laboratoryReportDateOfLab: "",
    bloodGroup: "",
    femaleSpecificGravity: "",
    femaleUrineColor: "",
    femaleUrinePh: "",
    femaleUrineLeucocytes: "",
    femaleGlucose: "",
    femaleProtein: "",
    femaleBlood: "",
    femaleMicroscopy: "",
    femaleRedBloodCell: "",
    femaleWhiteBloodCell: "",
    femaleEpithelialCell: "",
    femaleCasts: "",
    femaleCrystal: "",
    femaleBacteria: "",
    femaleOthers: "",
    serologyHivAntibody: "",
    serologyHbsAG: "",
    serologyVdrl: "",
    serologyMalariaParasite: "",
    serologyFBS: "",
    reportOfHeartShape: "",
    reportOfHeartSize: "",
    reportOfLungFields: "",
    reportOfMediastinum: "",
    reportOfPleuralHemidiaphragms: "",
    reportOfCostoPhrenic: "",
    reportOfToracicCase: "",
    findingsOfFocalLesion: "",
    findingsOfAbnormalities: "",
    remarkStatus: "",
    remark: "",
    nameOfDoctor: ""
  });

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const medicalExamEditHandler = (): void => {
    console.log(values);
  }
  const { onCancel } = props;
  const handleCancel = () => {
    onCancel()
  }

  useEffect(() => {
    PatientService.findById(patient.id).then(response => {
      setPatient(response.data);
      setMedicalReport(response.data.report);
    })
    RefValuesService.find().then(response => {
      setRefValue(response.data);
    })
  }, [patient?.id])
  const onChangeHandler = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="card mb-0">
      <div className="card-content collapse show">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <h3 className="font-size mb-2">Edit Medical Examination Form of {patient.fullName}</h3>
            </div>

          </div>
          <div className={'printable mx-3 my-2'} id={'patient-report-print-content'}>
            <div className={'row'}>
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
                      <p>CONTACT NO. : {configuration.reportContactNumber} </p>
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
                <h4 className={'font-weight-600 text-black-deep'}>Medical Examination
                  Report</h4>
                <p className='text-bold-600 text-black-deep'>Foreign Worker
                </p>
              </div>
            </div>

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




            <table className="table-bordered table mt-3">
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
            <h6 className='text-black-deep text-bold-500 mt-3'>Family History (Parents with history of diabetes, blood pressure and heart diseases)
            </h6>
            <table className="table-bordered table">
              <tbody>
                <tr>
                  <td rowSpan={5} className="font-size black">
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>

            {/* signature */}
            <div className='py-5 my-5 d-flex justify-content-between text-center text-black-50 '>

              <div className='pl-3'>
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

            {/* part: 2 */}
            <div>
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
                  <th className="font-size black border border-black py-0" style={{ width: '10%' }}>COMMENT</th>
                  <th className="font-size black border border-black py-0" style={{ width: '10%' }}>DATE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '20%', paddingLeft: '5px' }}>DISEASES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '10%' }}>COMMENT</th>
                  <th className="font-size black border border-black py-0" style={{ width: '10%' }}>DATE</th>
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


            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>HEIGHT</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}></th>
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
                  <td rowSpan={3} className="font-size text-bold-600 black">
                    COMMENTS (Refer To Part- III,<br /> Sec-A)
                  </td>
                  <td colSpan={3} className="font-size black"></td>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input name='heartSize' type="text"
                      onChange={onChange} defaultValue={medicalReport?.heartSize}
                      className='medicalInput border-0 w-100 ' />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SOUND</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange} defaultValue={medicalReport?.heartSound}
                      name='heartSound' type="text"
                      className='medicalInput border-0 w-100 ' />
                  </th>

                </tr>
              </thead>
            </table>

            {/* RESPIRATORY SYSTEM */}

            <h6 className='text-black-deep text-bold-700 '>RESPIRATORY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. BREATH SOUNDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input name='breathSound' type="text"
                      onChange={onChange} defaultValue={medicalReport?.breathSound}
                      className='medicalInput border-0 w-100 ' />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER RINDINGS </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange} defaultValue={medicalReport?.otherRindings}
                      name='otherRindings' type="text"
                      className='medicalInput border-0 w-100 ' />
                  </th>

                </tr>
              </thead>
            </table>

            {/* GASTROINTESTINAL */}
            <h6 className='text-black-deep text-bold-700 '>RGASTROINTESTINAL</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. LIVER</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange} defaultValue={medicalReport?.liver}
                      name='liver' type="text"
                      className='medicalInput border-0 w-100 ' />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPLEEN </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='spleen' type="text"
                      defaultValue={medicalReport?.spleen}
                    />

                  </th>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='mentalStatus' type="text"
                      defaultValue={medicalReport?.mentalStatus}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPEECH  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>      <input
                    onChange={onChange}
                    className='medicalInput border-0 w-100 '
                    name='mentalSpeech' type="text"
                    defaultValue={medicalReport?.mentalSpeech}
                  /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. MOTOR POWER
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='mentalMotorPower' type="text"
                      defaultValue={medicalReport?.mentalMotorPower}
                    />
                  </td>
                  <td className="font-size black">
                    D. SENSORY
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='varicoseVeins' type="text"
                      defaultValue={medicalReport?.varicoseVeins}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. REFLESES
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='mentalRefleses' type="text"
                      defaultValue={medicalReport?.mentalRefleses}
                    />
                  </td>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>  <input
                    onChange={onChange}
                    className='medicalInput border-0 w-100 '
                    name='genitourinaryKidney' type="text"
                    defaultValue={medicalReport?.genitourinaryKidney}
                  /></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DISCHARGE </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='genitourinaryDischarge' type="text"
                      defaultValue={medicalReport?.genitourinaryDischarge}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. SORES/ ULCER
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='genitourinarySoresOrUlcer' type="text"
                      defaultValue={medicalReport?.genitourinarySoresOrUlcer}
                    />
                  </td>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='laboratoryReceivedDate' type="text"
                      defaultValue={medicalReport?.laboratoryReceivedDate}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DATE OF LAB REPORT </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='laboratoryReportDateOfLab' type="text"
                      defaultValue={medicalReport?.laboratoryReportDateOfLab}
                    />
                  </th>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='bloodGroup' type="text"
                      defaultValue={medicalReport?.bloodGroup}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>


            {/*Serology */}
            <div className='mt-5 pt-4'>
              <h6 className='text-black-deep text-bold-700 '>Serology</h6>
              <table className="table-bordered table">
                <thead style={{ textAlign: 'left' }}>
                  <tr>
                    <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV ANTIBODY</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='serologyHivAntibody' type="text"
                        defaultValue={medicalReport?.serologyHivAntibody}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HB<small>s</small>AG</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='serologyHbsAG' type="text"
                        defaultValue={medicalReport?.serologyHbsAG}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-size black">
                      C. VDRL
                    </td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='serologyVdrl' type="text"
                        defaultValue={medicalReport?.serologyVdrl}
                      />
                    </td>
                    <td className="font-size black">D. MALARIA PARASITE</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='serologyMalariaParasite' type="text"
                        defaultValue={medicalReport?.serologyMalariaParasite}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="font-size black">
                      E. F.B.S.
                    </td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='serologyFBS' type="text"
                        defaultValue={medicalReport?.serologyFBS}
                      />
                    </td>
                    <td className="font-size black"></td>
                    <td className="font-size black"></td>
                  </tr>
                </tbody>
              </table>
            </div>



            {/*Urine Drug Screening */}
            <h6 className='text-black-deep text-bold-700 '>Urine Drug Screening</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. OPIATES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='urineOpiates' type="text"
                      defaultValue={medicalReport?.urineOpiates}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. CANNABINOIDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='cannabinoids' type="text"
                      defaultValue={medicalReport?.cannabinoids}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. URINE HCG
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='urineHcg' type="text"
                      defaultValue={medicalReport?.urineHcg}
                    />
                  </td>
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
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleSpecificGravity' type="text"
                      defaultValue={medicalReport?.femaleSpecificGravity}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>COLOUR</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleUrineColor' type="text"
                      defaultValue={medicalReport?.femaleUrineColor}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    PH
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleUrinePh' type="text"
                      defaultValue={medicalReport?.femaleUrinePh}
                    />
                  </td>
                  <td className="font-size black">LEUCOCYTES</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleUrineLeucocytes' type="text"
                      defaultValue={medicalReport?.femaleUrineLeucocytes}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    GLUCOSE
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleGlucose' type="text"
                      defaultValue={medicalReport?.femaleGlucose}
                    />
                  </td>
                  <td className="font-size black">PROTEIN</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleProtein' type="text"
                      defaultValue={medicalReport?.femaleProtein}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    BLOOD
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleBlood' type="text"
                      defaultValue={medicalReport?.femaleBlood}
                    />
                  </td>
                  <td className="font-size black">MICROSCOPY</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleMicroscopy' type="text"
                      defaultValue={medicalReport?.femaleMicroscopy}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    RED BLOOD CELL
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleRedBloodCell' type="text"
                      defaultValue={medicalReport?.femaleRedBloodCell}
                    />
                  </td>
                  <td className="font-size black">WHITE BLOOD CELL</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleWhiteBloodCell' type="text"
                      defaultValue={medicalReport?.femaleWhiteBloodCell}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    EPITHELIAL CELL</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleEpithelialCell' type="text"
                      defaultValue={medicalReport?.femaleEpithelialCell}
                    />
                  </td>
                  <td className="font-size black">CASTS</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleCasts' type="text"
                      defaultValue={medicalReport?.femaleCasts}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    CRYSTAL
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleCrystal' type="text"
                      defaultValue={medicalReport?.femaleCrystal}
                    />
                  </td>
                  <td className="font-size black">BACTERIA</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleBacteria' type="text"
                      defaultValue={medicalReport?.femaleBacteria}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    OTHERS
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleOthers' type="text"
                      defaultValue={medicalReport?.femaleOthers}
                    />
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>




            {/*Section D: X-RAY FINDINGS*/}
            <h6 className='text-black-deep text-bold-700 mt-2 '>Section D: X-RAY FINDINGS
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY TAKEN</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='dateOfXrayTaken' type="text"
                      defaultValue={medicalReport?.dateOfXrayTaken}
                    />

                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY REPORTED</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='dateOfXrayReported' type="text"
                      defaultValue={medicalReport?.dateOfXrayReported}
                    />
                  </th>
                </tr>
              </thead>
            </table>


            {/*REPORT*/}
            <h6 className='text-black-deep text-bold-700 mt-2'>REPORT</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HEART SHAPE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfHeartShape' type="text"
                      defaultValue={medicalReport?.reportOfHeartShape}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SIZE</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfHeartSize' type="text"
                      defaultValue={medicalReport?.reportOfHeartSize}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. LUNG FIELDS
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfLungFields' type="text"
                      defaultValue={medicalReport?.reportOfLungFields}
                    />
                  </td>
                  <td className="font-size black">D. MEDIASTINUM & HILA</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfMediastinum' type="text"
                      defaultValue={medicalReport?.reportOfMediastinum}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. PLEURAL / HEMIDIAPHRAGMS
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfPleuralHemidiaphragms' type="text"
                      defaultValue={medicalReport?.reportOfPleuralHemidiaphragms}
                    />
                  </td>
                  <td className="font-size black">F. COSTO-PHRENIC ANGLES</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfCostoPhrenic' type="text"
                      defaultValue={medicalReport?.reportOfCostoPhrenic}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    G. TORACIC CASE
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfToracicCase' type="text"
                      defaultValue={medicalReport?.reportOfToracicCase}
                    />
                  </td>
                  <td className="font-size black"></td>
                  <td className="font-size black"></td>
                </tr>
              </tbody>
            </table>




            {/*FINDINGS*/}
            <h6 className='text-black-deep text-bold-700 mt-2'>FINDINGS</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. FOCAL LESION</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='findingsOfFocalLesion' type="text"
                      defaultValue={medicalReport?.findingsOfFocalLesion}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER ABNORMALITIES</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='findingsOfAbnormalities' type="text"
                      defaultValue={medicalReport?.findingsOfAbnormalities}
                    />
                  </th>
                </tr>
              </thead>
            </table>



            {/*CONCLUTION OF MEDICAL STATUS:*/}
            <h6 className='text-black-deep text-bold-700 my-1'>CONCLUTION OF MEDICAL STATUS:
            </h6>
            <h6 className='text-black-deep'>I have examined <strong> {`${patient?.gender === "MALE" ? "Mr." : ""} ${patient?.gender === "FEMALE" ? "Ms." : ""}  `} {patient?.fullName}
            </strong> , Passport Number – {patient?.passportNo}, <br /> <span>{`${patient?.gender === "MALE" ? "He is" : ""} ${patient?.gender === "FEMALE" ? "She is" : ""}  ${patient?.gender !== "MALE" && patient?.gender !== "FEMALE" ? "He/She are" : ""}   free from the following diseases.`}</span>
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black py-0 " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV /AIDS</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfHivOrAids' type="text"
                      defaultValue={medicalReport?.statusOfHivOrAids}
                    />
                  </th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. TB</th>
                  <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfTB' type="text"
                      defaultValue={medicalReport?.statusOfTB}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-size black">
                    C. MALARIA
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfMalaria' type="text"
                      defaultValue={medicalReport?.statusOfMalaria}
                    />
                  </td>
                  <td className="font-size black">D. HEPATITIS</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfHepatitis' type="text"
                      defaultValue={medicalReport?.statusOfHepatitis}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    E. STD
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfSTD' type="text"
                      defaultValue={medicalReport?.statusOfSTD}
                    />
                  </td>
                  <td className="font-size black">F. EPILEPSY</td>
                  <td className="font-size black">   <input
                    onChange={onChange}
                    className='medicalInput border-0 w-100 '
                    name='statusOfEpilepsy' type="text"
                    defaultValue={medicalReport?.statusOfEpilepsy}
                  /></td>
                </tr>
                <tr>
                  <td className="font-size black">
                    G. CANCER
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfCancer' type="text"
                      defaultValue={medicalReport?.statusOfCancer}
                    />
                  </td>
                  <td className="font-size black">H. DRUGS</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfDrugs' type="text"
                      defaultValue={medicalReport?.statusOfDrugs}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    I. LEPROSY
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfLeprosy' type="text"
                      defaultValue={medicalReport?.statusOfLeprosy}
                    />
                  </td>
                  <td className="font-size black">J. PREGNANCY</td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfPregnancy' type="text"
                      defaultValue={medicalReport?.statusOfPregnancy}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">
                    K. PSYCHIATRIC ILLENESS
                  </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfPsychiatricIll' type="text"
                      defaultValue={medicalReport?.statusOfPsychiatricIll}
                    />
                  </td>
                  <td className="font-size black">L. OTHERS </td>
                  <td className="font-size black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfOther' type="text"
                      defaultValue={medicalReport?.statusOfOther}
                    />
                  </td>
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
            <div className='mt-5 pt-4'>
              <div className='d-flex justify-content flex-column align-items-center' >
                <hr style={{ width: "200px", borderTop: "1px solid black" }} />
                <p className='text-black-deep '>Doctor’s Signature</p>
              </div>

              <div className=''>
                <table
                  className=" table">
                  <thead style={{ textAlign: 'left' }}>
                    <tr>
                      <th className="font-size black border border-black border-top-0 py-0 " style={{ width: '15%', paddingLeft: '5px', fontWeight: "normal" }}>Dr. Name</th>
                      <th className="font-size black border border-black py-0" style={{ width: '30%', fontWeight: "normal", paddingLeft: '5px' }}>
                        <input
                          onChange={onChange}
                          className='medicalInput border-0 w-100 '
                          name='nameOfDoctor' type="text"
                          defaultValue={medicalReport?.nameOfDoctor}
                        />
                      </th>
                      <th className="font-size black border  border-black py-0" style={{ width: '15%', paddingLeft: '5px', fontWeight: "normal" }}>Date</th>
                      <th className="font-size black border border-black py-0" style={{ width: '30%', paddingLeft: '5px', fontWeight: "normal" }}></th>
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
            <h4 className="form-section mt-2">Doctor Remark</h4>
            <div className="row">
              {FORM?.MEDICAL_FORM_EXTRA_FIELDS.map((input) => (
                <FormField key={input?.id} {...input} onChange={onChangeHandler} defaultValue={patient[input?.name]} />
              ))}
            </div>

          </div>
          <div className="form-actions ml-3">
            <button
              onClick={handleCancel}
              type="button" className="btn btn-danger mr-1" >
              <i className="ft-x"></i> Cancel
            </button>
            <button
              onClick={medicalExamEditHandler}
              type="submit" className="btn btn-primary" >
              <i className="ft-save"></i> Update &nbsp;
              {
                isLoading ?
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ""}
            </button>
          </div>
        </div>

      </div>

    </div >
  );
}

export default MedicalExaminationEditing;
