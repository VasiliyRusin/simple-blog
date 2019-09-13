export default {
    namespaced: true,

    state: {
        articles: []
    },

    mutations: {
        createArticle (state, {title, text}) {
            state.articles.push({
                title,
                text,
                date: +new Date(),
                author: this.state.user.name
            });

            localStorage.setItem('articles', JSON.stringify(state.articles))
        },

        removeArticle (state, index) {
            state.articles.splice(index, 1);

            localStorage.setItem('articles', JSON.stringify(state.articles))
        },

        updateArticles (state, articles) {
            state.articles = articles;

            localStorage.setItem('articles', JSON.stringify(state.articles))
        }
    },

    getters: {
        getArticle (state) {
            return index => state.articles[index] || {}
        }
    }
}
