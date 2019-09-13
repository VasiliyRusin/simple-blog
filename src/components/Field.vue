<template>
    <fieldset>
        <legend>{{ label }}</legend>
        <label>
            <slot :attrs="$attrs" :listeners="listeners">
                <input v-bind="$attrs" v-model="value_" v-on="listeners">
            </slot>
        </label>
    </fieldset>
</template>

<script>
    export default {
        name: "Field",
        props: {
            label: {
                type: String,
            },
            value: {
                type: null
            }
        },

        computed: {
            listeners () {
                return {
                    // remove input emitter from v-model
                    ...this.$listeners,
                    input: () => {
                    }
                }
            },

            value_: {
                get () {
                    return this.value
                },

                set (value) {
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    fieldset {
        padding: 0;
        margin: 20px 0;
        border: 2px solid lightgray;
        border-radius: $input-border-radius;

        legend {
            padding: 0 0.6em;
            position: relative;
            margin: 0 0 -0.6em 1em;
            background-color: white;
        }

        label {
            input, textarea {
                width: 100%;
                border: none;
                padding: 10px;
                font: inherit;
                background-color: transparent;
                border-radius: $input-border-radius;
            }

            textarea {
                display: block;
                resize: vertical;
                min-height: 120px;
                max-height: 300px;
            }
        }
    }
</style>
