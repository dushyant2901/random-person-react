import React, { useState, useEffect } from "react";

import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
const App = () => {
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("Random Person");
  const getPerson = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const person = data.results[0];
      console.log(data.results[0]);
      const { email, phone } = person;
      const {
        street: { number, name },
      } = person.location;
      const {picture:{large:image}}= person
      const { password } = person.login;
      const { first, last } = person.name;
      const { age } = person.dob;
      const newPerson = {
        email,
        phone,
        name: `${first}${last}`,
        password,
        age,
        image,
        street: `${number}${name}`,
      };
      setPerson(newPerson);
      setLoading(false);
      setValue(newPerson.name)
    setTitle("name")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPerson();
  }, []);
const handleValue = (e) => {
  if (e.target.classList.contains("icon")) {
    console.log('first');
    const newValue=e.target.dataset.label
    setTitle(newValue)
    setValue(person[newValue])
  }
  }
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={(person&&person.image)}alt='random user'
            className='user-img'/>
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
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='street'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
       
      </div>
    </main>
  );
};

export default App;
