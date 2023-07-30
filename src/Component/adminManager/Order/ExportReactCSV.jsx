import React from 'react'
import { CSVLink } from 'react-csv'

export const ExportReactCSV = ({csvData, fileName}) => {
    
    return (
        <button variant="warning">
            <CSVLink data={csvData} filename={fileName}> Xuất file excel</CSVLink>
        </button>
    )
}