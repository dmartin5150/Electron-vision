import fetch from 'electron-fetch'
import { DocInfo, emptyDocInfo} from "../views/Home";


const getDocInfo = async (FIN:string)=> {
    const response = await fetch("http://localhost:5002/patientData", {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({'FIN': FIN})
    });
    if (response) {
      const docInfo: DocInfo[] = await response.json();
      console.log('patient name', docInfo)
      return docInfo
    }
    return emptyDocInfo
};

export default getDocInfo;