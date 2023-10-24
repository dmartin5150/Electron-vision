





type Electron = {
    visionAPI: {
        getExpand: (expand:boolean) => void,
        async getPatientName: (FIN:string) => Promise<string>,
        async getDocInfo: (FIN:string) => Promist<docInfo[]>,
        async runPython : () => string
    }
}

declare let electron:Electron;