<template>
    <div id="game">&nbsp;</div>
</template>

<script lang="ts">
import { loggerFactory } from '@/config/ConfigLog4j';
import { KeyChangedEvent } from '@/core/events/KeyChangedEvent';
import { InputHandler, KeyCode } from '@/core/InputHandler';
import { Screen } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory';
import { ActionBus, EventName } from '@mmit/communication/lib/actionbus';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SpaceInvaders extends Vue {
    private static readonly spriteFactory = new SpriteFactory();

    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.components.SpaceInvaders');
    private readonly actionBus = ActionBus.getInstance();

    private timer: number | undefined;

    public mounted(): void {
        this.logger.info('Mounted!');

        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setTimeout(this.onMount, 500);
        this.actionBus.on(KeyChangedEvent.EVENT, this.onKeyChanged);
    }

    public destroyed(): void {
        this.logger.info('Destroyed!');

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }

        Screen.destroy();
        this.actionBus.removeListenerFor(KeyChangedEvent.EVENT);
    }

    private readonly onKeyChanged = async (eventName: EventName, payload: string): Promise<void> => {
        const screen = Screen.getInstance();
        const tank = SpaceInvaders.spriteFactory.tank;

        this.logger.debug(`Received ${eventName.eventName}`);

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
        const tank = SpaceInvaders.spriteFactory.tank;
        const screen = Screen.create();

        this.logger.info(`onMount`);
        screen.clear();

        tank.clear(screen.painter);
        tank.draw(screen.painter);
    };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
