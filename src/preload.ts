const { contextBridge }  = require("electron");

contextBridge.exposeInMainWorld('electron', {
    visionAPI: {
        getExpand(expand:boolean) {
            console.log(expand)
        }
    }
})
