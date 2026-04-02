import React from 'react'
import "./index.css";

const Header = ({course}) => { return <h1 style={{}}>{course}</h1> };
const Part = ({part}) => { 
  return(
    <div>
      <p>{part.name} {part.exercises}</p> 
    </div>
  ) 
};

const Content = ({parts}) => {
  return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  };

const Total = ({parts}) => {

  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <p>
      <b>
        Total of exercises: {total}
      </b>
    </p>
  );
}
  
  


const Course = ({course}) => {
  
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
    </div>
  )
}

export default Course