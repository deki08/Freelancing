import React from 'react';
import { useParams } from "react-router-dom";
import MedicalExaminationEditFrom from '../../../components/detail/MedicalExamninationEditForm';
import MedicalExaminationFormEdit from '../../../components/detail/MedicalExamninationEditForm';
import MedicalExaminationEditing from '../../../components/detail/MedicalExamninationEditForm';

function MedicalExaminationEdit(props: any) {
  const { patient } = props
  let { id } = useParams();

  return (
    <div className="app-content content">
      <div className="content-wrapper">
        <div className="content-wrapper-before"></div>
        <div className="content-header row">
          <div className="content-header-left col-md-4 col-12 mb-2">
            <h3 className="content-header-title">Medical Examination Form</h3>
          </div>
        </div>
        <div className="content-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <MedicalExaminationEditing patient={patient} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalExaminationEdit;
