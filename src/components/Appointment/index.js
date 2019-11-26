import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        <Empty onAdd={props.onAdd}/>
      </article>
    </>
  );
}