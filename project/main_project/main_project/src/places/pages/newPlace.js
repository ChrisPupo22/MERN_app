import React from 'react'; 

import Input from '../../shared/components/FormElements/input';
import './newPlace.css'

const NewPlace = () => {
    return (
        <form className="place-form">
           <Input element='input' type='text' label='Title' validators={} />
        </form>
    );
};

export default NewPlace; 