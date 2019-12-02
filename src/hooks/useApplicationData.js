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
            interview: { ...action.interview }
          }
        }
      }
    case SET_SPOTS:
      const updateSpots = (daysArray, appointmentID) => {
        return daysArray.map((day, index) => {
          if (day.appointments.includes(appointmentID)) {
            return {...day, spots: daysArray[index].spots }
          }
          return day
        })
      }
      return {
        ...state,
        days: updateSpots(action.value[0].data, action.value[1])
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
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
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
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview: interview })
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      .then(() => axios.get("http://localhost:8001/api/days"))
      .then(res => dispatch({ type: SET_SPOTS, value: [res, id] }));  
  }

  const cancelInterview = (id) => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }))
    .then(() => axios.get("http://localhost:8001/api/days"))
    .then(res => dispatch({ type: SET_SPOTS, value: [res, id] }));
  }

  return {
    state,
    setDay, 
    bookInterview,
    cancelInterview
  }
}