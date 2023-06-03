import React, { useEffect, useState } from 'react';
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { FORM, MODEL } from "../../utils/FormFields";
import PatientService from "../../services/PatientService";
import MalaysiService from "../../services/MalaysiaService";
import RefValuesService from "../../services/RefValuesService";
import moment from "moment";
import ReactToPrint from "react-to-print";
import AuthService from "../../services/AuthService";
import FuncUtil from "../../utils/FuncUtil";
import FormField from '../ui/FormField';
import { Console } from 'console';


function MedicalExaminationEditing(props: any) {
  const configuration = AuthService.getConfiguration();
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState(props.patient);
  const [medicalReport, setMedicalReport] = useState(MODEL.REF_VALUE);
  const [refValue, setRefValue] = useState(MODEL.MEDICALEXAMINATION);
  const [values, setValues] = useState({
    id: null,
    patientId: patient.id,
    asthama: "",
    epilepsy: "",
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
    nameOfDoctor: "",
    diabetes: "",


    date: "",
    hospitaladdress: "",
    qualification: "",
    modifiedDate: "",
    hiv: "",
    hypertension: "",
    tuberclosis: "",
    heartDisease: "",
    leporsy: "",
    bronchialAsthama: "",
    viralHeptites: "",
    diabetesMellitus: "",
    psychitricIllness: "",
    pepticUlcer: "",
    kidneyDeasese: "",
    cancer: "",
    others: "",
    sexTransDisease: "",
    malaria: "",
    height: "",
    deformities: "",
    weight: "",
    anemia: "",
    pulse: "",
    jaudice: "",
    bp: "",
    lne: "",
    bd: "",
    vaunaided: "",
    lmp: "",
    baided: "",
    chronicSkinRash: "",
    hearing: "",
    anSkinPatch: "",
    otherIfabNormalCOndition: "",

    // asthma: "",
    // fits: "",
    // yesRemark: "",
    // diabetes: "",
    // bloodPressure: "",
    // familyHistory: "",



  });

  const loadRefValues = () => {
    RefValuesService.find().then(response => {
      setMedicalReport(response.data);
    })
  };


  const onChange = (e: any) => {
    setValues({ ...values,[e.target.name]: e.target.value });
    // console.log(values);
  };

  const medicalExamEditHandler = (): void => {

    MalaysiService.uppdate(values).then(response => {

      setRefValue(response.data);
    })

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
    MalaysiService.findById(patient.id).then(response => {
      setRefValue(response.data);
      setValues(response.data);

    })
  }, [patient.id])
  const onChangeHandler = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSaving(true);
    MalaysiService.uppdate(refValue).then(response => {
      setIsSaving(false);
      setIsSaved(true);
      setIsError(false);
      setMessage("Malasiya Test Successfully Updated!");
    }).catch(reason => {
      setIsSaving(false);
      if (reason.response.status == 403) {
        setMessage("Sorry! Tou don't have permission to save medical test");
      } else {
        setMessage(reason.response.data.message);
      }
      setIsError(true);
      setIsSaved(false);
    })
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      {isSaved ? (
        <div className="alert alert-success mb-1 alert-icon-left" role="alert">
          <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
          {message}
        </div>) : ''}
      {isError ? (
        <div className="alert alert-danger mb-1 alert-icon-left" role="alert">
          <span className="alert-icon"> <i className="ft-thumbs-up"></i> </span>
          {message}
        </div>) : ''}

      <div className="card mb-0" >
        <div className="card-content collapse show">
          <div className="card-body">
            <div className="row">
              <div className="col-8">
                <h3 className="font-size mb-2" key={patient.id}>Edit Medical Examination Form of {patient.fullName}</h3>
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
                    <td colSpan={1} w-25 className="font-size black">
                      {patient.regNo}

                    </td>
                    <td colSpan={1} w-10 className="font-size black">COUNTRY NAME</td>
                    <td colSpan={1} w-15 className="font-size black">{patient.nationality}</td>



                  </tr>
                  <tr>
                    <td colSpan={1} w-25 className="font-size black">NAME</td>
                    <td colSpan={1} w-25 className="font-size black">

                      defaultValue={patient.fullName}
                    </td>
                    <td colSpan={1} w-25 className="font-size black">FATHER'S NAME</td>
                    <td colSpan={1} w-25 className="font-size black">{patient.fathersName} </td>

                  </tr>
                  <tr>

                    <td className="font-size w-25 black">PASSPORT NO.</td>
                    <td className="font-size w-25 black">{patient?.passportNo}     </td>
                    <td className="font-size w-25 black">DATE OF BIRTH</td>
                    <td className="font-size w-25 black"><p>{patient.dateOfBirth}</p></td>

                  </tr>
                  <tr>
                    <td className="font-size w-25 black">AGENCY</td>
                    <td className="font-size w-25 black"> {patient?.agentOrAgencyName} </td>

                    <td className='w-25'>
                      <tr className='w-100'>
                        <td className="font-size border-border-left-0 border-top-0 border-bottom-0 black" style={{ width: '100px' }}>AGE</td>
                        <td className="font-size border-0 w-50 black">25</td>

                      </tr>
                    </td>


                    <tr className='w-25'>
                      <td className="font-size border-top-0 border-left-0 border-bottom-0 black" style={{ width: '100px' }}>Sex</td>
                      <td className="font-size border-0 w-50 black">{patient?.Sex}</td>

                    </tr>

                  </tr>
                  <tr>
                    <td className="font-size black">ADDRESS</td>
                    <td colSpan={3} className="w-full font-size black"> {patient?.presentAddress} </td>

                  </tr>
                </tbody>
              </table>

              <h6 className='text-black-deep text-bold-700'>Personal Medical History
              </h6>
              <table className="table-bordered table">
                <tbody>
                  <tr>
                    <td className="font-size w-25  black">ASTHMA</td>
                    <td className="font-size  black"><input
                      onChange={onChange}
                      name="asthama"
                      defaultValue={refValue?.asthama}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size  black"> </td>
                    <td className="font-size w-25 black">EPILEPSY /FITS</td>
                    <td className="font-size  black"><input
                      onChange={onChange}
                      type="text"

                      name="epilepsy"
                      defaultValue={refValue.epilepsy}
                      className='medicalInput border-0 w-100 ' /> </td>
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


                      <input
                        onChange={onChange}
                        name='remark'
                        defaultValue={refValue?.remark}
                        type="text"
                        className='medicalInput border-0 w-100 ' />
                    </td>
                  </tr>
                </tbody>
              </table>




              <table className="table-bordered table mt-3">
                <tbody>
                  <tr>
                    <td className="font-size w-25 black">Diabetes</td>
                    <td className="font-size black"><input
                      onChange={onChange}
                      name='diabetes'
                      defaultValue={refValue?.diabetes}
                      type="text"
                      className='medicalInput border-0 w-100 ' />  </td>
                    <td className="font-size black"> </td>
                    <td className="font-size w-25 black">Blood Pressure</td>
                    <td className="font-size black"><input
                      onChange={onChange}
                      type="text"
                      name='bloodPressure'
                      defaultValue={refValue?.bloodPressure}
                      className='medicalInput border-0 w-100 ' />  </td>
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
                      <input
                        onChange={onChange}
                        name='familyHistory'
                        defaultValue={refValue?.familyHistory
                        }
                        type="text"
                        className='medicalInput border-0 w-100 ' />
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

              {/* disease */}
              <h6 className='text-black-deep text-bold-700 mt-3'>Disease</h6>
              <table className="table-bordered table">
                <thead style={{ textAlign: 'left' }}>
                  <tr>
                    <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DISEASES</th>
                    <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>COMMENT</th>
                    {/* <th className="font-size black border border-black py-0" style={{ width: '10%' }}>DATE</th> */}
                    <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DISEASES</th>
                    <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>COMMENT</th>
                    {/* <th className="font-size black border border-black py-0" style={{ width: '10%' }}>DATE</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      HIV/ AIDS
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='hiv'
                      defaultValue={refValue?.hiv}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   HYPERTENSION
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text"
                      defaultValue={refValue.hypertension}
                      name='hypertension'
                      className='medicalInput border-0 w-100 ' /> </td>

                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      TUBERCULOSIS
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text" name='tuberclosis'
                      defaultValue={refValue.tuberclosis}
                      className='medicalInput border-0 w-100 ' /> </td>

                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   HEART DISEASES
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='heartDisease'
                      defaultValue={refValue.heartDisease}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      LEPROSY
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='leporsy'
                      defaultValue={refValue.leporsy}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   BRONCHIAL ASTHMA
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='bronchialAsthama'
                      defaultValue={refValue.bronchialAsthama}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      VIRAL HEPATITIS
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='viralHeptites'
                      defaultValue={refValue.viralHeptites}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   DIABETES MELLITUS
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='diabetesMellitus'
                      defaultValue={refValue.diabetesMellitus}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      PSYCHIATRIC ILLNESS
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='psychitricIllness'
                      defaultValue={refValue.psychitricIllness}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   PEPTIC ULCER
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text"
                      name='pepticUlcer'
                      defaultValue={refValue.pepticUlcer}
                      className='medicalInput border-0 w-100 ' /> </td>

                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      EPILEPSY
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='epilepsy'
                      defaultValue={refValue.epilepsy}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   KIDNEY DISEASES
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='kidneyDeasese'
                      defaultValue={refValue.kidneyDeasese}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      CANCER
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='cancer'
                      defaultValue={refValue.cancer}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   OTHERS
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='others'
                      defaultValue={refValue.others}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>

                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      SEXTUALLY TRANSMITED <br /> DISEASES
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='sexTransDisease'
                      defaultValue={refValue.sexTransDisease}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>  </td>
                    {/* <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> </td> */}
                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      MALARIA
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='malaria'
                      defaultValue={refValue.malaria}
                      type="text"

                      className='medicalInput border-0 w-100 ' /> </td>
                    {/* <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td> */}
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                    </td>
                    {/* <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td> */}
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>  </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      Foreign workers found with diseases /conditions where the workers are considered unsuitable for employment in Malaysia, if the medical test /examination is positive
                    </td>

                    <td colSpan={3} className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>Foreign workers found with incurable or chronic diseases / conditions where they need prolonged and extensive treatment may also be found unsuitable for employment in Malaysia.</td>
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
                    <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>HEIGHT</th>
                    <th className="font-size black border border-black  " style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}> <input
                      onChange={onChange}
                      name='height'
                      defaultValue={refValue?.height}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </th>
                    <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DEFOMITIES OF LIMBS</th>
                    <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text"
                      name='deformities'
                      defaultValue={refValue?.deformities}
                      className='medicalInput border-0 w-100 ' /> </th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      WEIGHT
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='weight'
                      defaultValue={refValue?.weight}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   ANAEMIA
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='anemia'
                      defaultValue={refValue?.anemia}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>


                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      PULSE
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='pulse'
                      defaultValue={refValue?.pulse}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   JAUNDICE
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='jaudice'
                      type="text"
                      defaultValue={refValue?.jaudice}
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      BLOOD PRESSURE   A - SYSTOLIC
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='bp'
                      defaultValue={refValue?.bp}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   LYMPH NODE ENLARGEMENT
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='lne'
                      defaultValue={refValue?.lne}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      B - DIASTOLIC
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='bd'

                      defaultValue={refValue?.bd}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   Vision test A – Unaided
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text"
                      name='vaunaided'
                      defaultValue={refValue?.vaunaided}
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      LAST MENSTRUAL PERIOD DATE
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      defaultValue={refValue?.lmp}
                      name='lmp'
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   B – Aided
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      defaultValue={refValue?.baided}
                      name='baided'
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      CHRONIC SKIN RASH
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      defaultValue={refValue?.chronicSkinRash}
                      name='chronicSkinRash'
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   HEARING
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='hearing'
                      type="text" defaultValue={refValue?.hearing}
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>
                  <tr>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      ANAESTHETIC SKIN PATCH
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      name='anSkinPatch'
                      defaultValue={refValue?.anSkinPatch}
                      type="text"
                      className='medicalInput border-0 w-100 ' /> </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>                   OTHERS (if abnormal, describe under comment)
                    </td>
                    <td className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                      onChange={onChange}
                      type="text"
                      name="otherIfabNormalCOndition"
                      defaultValue={refValue?.otherIfabNormalCOndition}
                      className='medicalInput border-0 w-100 ' /> </td>
                  </tr>
                  <tr>
                    <td rowSpan={3} className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      COMMENTS (Refer To Part- III,<br /> Sec-A)
                    </td>
                    <td colSpan={3} className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>

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
                    <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                      <input name='heartSize' type="text"
                        onChange={onChange} defaultValue={refValue?.heartSize}
                        className='medicalInput border-0 w-100 ' />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SOUND</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                      <input
                        onChange={onChange} defaultValue={refValue?.heartSound}
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
                        onChange={onChange} defaultValue={refValue?.breathSound}
                        className='medicalInput border-0 w-100 ' />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER RINDINGS </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange} defaultValue={refValue?.otherRindings}
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
                        onChange={onChange} defaultValue={refValue?.liver}
                        name='liver' type="text"
                        className='medicalInput border-0 w-100 ' />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPLEEN </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='spleen' type="text"
                        defaultValue={refValue?.spleen}
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
                        defaultValue={refValue?.mentalStatus}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPEECH  </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>      <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='mentalSpeech' type="text"
                      defaultValue={refValue?.mentalSpeech}
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
                        defaultValue={refValue?.mentalMotorPower}
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
                        defaultValue={refValue?.varicoseVeins}
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
                        defaultValue={refValue?.mentalRefleses}
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
                      defaultValue={refValue?.genitourinaryKidney}
                    /></th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DISCHARGE </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='genitourinaryDischarge' type="text"
                        defaultValue={refValue?.genitourinaryDischarge}
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
                        defaultValue={refValue?.genitourinarySoresOrUlcer}
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
                        defaultValue={refValue?.laboratoryReceivedDate}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DATE OF LAB REPORT </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='laboratoryReportDateOfLab' type="text"
                        defaultValue={refValue?.laboratoryReportDateOfLab}
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
                        defaultValue={refValue?.bloodGroup}
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
                          defaultValue={refValue?.serologyHivAntibody}
                        />
                      </th>
                      <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HB<small>s</small>AG</th>
                      <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                        <input
                          onChange={onChange}
                          className='medicalInput border-0 w-100 '
                          name='serologyHbsAG' type="text"
                          defaultValue={refValue?.serologyHbsAG}
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
                          defaultValue={refValue?.serologyVdrl}
                        />
                      </td>
                      <td className="font-size black">D. MALARIA PARASITE</td>
                      <td className="font-size black">
                        <input
                          onChange={onChange}
                          className='medicalInput border-0 w-100 '
                          name='serologyMalariaParasite' type="text"
                          defaultValue={refValue?.serologyMalariaParasite}
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
                          defaultValue={refValue?.serologyFBS}
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
                        defaultValue={refValue?.urineOpiates}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. CANNABINOIDS</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='cannabinoids' type="text"
                        defaultValue={refValue?.cannabinoids}
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
                        defaultValue={refValue?.urineHcg}
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
                        defaultValue={refValue?.femaleSpecificGravity}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>COLOUR</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='femaleUrineColor' type="text"
                        defaultValue={refValue?.femaleUrineColor}
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
                        defaultValue={refValue?.femaleUrinePh}
                      />
                    </td>
                    <td className="font-size black">LEUCOCYTES</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='femaleUrineLeucocytes' type="text"
                        defaultValue={refValue?.femaleUrineLeucocytes}
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
                        defaultValue={refValue?.femaleGlucose}
                      />
                    </td>
                    <td className="font-size black">PROTEIN</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='femaleProtein' type="text"
                        defaultValue={refValue?.femaleProtein}
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
                        defaultValue={refValue?.femaleBlood}
                      />
                    </td>
                    <td className="font-size black">MICROSCOPY</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='femaleMicroscopy' type="text"
                        defaultValue={refValue?.femaleMicroscopy}
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
                        defaultValue={refValue?.femaleRedBloodCell}
                      />
                    </td>
                    <td className="font-size black">WHITE BLOOD CELL</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='femaleWhiteBloodCell' type="text"
                        defaultValue={refValue?.femaleWhiteBloodCell}
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
                        defaultValue={refValue?.femaleEpithelialCell}
                      />
                    </td>
                    <td className="font-size black">CASTS</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='femaleCasts' type="text"
                        defaultValue={refValue?.femaleCasts}
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
                        defaultValue={refValue?.femaleCrystal}
                      />
                    </td>
                    <td className="font-size black">BACTERIA</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='femaleBacteria' type="text"
                        defaultValue={refValue?.femaleBacteria}
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
                        defaultValue={refValue?.femaleOthers}
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
                        defaultValue={refValue?.dateOfXrayTaken}
                      />

                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY REPORTED</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='dateOfXrayReported' type="text"
                        defaultValue={refValue?.dateOfXrayReported}
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
                        defaultValue={refValue?.reportOfHeartShape}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SIZE</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='reportOfHeartSize' type="text"
                        defaultValue={refValue?.reportOfHeartSize}
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
                        defaultValue={refValue?.reportOfLungFields}
                      />
                    </td>
                    <td className="font-size black">D. MEDIASTINUM & HILA</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='reportOfMediastinum' type="text"
                        defaultValue={refValue?.reportOfMediastinum}
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
                        defaultValue={refValue?.reportOfPleuralHemidiaphragms}
                      />
                    </td>
                    <td className="font-size black">F. COSTO-PHRENIC ANGLES</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='reportOfCostoPhrenic' type="text"
                        defaultValue={refValue?.reportOfCostoPhrenic}
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
                        defaultValue={refValue?.reportOfToracicCase}
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
                        defaultValue={refValue?.findingsOfFocalLesion}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER ABNORMALITIES</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='findingsOfAbnormalities' type="text"
                        defaultValue={refValue?.findingsOfAbnormalities}
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
                        defaultValue={refValue?.statusOfHivOrAids}
                      />
                    </th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. TB</th>
                    <th className="font-size black border border-black py-0" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='statusOfTB' type="text"
                        defaultValue={refValue?.statusOfTB}
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
                        defaultValue={refValue?.statusOfMalaria}
                      />
                    </td>
                    <td className="font-size black">D. HEPATITIS</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='statusOfHepatitis' type="text"
                        defaultValue={refValue?.statusOfHepatitis}
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
                        defaultValue={refValue?.statusOfSTD}
                      />
                    </td>
                    <td className="font-size black">F. EPILEPSY</td>
                    <td className="font-size black">   <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfEpilepsy' type="text"
                      defaultValue={refValue?.statusOfEpilepsy}
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
                        defaultValue={refValue?.statusOfCancer}
                      />
                    </td>
                    <td className="font-size black">H. DRUGS</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='statusOfDrugs' type="text"
                        defaultValue={refValue?.statusOfDrugs}
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
                        defaultValue={refValue?.statusOfLeprosy}
                      />
                    </td>
                    <td className="font-size black">J. PREGNANCY</td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='statusOfPregnancy' type="text"
                        defaultValue={refValue?.statusOfPregnancy}
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
                        defaultValue={refValue?.statusOfPsychiatricIll}
                      />
                    </td>
                    <td className="font-size black">L. OTHERS </td>
                    <td className="font-size black">
                      <input
                        onChange={onChange}
                        className='medicalInput border-0 w-100 '
                        name='statusOfOther' type="text"
                        defaultValue={refValue?.statusOfOther}
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
                            defaultValue={refValue?.nameOfDoctor}
                          />
                        </th>
                        <th className="font-size black border  border-black py-0" style={{ width: '15%', paddingLeft: '5px', fontWeight: "normal" }}>Date</th>
                        <th className="font-size black border border-black py-0" style={{ width: '30%', paddingLeft: '5px', fontWeight: "normal" }}> <input
                          onChange={onChange}
                          type="text"

                          className='medicalInput border-0 w-100 ' /> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-size black">
                          Qualification
                        </td>
                        <td className="font-size black"> <input
                          onChange={onChange}
                          type="text"
                          className='medicalInput border-0 w-100 ' /> </td>
                        <td className="font-size black">Hospital Address</td>
                        <td className="font-size black"> <input
                          onChange={onChange}
                          type="text"
                          className='medicalInput border-0 w-100 ' /> </td>
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
    </form>
  );
}

export default MedicalExaminationEditing;
