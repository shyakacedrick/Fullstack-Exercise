import React from 'react'

const Header = ({course}) => { return <h1>{course}</h1> };
const Part = ({name, exercises}) => { return <p>{name} {exercises}</p> };
const Content = ({parts}) => {
  return (
      <div>
        <Part name={parts[0].name} exercises={parts[0].exercises} />
        <Part name={parts[1].name} exercises={parts[1].exercises} />
        <Part name={parts[2].name} exercises={parts[2].exercises} />
      </div>
    )
  };
const Total = (props) => <p> Number of exercises: {props.total}</p>;


const Course = ({course}) => {
    
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Total total = 
      {course.parts[0].exercises + 
       course.parts[1].exercises + 
       course.parts[2].exercises} />
    </div>
  )
}

export default Course

