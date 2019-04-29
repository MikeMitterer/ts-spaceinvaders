<template>
    <div class="layout__header">
        <nav class="navbar navbar-light">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AppHeader extends Vue {
    @Prop() private msg!: string;
}
</script>

<style scoped lang="scss"></style>
