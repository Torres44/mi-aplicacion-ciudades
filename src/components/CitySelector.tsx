import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchCities } from "../services/cityService";

interface City {
  name: string;
  lat: string;
  lng: string;
}

const CitySelector: React.FC<{ onSelect: (city: City) => void }> = ({
  onSelect,
}) => {
  const [inputText, setInputText] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 98)',
      boxShadow: '0px 0px 20px 2px rgba(255, 255, 255, 0.93)', 
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(255, 255, 255, 0.80)' : 'transparent',
      color: state.isSelected ? 'black' : 'white',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.56)',
      },
    }),
  };

  useEffect(() => {
    if (inputText.trim() === "") return;

    const debounceTimer = setTimeout(() => {
      fetchCities(inputText).then((data) => {
        setCities(data);
        setLoading(false);
      });
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [inputText]);

  const handleChange = (selectedOption: any) => {
    const selectedCity = cities.find(
      (city) => city.name === selectedOption.value
    );
    if (selectedCity) {
      onSelect(selectedCity);
    }
  };

  return (
    <Select
    styles={customStyles}
      options={cities.map((city) => ({ value: city.name, label: city.name }))}
      onInputChange={(text, action) => {
        if (action.action === "input-change") {
          setInputText(text);
          setLoading(true);
        }
      }}
      isLoading={loading}
      onChange={handleChange}
      placeholder="Selecciona una ciudad"
    />
  );
};

export default CitySelector;
