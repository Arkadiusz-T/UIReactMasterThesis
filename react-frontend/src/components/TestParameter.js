import * as React from 'react';
function ChooseDlugoscTekstu(props){
    return(
        <div>
            {props.panameterName}: 
            <select className="custom-select" style={{width: '150px'}}>
        <option>krotke</option>
        <option>srednie</option>
        <option>dlugie</option>
    </select>
        </div>
    );
}
export default ChooseDlugoscTekstu;