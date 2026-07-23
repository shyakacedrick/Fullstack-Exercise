import store, {
  good,
  ok,
  bad,
  zero,
} from './reducers/counterReducer'

const App = () => {
  const state = store.getState()

  return (
    <div>
      <button onClick={() => store.dispatch(good())}>
        good
      </button>

      <button onClick={() => store.dispatch(ok())}>
        ok
      </button>

      <button onClick={() => store.dispatch(bad())}>
        bad
      </button>

      <button onClick={() => store.dispatch(zero())}>
        reset stats
      </button>

      <div>good {state.good}</div>
      <div>ok {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  )
}

export default App