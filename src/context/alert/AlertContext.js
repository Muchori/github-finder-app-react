import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContect = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (message, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { message, type },
    })

    // timesouts to remove alert after fired
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
  }

  return (
    <AlertContect.Provider
      value={{
        alert: state,
        setAlert,
      }}>
      {children}
    </AlertContect.Provider>
  )
}

export default AlertContect
