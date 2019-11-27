import React from "react";
import "components/Appointment/styles.scss";
import { Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const showOrEmpty = (
    props.interview?
    <Show 
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
    /> : 
    <Empty onAdd={props.onAdd}/>
  )


  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment :last-of-type">
        {showOrEmpty}
        {/* <Confirm 
          message={props.message}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />
        <Status message={props.message} />
        <Error message={props.message} onClose={props.onClose} /> */}
      </article>
    </Fragment>
  );
}