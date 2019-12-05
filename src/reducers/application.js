export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_SPOTS = "SET_SPOTS";

export default function reducer(state, action) {
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