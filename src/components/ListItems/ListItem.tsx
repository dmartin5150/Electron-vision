import React from "react";
import './ListItem.css'
import { DocInfo } from "../../views/Home";



type ListItemProps  = {
        docInfo:DocInfo
}

const ListItem = ({docInfo}:ListItemProps) => {
    const { docType, docStatus} = docInfo;
    return (
            <div className='list-items'>
                <div className='list-items--name'>{docType}</div>
                <div className='list-items--status'>{docStatus}</div>
            </div> ) 
}
export default ListItem;