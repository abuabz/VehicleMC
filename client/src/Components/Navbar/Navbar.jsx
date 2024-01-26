import React from 'react'
import logoImg from './logo.png'
export default function Navbar() {
    return (
        <>
            <nav className="navbar fixed-top " style={{backgroundColor:' #8c8c8c80',fontWeight: '800',width:'21%',minWidth:'200px',borderBottomRightRadius:'47px'}}>
                <div className="container-fluid justify-content-center ">
                    <a className="navbar-brand d-flex align-items-center " href="#">
                        <img
                            src={logoImg}
                            alt="Logo"
                            width={40}
                            height={40}
                            className="d-inline-block align-text-top"
                        />
                        <span className='m-2'>VehicleRC</span>
                    </a>
                </div>
            </nav>

        </>
    )
}
