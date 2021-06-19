import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    The Wedding Site
                </Link>
                <div className='collpase navbar-collapse'>
                    <div className='navbar-nav mr-auto'>
                        <div className='collpase navbar-collapse'>
                            <Link to="/guest/list" className="nav-link">
                                List Guests
                            </Link>
                        </div>
                        <div className='collpase navbar-collapse'>
                            <Link to="/guest/create" className="nav-link">
                                Create Guest
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Links