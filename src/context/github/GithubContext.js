import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  /* const [users, setUsers] = useState([])
  const [isLoading, setIsloading] = useState(true) */

  // initializing state for reducers
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  }

  /**
   * useReducer takes in two params, the reducer class, and the iniatialised states
   * dispatch -> to dispatch the action types to the reducer
   */
  const [state, dispatch] = useReducer(githubReducer, initialState)

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
