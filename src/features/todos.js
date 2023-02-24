import { combineReducers } from "redux"
import { mac, mat, makeCrudReducer, makeFetchingReducer, makeSetReducer, reduceReducers, asyncMac } from "./utils"

export const fetchThunk = () => async (dispatch) => {
  dispatch(setPending())
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = await response.json()
    const todos = data.slice(0, 10)
    dispatch(setFulfilled(todos))
    // console.log(todos)
  } catch (e) {
    dispatch(setError(e.message))
  }
}

const asyncTodos = mat("todos")


const [setPending, setFulfilled, setError] = asyncMac(asyncTodos)


export const setComplete = mac('todo/completed', 'payload')

export const setFilter = mac('filter/set', "payload")

export const addTodo = mac('todo/add', 'payload')

const filterReducer = makeSetReducer(['filter/set'])

const fulfilledReducer = makeSetReducer(['todos/fulfilled'])

const crudReducer = makeCrudReducer(['todo/add', 'todo/completed'])

export const todosReducer = reduceReducers(crudReducer, fulfilledReducer)

const fetchingReducer = makeFetchingReducer(asyncTodos)

export const reducer = combineReducers({
  // entities: todosReducer,
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
})

export const selectTodos = (state) => {
  const {
    todos: { entities },
    filter,
  } = state

  if (filter === "complete") {
    return entities.filter((todos) => todos.completed === true)
  }

  if (filter === "incomplete") {
    return entities.filter((todos) => todos.completed === false)
  }

  return entities
}

export const selectStatus = (state) => state.todos.status

// const fetchingReducer = makeFetchingReducer([
//   'todos/pending',
//   'todos/fulfilled',
//   'todos/rejected'
// ])

// export const setPending = mac("todos/pending")

// export const setFulfilled = mac('todos/fulfilled', 'payload')

// export const setError = mac('todos/error', 'error')