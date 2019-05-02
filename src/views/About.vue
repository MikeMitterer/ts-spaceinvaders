<template>
    <div class="about-container">
        <h1>TypeScript - SpaceInvaders</h1>
        <img alt="Vue logo" class="logo" src="../assets/images/static/alien.jpg" width="300px" />
        <p>
            Brought to you by
        </p>
        <h3><a href="http://www.MikeMitterer.at/" target="_blank">http://www.MikeMitterer.at/</a></h3>
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
<style lang="scss">
h3 {
}
</style>
