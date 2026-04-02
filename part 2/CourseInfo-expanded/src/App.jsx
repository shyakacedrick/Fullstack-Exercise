//================================= EXERCISE 2.1 (COURSE INFORMATION EXPANDED (step 6)) ===================================

import React from 'react'
import Course from './Course';


 const App = () => {
  const course = {
    id: 1,
    name : 'Half Stack application development',
    parts : [
      { id: 1, name : 'Fundamentals of React:', exercises : 10 }, 
      { id: 2, name : 'Using props to pass data:', exercises : 7 },
      { id: 3, name : 'State of a component:', exercises : 14 }
    ]   
  }
  console.log(course)

  return (    
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App

