<template>
    <div class="about">
        <h1>This is an about page</h1>
        <img alt="Vue logo" class="logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
</template>
<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { HelloWorld } })
export default class About extends Vue {
    public get published(): string {
        return process.env.VUE_APP_PUBLISHED;
    }
}
</script>
<style lang="scss"></style>
