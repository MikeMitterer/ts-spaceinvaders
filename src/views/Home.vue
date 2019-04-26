import {KeyCode} from "../core/InputHandler";
<template>
    <div class="home">
        <div>Counter: {{ cnt }}</div>
        <div class="game-container">
            <SpaceInvaders></SpaceInvaders>
            <div class="control-panel">
                <p class="arcade large top status-message__headline">
                    HAVE FUN
                </p>
                <p class="arcade status-message__subheadline">with<br />TS-Invaders</p>
                <ArcadeButton></ArcadeButton>
                <p class="arcade status-message__subheadline">Press to Start</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ArcadeButton from '@/components/ArcadeButton.vue';
import SpaceInvaders from '@/components/SpaceInvaders.vue';
import { loggerFactory } from '@/config/ConfigLog4j';
import { Component, Vue } from 'vue-property-decorator';

import counter from '../store/modules/CounterModule';

@Component({ components: { ArcadeButton, SpaceInvaders } })
export default class Home extends Vue {
    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.views.Home');

    public get cnt(): number {
        return counter.count;
    }
}
</script>
