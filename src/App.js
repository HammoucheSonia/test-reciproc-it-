import React, { useState, useEffect } from 'react'
import logo from './logo.jpg';
//mport FetchData from "./Fitch";
import "./script.js";
import refresh from './refresh.png';
import './App.css'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
} from 'react-icons/fa'

//api public //
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [value, setValue] = useState('random person')
  const [title, setTitle] = useState('name')
  const getPerson = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    //data recupere par la fontion fetech//
    const person = data.results[0]
    const {email} = person
    const { large: image } = person.picture
    const { first, last } = person.name
    const {
      dob: { date },
    } = person

    //construction de l'objet perssonne//
    const newPerson = {
      image,
      email,
      date,
      name: `${first} ${last}`,
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(() => {
    getPerson()
  }, [])
  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  //affihage principale//
  return (
    <main>
      <div className='block bcg-black'>
      <img src={logo} alt="Logo" />
      </div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>My {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='date' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
          <div class="form-group">

            <label for="sel1">Select Nationality : </label>
            <select class="form-control" id="nationality">
                <option>AU</option>
                <option>BR</option>
                <option>CA</option>
                <option>CH</option>
                <option>DE</option>
                <option>DK</option>
                <option>ES</option>
                <option>FI</option>
                <option>FR</option>
                <option>GB</option>
                <option>IR</option>
                <option>IE</option>
                <option>NO</option>
                <option>NL</option>
                <option>NZ</option>
                <option>TR</option>
                <option>US</option>
            </select>
        </div>
        <div id="result"></div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="script.js"></script>
    </div>
      <div className='bouton'>
          <button onClick={() => window.location.reload(false)} ><img src = {refresh} alt = "refresh"></img> </button>
          </div>
    </main>
  )
}


export default App