import React, { Fragment, setState } from "react";
import "components/Appointment/styles.scss";
import axios from "axios";

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
  
  const save = (name, interviewer) => {
    const interview = {
      student: name, 
      interviewer
    };
    
    props.bookInterview(props.id, interview) 
    transition(SHOW)

    axios.put(`http://localhost:8001/api/appointments/${props.id}`, { interview })
      .then((res) => {
        setState(prev => ({...prev,
          interview: res
        }));
        transition(SHOW)
      })
      .catch((err) => {
        console.log(err);
      }) 
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
            onDelete={props.onDelete}
          />
        )}
        {mode === CREATE && 
          <Form 
            interviewers={ props.interviewers }
            onCancel={ () => back() }
            onSave={ save }
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