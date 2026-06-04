import axios from 'axios'
import { useState, useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Controller to abort duplicate pending requests if component unmounts
    const controller = new AbortController()

    const getCurrentUser = async () => {
      try {
        setLoading(true)
        const result = await axios.get(`${serverUrl}/api/user/me`, {
          withCredentials: true,
          signal: controller.signal
        })
        dispatch(setUserData(result.data))
        setError(null)
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err)
          setError(err)
          dispatch(setUserData(null)) // Explicitly clear user if session expired
        }
      } finally {
        setLoading(false)
      }
    }

    getCurrentUser()

    return () => controller.abort() // Cancel request on unmount
  }, [dispatch])

  return { loading, error }
}

export default useGetCurrentUser
