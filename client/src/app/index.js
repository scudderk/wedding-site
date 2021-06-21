import { useState, useEffect } from 'react'
import Routes from '../Routes'
import { setAccessToken } from '../accessToken'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/wedding/api/refresh_token", {
    method: "POST",
    credentials: 'include'
  })
  .then(async x => {
    const data = await x.json()
    setAccessToken(data.accessToken)
    setLoading(false)
  })
  .catch((error) => error);
  }, [])
  if(loading) {
    return <div>loading...</div>
  }
  return (
  <Routes />
  )
}
export default App;