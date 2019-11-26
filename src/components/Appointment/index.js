import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";

export default function Appointment(props) {
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        <Empty onAdd={props.onAdd}/>
        <Show 
          student={props.student}
          interviewer={props.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
        <Confirm 
          message={props.message}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />
        <Status message={props.message} />
      </article>
    </>
  );
}