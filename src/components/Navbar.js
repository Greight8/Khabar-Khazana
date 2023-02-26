import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {

    return (
        <nav className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: props.mode === "light" ? "black" : "#7ee57e" }}>{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/business">Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/entertainment">Entertainment</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/general">General</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/health">Health</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/science">Science</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/sports">Sports</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                                style={{ color: props.mode === "light" ? "black" : "#7ee57e" }} to="/technology">Technology</Link>
                        </li>
                    </ul>
                    <div className={`form-check form-switch text-${props.mode === "light" ? "dark" : "light"}`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.switchTxt}</label>
                    </div>
                </div>
            </div>
        </nav>
    )
}