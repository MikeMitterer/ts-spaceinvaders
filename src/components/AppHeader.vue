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
import gameModule from '../store/modules/GameModule';

@Component
export default class AppHeader extends Vue {
    @Prop() private msg!: string;

    public get counter(): number {
        return Math.min(500, Math.max(110, gameModule.count));
    }
}
</script>

<style scoped lang="scss"></style>
