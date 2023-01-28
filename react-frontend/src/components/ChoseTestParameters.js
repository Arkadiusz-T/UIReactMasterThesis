import * as React from 'react';
import ChooseDlugoscTekstu from "./TestParameter";
import ChooseTypZmiennej from "./ChooseTypZmiennej";

function ChoseTestParameters(props){
    return(
        <div>
            <h2>{props.parametersFor}</h2>
            <ChooseDlugoscTekstu panameterName="DlugoscTekstu"/>
            <ChooseTypZmiennej panameterName="TypZmiennej" />
        </div>
    );
}

export default ChoseTestParameters;