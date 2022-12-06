function ChooseDlugoscTekstu(props){
    return(
        <div>
            {props.panameterName}: 
            <select class="custom-select" style={{width: '150px'}}>
        <option>krotke</option>
        <option>srednie</option>
        <option>dlugie</option>
    </select>
        </div>
    );
}
export default ChooseDlugoscTekstu;