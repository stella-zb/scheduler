import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import axios from "axios";

import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {}
  })

  const setDay = day => setState(prev => ({...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments")
    ]).then((all) => {
      setState(prev => ({ ...prev,
        days: all[0].data,  
        appointments: all[1].data
      }));
    }).catch((err) => {
      console.log(err);
    })
  }, [state]);

  const appointments = getAppointmentsForDay(state, state["day"]);

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
