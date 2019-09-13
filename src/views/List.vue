<template>
    <div class="wrapper">
        <button @click="openEditor()" class="new" v-if="isEditable">
            + Создать статью
        </button>

        <Article :edit="isEditable" :item="article" :key="index"
                 @delete="deleteConfirm(sortedArticles.length - 1 - index, article)"
                 @edit="openEditor(sortedArticles.length - 1 - index)"
                 v-for="(article, index) in sortedArticles">
        </Article>

        <Modal :is-open.sync="newArticle.modal">
            <template v-slot:title>
                <h1 v-if="isArticleUpdate">Обновить статью</h1>
                <h1 v-else>Создать статью</h1>
            </template>

            <template v-slot:default>
                <Form>
                    <template v-slot:fields>
                        <Field label="Заголовок" v-model="newArticle.title"></Field>
                        <Field label="Текст">
                            <template v-slot="{ attrs, listeners }">
                                <!--suppress HtmlFormInputWithoutLabel -->
                                <textarea v-bind="attrs" v-model="newArticle.text" v-on="listeners"></textarea>
                            </template>
                        </Field>
                    </template>
                </Form>
            </template>

            <template v-slot:buttons="{close}">
                <button @click="newArticle.modal = false">Отмена</button>
                <button @click="newArticleCreate" class="primary" v-if="isArticleUpdate">Обновить</button>
                <button @click="newArticleCreate" class="primary" v-else>Создать</button>
            </template>
        </Modal>

        <Modal :is-open.sync="deleteConfirmation.modal" class="small">
            <template v-slot:default>
                Удалить статью <span style="white-space: nowrap">«{{ deleteConfirmation.title }}»</span>?
            </template>

            <template v-slot:buttons="{close}">
                <button @click="deleteConfirmation.modal = false">Отмена</button>
                <button @click="deleteArticle(deleteConfirmation.index)" class="delete">Удалить</button>
            </template>
        </Modal>
    </div>
</template>

<script>
    import Modal from "@/components/Modal";
    import Form from "@/components/Form";
    import Field from "@/components/Field";
    import Article from "@/components/Article";

    export default {
        name: "List",
        components: {Article, Field, Form, Modal},
        data () {
            return {
                newArticle: {
                    modal: false,
                    title: '',
                    text: ''
                },

                deleteConfirmation: {
                    modal: false,
                    title: '',
                    index: null
                }
            }
        },
        computed: {
            sortedArticles () {
                return [...this.$store.state.blog.articles].sort((a, b) => b.date - a.date)
            },

            isArticleUpdate () {
                return !isNaN(this.newArticle.index)
            },

            isEditable () {
                return this.$route.name === 'edit'
            }
        },
        methods: {
            openEditor (index) {
                if (!isNaN(index)) {
                    const article = this.$store.getters['blog/getArticle'](index);

                    this.newArticle = {
                        index,
                        modal: true,
                        title: article.title,
                        text: article.text
                    }

                } else this.newArticle = {
                    modal: true,
                    title: '',
                    text: ''
                }
            },

            deleteConfirm (index, article) {
                this.deleteConfirmation = {
                    modal: true,
                    title: article.title,
                    index
                }
            },

            deleteArticle (index) {
                this.$store.commit('blog/removeArticle', index);

                this.deleteConfirmation = {
                    modal: false,
                    title: '',
                    index: null
                }
            },

            newArticleCreate () {
                if (this.isArticleUpdate) {
                    this.deleteArticle(this.newArticle.index);

                    this.$store.commit('blog/createArticle', {
                        title: this.newArticle.title,
                        text: this.newArticle.text
                    });
                } else {
                    this.$store.commit('blog/createArticle', {
                        title: this.newArticle.title,
                        text: this.newArticle.text
                    });
                }

                this.newArticle.modal = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        margin: auto;
        max-width: 600px;

        &, button {
            button {
                @include button {
                    width: 400px;
                    margin: auto;
                    display: block;
                }
            ;
            }
        }

        & > button {
            margin-bottom: 30px !important;
        }

        article {
            &:not(:last-child) {
                margin-bottom: 30px;
            }
        }
    }
</style>
