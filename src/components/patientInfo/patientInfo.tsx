import React from 'react';
import './patientInfo.css'
import { PatientID } from '../../views/Home';





type PatientInfoProps = {
    patientName:string;
    patientID: PatientID
}




const PatientInfo = ({patientName, patientID}:PatientInfoProps) => {
    const {FIN, MRN } = patientID
    const date = new Date();
    return (
        <div className='patient-info'>
            <div className='patient-name'>Name: {patientName}</div>
            <div className='patient-FIN'>FIN - {FIN}</div>
            <div className='patient-MRN'>MRN - {MRN}</div>
            <div className='patient-upadated'>Last Updated:{date.toLocaleString()}</div>
        </div>
    )
}
export default PatientInfo