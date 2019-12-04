import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,  
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview ? { ...action.interview } : null
          }
        }
      }
    case SET_SPOTS:
      const findDayForAppointment = (id, state) => {
        for (let index in state.days) {
          if (state.days[index].appointments.includes(id)) {
            return Number(index)
          }
        }
      }
      const dayIndex = findDayForAppointment(action.id, state);

      let newSpots = 0
      const appointmentIds = state.days[dayIndex].appointments;
      for (let i = 0; i < appointmentIds.length; i++) {
        if (state.appointments[appointmentIds[i]].interview === null) {
          newSpots += 1 
        }
      }

      return {
        ...state,
        days: state.days.map((day, index) => {
          if (index === dayIndex) {
            return{
              ...day,
              spots: newSpots
            }
          } else {
            return day
          }
        })
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }  
}

export default function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, {
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,  
        appointments: all[1].data,
        interviewers: all[2].data
      });
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      .then(() => dispatch({ type: SET_SPOTS, id }));  
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }))
    .then(() => dispatch({ type: SET_SPOTS, id }));
  }

  return {
    state,
    setDay, 
    bookInterview,
    cancelInterview
  }
}