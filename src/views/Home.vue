<template>
    <div class="home" @keyup="moveLeft">
        <img alt="Vue logo" class="logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <h3>From Store!</h3>
        <div>Counter: {{ cnt }}</div>
        <div id="game">&nbsp;</div>
    </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { loggerFactory } from '@/config/ConfigLog4j';
import { Screen } from '@/core/screen';
import { SpriteFactory } from '@/core/SpriteFactory'; // @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import counter from '../store/modules/CounterModule';

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.views.Home');

    private spriteFactory = new SpriteFactory();

    public get cnt(): number {
        return counter.count;
    }

    public mounted(): void {
        this.logger.info('Mounted!');

        const screen = Screen.getInstance();

        const timer = setInterval(() => {
            const tank = this.spriteFactory.tank;

            // screen.clear();

            tank.clear(screen.painter);
            tank.draw(screen.painter);

            if (tank.x < 100) {
                tank.moveRight({ speed: 5 });
            }
        }, 500);
    }

    public moveLeft(event: unknown): void {
        this.logger.info(`Move Left ${event}`);
    }
}
</script>
