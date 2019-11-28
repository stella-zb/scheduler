export default function getAppointmentsForDay(state, day) {
  const appointmentDay = state.days.find(obj => {
    if (obj.name === day) {
      return obj.appointments
    }
  }) 
  if (!appointmentDay) { return [] }
  return appointmentDay.appointments.map( dayNum => state.appointments[dayNum] )
}