import React from 'react'

const Header = ({course}) => { return <h1>{course}</h1> };
const Part = ({part}) => { return <p>{part.name} {part.exercises}</p> };

const Content = ({parts}) => {
  return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  };
const Total = ({total}) => <p> Number of exercises: {total}</p>;


const Course = ({course}) => {
  
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Total total = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

export default Course