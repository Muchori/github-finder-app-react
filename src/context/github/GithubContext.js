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
    user: {},
    repos: [],
    isLoading: false,
  }

  /**
   * useReducer takes in two params, the reducer class, and the iniatialised states
   * dispatch -> to dispatch the action types to the reducer
   */
  const [state, dispatch] = useReducer(githubReducer, initialState)

  /**
   * get search users
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
   * get users repos
   */
  const getUserRepos = async (login) => {
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `reac-github ${GITHUB_TOKEN}`,
        },
      }
    )

    const data = await response.json()

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }
  /**
   * get as single user
   */
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `reac-github ${GITHUB_TOKEN}`,
      },
    })

    if (response.status === 404) {
      window.location = '/not-found'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
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
        user: state.user,
        repos: state.repos,
        isLoading: state.isLoading,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos,
      }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
