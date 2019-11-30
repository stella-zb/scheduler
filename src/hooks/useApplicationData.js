import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState(prev => ({...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev,
        days: all[0].data,  
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })
      .then(() => {
        setState(prev => ({...prev,
          appointments
        }))
      });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState(prev => ({...prev,
        appointments
      }))
    });
  }

  return {
    state,
    setDay, 
    bookInterview,
    cancelInterview
  }
}