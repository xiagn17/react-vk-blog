import React, {Component} from 'react';
import axios from "axios/index";


import List from '../List';
import LoadPost from '../LoadPost';
import Navigation from '../Navigation';

import socketHandler from "../../socketApi";



class Main extends Component {

    constructor () {
        super();

        this.state = {
            articles: [],
            page: 1,
            count: null,
            isMounted: false,
            cache: {},
            newPost: false
        };
    }

    pullData = (page) => {
        const { count, cache } = this.state;
        const { loadingTrigger } = this.props;

        loadingTrigger();

        return axios(`posts?page=${page}&count=${count}`)
            .then(posts => {
                cache[page] = posts.data.articles;

                this.setState({
                    ...posts.data
                });

                loadingTrigger();
            })
    };

    pullDataClearCache = () => {
        const { hideArticle } = this.props;

        new Promise((resolve, reject) => {
            this.setState(prevState => {
                resolve(prevState);

                return {
                    cache: {},
                    page: 1,
                    count: null
                }
            })
        })
            .then(() => {
                const { page } = this.state;

                this.updateArticles(page);
                this.setState({ newPost: false });

                hideArticle();
            });


    };


    clickHandlerPlus = () => {
        new Promise((resolve, reject) => {
            this.setState(prevState => {
                const page = ++prevState.page;

                resolve(page);
                return { page }
            });
        })
            .then(this.updateArticles);
    };

    clickHandlerMinus = () => {
        new Promise((resolve, reject) => {
            this.setState(prevState => {
                const page = --prevState.page;

                resolve(page);
                return { page }
            });
        })
            .then(this.updateArticles);
    };

    updateArticles = page => {
        const { cache } = this.state;

        if (cache && cache[page]) {
            this.setState({
                articles: cache[page]
            });

            window.scrollTo(0, 0);
        }
        else {
            this.pullData(page)
                .then(() => {
                    window.scrollTo(0, 0);
                });
        }
    };


    componentDidMount () {
        const { page } = this.state;

        this.pullData(page)
            .then(() =>
                this.setState({
                    isMounted: true
                }));

        socketHandler(this);
    }

    render () {
        const {
            page,
            articles,
            count,
            isMounted,
            newPost
        } = this.state;
        const { showFullArticle } = this.props;

        return (
            <div className='main'>
                <List
                    articles={articles}
                    showFullArticle={showFullArticle}
                />
                <Navigation
                    page={page}
                    clickHandlerPlus={this.clickHandlerPlus}
                    clickHandlerMinus={this.clickHandlerMinus}
                    count={count}
                    isMounted={isMounted}
                />
                { newPost ?
                    <LoadPost pullDataClearCache={this.pullDataClearCache} />
                    :
                    null
                }
            </div>
        );
    }
}



export default Main;