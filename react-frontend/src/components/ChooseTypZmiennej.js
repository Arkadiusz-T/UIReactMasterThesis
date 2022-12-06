function ChooseTypZmiennej(props){
    return(
        <div>
            {props.panameterName}: 
            <select class="custom-select" style={{width: '150px'}}>
            <option>char</option>
            <option>varchar</option>
            <option>varchar2</option>
        </select>
        </div>
    );
}

export default ChooseTypZmiennej;