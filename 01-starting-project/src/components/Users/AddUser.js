import React, { useState } from 'react';

import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {

    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0)
        {
            setError({
                title: 'Invalid input',
                message: 'please enter valid inputs(name & age)'
            });
            return;
        }
        if(+enteredAge < 1) 
        {
            setError({
                title: 'Invalid age',
                message: 'please enter valid age'
            });
            return;
        }
        console.log(enteredUserName, enteredAge);
        props.onAddUser(enteredUserName, enteredAge);
        setEnteredUserName('');
        setEnteredAge('');
    }

    const userNameChangeHandler = (event) => {
       setEnteredUserName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
     };

     const errorHandler = () => {
         setError(null);
     };

    return (
        <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={enteredUserName} onChange={userNameChangeHandler} />
            <label htmlFor="age">Age(Years)</label>
            <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}/>
            <Button type="submit">Add user</Button>
        </form>
        </Card>
        </div>
    );
};

export default AddUser;