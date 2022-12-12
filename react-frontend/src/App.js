import {useState, useEffect, useRef} from 'react';
import InfoBar from "./components/InfoBar";
import ChoseTestParameters from "./components/ChoseTestParameters";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [comparisonData, setComparisonData] = useState([]);
  const timePreFetch = useRef();
  const timePostFetch = useRef();

  const parentToChild = () => {
    setShowResults(true);
  }
  
    useEffect(() => {
      timePreFetch.current = (new Date()).getTime();
      const url = `http://localhost:8080/porownajTexty?textLength=krotkie&textType=varchar&czasWyslaniaRequestuZFrontendu=${timePreFetch.current}`
      fetch(url)
         .then(response => {
            return response.json()
            }
          )
         .then(data => {
          timePostFetch.current = (new Date()).getTime();
          setComparisonData(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
   var timeBackToFront = timePostFetch.current - comparisonData.czasWystawieniaOdpowiedziDlaFrontendu
  return (
    <div className="asdasd">
      <InfoBar />
      <ChoseTestParameters parametersFor="Text 1" />
      <ChoseTestParameters parametersFor="Text 2" />
      <button onClick={parentToChild}> Compare texts </button>
      {showResults && <div>
            <h1>Results</h1>
            <div>
            czasPobieraniaTekstowZBazyDanych: {comparisonData.czasPobieraniaTekstowZBazyDanych} <br/>
            czasPrzeslaniaRequestuZFrontuDoBackendu: {comparisonData.czasPrzeslaniaRequestuZFrontuDoBackendu} <br/>
            czasWystawieniaOdpowiedziDlaFrontendu: {timeBackToFront} <br/>
            podobienstwoTextow: {comparisonData.podobienstwoTextow} <br/>
            </div>
        </div>}
    </div>
  );
}

export default App;
