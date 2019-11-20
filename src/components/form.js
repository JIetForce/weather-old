import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

const useStylesB = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing(1)
  }
}));

const Form = ({ gettingWeather }) => {
  const classes = useStyles();
  const classesB = useStylesB();

  const [text, setText] = useState('');

  const x = e => {
    return setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    gettingWeather(text);
    setText('');
  };

  return (
    <form onSubmit={onSubmit} style={{
      display: 'block',
      marginLeft: '50%',
         }}>
      <Input
        name='city'
        placeholder='Введите город'
        className={classes.input}
        inputProps={{
          'aria-label': 'description'
        }}
        onChange={x}
        value={text}
      />

      <Button
        variant='outlined'
        color='inherit'
        className={classesB.button}
        type='submit'
      >
        Поиск
      </Button>
    </form>
  );
};

export default Form;