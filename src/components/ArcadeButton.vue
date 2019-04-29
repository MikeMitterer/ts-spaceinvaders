<template>
    <button class="arcade-button" @click="$emit('click', $event)" @keydown="onKeyDown">
        <div class="arcade-button__knob"></div>
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ArcadeButton extends Vue {
    // private readonly logger = loggerFactory.getLogger('mmit.spaceinvaders.components.ArcadeButton');
    // public onClick(): void {
    //     this.logger.info('Clicked!');
    // }

    public onKeyDown(event: KeyboardEvent): void {
        event.preventDefault();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$arcade-button-color: #ff0000 !default;
$arcade-button-size: 80px !default;

// Private function to handle the button-size
@function _buttonPercent($percent) {
    @return ($arcade-button-size / 100 * $percent);
}

// ----------------------------------------------------------------------------
// ---- Arcade-Button
// - More: http://codepen.io/MikeMitterer/pen/RrLaPe
//
.arcade-button {
    display: inline-flex;
    user-select: none;

    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center; // ⇾
    align-content: center; // ||
    align-items: center; // ↓

    width: $arcade-button-size;
    height: $arcade-button-size;

    border: darken($arcade-button-color, 50%) 1px solid;
    border-radius: 50%;
    margin: 0;
    padding: 0;

    background: darken($arcade-button-color, _buttonPercent(8.3333333));
    box-shadow: darken($arcade-button-color, 20%) 0 _buttonPercent(3.33333) _buttonPercent(4.1666666) inset,
        rgba(255, 255, 255, 0.5) 0 _buttonPercent(10) _buttonPercent(4.1666666) inset,
        darken($arcade-button-color, 30%) 0 _buttonPercent(4.1666666) * -1 _buttonPercent(4.1666666) inset,
        rgba(0, 0, 0, 0.8) 0 _buttonPercent(3.333333) _buttonPercent(6.666666);

    outline: none;
    &:focus {
        outline: none;
    }

    > .arcade-button__knob {
        box-sizing: border-box;

        //position: relative;
        cursor: pointer;
        width: $arcade-button-size * 0.6;
        height: $arcade-button-size * 0.6;

        border-radius: 50%;
        border: darken($arcade-button-color, 15%) 1px solid;
        background-color: $arcade-button-color;

        //margin:_buttonPercent(16);

        outline: none;
        &:focus {
            outline: none;
        }

        background-image: radial-gradient(
            circle closest-side at _buttonPercent(30) _buttonPercent(30),
            $arcade-button-color _buttonPercent(12.5),
            lighten($arcade-button-color, 6%) _buttonPercent(25),
            lighten($arcade-button-color, 6%) _buttonPercent(30),
            darken($arcade-button-color, 1%) _buttonPercent(54.16)
        );

        background-position: center center;
        background-repeat: no-repeat;

        box-shadow: rgba(0, 0, 0, 0.8) 0 0 _buttonPercent(8.3333) _buttonPercent(4.1666666),
            lighten($arcade-button-color, 30%) 0 _buttonPercent(2.5) _buttonPercent(2.5) inset,
            darken($arcade-button-color, 40%) 0 _buttonPercent(6.6666) _buttonPercent(8.3333) inset,
            rgba(0, 0, 0, 0.3) 0 _buttonPercent(16.666666) _buttonPercent(8.3333) inset,
            rgba(lighten($arcade-button-color, 90%), 0.24) 0 _buttonPercent(1.6666666) * -1
                _buttonPercent(2.5) inset,
            darken($arcade-button-color, 30%) 0 (_buttonPercent(5.83333) * -1) _buttonPercent(16.6666) inset;

        &:hover {
            background-image: radial-gradient(
                circle closest-side at _buttonPercent(30) _buttonPercent(30),
                lighten($arcade-button-color, 5%),
                lighten($arcade-button-color, 10%) _buttonPercent(25),
                lighten($arcade-button-color, 10%) _buttonPercent(30),
                lighten($arcade-button-color, 5%) _buttonPercent(54.16)
            );

            box-shadow: rgba(0, 0, 0, 0.8) 0 0 _buttonPercent(8.3333) _buttonPercent(4.1666666),
                lighten($arcade-button-color, 35%) 0 _buttonPercent(2.5) _buttonPercent(2.5) inset,
                darken($arcade-button-color, 30%) 0 _buttonPercent(6.6666) _buttonPercent(8.3333) inset,
                rgba(0, 0, 0, 0.3) 0 _buttonPercent(16.6666) _buttonPercent(8.3333) inset,
                rgba(255, 255, 255, 0.4) 0 _buttonPercent(2.5) * -1 _buttonPercent(2.5) inset,
                darken($arcade-button-color, 30%) 0 (_buttonPercent(5.83333) * -1) _buttonPercent(16.6666)
                    inset;
        }

        &:active {
            border-color: darken($arcade-button-color, 90%);
            background-image: radial-gradient(
                circle closest-side at _buttonPercent(12) _buttonPercent(10),
                $arcade-button-color _buttonPercent(12.5),
                darken($arcade-button-color, 15%) _buttonPercent(25),
                darken($arcade-button-color, 15%) _buttonPercent(30),
                darken($arcade-button-color, 45%) _buttonPercent(50)
            );

            box-shadow: rgba(0, 0, 0, 0.8) 0 0 _buttonPercent(8.3333) _buttonPercent(4.1666666),
                rgba(0, 0, 0, 0.8) 0 _buttonPercent(2.5) _buttonPercent(2.5) inset,
                darken($arcade-button-color, 30%) 0 _buttonPercent(6.66666) _buttonPercent(8.3333) inset,
                rgba(0, 0, 0, 0.3) 0 _buttonPercent(16.66666) _buttonPercent(8.33333) inset,
                rgba(255, 255, 255, 0.3) 0 _buttonPercent(1.66666) * -1 _buttonPercent(2.5) inset,
                darken($arcade-button-color, 30%) 0 (_buttonPercent(5.83333) * -1) _buttonPercent(16.6666)
                    inset;
        }
    }
}
</style>
