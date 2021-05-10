import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Recipie from './Components/Recipie';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin: '10px auto',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}));

function App() {
  const classes = useStyles();
  const [food, setFood] = useState('cake');
  const [recipies, setRecipies] = useState([]);
  const [query, setQuery] = useState('');

  const APP_ID = "c2c05ffe", APP_KEY = "353dc6ddbaf37029ab769848aeb49d5d";

  useEffect(() => {
    console.log('something happened');
    getRecipie();
  }, [query]);

  const getRecipie = async () => {
    const response = await axios.get(`https://api.edamam.com/search?q=${food}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    console.log(response.data.hits);
    setRecipies(response.data.hits);
  }

  const updateFood = (event) => {
    setFood(event.target.value);
  }

  const updateQuery = (event) => {
    event.preventDefault();
    setQuery(food);
  }

  return (
    <div className="App">
      <Paper component="form" className={classes.root} onSubmit={updateQuery}>
        <InputBase
          value={food}
          onChange={updateFood}
          className={classes.input}
          placeholder="Search Recipie"
          inputProps={{ 'aria-label': 'search recipie' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container>
        {
          recipies.map((recipie) => (
            <Grid item xs={3}>
              <Recipie title={recipie.recipe.label} calories={recipie.recipe.calories}
                image={recipie.recipe.image} ingredients={recipie.recipe.ingredients} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default App;