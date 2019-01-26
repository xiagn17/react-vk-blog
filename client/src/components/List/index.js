import React from 'react';
import './index.css'

import Article from '../Article';



const List = ({ articles, showFullArticle }) => {
    return (
        <section className='content'>
            {
                articles.map(item => {
                    const {
                        unixTime,
                        article,
                        _id
                    } = item;

                    return (
                        <div
                            className='wrapper-article'
                            key={_id}
                        >
                            <Article
                                unixTime={unixTime}
                                article={article}
                                showFullArticle={showFullArticle}
                            />
                        </div>
                    );
                })
            }
        </section>
    );
};



export default List;