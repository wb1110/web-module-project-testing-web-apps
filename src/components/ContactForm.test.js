import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText('Contact Form');
    expect(header).toBeInTheDocument();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByPlaceholderText(/edd/i);
    userEvent.type(firstName, "a");
    const error = screen.queryByText(/error/i);
    expect(error).toBeInTheDocument();


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submit = screen.queryByText(/submit/i);
    userEvent.click(submit);
    const errorFirst = screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(errorFirst).toBeInTheDocument();
    const errorLast = screen.queryByText(/Error: lastName is a required field./i);
    expect(errorLast).toBeInTheDocument();
    const errorEmail = screen.queryByText(/Error: email must be a valid email address./i);
    expect(errorEmail).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByPlaceholderText(/edd/i);
    userEvent.type(firstName, "William");
    const lastName = screen.queryByPlaceholderText(/burke/i);
    userEvent.type(lastName, "Buchanan");
    const submit = screen.queryByText(/submit/i);
    userEvent.click(submit);
    const errorEmail = screen.queryByText(/Error: email must be a valid email address./i);
    expect(errorEmail).toBeInTheDocument();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.queryByPlaceholderText(/bluebill1049@hotmail.com/i);
    userEvent.type(email, "Buchanan");
    const errorEmail = screen.queryByText(/Error: email must be a valid email address./i);
    expect(errorEmail).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submit = screen.queryByText(/submit/i);
    userEvent.click(submit);
    const errorLast = screen.queryByText(/Error: lastName is a required field./i);
    expect(errorLast).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.queryByPlaceholderText(/edd/i);
    const lastName = screen.queryByPlaceholderText(/edd/i);
    const email = screen.queryByPlaceholderText(/bluebill1049@hotmail.com/i);
    const submit = screen.queryByText(/submit/i);
    const submitted = screen.queryByText(/submitted/i);
    userEvent.type(firstName, "William");
    userEvent.type(lastName, "Buchanan");
    userEvent.type(email, "strengthcoachwb@gmail.com");
    userEvent.click(submit) ? expect(submitted).toBeInTheDocument() : null;
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
});