import React, { useState, useEffect } from 'react';
import logoImg from './logo.png'
import './Navbar.css'
export default function Navbar() {

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.className = theme === 'light' ? '' : 'dark';
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    return (
        <>
            <nav className="navbar fixed-top " style={{ backgroundColor: ' #c3d4e966', fontWeight: '800', width: '100%', minWidth: '250px',backdropFilter:'blur(5px)'}}>
                <div className="container-fluid  ">
                    <a className="navbar-brand d-flex align-items-center " href="#">
                        <img
                            src={logoImg}
                            alt="Logo"
                            width={40}
                            height={40}
                            className="d-inline-block align-text-top"
                        />
                        <span className='m-2 iconName' >VehicleRC</span>

                    </a>
                    <div className="themeIcons" style={{ cursor: 'pointer' }} onClick={toggleTheme}>
                        {theme === 'light' ? (
                            <i className="bi bi-sun iconLight"></i>
                        ) : (
                            <i className="bi bi-moon-stars iconLight"></i>
                        )}
                    </div>
                </div>
            </nav>

        </>
    )
}
