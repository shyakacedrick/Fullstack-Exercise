//================================= REFACTORED VERSION ===================================

const Header = (props) => <h1>{props.course}</h1>        // <<-------- defining header and assigning the title to it ----

const Part = (props) => <p>{props.name} {props.exercises}</p>      //<-------- defining header and assigning the title to it ----

const Content = (props) => (           //<-------------- defining Content and assigning 3 children components to it--------
  <div>
    <Part name={props.part1} exercises={props.exercises1} />     {/*<<------- rendering the Part components and envoking the name and exercise----*/}
    <Part name={props.part2} exercises={props.exercises2} />
    <Part name={props.part3} exercises={props.exercises3} />
  </div>
)
const Total = (props) => <p>Number of exercises: {props.total}</p>  //<<-------- defining Total component and assigning the total value -----



const App = () => {
  const course = 'Half Stack application development'    //====== Header component ========
  const part1 = 'Fundamentals of React:'                //======= Content value "string"===
  const exercises1 = 10                                //======== Content value number ====
  const part2 = 'Using props to pass data:'           //========= Content value "string"===
  const exercises2 = 7                               //========== Content value number ====
  const part3 = 'State of a component:'             //=========== Content value "string"===
  const exercises3 = 14                            //============ Content value number ====


  return (    
    <div>
      <Header course={course} />
      <Content 
            part1={part1} exercises1={exercises1} 
            part2={part2} exercises2={exercises2} 
            part3={part3} exercises3={exercises3}
        />
      <Total total={exercises1 + exercises2 + exercises3} />

    </div>
  )
}

export default App
