import React from 'react';

const ErrorMessage = (props) => {
    const { error } = props;
    return (
        <div className="he-100" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ alignSelf: 'center' }}>
                <div className="alert alert-primary fade show align-self-center text-white" role="alert">{error.message}</div>
            </div>
        </div>
    );
}

export default ErrorMessage;