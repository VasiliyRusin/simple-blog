<template>
    <form @submit.prevent="$emit('submit', $event)">
        <slot name="fields"></slot>
        <slot name="buttons"></slot>
    </form>
</template>

<script>
    export default {
        name: "Form",
    }
</script>
