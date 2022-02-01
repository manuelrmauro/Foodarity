import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


function ErrorPage() {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/')
  }, [])
  
  return (
    <div>
      Redireccionando...
    </div>
  )
}

export default ErrorPage
