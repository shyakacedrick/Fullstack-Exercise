interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
  description: string;
}

interface CoursePartGroup extends CoursePartBase {
  kind: "group";
  groupProjectCount: number;
}

interface CoursePartBackground extends CoursePartBase {
  kind: "background";
  description: string;
  backgroundMaterial: string;
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

/**
 * Helper function for exhaustive type checking.
 * TypeScript will error here at compile time if a case is missing.
 */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  totalExercises: number;
}

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <em>{part.description}</em>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          project exercises {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <br />
          <em>{part.description}</em>
          <br />
          submit to <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <p key={part.name}>
          <Part part={part} />
        </p>
      ))}
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
