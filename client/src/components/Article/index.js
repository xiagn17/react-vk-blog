import React, { Component } from 'react';
import './index.css';

import ArticleContent from '../ArticleContent'



class Article extends Component {

    constructor () {
        super();

        this.state = {
            moreThan500: false
        }
    }


    checkLength = () => {
        const { article } = this.props;

        if (article.content.length > 500) {
            this.setState({
                moreThan500: true
            })
        }
    };

    componentDidMount () {
        this.checkLength();
    }



    render () {
        const { moreThan500 } = this.state;
        const {
            unixTime,
            article,
            showFullArticle
        } = this.props;

        let cutArticle = Object.create(article);
        if (moreThan500) {
            cutArticle.content = cutArticle.content.substring(0, 500).concat('...');
        }

        return (
            <div className='article'>
                <ArticleContent
                    unixTime={unixTime}
                    article={cutArticle}
                />
                { moreThan500 ?
                    <button
                        className='showMore'
                        onClick={() => {
                            showFullArticle(article, unixTime)
                        }}  // кнопка выводит текст статьи
                    >
                        Показать больше
                    </button>
                    :
                    null
                }

            </div>
        );
    }
}


export default Article;