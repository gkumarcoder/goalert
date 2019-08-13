import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  useMediaQuery,
} from '@material-ui/core/index'
import DialogTitleWrapper from '../../dialogs/components/DialogTitleWrapper'
import CalendarSubscribe from './CalendarSubscribe'
import StatusUpdateNotification from '../UserStatusUpdatePreference'
import { useSessionInfo } from '../../util/RequireConfig'
import { SET_USER_SETTINGS_OPEN } from '../../actions'

export default function UserSettings(props) {
  const { userID } = useSessionInfo()
  const isFullScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const userSettingsOpen = useSelector(state => state.user.userSettingsOpen)
  const dispatch = useDispatch()

  // todo: make better
  if (!userID) return null

  const onClose = () =>
    dispatch({ type: SET_USER_SETTINGS_OPEN, payload: false })

  return (
    <Dialog
      fullWidth
      fullScreen={isFullScreen}
      open={userSettingsOpen}
      onClose={onClose}
    >
      <DialogTitleWrapper title='Settings' />
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
        <Button onClick={onClose} color='primary' variant='contained'>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}
