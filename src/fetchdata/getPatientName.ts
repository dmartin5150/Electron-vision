import fetch from 'electron-fetch'
import { Patient } from '../views/Home';


const getPatientName = async (FIN:string)=> {
      console.log('in get patient name')
      const response = await fetch("http://localhost:5002/patientName", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'FIN': FIN})
      });
      if (response) {
        const patientName: Patient = await response.json();
        console.log('patient name', patientName.name)
        return patientName
      }
      return '';
  };

  export default getPatientName;