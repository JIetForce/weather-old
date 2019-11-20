import React from 'react';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={5}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
  },
}));

const Weather = ({ city, country, temp, tempToDay, tempToDay2, tempToDay3, tempToDay4, tempToDay5, error }) => {
  
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const getDateToday = n => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() +n)
    const dateToday = `${newDate.getFullYear()}-${newDate.getMonth() +1}-${newDate.getDate()}`;
    return dateToday;
  };

  const newDay = (n, day) => (
    <TabPanel value={value} index={n} dir={theme.direction}>
      <div style={{textAlign: "center"}}>
        <p>{city}, {country}</p>
        <p>{getDateToday(n)}</p>
        {day}
      </div>
    </TabPanel>
  )
  
  return (
    <div className={classes.root} style={{
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
      }}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='Сегодня' {...a11yProps(0)} />
          <Tab label='Завтра' {...a11yProps(1)} />
          <Tab label={getDateToday(2)} {...a11yProps(2)} />
          <Tab label={getDateToday(3)} {...a11yProps(3)} />
          <Tab label={getDateToday(4)} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div style={{ textAlign: 'center' }}>
            <div style={{color: 'red'}}>{error}</div>
            <p>
              {city}, {country}
            </p>
            <p>{getDateToday(0)}</p>
            <p>Cейчас: {temp} °C</p>
            {tempToDay}
          </div>
        </TabPanel>
        {newDay(1, tempToDay2)}
        {newDay(2, tempToDay3)}
        {newDay(3, tempToDay4)}
        {newDay(4, tempToDay5)}
      </SwipeableViews>
    </div>
  );
}

export default Weather;