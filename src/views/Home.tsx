import { useState, useEffect } from "react"
import ListItem from "../components/ListItems/ListItem";
import DocItemHeader from "../components/DocItemHeader";
import PatientHeader from "../components/PatientHeader";



export type DocInfo = {
    docType: 'Fall Risk' | 'Isolation' | '';
    docStatus: 'Complete' | 'Not Complete' | ''
}


export type Patient = {
    name: string;
    id: PatientID
}


export type PatientID = {
    MRN:string,
    FIN:string
}



export type PatientRecord = {
    patient: Patient;
    record: DocInfo
}

const EmptyPatient:Patient = {
    name: 'No Patient Found',
    id: {
        MRN: 'Not Found',
        FIN: 'Not Found'
    }
}

export const emptyDocInfo:DocInfo = {
    docType:'',
    docStatus: ''
}

export const emptyPatientRecord:PatientRecord = {
    patient: EmptyPatient,
    record: emptyDocInfo
}

const curPatient = {name:'Seamless Apple', id:{ MRN:'1051218', FIN:'740039288'}}

const items: DocInfo[] = [
    {docType: 'Fall Risk',docStatus: 'Complete'},
    {docType:'Isolation', docStatus: 'Not Complete'}
]


const Home = () => {

    const [expand, setExpand] = useState(false);
    const [patientFound, setPatientFound] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [patient, setPatient] = useState<Patient>(EmptyPatient);
    const [docStats,setDocStats] = useState<DocInfo[]>([]);
    // const [getPatient, setGetPatient] = useState(false);
    const [newId, setNewID] = useState<PatientID>(EmptyPatient.id)

    const  handleWindowSize = () => {
            setExpand(!expand)
    }

    

    useEffect(() => {


    const interval = setInterval(async () => {
            const message = await  electron.visionAPI.runPython();
            console.log('in setInterval')
            console.log('message', message[0], 'newID', newId.FIN)
            if (message[0] !== newId.FIN) {
                console.log('setting new id')
               setNewID({FIN:message[0],MRN:message[1]})
            }
        }, 1000);


    return () => {
        clearInterval(interval);
    };
    }, [newId]);




    useEffect(() => {
        const getPatientData = async () => {
            console.log('in get patient', newId.FIN)
            if (newId.FIN === 'Not Found') {
                setPatient(EmptyPatient);
                setNewID(EmptyPatient.id)
                setDocStats([]);
                setPatientFound(false)
                return 
            }
            const patientName = await electron.visionAPI.getPatientName(newId.FIN);
            console.log('Patient Name', patientName);
            const docInfo = await electron.visionAPI.getDocInfo(newId.FIN);
            console.log('Patient Name', docInfo);
            const curPatient:Patient = {name:patientName, id:newId}
            setPatient(curPatient)
            setDocStats(docInfo)
            setPatientFound(true)
            console.log('new patient', patient)
            console.log('new stats', docInfo)
        }
        getPatientData();
    },[refresh,
        newId])


    
    useEffect (()=> {
        electron.visionAPI.getExpand(expand)
    },[expand])

    const handleRefreshData = () => {
        setRefresh(!refresh)
    }


    return (
        <div className='home-container'>
            <button onClick={handleWindowSize} className='window-button'>{expand ? 'Minimize' : 'Expand'}</button>
            <div className="App">
                <div className='document-table'>
                    <div className='document-header'>
                        <PatientHeader patientFound={patientFound} patient={patient} />
                    </div>
                </div>
                {
                    !patientFound && <DocItemHeader />

                }
                <div className='refresh-button'>
                    <button onClick={handleRefreshData}>Refresh Data</button>
                </div> 
                {
                    patientFound && 
                    <ul className='document-list'>
                        {docStats.map((item, idx) => 
                            <li key={idx}>
                                <ListItem docInfo={item} />
                            </li>)
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

export default Home;