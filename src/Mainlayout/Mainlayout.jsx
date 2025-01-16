import React from 'react';
import Navbar from '../SharedStyle/Navbar';
import { Outlet } from 'react-router-dom';
import NewspaperFooter from '../SharedStyle/NewspaperFooter';

const Mainlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <NewspaperFooter></NewspaperFooter>
        </div>
    );
};

export default Mainlayout;