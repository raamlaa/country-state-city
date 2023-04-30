
import './App.css';
import Selector from './Selector';
import { City, Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

function App() {
  let countryData =Country.getAllCountries();
  const [stateData,setStateData] =useState();
  const [cityData,setCityData] =useState();

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  
  useEffect(()=>{
    setStateData(State.getStatesOfCountry(country?.isoCode));
  },[country]);
  
  useEffect(()=>{
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  },[state]);

  useEffect(()=>{
    stateData && setState(stateData[0]);
  },[stateData]);

  useEffect(()=>{
    cityData && setCity(cityData[0]);
  },[cityData]);

  return (
    <section className='min-h-screen px-3 grid place-items-center
     selection:text-white selection:bg-gray-500 bg-gradient-to-r from-gray-600 to-gray-300' >
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>
        Country , State and City Selector
        </h2>
        <br/>
        <div className='flex flex-wrap gap-3 bg-slate-300 rounded-lg p-8'>
          <div>
            <p className='text-gray-800 font-semibold'>
              Country:
            </p>
            <Selector placeHolder='Select Country'
            data={countryData} 
            selected={country} 
            setSelected={setCountry}/>
          </div>

            {/*state*/}
          {
            state && 
            (<div>
            <p className='text-gray-800 font-semibold'>
              State:
            </p>
            <Selector placeHolder='Select state'
            data={stateData} 
            selected={state} 
            setSelected={setState}/>
          </div>)

          }

          {
            city && 
            (<div>
            <p className='text-gray-800 font-semibold'>
              City:
            </p>
            <Selector placeHolder='Select city'
            data={cityData} 
            selected={city} 
            setSelected={setCity}/>
          </div>)
          }
          



        </div>
      </div>
    </section>
  );
}

export default App;
