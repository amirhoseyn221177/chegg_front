import React from 'react';
import './Unauth.css'
const Unauthorized = (props) => {
    return (
        <div id='authFailed' className='center'>
            <i className='large material-icons'>error_outline</i>
            <h2>There is a problem with your connection </h2>
            <h3 style={{position:"absolute",left:'180px'}}>Try to <a href='/'>login</a></h3>
        </div>
    )
}

export default Unauthorized;
