import { contextBridge, ipcRenderer }  from "electron";
import { Patient, DocInfo } from "./views/Home";

contextBridge.exposeInMainWorld('electron', {
    visionAPI: {
        getExpand(expand:boolean) {
            console.log(expand);
            ipcRenderer.send("expand-window", expand);
        },
        async getPatientName(FIN:string) {
            console.log(FIN);
            const patientData = await ipcRenderer.invoke("get-name", FIN);
            return patientData as string;
        }, 
        async getDocInfo(FIN:string) {
            const docInfo = await ipcRenderer.invoke("get-docInfo", FIN);
            return docInfo as DocInfo[];
        },  
        async runPython() {
            // const message = await ipcRenderer.invoke('message');
            const message = await ipcRenderer.invoke('message');
            return message as string;
        }
    }
})
