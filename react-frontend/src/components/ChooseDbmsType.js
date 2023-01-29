import * as React from 'react';

function ChooseDbmsType(props){
    return(
        <div>
            {props.panameterName}: 
            <select id="dbmsSelect" className="custom-select" style={{width: '150px'}}>
            <option value="mysql">MySQL</option>
            <option value="mssql">MsSQL</option>
            <option value="oracledb">OracleDB</option>
        </select>
        </div>
    );
}

export default ChooseDbmsType;