<template>
    <footer class="modal__footer">
        <div>
            <button class="add" @click="onClickIncrement">+</button>
            <button class="subtract" @click="onClickDecrement">-</button>
            <span id="app">Loading... / {{title_inc || title}}</span>
        </div>
        <div>

            <div class="version_block">
                <span class="version">Version {{version}}</span>
                <span class="separator">/</span>
                <span class="published">{{published}}</span>
                <span class="separator">/</span>
            </div>
            <span v-if="devmode" class="devmode">DevMode</span>
            <span v-if="!devmode" class="production">Production</span>
        </div>

    </footer>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import counter from '../store/modules/CounterModule';

    @Component
    export default class AppFooter extends Vue {
        private anotherTitle: string = '';

        @Prop({default: process.env.VUE_APP_TITLE })
        private title!: string;

        // Component methods can be declared as instance methods
        public onClickIncrement(): void {
            counter.increment(2);
            this.anotherTitle = `${this.title} + ${counter.count}`;
        }

        public onClickDecrement(): void {
            counter.decrement(2);
            this.anotherTitle = `${this.title} + ${counter.count}`;
        }

        public get title_inc(): string { return this.anotherTitle; }

        public get published(): string { return process.env.VUE_APP_PUBLISHED; }
        public get version(): string { return process.env.VUE_APP_VERSION; }
        public get devmode(): boolean {
            return process.env.VUE_APP_DEV_MODE === true
                    || process.env.VUE_APP_DEV_MODE === 'true'; }
    }
    
</script>

<style scoped lang="scss"></style>


