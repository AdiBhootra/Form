import React from 'react'
import { Istate } from "../../modal/State"



const Validation = (input: Istate) => {

    let error: Istate = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const userNameRegex = /^[A-Za-z][A-Za-z0-9_]{6,29}$/ ;
    const nameRegex = /^[A-Za-z]{3,15}$/ ;
    const NumberRegex = /^[789]{1}[0-9]{9}/


    if (!input.name) {
      error.name = "name is required!";
    }else if (!nameRegex.test(input.name)) {
      error.name = "Name should only take character value and it should be between 3 to 15 character!";
    }

    if (!input.username) {
      error.username = "Username is required!";
    }else if (!userNameRegex.test(input.username)) {
      error.username = "This is not a valid Username format it take characters and number length between 7 t0 25!";
    }


    if (!input.email) {
      error.email = "Email is required!";
    } else if (!emailRegex.test(input.email)) {
      error.email = "This is not a valid email format!";
    }

    if (!input.phone) {
      error.phone = "phone Number  is required!";
    } else if (!NumberRegex.test(input.phone)) {
      error.phone = "Number start with 9 or 8 or 7 and it's length is 10!";
    }

    if (!input.website) {
      error.website = "website  is required!";
    } 
    // else if (!NumberRegex.test(input.website)) {
    //   error.website = "Number start with 9 or 8 or 7 and it's length is 10!";
    // }

    return error;
}

export default Validation;
