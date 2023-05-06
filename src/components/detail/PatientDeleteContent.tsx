import React, { useEffect, useState } from 'react';
import FuncUtil from "../../utils/FuncUtil";
import moment from "moment";
import BillService from "../../services/BillService";
import Invoice from "../../pages/admin/Bill/Invoice";

function PatientDeleteContent(props: any) {
  const { patient } = props;
  const [loaded, setLoaded] = useState(false);
  const [testBills, setBills] = useState([]);

  useEffect(() => {
    BillService.findByPatient(patient.id).then(response => {
      setBills(response.data);
    })
    setLoaded(true);
  }, [loaded]);

  console.log(patient);

  return (
    <>
      <div className="content-body">
        <div id="user-profile">
          <div className="row">
            <div className="col-sm-12 col-xl-8">
              <div className="media d-flex m-1 ">
                <div className="align-left p-1">
                  <img src={patient.photo} className="rounded-circle img-border height-100 width-100" alt=" Patient_Image" />
                </div>

                <div className="media-body text-left  mt-1">
                  <h2>Are you sure want to delete this patient?</h2>
                  <h3 className="font-large-1 black"> <strong className='text-sm-start'>Patient Name</strong> {patient.fullName}</h3>
                  <p className="white">
                    <i className="ft-check-circle white"> </i> Passport No: {patient.passportNo}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card col-xl-4 col-lg-6 col-md-12">
              <div className="card-header pb-0">
                <div className="card-title-wrap bar-primary">
                  <div className="card-title">Personal Info</div>
                  <hr />
                </div>
              </div>
              <div className="card-content">
                <div className="card-body p-0 pt-0 pb-1">
                  <ul>
                    <li>
                      <strong>Full Name : </strong>
                      <span>{patient.fullName}</span>
                    </li>
                    <li>
                      <strong>Gender : </strong>
                      <span>{patient.gender}</span>
                    </li>
                    <li>
                      <strong>Date of Birth : </strong>
                      <span>{moment(patient.dateOfBirth).format('YYYY-MM-DD')}</span>
                    </li>
                    <li>
                      <strong>Age : </strong>
                      <span>{FuncUtil.age(patient.dateOfBirth)}</span>
                    </li>
                    <li>
                      <strong>Marital Status : </strong>
                      <span>{patient.maritalStatus}</span>
                    </li>
                    <li>
                      <strong>Nationality : </strong>
                      <span>{patient.nationality}</span>
                    </li>
                    <li>
                      <strong>Religion : </strong>
                      <span>{patient.religion}</span>
                    </li>
                    <li>
                      <strong>Father's Name : </strong>
                      <span>{patient.fathersName}</span>
                    </li>
                    <li>
                      <strong>Mother's Name : </strong>
                      <span>{patient.mothersName}</span>
                    </li>
                    <li>
                      <strong>Profession : </strong>
                      <span>{patient.profession}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card col-xl-4 col-lg-6 col-md-12">
              <div className="card-header pb-0">
                <div className="card-title-wrap bar-primary">
                  <div className="card-title">Passport Info</div>
                  <hr />
                </div>
              </div>
              <div className="card-content">
                <div className="card-body p-0 pt-0 pb-1">
                  <ul>
                    <li>
                      <strong>Passport No : </strong>
                      <span>{patient.passportNo}</span>
                    </li>
                    <li>
                      <strong>Issue Date : </strong>
                      <span>{moment(patient.issueDate).format('YYYY-MM-DD')}</span>
                    </li>
                    <li>
                      <strong>Expired Date : </strong>
                      <span>{moment(patient.expiredDate).format('YYYY-MM-DD')}</span>
                    </li>
                    <li>
                      <strong>NID Number : </strong>
                      <span>{patient.nidNumber}</span>
                    </li>
                    <li>
                      <strong>Traveling To : </strong>
                      <span>{patient.travelingTo}</span>
                    </li>
                    <li>
                      <strong>Visa No : </strong>
                      <span>{patient.visaNo}</span>
                    </li>
                    <li>
                      <strong>Visa Date : </strong>
                      <span>{moment(patient.visaDate).format('YYYY-MM-DD')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card col-xl-4 col-lg-6 col-md-12">
              <div className="card-header pb-0">
                <div className="card-title-wrap bar-primary">
                  <div className="card-title">Service / Billing Inf</div>
                  <hr />
                </div>
              </div>
              <div className="card-content">
                <div className="card-body p-0 pt-0 pb-1">
                  <ul>
                    <li>
                      <strong>Package/Test Name : </strong>
                      <span>{patient.testOrPackageId}</span>
                    </li>
                    <li>
                      <strong>Agent/Agency Name : </strong>
                      <span>{patient.agentOrAgencyId}</span>
                    </li>
                    <li>
                      <strong>Delivery Date : </strong>
                      <span>{moment(patient.deliveryDate).format('YYYY-MM-DD')}</span>
                    </li>
                    <li>
                      <strong>Special Note : </strong>
                      <span>{patient.specialNote}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDeleteContent;
