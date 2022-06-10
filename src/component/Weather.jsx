import React, { Component } from 'react'
import axios from 'axios'

const API_KEY = '9aa7f219394b521b35dcf1b85db706fb'

export default class Weather extends Component {
  state = {
    zipcode: '60616',
    location: {},
    name: '',
    temp: '',
    desc: '',
  }

  async componentDidMount() {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=${API_KEY}&units=imperial`

    const res = await axios.get(url)

    this.setState(
      {
        location: res.data,
        name: res.data.name,
        temp: res.data.main.temp,
        desc: res.data.weather[0].description,
      },
      () => console.log(this.state.location)
    )
  }

  getWeather = async e => {
    e.preventDefault()
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=${API_KEY}&units=imperial`
    try {
      const res = await axios.get(url)

      console.log(res.data)
      this.setState({
        location: res.data,
        name: res.data.name,
        temp: res.data.main.temp,
        desc: res.data.weather[0].description,
      })
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    const {
      location: { name },
      temp,
      desc,
    } = this.state

    return (
      <div>
        <form onSubmit={this.getWeather}>
          <label htmlFor='zipcode'>Enter Zipcode </label>
          <input
            type='text'
            id='zipcode'
            onChange={e => this.setState({ zipcode: e.target.value })}
            value={this.state.zipcode}
          />

          <button>Get Weather!</button>
        </form>
        <div>
          <h1>{name}</h1>
          <h2>{temp}</h2>
          <p>{desc}</p>
        </div>
      </div>
    )
  }
}
