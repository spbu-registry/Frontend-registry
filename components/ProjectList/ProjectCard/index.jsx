import React from "react";

const ProjectCard = (props) => {
  return (
      <div>
          <h2>{props.header}</h2>
          <p>Клиника: {props.clinic}</p>
          <p>Задача: {props.task}</p>
          <p>Статус: {props.status}</p>
          <p>от {props.date}</p>
      </div>
  )
}