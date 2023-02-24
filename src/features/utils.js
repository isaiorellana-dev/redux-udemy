const initialFetching = { loading: "idle", error: null }

export const makeFetchingReducer =
  (actions) =>
    (state = initialFetching, action) => {
      switch (action.type) {
        case actions[0]: {
          return { ...state, loading: "pending" }
        }
        case actions[1]: {
          return { ...state, loading: "succeded" }
        }
        case action[2]: {
          return { error: action.error, loading: "rejected" }
        }
        default: {
          return state
        }
      }
    }

export const reduceReducers =
  (...reducers) =>
    (state, action) =>
      reducers.reduce((acumulator, element) => element(acumulator, action), state)

export const makeSetReducer =
  (actions) =>
    (state = "all", action) => {
      switch (action.type) {
        case actions[0]:
          return action.payload
        default:
          return state
      }
    }

export const makeCrudReducer =
  (actions) =>
    (state = [], action) => {
      switch (action.type) {
        case actions[0]: {
          return state.concat({ ...action.payload })
        }
        case actions[1]: {
          const newEntities = state.map((entity) => {
            if (entity.id === action.payload.id) {
              return { ...entity, completed: !entity.completed }
            }
            return entity
          })
          return newEntities
        }
        default:
          return state
      }
    }

// make action creator
export const mac =
  (type, ...argsNames) =>
    (...args) => {
      const action = { type }

      argsNames.forEach((arg, index) => {
        action[argsNames[index]] = args[index]
      })

      return action
    }


export const mat = (entity) => ([
  `${entity}/pending`,
  `${entity}/fulfilled`,
  `${entity}/rejected`,
])

export const asyncMac = asyncTypes => ([
  mac(asyncTypes[0]),
  mac(asyncTypes[1], 'payload'),
  mac(asyncTypes[2], 'error')
])
