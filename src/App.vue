<template>
    <main id="app">
        <Header></Header>
        <router-view/>
    </main>
</template>

<script>
    import Header from "@/components/Header";

    export default {
        name: "App",
        components: {Header},
        beforeCreate () {
            const user = localStorage.getItem('user');
            const articles = localStorage.getItem('articles');

            if (user) {
                this.$store.commit('user/login', JSON.parse(user));
            }

            if (articles) {
                this.$store.commit('blog/updateArticles', JSON.parse(articles));
            }
        }
    };
</script>

<style lang="scss">
    @import url('https://rsms.me/inter/inter.css');

    html, body {
        height: 100%;
    }

    @supports (font-variation-settings: normal) {
        html {
            font-family: 'Inter var', sans-serif;
        }
    }

    body {
        margin: 0;
    }

    a {
        color: #2c3e50;
    }

    #app {
        color: #2c3e50;
        min-height: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-family: 'Inter', sans-serif;
        font-feature-settings: 'tnum' 1, 'case' 1, 'ss03' 1, 'cv02' 1, 'cv03' 1, 'cv04' 1, 'cv05' 1, 'cv07' 1, 'cv08' 1, 'cv09' 1, 'cv10' 1, 'cv11' 1;


        * {
            box-sizing: border-box;
        }
    }
</style>
