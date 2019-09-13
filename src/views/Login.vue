<template>
    <Form @submit="submit">
        <template v-slot:fields>
            <Field label="Логин" v-model="login"></Field>
            <Field label="Пароль" type="password" v-model="password"></Field>
        </template>

        <template v-slot:buttons>
            <button type="submit">Войти</button>
        </template>
    </Form>
</template>

<script>
    import Form from "@/components/Form";
    import Field from "@/components/Field";

    export default {
        name: "Login",
        components: {Field, Form},
        data () {
            return {
                login: "",
                password: "",
                from: null
            }
        },

        beforeRouteEnter (to, from, next) {
            next(component => {
                component.from = from.fullPath;
            })
        },

        methods: {
            submit () {
                if (this.login === '') this.login = 'Test User';

                this.$store.commit('user/login', {name: this.login});

                if (this.from) this.$router.push(this.from);
                else this.$router.push({name: 'main'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    form {
        width: 400px;
        margin: 120px auto 0;

        button {
            width: 100%;
            color: white;
            border: none;
            padding: 10px 0;
            font-size: inherit;
            background-color: royalblue;
            border-radius: $input-border-radius;
        }
    }
</style>
