import { Grid } from "@chakra-ui/react"
import PropTypes from "prop-types"
import { useGetUsers } from '../utils/useGetUsers'
import Participant from "./Participant"

const Participants = ({room}) => {
  const {loading, users} = useGetUsers(room)
  let body = null
  if(loading){
    body = (
      <div>loading...</div>
    )
  } else if(!loading && users.length === 0){
    body = (
      <div>No Participants found</div>
    )
  } else {
    body = (
      <Grid>
        <Participant user={users[0].user} room={room}/>
      </Grid>
    )
  }
  return (
    <>
      {body}
    </>
  )
}

Participants.propTypes = {
  room: PropTypes.object.isRequired
}

export default Participants