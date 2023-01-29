import * as React from 'react';
import {useState, useRef} from 'react';
import InfoBar from "./components/InfoBar";
import ChoseTestParameters from "./components/ChoseTestParameters";

function App() {
  const timePreFetch = useRef();
  const timePostFetch = useRef();


  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState('');
  
  const handleClick = async () => {
    setIsLoading(true);

    try {
      var dbmsType = document.getElementById("dbmsSelect").value;
      var textLength = document.getElementById("dlugoscTekstuSelect").value;
      var textType = document.getElementById("typZmiennejSelect").value;
      console.log(dbmsType);
      console.log(textLength);
      console.log(textType);
      timePreFetch.current = (new Date()).getTime();
      const url = `http://localhost:8080/porownajTexty?textLength=${textLength}&textType=${textType}&requestSentTimeStamp=${timePreFetch.current}&dbmsType=${dbmsType}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      timePostFetch.current = (new Date()).getTime();

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

   var timeBackToFront = timePostFetch.current - data.czasWystawieniaOdpowiedziDlaFrontendu

  return (
    <div className="frontendView">
      <InfoBar />
      <ChoseTestParameters parametersFor="Text parameters" />
      <button onClick={handleClick}> Compare texts function</button>
      {!isLoading && <div>
            <h1>Results</h1>
            <div>
            czasPobieraniaTekstowZBazyDanych: {data.czasPobieraniaTekstowZBazyDanych} <br/>
            czasPrzeslaniaRequestuZFrontuDoBackendu: {data.czasPrzeslaniaRequestuZFrontuDoBackendu} <br/>
            czasWystawieniaOdpowiedziDlaFrontendu: {timeBackToFront} <br/>
            podobienstwoTextow: {data.podobienstwoTextow} <br/>
            </div>
        </div>}
    </div>
  );
}

export default App;
