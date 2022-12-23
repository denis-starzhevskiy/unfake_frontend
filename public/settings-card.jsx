import React, {useEffect} from 'react'
import { useGlobalState, useGlobalMutation } from '../utils/container'
import useDevices from '../utils/use-devices'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import {Button, Typography} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

SettingsCard.propTypes = {
  name: PropTypes.string,
  resolution: PropTypes.string,
  cameraDevice: PropTypes.string,
  microphoneDevice: PropTypes.string,
  video: PropTypes.bool,
  audio: PropTypes.bool
}

const useStyles = makeStyles((theme) => ({
  settingBox: {
    width: '400px',
    height: '460px',
    '@media (max-width: 600px)': {
      width: '300px',
      height: '470px'
    },
    '@media (max-width: 450px)': {
      width: '250px',
      height: '470px'
    }
  },
  dropdownStyle: {
    borderRadius: '20px',
    marginTop: '48px',
    width: '380px',
    '@media (max-width: 600px)': {
      width: '290px',
      marginTop: '53px'
    },
    '@media (max-width: 450px)': {
      width: '240px',
      marginTop: '55px'
    }
  },
  switchPadding: {
    paddingLeft: '10px',
    width: '95%'
  },
  menuTitle: {
    color: '#f87f30',
    textAlign: 'center',
    fontSize: '18px',
    position: 'relative',
    top: '7px'
  },
  marginTop: {
    marginTop: '0 !important'
  },
  menu: {
    margin: '5px 0',
    position: 'relative',
    height: '39px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    marginTop: '7px',
    marginBottom: '15px',
    borderBottom: '1px solid #EAEAEA'
  },
  hr: {
    borderBottom: '1px solid #EAEAEA'
  },
  switchItem: {
    flexDirection: 'row-reverse !important',
    marginLeft: '0 !important',
    marginRight: '0 !important',
    justifyContent: 'space-between'
  },
  settingLine: {
    color: 'black',
    marginTop: '5px',
    fontSize: '18px',
    paddingLeft: '10px'
  },
  commentInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '1rem',
    },
  },
  section1: {
    color: 'white',
    background: 'linear-gradient(50deg,#fc9011,#bf6011)',
  },
  card: {
    textAlign: 'center',
    borderRadius: 12,
    height: '100%',
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(['transform', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      boxShadow: theme.shadows[5],
      transform: `translateY(-${theme.spacing() / 2}px)`,
    },
  },
  item: {
    // border: '2px solid #f76c11',
    // padding: '8px',
    // borderRadius: '20px',
    width: '95%',
    margin: '6px',
    '&:focus': {
      backgroundColor: 'white'
    }
  },
  icon: {
    color: '#f87f30'
  },
  gapItem: {
    paddingRight: '15px',
    marginTop: '12px',
    marginBottom: '6px',
    '&:focus' : {
      backgroundColor: 'white'
    }
    // borderRadius: '20px'
  },
  gap: {
    fontSize: '19px',
    // color: "black",
    color: '#f87f30',
    transform: 'translate(14px, -6px) scale(0.75)'
  },
  menuItem: {
    // color: '#f87f30',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'//'#f87f30'
    }
  },
  menuList: {
    maxHeight: '50vh',
    overflowY: 'auto',
  },
  list: {
    padding: 0
  },
  selectRoot: {
    '&:focus':{
      backgroundColor:'white'
    },
    '&:selected': {
      backgroundColor: 'orange'
    }
  },
  saveButton: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px'
  },
  selectedRoot: {
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '&$selectedMenuItem': {
      backgroundColor: '#f87f30'
    },
  },
  selectedMenuItem: {},
}))

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 2,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {

        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#f68a43',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  )
})

export default function SettingsCard ({close}) {
  const classes = useStyles()
  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()
  const [cameraList, microphoneList] = useDevices()

  // useEffect(() => {
  //   if(cameraList.length === 0){
  //     alert("Будь-ласка, надайте дозвіл на використання камери та мікрофону")
  //   }
  // }, [cameraList])

  return(
      <Box className={classes.settingBox}>
          <FormControl className={classes.menu}>
            <Typography>
              <span className={classes.menuTitle}>Налаштування</span>
            </Typography>
          </FormControl>
          <div className={classes.line}/>
          <FormControl variant={'outlined'} className={classes.item}>
            <InputLabel id="resolution" className={classes.gap}>Якість</InputLabel>
            <Select
              className={classes.gapItem}
              classes={{icon: classes.icon, root: classes.selectRoot}}
              labelId="resolution"
              value={stateCtx.config.resolution}
              IconComponent={KeyboardArrowDownIcon}
              onChange={(evt) => {
                mutationCtx.updateConfig({
                  resolution: evt.target.value
                })
              }}
              inputProps={{
                name: 'resolution',
                id: 'resolution'
              }}
              MenuProps={{classes: {list: classes.list, paper: classes.dropdownStyle},
                variant: 'menu'}}
            >
              <MenuItem value={'480p'} className={classes.menuItem} classes={{root: classes.selectedRoot, selected: classes.selectedMenuItem}}>480p</MenuItem>
              <MenuItem value={'720p'} className={classes.menuItem} classes={{root: classes.selectedRoot, selected: classes.selectedMenuItem}}>720p</MenuItem>
              <MenuItem value={'1080p'} className={classes.menuItem} classes={{root: classes.selectedRoot, selected: classes.selectedMenuItem}}>1080p</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant={'outlined'} className={classes.item} sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="camera" className={classes.gap}>Камера</InputLabel>
            <Select
              className={classes.gapItem}
              classes={{icon: classes.icon, root: classes.selectRoot}}
              labelId="camera"
              IconComponent={KeyboardArrowDownIcon}
              value={stateCtx.config.cameraId}
              onChange={(evt) => {
                mutationCtx.updateConfig({
                  cameraId: evt.target.value
                })
              }}
              inputProps={{
                name: 'camera',
                id: 'camera'
              }}
              MenuProps={{classes: {list: classes.list, paper: classes.dropdownStyle},
                variant: 'menu'}}
            >
              {cameraList.length === 0 && (<MenuItem classes={{root: classes.selectedRoot}} value="" disabled>
                <em>Не знайдено</em>
              </MenuItem>)}
              {cameraList.map((item, key) => (
                <MenuItem key={key}
                          value={item.value}
                          classes={{root: classes.selectedRoot, selected: classes.selectedMenuItem}}
                          >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant={'outlined'} className={classes.item}>
            <InputLabel id="microphone" className={classes.gap}>Мікрофон</InputLabel>
            <Select
              className={classes.gapItem}
              classes={{icon: classes.icon, root: classes.selectRoot}}
              labelId="microphone"
              IconComponent={KeyboardArrowDownIcon}
              value={stateCtx.config.microphoneId}
              onChange={(evt) => {
                mutationCtx.updateConfig({
                  microphoneId: evt.target.value
                })
              }}
              inputProps={{
                name: 'microphone',
                id: 'microphone'
              }}
              MenuProps={{classes: {list: classes.list, paper: classes.dropdownStyle},
                variant: 'menu'}}
            >
              {microphoneList.length === 0 && (<MenuItem classes={{root: classes.selectedRoot}} value="" disabled>
                <em>Не знайдено</em>
              </MenuItem>)}
              {microphoneList.map((item, key) => (
                <MenuItem key={key} value={item.value} className={classes.menuItem} classes={{root: classes.selectedRoot, selected: classes.selectedMenuItem}}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.switchPadding}>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={stateCtx.muteVideo}
                  onChange={() => {
                    mutationCtx.setVideo(!stateCtx.muteVideo)
                  }}
                  value={stateCtx.muteVideo}
                  color="primary"
                />
              }
              className={classes.switchItem}
              label="Відео"
            />
            <div className={classes.hr}/>
          </FormControl>
          <FormControl className={classes.switchPadding}>
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={stateCtx.muteAudio}
                  onChange={() => {
                    mutationCtx.setAudio(!stateCtx.muteAudio)
                  }}
                  value={stateCtx.muteAudio}
                  color="primary"
                />
              }
              className={classes.switchItem}
              label="Звук"
            />
            <div className={classes.hr}/>
          </FormControl>
          <FormControl className={classes.saveButton}>
            <Button style={{width: '40%'}} size={'medium'} onClick={close}>Зберегти</Button>
          </FormControl>
      </Box>
  )
}
