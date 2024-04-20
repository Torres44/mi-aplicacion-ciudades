import axios from 'axios';

interface City {
  name: string;
  lat: string;
  lng: string;
}

const CITY_API_URL = '/cities.json';

export const fetchCities = async (searchText: string): Promise<City[]> => {
  try {
    const response = await axios.get<City[]>(CITY_API_URL);
    const cities = response.data;

    const filteredCities = cities.filter(city =>
      city.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredCities;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};
