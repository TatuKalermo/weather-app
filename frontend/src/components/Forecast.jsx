import React from 'react';

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

// FUNCTIONS

const getForecastFromApi = async (city) => {
  try {
    const response = await fetch(`${baseURL}/forecast?q=${city}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

// CLASSES

export class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      temp: '',
      location: 'London',
      error: '',
    };
  }

  async componentWillMount() {
    this.getForecast();
  }

  //Gets the forecast data from the API and puts it in an Array.

  async getForecast() {
    const [forecastData] = await Promise.all([getForecastFromApi(this.state.location)]);
    if (forecastData) {
      console.log('Forecast data:', forecastData)
      this.setState(
        {
          icon: '',
          temp: '',
          error: '',
        });
    } else {
      this.setState({ error: 'Unable to fetch forecast' });
    }
  }

  render() {
    const { icon, temp, location } = this.state;

    return (
      <div>
        <div className="forecast">
          <h2>Forecast</h2>
          <button onClick={() => this.getForecast()}>Forecast</button>
        </div>
      </div>
    );
  }
}