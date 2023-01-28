import * as React from 'react';
function Results(props){
    return(
        <div>
            <h1>Results</h1>
            <div>
                {props.czasPobieraniaTekstowZBazyDanych}
                {props.czasPrzeslaniaRequestuZFrontuDoBackendu}
            </div>
        </div>
    );
}

export default Results;