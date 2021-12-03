import React from 'react';

const Admin = (props) => {
    const {email}= props.admin
    return (
        <div>
            <h1>{email}</h1>
        </div>
    );
};

export default Admin;