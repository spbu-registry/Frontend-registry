import React from "react";

const ProjectCard = (props) => {
    return (
        <div className={props.className}>
            <div>
                <h2>{props.header}</h2>
                <p>Клиника: {props.clinic}</p>
                <p>Задача: {props.task}</p>
                <p>Статус: {props.status}</p>
            </div>
            <p>от {props.date}</p>
        </div>
    )
}

export default ProjectCard;