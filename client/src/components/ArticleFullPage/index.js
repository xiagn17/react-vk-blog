import React, { Component } from 'react';
import './index.css';

import ArticleContent from '../ArticleContent';


class ArticleFullPage extends Component {

    constructor () {
        super();

        this.state = {
            opacity: undefined
        }
    }

    componentDidMount () {
        this.setState({
            opacity: getComputedStyle(document.querySelector('.wrapper-fade')).opacity
        });
    }


    render () {
        const { opacity } = this.state;
        const {
            article,
            unixTime,
            hideArticle
        } = this.props;

        if (opacity !== undefined) {
            const fullArticle = document.querySelector('.wrapper-fade');
            fullArticle.style.opacity = '1';
        }

        return (
            <div className='wrapper-fade'>
                <div className='wrapper-fade-relative'>
                    <ArticleContent
                        unixTime={unixTime}
                        article={article}
                    />
                    <button
                        className='closeArticle'
                        onClick={hideArticle}
                    >
                        <i className="far fa-times-circle" />
                    </button>
                </div>

            </div>
        );
    }

}


export default ArticleFullPage;