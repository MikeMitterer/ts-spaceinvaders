<template>
    <div id="status">
        <ul class="tank">
            <li v-for="_ in tanks"><img src="../assets/images/static/invaders.png" /></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gameModule from '../store/modules/GameModule';

@Component
export default class GameStatus extends Vue {
    // private readonly logger = loggerFactory.getLogger('<package>');

    get tanks(): number {
        return gameModule.tanks;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#status {
    display: inline-flex;
    flex-grow: 0;

    justify-content: flex-start; // ⇾
    align-content: space-between; // ||
    align-items: center; // ↓

    border-top: 2px solid;

    .tank {
        display: inline-flex;
        padding-inline-start: 0;

        > li {
            display: inline-block;
            padding: 0;
            list-style-type: none;

            position: relative;
            width: 24px;
            height: 16px;
            overflow: hidden;

            margin: 0 5px;

            img {
                position: absolute;
                left: -62px;
            }
        }
    }
}
</style>
