export const SET_USER_SETTINGS_OPEN = 'SET_USER_SETTINGS_OPEN'

// todo: can delete once SideBarDrawerList is converted to hooks
export function setUserSettingsOpen(bool) {
  return {
    type: SET_USER_SETTINGS_OPEN,
    payload: bool,
  }
}
