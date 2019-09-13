<template>
    <header>
        <nav>
            <div>
                <router-link :to="{ name: 'main' }">Главная</router-link>
                <router-link :to="{ name: 'edit' }" v-if="isAuth"> Редактирование статей</router-link>
            </div>

            <div>
                <template v-if="isAuth">
                    Привет, {{ userName }}!
                    <router-link :to="{ name: 'main' }" @click.native="logout()" class="not-active">Выход</router-link>
                </template>
                <router-link :to="{ name: 'login' }" class="not-active" v-else-if="$route.name !== 'login'">
                    Вход
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Header",
        computed: {
            isAuth () {
                return this.$store.getters['user/isAuth'];
            },

            userName () {
                return this.$store.state.user.name;
            }
        },
        methods: {
            logout () {
                this.$store.commit('user/logout');
            }
        }
    }
</script>

<style lang="scss" scoped>
    nav {
        display: flex;
        padding: 30px;

        div {
            width: 50%;

            &:first-child {
                text-align: left;
            }

            &:last-child {
                text-align: right;
            }
        }

        a {
            margin: 10px;
            font-weight: bold;
            text-decoration: none;

            &.not-active {
                color: #2c3e50 !important;
            }

            &.router-link-exact-active {
                color: $secondary-color;
            }
        }
    }
</style>
