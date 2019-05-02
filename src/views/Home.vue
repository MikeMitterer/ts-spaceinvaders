import {KeyCode} from "../core/InputHandler";
<template>
    <div class="home">
        <div class="game-container" v-bind:class="gameState.toLowerCase()">
            <SpaceInvaders :gameState="gameState"></SpaceInvaders>
            <div class="control-panel">
                <p class="arcade large top status-message__headline">
                    HAVE FUN
                </p>
                <p class="arcade status-message__subheadline">with<br />TS-Invaders</p>
                <ArcadeButton @click="onClick"></ArcadeButton>
                <p v-if="gameState === 'Stopped'" class="arcade status-message__subheadline">
                    Press to Start
                </p>
                <p v-if="gameState === 'Continue'" class="arcade status-message__subheadline">
                    Press to Stop
                </p>
                <p v-if="gameState === 'YouLost'" class="arcade status-message__subheadline">
                    Sorry - you lost!
                </p>
                <p v-if="gameState === 'YouWon'" class="arcade status-message__subheadline">
                    Yes! You are the hero!
                </p>
            </div>
            <GameStatus></GameStatus>
        </div>
    </div>
</template>

<script lang="ts">
import ArcadeButton from '@/components/ArcadeButton.vue';
import GameStatus from '@/components/GameStatus.vue';
import SpaceInvaders from '@/components/SpaceInvaders.vue';
import { GameState } from '@/core/GameState';
import gameModule from '@/store/modules/GameModule';
import { loggerFactory } from '@mmit/communication/lib/config/ConfigLog4j';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { GameStatus, ArcadeButton, SpaceInvaders } })
export default class Home extends Vue {
    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.views.Home');

    public onClick(): void {
        gameModule.toggleGameState();
    }

    public get gameState(): string {
        return GameState[gameModule.gameState];
    }

    // @Watch('gameState')
    // public onGameStateChanged(state: unknown, oldValue: unknown): void {
    //     this.logger.info(`${state} + ${oldValue}`);
    // }

    public mounted(): void {
        setTimeout(() => {
            const body = document.querySelector('body');
            if (body) {
                body.classList.remove('loading');
            }
        }, 500);
    }
}
</script>
