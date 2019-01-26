import React from 'react';
import './index.css';



const Navigation = ({
         page,
         clickHandlerPlus,
         clickHandlerMinus,
         count,
         isMounted
     }) => {

    return (
        !isMounted ?
            null
            :
            (page === 1 ?
                <div className="navigation">
                    <button
                        className='nextPage'
                        onClick={() => clickHandlerPlus()}
                    >
                        <i className="fas fa-arrow-right"/>
                    </button>
                </div>
                :
                ((count / 3 <= page) ?
                        <div className="navigation">
                            <button
                                className='prevPage'
                                onClick={() => clickHandlerMinus()}
                            >
                                <i className="fas fa-arrow-left"/>
                            </button>
                        </div>
                        :
                        <div className="navigation">
                            <button
                                className='prevPage'
                                onClick={() => clickHandlerMinus()}
                            >
                                <i className="fas fa-arrow-left"/>
                            </button>
                            <button
                                className='nextPage'
                                onClick={() => clickHandlerPlus()}
                            >
                                <i className="fas fa-arrow-right"/>
                            </button>
                        </div>
                ))
    )
};


export default Navigation;