<template>
    <div id="app" class="layout">
        <AppHeader></AppHeader>
        <div class="ribbon"></div>
        <div class="layout__content">
            <router-view />
        </div>
        <AppFooter></AppFooter>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

@Component({ components: { AppFooter, AppHeader } })
export default class App extends Vue {
    public created(): void {
        // noinspection JSIgnoredPromiseFromCall
        this.$store.dispatch('readyState');
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
