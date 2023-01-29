import * as React from 'react';
import ChooseDlugoscTekstu from "./ChooseDlugoscTekstu";
import ChooseTypZmiennej from "./ChooseTypZmiennej";
import ChooseDbmsType from './ChooseDbmsType';

function ChoseTestParameters(props){
    return(
        <div>
            <h2>{props.parametersFor}</h2>
            <ChooseDlugoscTekstu panameterName="DlugoscTekstu"/>
            <ChooseTypZmiennej panameterName="TypZmiennej" />
            <ChooseDbmsType panameterName="DBMSType" />
        </div>
    );
}

export default ChoseTestParameters;