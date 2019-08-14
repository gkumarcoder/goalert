import React, { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core/index'
import RefreshIcon from '@material-ui/icons/Refresh'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import CopyIcon from 'mdi-material-ui/ContentCopy'
import CalendarIcon from 'mdi-material-ui/Calendar'
import copyToClipboard from '../../util/copyToClipboard'

const URL = 'www.calendarlabs.com/ical-calendar/ics/22/Chicago_Cubs_-_MLB.ics'
const HTTP_URL = 'https://' + URL
const WEBCAL_URL = 'webcal://' + URL

const options = [
  {
    title: 'Subscribe to My Shifts',
    icon: CalendarIcon,
    caption: 'Subscribe to your upcoming shifts via your preferred calendar',
  },
  {
    title: 'Refresh Calendar URL',
    icon: RefreshIcon,
    caption: 'Generate a new calendar URL for private use',
  },
  {
    title: 'Copy Calendar URL',
    icon: CopyIcon,
    caption: 'Some applications require manually pasting the URL to subscribe',
  },
]

const useStyles = makeStyles(theme => ({
  calIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function CalendarSubscribe() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const classes = useStyles()

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  function handleButtonClick(event) {
    event.preventDefault()

    switch (selectedIndex) {
      case 0: // subscribe
        break // href acts as the button's onClick
      case 1: // refresh
        // todo
        setShowTooltip(true)
        break
      case 2: // copy
        copyToClipboard(HTTP_URL)
        setShowTooltip(true)
        break
    }
  }

  const Icon = options[selectedIndex].icon
  const title = options[selectedIndex].title
  const caption = options[selectedIndex].caption

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ButtonGroup
          variant='contained'
          color='primary'
          aria-label='split button'
        >
          <Tooltip
            onClose={() => setShowTooltip(false)}
            open={showTooltip}
            title={
              selectedIndex === 1
                ? 'Generated!'
                : selectedIndex === 2
                ? 'Copied!'
                : ''
            }
            placement='bottom'
          >
            <Button
              color='primary'
              href={WEBCAL_URL}
              onClick={handleButtonClick}
              variant='contained'
            >
              <Icon className={classes.calIcon} />
              {title}
            </Button>
          </Tooltip>
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
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
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
      </Grid>
      <Grid item xs={12}>
        <Typography variant='caption' color='textSecondary'>
          {caption}
        </Typography>
      </Grid>
    </Grid>
  )
}
