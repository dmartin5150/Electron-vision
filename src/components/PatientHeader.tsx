import { Fragment } from "react";
import PatientInfo from "./patientInfo/patientInfo";
import { Patient } from "../views/Home";


type PatientHeaderProps = {
    patientFound: boolean;
    patient:Patient;

}


const PatientHeader = ({patientFound, patient}:PatientHeaderProps) => {
    return (
            <Fragment>
                {patientFound ? 
                <div className='document-patient'>
                    <PatientInfo patientName={patient.name} patientID={patient.id} />
                </div> :
                <div className='document-patient'> Patient Not Found</div>
            }
            </Fragment>
    )
}
export default PatientHeader