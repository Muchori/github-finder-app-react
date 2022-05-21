import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  /* const [users, setUsers] = useState([])
  const [isLoading, setIsloading] = useState(true) */

  // initializing state for reducers
  const initialState = {
    users: [],
    isLoading: false,
  }

  /**
   * useReducer takes in two params, the reducer class, and the iniatialised states
   * dispatch -> to dispatch the action types to the reducer
   */
  const [state, dispatch] = useReducer(githubReducer, initialState)

  /**
   * get search users{testing purpose}
   */
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `reac-github ${GITHUB_TOKEN}`,
      },
    })

    const { items } = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })

    /* setUsers(data)
    setIsloading(false) */
  }

  /**
   * Clear users from state
   */

  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' })
  }

  /**
   * set loading
   */
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
