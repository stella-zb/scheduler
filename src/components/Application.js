import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {}
  })

  const setDay = day => setState(prev => ({...prev, day }));
  const setDays = days => setState(prev => ({...prev, days }));

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then((res) => {
        setDays(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [state]);

  const appointmentDisplay = appointments.map((appointment, index) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time} 
        interview={appointment.interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state["days"]}
            day={state["day"]}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentDisplay}
        <Appointment id="last" time="1am" /> 
      </section>
    </main>
  );
}
