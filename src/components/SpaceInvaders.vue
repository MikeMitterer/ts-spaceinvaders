<template>
    <div id="game" :currentState="gameState"><canvas></canvas></div>
</template>

<script lang="ts">
import { run } from '@/app/gameloop';
import { InputHandler } from '@/core/InputHandler';
import { Screen } from '@/core/screen';
import { LoggerFactory } from '@mmit/logging';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class SpaceInvaders extends Vue {
    private readonly logger = LoggerFactory.getLogger('mmit.spaceinvaders.components.SpaceInvaders');

    private animationTimer: number | undefined;

    @Prop({ default: 'Stopped' })
    public gameState!: string;

    @Watch('gameState')
    public onGameStateChanged(state: string, oldState: string): void {
        // this.logger.info(`Watch 'gameState': ${state} / ${oldState}`);
        if (state === 'Continue' && (oldState === 'YouWon' || oldState === 'YouLost')) {
            this.reset();
        } else if (state === 'Continue') {
            Screen.getInstance().clear();
        }
    }

    public reset(): void {
        InputHandler.reset();
        Screen.destroy();

        Screen.create();
        InputHandler.init(() => {
            this.logger.debug('KeyChanged');
        });

        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }

        // It takes a while until the Screen (Canvas) is ready
        this.animationTimer = setInterval(() => {
            if (Screen.getInstance().width > 0 && Screen.getInstance().height > 0) {
                clearInterval(this.animationTimer);
                this.animationTimer = undefined;
                run();
            }
        }, 100);
    }

    public mounted(): void {
        this.logger.info('Mounted!');

        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }

        this.reset();
    }

    public destroyed(): void {
        this.logger.info('Destroyed!');

        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = undefined;
        }

        InputHandler.reset();
        Screen.destroy();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
