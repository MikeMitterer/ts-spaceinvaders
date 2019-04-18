import {KeyCode} from "../core/InputHandler";
<template>
    <div class="home">
        <h3>From Store!</h3>
        <div>Counter: {{ cnt }}</div>
        <SpaceInvaders></SpaceInvaders>
    </div>
</template>

<script lang="ts">
import SpaceInvaders from '@/components/SpaceInvaders.vue';
import { loggerFactory } from '@/config/ConfigLog4j';
import { Component, Vue } from 'vue-property-decorator';
import counter from '../store/modules/CounterModule';

@Component({ components: { SpaceInvaders } })
export default class Home extends Vue {
    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.views.Home');

    public get cnt(): number {
        return counter.count;
    }
}
</script>
