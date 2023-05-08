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

function MalaysiaValuesForm(props: any) {
  const configuration = AuthService.getConfiguration();
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [patient, setPatient] = useState(props.patient);
  const [medicalReport, setMedicalReport] = useState(MODEL.MEDICALEXAMINATION);
  const [values, setValues] = useState({
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
    findingsOfAbnormalities: ""
  });

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  const mystyle = {
    paddingLeft: "5px"
  };


  const updateMalaysiaValues = (): void => {
    console.log(values);
  }


  return (
    <div className="card mb-0">
      <div className="card-content collapse show">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <h3 className="font-size mb-2">Malaysia Values</h3>
            </div>

          </div>
          <div >
            {/* section b system examination */}

            <h6 className='text-black-deep text-bold-700'>Section B: System Examination
            </h6>
            <h6 className='text-black-deep text-bold-700 '>CARDIO VASCULAR SYSTEM
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HEART SIZE</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input name='heartSize' type="text"
                      onChange={onChange} defaultValue={medicalReport?.heartSize}
                      className='medicalInput border-0 w-100 ' />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SOUND</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
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
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. BREATH SOUNDS</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input name='breathSound' type="text"
                      onChange={onChange} defaultValue={medicalReport?.breathSound}
                      className='medicalInput border-0 w-100 ' />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER RINDINGS </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. LIVER</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange} defaultValue={medicalReport?.liver}
                      name='liver' type="text"
                      className='medicalInput border-0 w-100 ' />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPLEEN </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. STATUS</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='mentalStatus' type="text"
                      defaultValue={medicalReport?.mentalStatus}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. SPEECH  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>      <input
                    onChange={onChange}
                    className='medicalInput border-0 w-100 '
                    name='mentalSpeech' type="text"
                    defaultValue={medicalReport?.mentalSpeech}
                  /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    C. MOTOR POWER
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='mentalMotorPower' type="text"
                      defaultValue={medicalReport?.mentalMotorPower}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    D. SENSORY
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='varicoseVeins' type="text"
                      defaultValue={medicalReport?.varicoseVeins}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    E. REFLESES
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='mentalRefleses' type="text"
                      defaultValue={medicalReport?.mentalRefleses}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                </tr>
              </tbody>
            </table>


            {/*GENITOURINARY SYSTEM */}
            <h6 className='text-black-deep text-bold-700 '>GENITOURINARY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. KIDNEY</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>  <input
                    onChange={onChange}
                    className='medicalInput border-0 w-100 '
                    name='genitourinaryKidney' type="text"
                    defaultValue={medicalReport?.genitourinaryKidney}
                  /></th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DISCHARGE </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <td style={mystyle} className="font-size border border-black black">
                    C. SORES/ ULCER
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='genitourinarySoresOrUlcer' type="text"
                      defaultValue={medicalReport?.genitourinarySoresOrUlcer}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                </tr>
              </tbody>
            </table>


            {/*Section C: Laboratory results */}
            <h6 className='text-black-deep text-bold-700 '>GENITOURINARY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. SPECIMEN RECEIVED DATE</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='laboratoryReceivedDate' type="text"
                      defaultValue={medicalReport?.laboratoryReceivedDate}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. DATE OF LAB REPORT </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
            <h6 className='text-black-deep text-bold-700 '>GENITOURINARY SYSTEM</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>BLOOD Group</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='bloodGroup' type="text"
                      defaultValue={medicalReport?.bloodGroup}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                </tr>
              </thead>
            </table>


            {/*Serology */}
            <h6 className='text-black-deep text-bold-700 '>Serology</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV ANTIBODY</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='serologyHivAntibody' type="text"
                      defaultValue={medicalReport?.serologyHivAntibody}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HB<small>s</small>AG</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <td style={mystyle} className="font-size border border-black black">
                    C. VDRL
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='serologyVdrl' type="text"
                      defaultValue={medicalReport?.serologyVdrl}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">D. MALARIA PARASITE</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='serologyMalariaParasite' type="text"
                      defaultValue={medicalReport?.serologyMalariaParasite}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    E. F.B.S.
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='serologyFBS' type="text"
                      defaultValue={medicalReport?.serologyFBS}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                </tr>
              </tbody>
            </table>



            {/*Urine Drug Screening */}
            <h6 className='text-black-deep text-bold-700 '>Urine Drug Screening</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. OPIATES</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='urineOpiates' type="text"
                      defaultValue={medicalReport?.urineOpiates}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. CANNABINOIDS</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <td style={mystyle} className="font-size border border-black black">
                    C. URINE HCG
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='urineHcg' type="text"
                      defaultValue={medicalReport?.urineHcg}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                </tr>
              </tbody>
            </table>



            {/*A PREGNANCY TEST URINE FEME */}
            <h6 className='text-black-deep text-bold-700 '>A PREGNANCY TEST URINE FEME</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>SPECIFIC GRAVITY</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleSpecificGravity' type="text"
                      defaultValue={medicalReport?.femaleSpecificGravity}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>COLOUR</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <td style={mystyle} className="font-size border border-black black">
                    PH
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleUrinePh' type="text"
                      defaultValue={medicalReport?.femaleUrinePh}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">LEUCOCYTES</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleUrineLeucocytes' type="text"
                      defaultValue={medicalReport?.femaleUrineLeucocytes}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    GLUCOSE
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleGlucose' type="text"
                      defaultValue={medicalReport?.femaleGlucose}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">PROTEIN</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleProtein' type="text"
                      defaultValue={medicalReport?.femaleProtein}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    BLOOD
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleBlood' type="text"
                      defaultValue={medicalReport?.femaleBlood}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">MICROSCOPY</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleMicroscopy' type="text"
                      defaultValue={medicalReport?.femaleMicroscopy}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    RED BLOOD CELL
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleRedBloodCell' type="text"
                      defaultValue={medicalReport?.femaleRedBloodCell}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">WHITE BLOOD CELL</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleWhiteBloodCell' type="text"
                      defaultValue={medicalReport?.femaleWhiteBloodCell}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    EPITHELIAL CELL</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleEpithelialCell' type="text"
                      defaultValue={medicalReport?.femaleEpithelialCell}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">CASTS</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleCasts' type="text"
                      defaultValue={medicalReport?.femaleCasts}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    CRYSTAL
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleCrystal' type="text"
                      defaultValue={medicalReport?.femaleCrystal}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">BACTERIA</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleBacteria' type="text"
                      defaultValue={medicalReport?.femaleBacteria}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    OTHERS
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='femaleOthers' type="text"
                      defaultValue={medicalReport?.femaleOthers}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                </tr>
              </tbody>
            </table>




            {/*Section D: X-RAY FINDINGS*/}
            <h6 className='text-black-deep text-bold-700 '>DATE OF X-RAY TAKEN</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY TAKEN</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='dateOfXrayTaken' type="text"
                      defaultValue={medicalReport?.dateOfXrayTaken}
                    />

                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>DATE OF X-RAY REPORTED</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
            <h6 className='text-black-deep text-bold-700 '>REPORT</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HEART SHAPE</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfHeartShape' type="text"
                      defaultValue={medicalReport?.reportOfHeartShape}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. HEART SIZE</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <td style={mystyle} className="font-size border border-black black">
                    C. LUNG FIELDS
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfLungFields' type="text"
                      defaultValue={medicalReport?.reportOfLungFields}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">D. MEDIASTINUM & HILA</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfMediastinum' type="text"
                      defaultValue={medicalReport?.reportOfMediastinum}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    E. PLEURAL / HEMIDIAPHRAGMS
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfPleuralHemidiaphragms' type="text"
                      defaultValue={medicalReport?.reportOfPleuralHemidiaphragms}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">F. COSTO-PHRENIC ANGLES</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfCostoPhrenic' type="text"
                      defaultValue={medicalReport?.reportOfCostoPhrenic}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    G. TORACIC CASE
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='reportOfToracicCase' type="text"
                      defaultValue={medicalReport?.reportOfToracicCase}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                  <td style={mystyle} className="font-size border border-black black"></td>
                </tr>
              </tbody>
            </table>




            {/*FINDINGS*/}
            <h6 className='text-black-deep text-bold-700 '>FINDINGS</h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. FOCAL LESION</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='findingsOfFocalLesion' type="text"
                      defaultValue={medicalReport?.findingsOfFocalLesion}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. OTHER ABNORMALITIES</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
            <h6 className='text-black-deep text-bold-700 '>CONCLUTION OF MEDICAL STATUS:
            </h6>
            <h6 className='text-black-deep text-bold-600 '>I have examined Mr./Ms. (PATIENT NAME DURING REGISTRATION), Passport Number – (DURING <br /> REGISTRATION), He/She are free from the following diseases.
            </h6>
            <table className="table-bordered table">
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th className="font-size black border border-black  " style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>A. HIV /AIDS</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}>
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfHivOrAids' type="text"
                      defaultValue={medicalReport?.statusOfHivOrAids}
                    />
                  </th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>B. TB</th>
                  <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>
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
                  <td style={mystyle} className="font-size border border-black black">
                    C. MALARIA
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfMalaria' type="text"
                      defaultValue={medicalReport?.statusOfMalaria}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">D. HEPATITIS</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfHepatitis' type="text"
                      defaultValue={medicalReport?.statusOfHepatitis}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    E. STD
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfSTD' type="text"
                      defaultValue={medicalReport?.statusOfSTD}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">F. EPILEPSY</td>
                  <td style={mystyle} className="font-size border border-black black">   <input
                    onChange={onChange}
                    className='medicalInput border-0 w-100 '
                    name='statusOfEpilepsy' type="text"
                    defaultValue={medicalReport?.statusOfEpilepsy}
                  /></td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    G. CANCER
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfCancer' type="text"
                      defaultValue={medicalReport?.statusOfCancer}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">H. DRUGS</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfDrugs' type="text"
                      defaultValue={medicalReport?.statusOfDrugs}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    I. LEPROSY
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfLeprosy' type="text"
                      defaultValue={medicalReport?.statusOfLeprosy}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">J. PREGNANCY</td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfPregnancy' type="text"
                      defaultValue={medicalReport?.statusOfPregnancy}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={mystyle} className="font-size border border-black black">
                    K. PSYCHIATRIC ILLENESS
                  </td>
                  <td style={mystyle} className="font-size border border-black black">
                    <input
                      onChange={onChange}
                      className='medicalInput border-0 w-100 '
                      name='statusOfPsychiatricIll' type="text"
                      defaultValue={medicalReport?.statusOfPsychiatricIll}
                    />
                  </td>
                  <td style={mystyle} className="font-size border border-black black">L. OTHERS </td>
                  <td style={mystyle} className="font-size border border-black black">  <input
                    onChange={onChange}
                    className='medicalInput border-0 w-100 '
                    name='statusOfOther' type="text"
                    defaultValue={medicalReport?.statusOfOther}
                  /></td>
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
                      <th className="font-size black border border-black py-1" style={{ width: '25%', fontWeight: "normal", paddingLeft: '5px' }}></th>
                      <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}>Date</th>
                      <th className="font-size black border border-black py-1" style={{ width: '25%', paddingLeft: '5px', fontWeight: "normal" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={mystyle} className="font-size border border-black black">
                        Qualification
                      </td>
                      <td style={mystyle} className="font-size border border-black black"></td>
                      <td style={mystyle} className="font-size border border-black black">Hospital Address</td>
                      <td style={mystyle} className="font-size border border-black black"></td>
                    </tr>

                  </tbody>
                </table>

              </div>
            </div>


          </div>
          <div className="form-actions mt-2">
            <button
              onClick={updateMalaysiaValues}
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

export default MalaysiaValuesForm;
