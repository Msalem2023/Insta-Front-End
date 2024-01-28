import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../componants/Nav.js'
import '../componants/Nav.css'
import Suggested from '../componants/Suggested.js'

function Layout() {
    return (
        <>
            <div className='d-flex '>
                <div className='col-2 fixed-end NAV '>

                <Nav />
                </div>
                <div className='col-10'>

                <Outlet />
                </div>
                
            </div>
        </>)
}

export default Layout