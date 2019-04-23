<template>
    <div id="game">&nbsp;</div>
</template>

<script lang="ts">
import { loggerFactory } from '@/config/ConfigLog4j';
import { InputHandler, KeyCode } from '@/core/InputHandler';
import { Screen } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory';
// import { ActionBus } from '@mmit/communication/lib/actionbus';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SpaceInvaders extends Vue {
    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.components.SpaceInvaders');

    // private readonly actionBus = ActionBus.getInstance();
    private readonly spriteFactory = SpriteFactory.getInstance();

    private animationTimer: number | undefined;

    public mounted(): void {
        this.logger.info('Mounted!');

        if (this.animationTimer) {
            clearInterval(this.animationTimer);
        }

        setTimeout(this.onMount, 500);
        this.animationTimer = setInterval(this.onAnimation, 500);

        InputHandler.init(this.onKeyChanged);

        // this.actionBus.on(KeyChangedEvent.EVENT, this.onKeyChanged);
    }

    public destroyed(): void {
        this.logger.info('Destroyed!');

        if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = undefined;
        }

        InputHandler.reset();
        Screen.destroy();

        // this.actionBus.removeListenerFor(KeyChangedEvent.EVENT);
    }

    private readonly onAnimation = (): void => {
        const screen = Screen.getInstance();
        const swarm = this.spriteFactory.swarm;

        swarm.toggle();

        swarm.clear(screen.painter);
        swarm.draw(screen.painter);
    };

    // private readonly onKeyChanged = async (eventName: EventName, payload: string): Promise<void> => {
    private readonly onKeyChanged = async (): Promise<void> => {
        const screen = Screen.getInstance();
        const tank = this.spriteFactory.tank;

        this.logger.debug(`onKeyChanged`);

        if (InputHandler.isDown(KeyCode.Left)) {
            this.logger.debug(`Move Left`);
            tank.moveLeft({ speed: 5 });
        } else if (InputHandler.isDown(KeyCode.Right)) {
            this.logger.debug(`Move Right`);
            tank.moveRight({ speed: 5 });
        }

        tank.clear(screen.painter);
        tank.draw(screen.painter);
    };

    private readonly onMount = (): void => {
        const tank = this.spriteFactory.tank;
        const swarm = this.spriteFactory.swarm;
        const cities = this.spriteFactory.cities;

        const screen = Screen.getInstance();

        swarm.width = screen.width;
        tank.y = screen.height - tank.height;
        cities.y = tank.y - cities.height * 2;

        screen.clear();

        tank.clear(screen.painter);

        swarm.draw(screen.painter);
        cities.draw(screen.painter);
        tank.draw(screen.painter);
    };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
