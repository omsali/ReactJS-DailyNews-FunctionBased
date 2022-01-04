import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () =>{
    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">DailyNews</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link active mx-3" aria-current="page" to="/general">Home</Link></li>
                            {/* <div className="dropdown">
                                <button className="btn btn-dark text-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Categories</button>
                                <ul className="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1"> */}
                                    <li className="nav-item"><Link className="nav-link" to="/business" >Business</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/entertainment"  >Entertainment</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/" >General</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/health" >Health</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/science" >Science</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/sports" >Sports</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/technology" >Technology</Link></li>
                                {/* </ul>
                            </div> */}
                        </ul>
                    
                    </div>
                </div>
            </nav>
        </div>
    )
    
}

export default Navbar

