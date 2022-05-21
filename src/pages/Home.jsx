import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'

function Home() {
  return (
    <>
      {/**
       * Serach result from the api
       */}
      <UserSearch />
      <UserResults />
    </>
  )
}

export default Home
