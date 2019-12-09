export function getAppointmentsForDay(state, dayName) {
  const targetDay = state.days.find(day => day.name === dayName)
  if (!targetDay) { return [] }
  return targetDay.appointments.map((dayNum) => state.appointments[dayNum] || [])
}

export function getInterview(state, interview) {
  let result = {};
  for (const i in state.appointments) {
    if (state.appointments[i].interview === interview) {
      if (!state.appointments[i].interview) return null
      result.student = interview.student
      result.interviewer = state.interviewers[interview.interviewer]
    }
  }
  return result
}

export function getInterviewersForDay(state, dayName) {
  const targetDay = state.days.find(day => day.name === dayName)
  if (!targetDay) { return [] }
  return targetDay.interviewers.map((dayNum) => state.interviewers[dayNum] || [])
}