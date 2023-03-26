import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(props) {

    // using uselocation hok
    const location = useLocation();

    return (
        <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: props.mode === "light" ? "black" : "#7ee57e" }}><strong>{props.title}</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                             <Link className={`nav-link ${location.pathname === "/business" ? "fw-bolder" : ""}`}
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/business">Business</Link>
                        </li>
                        <li className="nav-item">
                             <Link className={`nav-link ${location.pathname === "/entertainment" ? "fw-bolder" : ""}`}
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/entertainment">Entertainment</Link>
                        </li>
                        <li className="nav-item">
                             <Link className={`nav-link ${location.pathname === "/general" ? "fw-bolder" : ""}`}
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/general">General</Link>
                        </li>
                        <li className="nav-item">
                             <Link className={`nav-link ${location.pathname === "/health" ? "fw-bolder" : ""}`}
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/health">Health</Link>
                        </li>
                        <li className="nav-item">
                             <Link className={`nav-link ${location.pathname === "/science" ? "fw-bolder" : ""}`}
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/science">Science</Link>
                        </li>
                        <li className="nav-item">
                             <Link className={`nav-link ${location.pathname === "/sports" ? "fw-bolder" : ""}`}
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/sports">Sports</Link>
                        </li>
                        <li className="nav-item">
                             <Link className={`nav-link ${location.pathname === "/technology" ? "fw-bolder" : ""}`}
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/technology">Technology</Link>
                        </li>
                    </ul>
                </div>

                <img src={props.img} onClick={props.toggleMode} alt=".." style={{
                    width: "28px",
                }} />

            </div>
        </nav>
    )
}