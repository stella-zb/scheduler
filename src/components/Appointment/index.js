import React, { Fragment, setState } from "react";
import "components/Appointment/styles.scss";
import axios from "axios";

import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer
    };
    
    transition(SAVING)
    props.bookInterview(props.id, interview) 
    .then(() => transition(SHOW))
  }

  const onDelete = () => {    
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

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
            onDelete={ () => transition(CONFIRM) }
          />
        )}
        {mode === CREATE && 
          <Form 
            interviewers={ props.interviewers }
            onCancel={ () => back() }
            onSave={ save }
          />
        }
        {mode === SAVING && 
          <Status message="Saving" />
        }
        {mode === CONFIRM &&
          <Confirm 
            message="Are you sure you would like to delete?"
            onConfirm={ onDelete }
            onCancel={ () => back() }
          />
        }
        {/* <Error message={props.message} onClose={props.onClose} /> */}
      </article>
    </Fragment>
  );
};