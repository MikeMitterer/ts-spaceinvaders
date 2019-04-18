<template>
    <div class="modal__header">
        <nav class="navbar navbar-light">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        <div class="demo_images">
            <img
                class="cat"
                style="position: absolute;"
                v-bind:style="{ left: counter + 'px' }"
                src="../assets/images/static/cat.jpg"
                alt="Cat"
            />
            <img id="frontImg" :src="img" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import lambi from '../assets/images/lambi.png';
import counterModule from '../store/modules/CounterModule';

@Component
export default class AppHeader extends Vue {
    @Prop() private msg!: string;

    get img(): string {
        return lambi;
    }

    public get counter(): number {
        return Math.min(500, Math.max(110, counterModule.count));
    }
}
</script>

<style scoped lang="scss"></style>
