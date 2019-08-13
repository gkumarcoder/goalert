import React from 'react'
import p from 'prop-types'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogActions,
  ListItemIcon,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import CopyIcon from 'mdi-material-ui/ContentCopy'
import CalendarIcon from 'mdi-material-ui/Calendar'
import DialogTitleWrapper from '../dialogs/components/DialogTitleWrapper'

const CAL_URL =
  'https://www.calendarlabs.com/ical-calendar/ics/22/Chicago_Cubs_-_MLB.ics'

const options = [
  {
    title: 'Subscribe to My Shifts',
    icon: CalendarIcon,
  },
  {
    title: 'Refresh Calendar URL',
    icon: RefreshIcon,
  },
  {
    title: 'Copy Calendar URL',
    icon: CopyIcon,
  },
]

const useStyles = makeStyles(theme => ({
  calIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function UserSettings(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const classes = useStyles()

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  function handleButtonClick() {
    switch (selectedIndex) {
      case 0:
        return null // href acts as the button's onClick
      case 1:
        return console.log('Refreshing URL')
      case 2:
        return console.log('Copied URL!')
    }
  }

  const Icon = options[selectedIndex].icon
  const title = options[selectedIndex].title

  return (
    <Dialog fullWidth open={props.open} onClose={props.onClose}>
      <DialogTitleWrapper fullScreen={false} title='Settings' />
      <DialogContent>
        <ButtonGroup
          variant='contained'
          color='primary'
          aria-label='split button'
        >
          <Button
            color='primary'
            href={selectedIndex === 0 ? CAL_URL : null}
            onClick={handleButtonClick}
            variant='contained'
          >
            <Icon className={classes.calIcon} />
            {title}
          </Button>
          <Button
            color='primary'
            size='small'
            aria-owns={anchorEl ? 'menu-list-grow' : undefined}
            aria-haspopup='true'
            onClick={handleOpenMenu}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {options.map((option, idx) => (
            <MenuItem
              key={idx}
              onClick={event => handleMenuItemClick(event, idx)}
              selected={idx === selectedIndex}
            >
              <ListItemIcon>
                <option.icon />
              </ListItemIcon>
              {option.title}
            </MenuItem>
          ))}
        </Menu>
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
