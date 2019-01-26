import React, { Component } from 'react';
import './index.css';


import Header from '../Header';
import ArticleFullPage from '../ArticleFullPage'
import Main from '../Main';
import Loading from '../Loading';



class App extends Component {

    constructor () {
        super();

        this.state = {
            article: null,
            isLoading: false
        }
    }


    showFullArticle = (article, unixTime) => {
        this.setState({
            article: {
                ...article
            },
            unixTime
        });

        document.body.style.overflow = "hidden";
    };

    hideArticle = () => {
        const fullArticle = document.querySelector('.wrapper-fade');

        if (fullArticle) {
            fullArticle.classList.add('animated', 'fadeOutUp', 'duration-1s');
            fullArticle.style.overflow = 'hidden';

            setTimeout(() => {
                this.setState({
                    article: null,
                    unixTime: null
                });
            }, 1000);

            document.body.style.overflow = 'auto';
        }
    };

    loadingTrigger = () => {
        this.setState(prevState => {
            const { isLoading } = prevState;
            const body = document.body;

            isLoading ? body.style.overflow = 'auto' : body.style.overflow = 'hidden';

            return {
                isLoading: !isLoading
            }
        });
    };

    render() {
        const {
            article,
            unixTime,
            isLoading
        } = this.state;

        return (
            <div className="App">
                { isLoading ?
                    <Loading/>
                    :
                    null
                }
                <div className="container">
                    <Header />
                    <Main
                        showFullArticle={this.showFullArticle}
                        hideArticle={this.hideArticle}
                        loadingTrigger={this.loadingTrigger}
                    />
                    { article ?
                        <ArticleFullPage
                            unixTime={unixTime}
                            article={article}
                            hideArticle={this.hideArticle}
                        />
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}


export default App;
