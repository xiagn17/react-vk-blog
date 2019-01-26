import React from 'react';
import './index.css';


const ArticleContent = ({ unixTime, article }) => {

    return (
        <div className='article-main container'>
            <header>
                <h2 className='article-header'>
                    {article.header}
                </h2>
                <span>
                    {
                        new Date(unixTime * 1000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            day: 'numeric',
                            month: 'long'
                        })
                    }
                    </span>
            </header>

            <article>
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
                { article.picUrl ?
                    <div className="img">
                        <img
                            src={article.picUrl}
                            alt='no-errors'
                        />
                    </div>
                    :
                    null
                }

            </article>

        </div>
    );
};


export default ArticleContent;