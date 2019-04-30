<template>
    <div class="about-container">
        <h1>TypeScript - SpaceInvaders</h1>
        <img alt="Vue logo" class="logo" src="../assets/images/static/alien.jpg" width="300px" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
    public get published(): string {
        return process.env.VUE_APP_PUBLISHED;
    }
}
</script>
<style lang="scss"></style>
