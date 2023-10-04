import { useLoaderData } from 'react-router-dom'

const Index = () => {
  const {loading, user} = useLoaderData()
  if(loading) return <></>
  if(user){
    window.location.href = '/dashboard'
  } else{
    window.location.href = '/login'
  }
  return (
    <></>
  )
}

export default Index