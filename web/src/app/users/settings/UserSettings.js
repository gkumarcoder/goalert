import React from 'react'
import p from 'prop-types'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
} from '@material-ui/core/index'
import DialogTitleWrapper from '../../dialogs/components/DialogTitleWrapper'
import CalendarSubscribe from './CalendarSubscribe'
import StatusUpdateNotification from '../UserStatusUpdatePreference'
import { useSessionInfo } from '../../util/RequireConfig'

export default function UserSettings(props) {
  const { userID } = useSessionInfo()
  if (!userID) return null

  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitleWrapper fullScreen={false} title='Settings' />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StatusUpdateNotification userID={userID} />
          </Grid>
          <Grid item xs={12}>
            <CalendarSubscribe />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color='primary' variant='contained'>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

UserSettings.propTypes = {
  onClose: p.func.isRequired,
  open: p.bool.isRequired,
}
