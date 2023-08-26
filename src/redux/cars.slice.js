import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from 'helpers';

// create slice

const name = 'cars';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const carsActions = { ...slice.actions, ...extraActions };
export const carsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    cars: []
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

  return {
    getAll: getAll(),
    addCar: addCar(),
    editCar: editCar(),
    deleteCar: deleteCar(),
  };

  function getAll() {
    return createAsyncThunk(
      `${name}/getAll`,
      async () => await fetchWrapper.get(`${baseUrl}/cars`)
    );
  }

  function addCar() {
    return createAsyncThunk(
      `${name}/addCar`,
      async (data) => await fetchWrapper.post(`${baseUrl}/cars`, data)
    );
  }

  function editCar() {
    return createAsyncThunk(
      `${name}/editCar`,
      async (data) => await fetchWrapper.put(`${baseUrl}/cars/${data.id}`, data.newCar)
    );
  }

  function deleteCar() {
    return createAsyncThunk(
      `${name}/deleteCar`,
      async (id) => await fetchWrapper.delete(`${baseUrl}/cars/${id}`)
    );
  }
}

function createExtraReducers() {
  return {
    ...getAll(),
    ...addCar(),
    ...editCar(),
    ...deleteCar(),
  };

  function getAll() {
    var { fulfilled, rejected } = extraActions.getAll;
    return {
      [fulfilled]: (state, action) => {
        state.cars = action.payload.cars;
      },
      [rejected]: (state, action) => {
        state.cars = { error: action.error };
      }
    };
  }

  function addCar() {
    var { fulfilled, rejected } = extraActions.addCar;
    return {
      [fulfilled]: (state, action) => {
        state.cars = action.payload.car ? [...state.cars, action.payload.car] : state.cars;
      },
      [rejected]: (state, action) => {
        state.cars = { error: action.error };
      }
    };
  }

  function editCar() {
    var { fulfilled, rejected } = extraActions.editCar;
    return {
      [fulfilled]: (state, action) => {
        state.cars = state.cars?.map(car => {
          if (car.id === action.payload.car.id) {
            return action.payload.car;
          } else {
            return car;
          }
        });
      },
      [rejected]: (state, action) => {
        state.cars = { error: action.error };
      }
    };
  }

  function deleteCar() {
    var { fulfilled, rejected } = extraActions.deleteCar;
    return {
      [fulfilled]: (state, action) => {
        state.cars = state.cars?.filter(car => car.id !== action.meta.arg);
      },
      [rejected]: (state, action) => {
        state.cars = { error: action.error };
      }
    };
  }
}