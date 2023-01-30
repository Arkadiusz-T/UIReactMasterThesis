import * as React from 'react';
import {useState, useRef} from 'react';
import InfoBar from "./components/InfoBar";
import ChoseTestParameters from "./components/ChoseTestParameters";
import axios from 'axios';

function App() {
  const timePreFetch = useRef();
  const timePostFetch = useRef();


  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState('');
  
  const sendRestRequest = async () => {
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

  const sendSoapRequest = async () => {
    setIsLoading(true);

    try {
      var dbmsType = document.getElementById("dbmsSelect").value;
      var textLength = document.getElementById("dlugoscTekstuSelect").value;
      var textType = document.getElementById("typZmiennejSelect").value;
      const url = `http://localhost:8080/ws`;
      timePreFetch.current = (new Date()).getTime();
      const xmlEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:std="http://www.dupa.pl/soapexample"
      >
        <soap:Body>
          <std:getSoapTimes >
            <textLength>${textLength}</textLength>
            <textType>${textType}</textType>
            <czasWyslaniaRequestuZFrontendu>${timePreFetch.current}</czasWyslaniaRequestuZFrontendu>
            <dbmsType>${dbmsType}</dbmsType>
          </std:getSoapTimes>
        </soap:Body>
      </soap:Envelope>
    `;

      const response = await axios.post(
      'https://www.w3schools.com/xml/tempconvert.asmx?wsdl',
      xmlEnvelope,
      {
        headers: {
          'Content-Type': 'text/xml',
        },
      },
    );

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
      <button onClick={sendRestRequest}> Compare texts REST</button>
      <button onClick={sendSoapRequest}> Compare texts SOAP</button>
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
