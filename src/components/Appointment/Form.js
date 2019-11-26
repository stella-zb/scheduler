import React from "react";
import "components/Appointment/styles.scss";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const formInput = (
    props.name? 
    <input
      className="appointment__create-input text--semi-bold"
      name="name"
      type="text"
      placeholder={props.name} 
    /> :
    <input
      className="appointment__create-input text--semi-bold"
      name="name"
      type="text"
      placeholder="Enter Student Name"
    />
  )

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          {formInput}
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewer={props.interviewer} 
          setInterviewer={props.setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}
