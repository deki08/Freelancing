import React, { useEffect, useState } from 'react';
import FuncUtil from "../../utils/FuncUtil";
import { FORM, MODEL } from "../../utils/FormFields";
import FormField from "../ui/FormField";
import PatientReportService from "../../services/PatientReportService";
import RefValuesService from "../../services/RefValuesService";

function MalaysiaEditForm(props: any) {
  const { report, onUpdateMalaysia, onCancel } = props;
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [refValue, setRefValue] = useState(MODEL.REF_VALUE);
  const [values, setValues] = useState({
    id: null,
    patientId: "",
    eyeVisualAcuityLeft: "",
    eyeVisualAcuityRight: "",
    earLeft: "",
    earRight: "",
    bloodPressure: "",
    heart: "",
    lungs: "",
    gastrointestinalAbdomen: "",
    height: "",
    weight: "",
    hernia: "",
    varicoseVeins: "",
    deformities: "",
    skin: "",
    cns: "",
    extremities: "",
    psychiatry: "",
    symptoms: "",
    chestXray: "",
    ecg: "",
    hiv: "",
    hbsag: "",
    thc: "",
    mop: "",
    amp: "",
    sugar: "",
    albumin: "",
    urineBilharziasis: "",
    pregnancy: "",
    others: "",
    helminths: "",
    giardia: "",
    bilharziasis: "",
    culture: "",
    stoolBilharziasis: "",
    malaria: "",
    microfilaria: "",
    bloodGroup: "",
    haemoglobin: "",
    esr: "",
    rbs: "",
    creatinine: "",
    tbil: "",
    sgot: "",
    sgpt: "",
    alp: "",
    urea: "",
    antiHcv: "",
    tpha: "",
    vdrl: "",
    status: "",
    remark: "",
    expireDate: "",
    pulse: "",
    distantAidedRight: "",
    distantAidedLeft: "",
    distantUnaidedRight: "",
    distantUnaidedLeft: "",
    nearAidedRight: "",
    nearAidedLeft: "",
    nearUnaidedRight: "",
    nearUnaidedLeft: "",
    clearVision: "",
  });

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    // setIsSaving(true);
    // PatientReportService.save(values).then(response => {
    //   setIsSaving(false);
    //   setIsSaved(true);
    //   setIsError(false);
    //   setMessage("Medical Test Successfully Updated!");
    //   onUpdateMalaysia(response)
    // }).catch(reason => {
    //   setIsSaving(false);
    //   if (reason.response.status == 403) {
    //     setMessage("Sorry! Tou don't have permission to save medical test");
    //   } else {
    //     setMessage(reason.response.data.message);
    //   }
    //   setIsError(true);
    //   setIsSaved(false);
    // })
  };
  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadRefValues = () => {
    RefValuesService.find().then(response => {
      setRefValue(response.data);
    })
  };


  useEffect(() => {
    setValues(report);
    loadRefValues();
  }, [])

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
      <div className="form-body">
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <h3>Medical Test</h3>
          <p className={'light-black ml-1'} >Update Form</p>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 pr-0">
            <table className="table-bordered table ">
              <tbody>
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={5}>MEDICAL
                    EXAMINATION
                  </td>
                </tr>
                <tr>
                  <td className="text-center font-weight-bolder font-size black">TYPE OF EXAMINATION</td>
                  <td className="text-center font-weight-bolder font-size black" colSpan={2}>RESULTS</td>
                  <td className="text-center font-weight-bolder font-size black" colSpan={2}>REF. VALUE</td>
                </tr>

                <tr>
                  <td className="text-center font-size black font-weight-bolder" colSpan={5}>
                    SYSTEMIC EXAM: CARDIO - VASCULAR
                  </td>
                </tr>

                <tr>
                  <td className="font-size black">HEART</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="heart" onChange={onChange} defaultValue={report?.heart} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue?.heart}</td>
                </tr>
                <tr>
                  <td className="font-size black">HEART SOUND</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="heartSound" onChange={onChange} defaultValue={report?.heartSound} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.lungs}</td>
                </tr>
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={5}>
                    RESPIRATORY EXAM
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">BREATH SOUNDS</td>
                  <td className="text-center font-size black" colSpan={2}>
                    <input type="text" className="form-control" name="breathSound" onChange={onChange} defaultValue={report?.breathSound} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.lungs}</td>
                </tr>
                <tr>
                  <td className="font-size black">OTHER RINDINGS </td>
                  <td className="text-center font-size black"
                    colSpan={2}>
                    <input type="text" className="form-control" name="otherRindings" onChange={onChange} defaultValue={report?.otherRindings} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.gastrointestinalAbdomen}</td>
                </tr>

                {/* -------------- GASTROINTESTINAL */}
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={5}>
                    GASTROINTESTINAL
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">LIVER</td>
                  <td className="text-center font-size black" colSpan={2}>
                    <input type="text" className="form-control" name="liver" onChange={onChange} defaultValue={report?.liver} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.lungs}</td>
                </tr>
                <tr>
                  <td className="font-size black">SPLEEN</td>
                  <td className="text-center font-size black"
                  >
                    <input type="text" className="form-control" name="spleen" onChange={onChange} defaultValue={report?.spleen} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.gastrointestinalAbdomen}</td>
                </tr>

                {/* GENERAL MENTAL */}

                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={5}>GENERAL MENTAL
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">STATUS</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="mentalStatus" onChange={onChange} defaultValue={report?.mentalStatus} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.height}</td>
                </tr>
                <tr>
                  <td className="font-size black">SPEECH</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="mentalSpeech" onChange={onChange} defaultValue={report?.mentalSpeech} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.weight}</td>
                </tr>
                <tr>
                  <td className="font-size black">MOTOR POWER</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="mentalMotorPower" onChange={onChange} defaultValue={report?.mentalMotorPower} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.hernia}</td>
                </tr>
                <tr>
                  <td className="font-size black">SENSORY</td>
                  <td className="text-center font-size black"
                  >
                    <input type="text" className="form-control" name="mentalSensory" onChange={onChange} defaultValue={report?.mentalSensory} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.varicoseVeins}</td>
                </tr>
                <tr>
                  <td className="font-size black">REFLESES</td>
                  <td className="text-center font-size black"
                  >
                    <input type="text" className="form-control" name="mentalRefleses" onChange={onChange} defaultValue={report?.mentalRefleses} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.deformities}</td>
                </tr>
                {/* section d - X ray findings */}
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={5}>X-RAY FINDINGS
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">DATE OF X-RAY TAKEN</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="dateOfXrayTaken" onChange={onChange} defaultValue={report?.dateOfXrayTaken} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.chestXray}</td>
                </tr>
                <tr>
                  <td className="font-size black">DATE OF X-RAY REPORTED</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="dateOfXrayReported" onChange={onChange} defaultValue={report?.dateOfXrayReported} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.ecg}</td>
                </tr>
                {/* urine drug screening---------- */}
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={4}>
                    URIN DRUG SCREENING
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">OPIATES</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="urineOpiates" onChange={onChange} defaultValue={report?.urineOpiates} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.thc}</td>
                </tr>
                <tr>
                  <td className="font-size black">CANNABINOIDS</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="urineCannabinoids" onChange={onChange} defaultValue={report?.cannabinoids} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">URINE HCG</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="urineHcg" onChange={onChange} defaultValue={report?.urineHcg} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>

                {/* CONCLUTION OF MEDICAL STATUS ----------------------*/}
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={4}>CONCLUTION OF MEDICAL STATUS:
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">HIV /AIDS</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfHivOrAids" onChange={onChange} defaultValue={report?.statusOfHivOrAids} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">TB</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfTB" onChange={onChange} defaultValue={report?.statusOfTB} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">MALARIA </td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfMalaria" onChange={onChange} defaultValue={report?.statusOfMalaria} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">HEPATITIS</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfHepatitis" onChange={onChange} defaultValue={report?.statusOfHepatitis} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">STD</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfSTD" onChange={onChange} defaultValue={report?.statusOfSTD} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">EPILEPSY</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfEpilepsy" onChange={onChange} defaultValue={report?.statusOfEpilepsy} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">CANCER</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfCancer" onChange={onChange} defaultValue={report?.statusOfCancer} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">DRUGS</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfDrugs" onChange={onChange} defaultValue={report?.statusOfDrugs} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">LEPROSY</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfLeprosy" onChange={onChange} defaultValue={report?.statusOfLeprosy} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">PREGNANCY</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfPregnancy" onChange={onChange} defaultValue={report?.statusOfPregnancy} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">PSYCHIATRIC ILLENESS</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfPsychiatricIll" onChange={onChange} defaultValue={report?.statusOfPsychiatricIll} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">OTHERS </td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="statusOfOther" onChange={onChange} defaultValue={report?.statusOfOther} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-md-6  pl-0">
            <table className="table-bordered table ">
              <tbody>
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={4}>LABORATORY
                    INVESTIGATION
                  </td>
                </tr>
                <tr>
                  <td className="text-center font-weight-bolder font-size black">TYPE OF EXAMINATION</td>
                  <td className="text-center font-weight-bolder font-size black" colSpan={1}>RESULTS</td>
                  <td className="text-center font-weight-bolder font-size black">REF. VALUE</td>
                </tr>
                {/* ------------right side items */}



                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={4}>GENITOURINARY SYSTEM</td>
                </tr>
                <tr>
                  <td className="font-size black">KIDNEY</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="genitourinaryKidney" onChange={onChange} defaultValue={report?.genitourinaryKidney} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">DISCHARGE </td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="genitourinaryDischarge" onChange={onChange} defaultValue={report?.genitourinaryDischarge} />
                  </td>
                  <td colSpan={2} className="text-center font-size black">{refValue.albumin}</td>
                </tr>
                <tr>
                  <td className="font-size black">SORES/ ULCER</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="genitourinarySoresOrUlcer" onChange={onChange} defaultValue={report?.genitourinarySoresOrUlcer} />
                  </td>
                  <td colSpan={2} className="text-center font-size black">{refValue.urineBilharziasis}</td>
                </tr>
                {/* Laboratory results */}
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={4}>Laboratory results
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">SPECIMEN RECEIVED DATE</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="laboratoryReceivedDate" onChange={onChange} defaultValue={report?.laboratoryReceivedDate} />
                  </td>
                  <td colSpan={2} className="text-center font-size black">{refValue.urineBilharziasis}</td>
                </tr>
                <tr>
                  <td className="font-size black">DATE OF LAB REPORT </td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="laboratoryReportDateOfLab" onChange={onChange} defaultValue={report?.laboratoryReportDateOfLab} />
                  </td>
                  <td colSpan={2} className="text-center font-size black">{refValue.urineBilharziasis}</td>
                </tr>

                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={4}>Blood Tests
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">BLOOD Group</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="bloodGroup" onChange={onChange} defaultValue={report?.bloodGroup} />
                  </td>
                  <td colSpan={2} className="text-center font-size black">{refValue.urineBilharziasis}</td>
                </tr>

                {/* female urine test */}
                {/* pregnancy test ------------ */}
                <tr>
                  <td className="text-center font-weight-bolder font-size black" colSpan={5}>
                    PREGNANCY TEST URINE FEMALE
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">SPECIFIC GRAVITY</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="femaleSpecificGravity" onChange={onChange} defaultValue={report?.femaleSpecificGravity} />
                  </td>
                  <td colSpan={2} className="text-center font-size black">{refValue.urineBilharziasis}</td>
                </tr>
                <tr>
                  <td className="font-size black">COLOUR</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="femaleUrineColor" onChange={onChange} defaultValue={report?.femaleUrineColor} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.mop}</td>
                </tr>
                <tr>
                  <td className="font-size black">PH</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="femaleUrinePh" onChange={onChange} defaultValue={report?.femaleUrinePh} />
                  </td>
                  <td colSpan={2} className="text-center font-size black">{refValue.urineBilharziasis}</td>
                </tr>
                <tr>
                  <td className="font-size black">LEUCOCYTES</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="femaleUrineLeucocytes" onChange={onChange} defaultValue={report?.femaleUrineLeucocytes} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">GLUCOSE</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleGlucose" onChange={onChange} defaultValue={report?.femaleGlucose} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">PROTEIN</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleProtein" onChange={onChange} defaultValue={report?.femaleProtein} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">BLOOD</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="femaleBlood" onChange={onChange} defaultValue={report?.femaleBlood} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">MICROSCOPY</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="femaleMicroscopy" onChange={onChange} defaultValue={report?.femaleMicroscopy} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">RED BLOOD CELL</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleRedBloodCell" onChange={onChange} defaultValue={report?.femaleRedBloodCell} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">WHITE BLOOD CELL</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleWhiteBloodCell" onChange={onChange} defaultValue={report?.femaleWhiteBloodCell} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">EPITHELIAL CELL</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleEpithelialCell" onChange={onChange} defaultValue={report?.femaleEpithelialCell} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">CASTS</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleCasts" onChange={onChange} defaultValue={report?.femaleCasts} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">CRYSTAL</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleCrystal" onChange={onChange} defaultValue={report?.femaleCrystal} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">BACTERIA</td>
                  <td className="text-center font-size black" >
                    <input type="text" className="form-control" name="femaleBacteria" onChange={onChange} defaultValue={report?.femaleBacteria} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>
                <tr>
                  <td className="font-size black">OTHERS</td>
                  <td className="text-center font-size black"  >
                    <input type="text" className="form-control" name="femaleOthers" onChange={onChange} defaultValue={report?.femaleOthers} />
                  </td>
                  <td className="text-center font-size black" colSpan={2}>{refValue.amp}</td>
                </tr>

                <tr>
                  <td className="text-center font-weight-bolder font-size black"
                    colSpan={4}>Serology
                  </td>
                </tr>
                <tr>
                  <td className="font-size black">HIV ANTIBODY</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="serologyHivAntibody" onChange={onChange} defaultValue={report?.serologyHivAntibody} />
                  </td>
                  <td className="text-center font-size black">{refValue.rbs}</td>
                </tr>
                <tr>
                  <td className="font-size black">HB<small>s</small>AG</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="serologyHbsAG" onChange={onChange} defaultValue={report?.serologyHbsAG} />
                  </td>
                  <td className="text-center font-size black">{refValue.creatinine}</td>
                </tr>
                <tr>
                  <td className="font-size black">VDRL</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="serologyVdrl" onChange={onChange} defaultValue={report?.serologyVdrl} />
                  </td>
                  <td className="text-center font-size black">{refValue.tbil}</td>
                </tr>
                <tr>
                  <td className="font-size black">MALARIA PARASITE</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="serologyMalariaParasite" onChange={onChange} defaultValue={report?.serologyMalariaParasite} />
                  </td>
                  <td className="text-center font-size black">{refValue.sgpt}</td>
                </tr>
                <tr>
                  <td className="font-size black">F.B.S.</td>
                  <td className="text-center font-size black">
                    <input type="text" className="form-control" name="serologyFBS" onChange={onChange} defaultValue={report?.serologyFBS} />
                  </td>
                  <td className="text-center font-size black">{refValue.sgot}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>



      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-danger mr-1" onClick={onCancel}>
          <i className="ft-x"></i> Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          <i className="ft-save"></i> Update &nbsp;
          {isSaving ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
        </button>
      </div>
    </form>
  );
}

export default MalaysiaEditForm;
