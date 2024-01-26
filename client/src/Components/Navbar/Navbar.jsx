import React from 'react'
import logoImg from './logo.png'
export default function Navbar() {
    return (
        <>
            <nav className="navbar fixed-top " style={{backgroundColor:' #a2acb6',fontWeight: '800'}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            src={logoImg}
                            alt="Logo"
                            width={30}
                            height={30}
                            className="d-inline-block align-text-top"
                        />
                        VehicleRC
                    </a>
                </div>
            </nav>

        </>
    )
}
