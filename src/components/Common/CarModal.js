import React, { useState } from 'react';
import { MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box } from '@mui/material';

const CarModal = ({ isAddDialogOpen, isEditDialogOpen, handleCloseDialogs, selectedCar, handleSaveCar }) => {
  const makeItems = ['AUDI', 'BMW', 'VAUXHAL', 'MERCEDES', 'PEUGEOT', 'RENAULT'];
  const colorItems = ['Blue', 'Red', 'Black', 'Orange'];
  const [newCar, setNewCar] = useState({
    make: selectedCar ? selectedCar.make : '',
    name: selectedCar ? selectedCar.name : '',
    color: selectedCar ? selectedCar.color : '',
    code: selectedCar ? selectedCar.code : '',
  });
  const [step, setStep] = useState(1);
  const [nameError, setNameError] = useState('');
  const [makeError, setMakeError] = useState('');
  const [colorError, setColorError] = useState('');
  const [codeError, setCodeError] = useState('');

  const validateNameAndMake = () => {
    let valid = true;

    if (newCar.name.trim() === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (newCar.make === '') {
      setMakeError('Make is required');
      valid = false;
    } else {
      setNameError('');
    }

    return valid;
  };

  const validateColor = () => {
    let valid = true;

    if (newCar.color === '') {
      setColorError('Color is required');
      valid = false;
    } else {
      setColorError('');
    }

    return valid;
  };

  const validateCode = () => {
    let valid = true;

    if (newCar.code.trim() === '') {
      setCodeError('Code is required');
      valid = false;
    } else {
      setCodeError('');
    }

    return valid;
  };

  const handleClickSave = (e) => {
    e.preventDefault();

    switch (step) {
      case 1:
        if (validateNameAndMake()) {
          setStep(2);
        }
        break;
      case 2:
        if (validateColor()) {
          setStep(3);
        }
        break;
      case 3:
        if (validateCode()) {
          setStep(4);
        }
        break;
      case 4:
        handleSaveCar(newCar);
        handleCloseDialogs();
        break;
      default: break;
    }
  }

  const selectNameMake = () => (
    <Box>
      <Box padding={2}>
        <TextField
          label="Name"
          fullWidth
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          helperText={nameError}
          FormHelperTextProps={{ style: { color: 'red' } }}
        />
      </Box>
      <Box padding={2}>
        <TextField
          select
          label="Make"
          fullWidth
          value={newCar.make}
          onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
          helperText={makeError}
          FormHelperTextProps={{ style: { color: 'red' } }}
        >
          <MenuItem value="" disabled>Select Make</MenuItem>
          {makeItems.map((item, index) => (
            <MenuItem key={index} value={item} sx={{ textTransform: 'uppercase' }}>{item}</MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  )

  const selectColor = () => (
    <Box padding={3}>
      <TextField
        select
        label="Color"
        fullWidth
        value={newCar.color}
        onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
        helperText={colorError}
        FormHelperTextProps={{ style: { color: 'red' } }}
      >
        <MenuItem value="" disabled>Select Color</MenuItem>
        {colorItems.map((item, index) => (
          <MenuItem key={index} value={item} sx={{ textTransform: 'uppercase' }}>{item}</MenuItem>
        ))}
      </TextField>
    </Box>
  )

  const selectCode = () => (
    <Box padding={2}>
      <TextField
        label="Code"
        fullWidth
        value={newCar.code}
        onChange={(e) => setNewCar({ ...newCar, code: e.target.value })}
        helperText={codeError}
        FormHelperTextProps={{ style: { color: 'red' } }}
      />
    </Box>
  )

  const reviewCar = () => (
    <Box>
      <Typography gutterBottom>
        I have a {newCar.make} and the color is {newCar.color}.
      </Typography>
      {newCar.color === 'Red' ? (
        <Typography gutterBottom textTransform="uppercase">
          The car is Red! Nice!!
        </Typography>
      ) : null}
      <Typography gutterBottom>
        REF: {newCar.code}
      </Typography>
    </Box>
  )

  return (
    <Dialog open={isAddDialogOpen || isEditDialogOpen} onClose={handleCloseDialogs}>
      <DialogTitle>{selectedCar ? 'Edit Car' : 'Add Car'}</DialogTitle>
      <DialogContent>
        {step === 1 ? selectNameMake() : step === 2 ? selectColor() : step === 3 ? selectCode() : step === 4 ? reviewCar() : null}
      </DialogContent>
      <DialogActions sx={{ minWidth: 400 }}>
        <Button onClick={handleCloseDialogs} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClickSave} color="primary">
          {[1, 2].includes(step) ? 'Next' : step === 3 ? 'Done' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CarModal;