export function getAppointmentsForDay(state, day) {
  const appointmentDay = state.days.find(obj => {
    if (obj.name === day) {
      return obj.appointments
    }
  }) 
  if (!appointmentDay) { return [] }
  return appointmentDay.appointments.map( dayNum => state.appointments[dayNum] )
}

export function getInterview(state, interview) {
  let result = {};
  for (const i in state.appointments) {
    if (state.appointments[i].interview === interview) {
      if(!state.appointments[i].interview) return null
      result.student = interview.student
      result.interviewer = state.interviewers[interview.interviewer]
    }
  }
  return result
}