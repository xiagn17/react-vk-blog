import React from 'react';
import './index.css';



const LoadPost = ({ pullDataClearCache }) => {
    return (
        <div className='load-post animated slideInLeft duration-1s'>
            <div className='text'>
                The new Article is released!
            </div>
            <button
                className='load-post-button'
                onClick={pullDataClearCache}
            >
                <i className="fas fa-redo-alt btn-rotate" />
            </button>
        </div>
    );
};


export default LoadPost;