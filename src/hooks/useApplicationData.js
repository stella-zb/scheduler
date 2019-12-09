import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_SPOTS } from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  // api request to load the datas and display on the page
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

  // api request to add new interview
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      .then(() => dispatch({ type: SET_SPOTS, id }));  
  }

  // api request to delete booked interview
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