function TestParameter(props){
    return(
        <div>
            {props.panameterName}: 
            <select class="custom-select" style={{width: '150px'}}>
        <option>Pizzas</option>
        <option>Burger</option>
        <option>Ice Cream</option>
        <option>Fried Potatoes</option>
    </select>
        </div>
    );
}
export default TestParameter;