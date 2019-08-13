import React from 'react'
import p from 'prop-types'
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core/index'
import DialogTitleWrapper from '../../dialogs/components/DialogTitleWrapper'
import CalendarSubscribe from './CalendarSubscribe'

export default function UserSettings(props) {
  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitleWrapper fullScreen={false} title='Settings' />
      <DialogContent>
        <CalendarSubscribe />
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
