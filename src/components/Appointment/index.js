import React, { Fragment } from "react";
import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && 
          <Empty 
            onAdd={ () => transition(CREATE) } 
          />
        }
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        )}
        {mode === CREATE && 
          <Form 
            interviewer={ [] }
            onCancel={ () => transition(EMPTY) }
          />
        }
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
};