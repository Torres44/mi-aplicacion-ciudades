import React, { useState } from 'react';
import './App.css';
import CitySelector from './components/CitySelector';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<{ name: string; lat: string; lng: string } | null>(null);

  const handleCitySelect = (city: { name: string; lat: string; lng: string }) => {
    setSelectedCity(city);
  };

  return (
    <div className="container">
      <div className="container-items">
        <div className="search-container">
          <div className="title-container">
            <h1 className="title">Encuentra mi lugar cercano</h1>
          </div>
          <div className="city-container">
            <CitySelector onSelect={handleCitySelect} />
          </div>
        </div>
        <div className="info-container">
          {selectedCity && (
            <div className="info">
              <h2>Información de la ciudad seleccionada:</h2>
              <p>Nombre: {selectedCity.name}</p>
              <p>Latitud: {selectedCity.lat}</p>
              <p>Longitud: {selectedCity.lng}</p>
            </div>
          )}
        </div>
        </div>
    </div>
  );
};

export default App;
