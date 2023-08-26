import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, Paper } from '@mui/material';

import { carsActions } from 'redux/cars.slice';
import CarModal from 'components/Common/CarModal';
import DeleteModal from 'components/Common/DeleteModal';

const Home = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    dispatch(carsActions.getAll());
  }, [dispatch]);

  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedCar(null);
  };

  const handleSaveCar = (newCar) => {
    if (selectedCar) {
      dispatch(carsActions.editCar({ id: selectedCar.id, newCar }));
    } else {
      dispatch(carsActions.addCar(newCar));
    }
    handleCloseDialogs();
  };

  const handleDeleteCar = () => {
    dispatch(carsActions.deleteCar(selectedCar.id));
    handleCloseDialogs();
  };

  return (
    <Container maxWidth="md" sx={{ padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Cars List
      </Typography>

      <Button variant="outlined" color="primary" onClick={handleAddClick}>
        Add Car
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell>
                  <Button color="primary" variant="contained" onClick={() => handleEditClick(car)}>
                    Edit
                  </Button>
                  <Button color="error" variant="contained" onClick={() => handleDeleteClick(car)} sx={{ marginLeft: 1 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {(isAddDialogOpen || isEditDialogOpen) ? (
        <CarModal
          isAddDialogOpen={isAddDialogOpen}
          isEditDialogOpen={isEditDialogOpen}
          selectedCar={selectedCar}
          handleCloseDialogs={handleCloseDialogs}
          handleSaveCar={handleSaveCar}
        />
      ) : null}

      {isDeleteDialogOpen ? (
        <DeleteModal
          isDeleteDialogOpen={isDeleteDialogOpen}
          handleCloseDialogs={handleCloseDialogs}
          handleDeleteCar={handleDeleteCar}
        />
      ) : null}
    </Container>
  );
};

export default Home;
