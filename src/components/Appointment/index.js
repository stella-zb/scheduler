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
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer
    };
    
    transition(SAVING)
    props
      .bookInterview(props.id, interview) 
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const onDelete = () => {   
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
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
            onEdit={ () => transition(EDIT) }
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
        {mode === EDIT && 
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={ props.interviewers}
            onCancel={ () => back() }
            onSave={ save }
          />
        }
        {mode === SAVING && 
          <Status message="Saving" />
        }
        {mode === DELETING && 
          <Status message="Deleting" />
        }
        {mode === CONFIRM &&
          <Confirm 
            message="Are you sure you would like to delete?"
            onConfirm={ onDelete }
            onCancel={ () => back() }
          />
        }
        {mode === ERROR_SAVE &&
          <Error message="Could not book appointment" onClose={() => back()} />
        }
        {mode === ERROR_DELETE &&
          <Error message="Could not cancel appointment" onClose={() => back()} />
        }
      </article>
    </Fragment>
  );
};