<template>
    <article>
        <template v-if="edit">
            <div class="buttons">
                <button @click="$emit('delete')" class="circle delete">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2
                        2h8a2 2 0 0 0 2-2V7z" fill="#ff0009"/>
                    </svg>
                </button>

                <button @click="$emit('edit')" class="circle edit">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3a1 1 0 0
                        0-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a1 1 0 0 0 0-1.41l-2.34-2.34a.98.98 0 0 0-.71-.29zm-3.6
                        3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" fill="#ECD310"/>
                    </svg>
                </button>
            </div>
        </template>

        <header>
            <h1>{{ item.title }}</h1>
            <time :datetime="item.date | moment('YYYY-MM-DD HH:mm')">
                {{ item.date | moment('LLLL') }}
            </time>
            <address>{{ item.author }}</address>
        </header>

        <p>{{ item.text }}</p>
    </article>
</template>

<script>
    export default {
        name: "Article",
        props: {
            item: {
                type: Object
            },

            edit: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    article {
        padding: 20px;
        position: relative;
        border: 2px solid lightgray;
        border-radius: $input-border-radius;

        .buttons {
            top: 0;
            left: 100%;
            position: absolute;

            button {
                border: none;
                display: block;
                cursor: pointer;
                margin: 0 0 20px 20px;

                &.circle {
                    $size: 50px;

                    width: $size;
                    height: $size;
                    position: relative;
                    border-radius: 50%;

                    svg {
                        margin: 2px;
                        display: block;
                    }
                }

                &.delete {
                    border: 2px solid hsla(358, 100%, 50%, 30%);
                    background-color: hsla(358, 100%, 50%, 15%);
                }

                &.edit {
                    border: 2px solid hsla(54, 88%, 48%, 30%);
                    background-color: hsla(54, 88%, 48%, 15%);
                }
            }
        }
    }
</style>
