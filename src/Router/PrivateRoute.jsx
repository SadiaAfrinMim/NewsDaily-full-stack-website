import PropTypes from 'prop-types'

import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../Component/LoadingSpinner'
import useAuth from '../Hooks/useAuth'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute