<template>
    <footer class="layout__footer">
        <div>
            <span>&nbsp;</span>
        </div>
        <div>
            <div class="version_block">
                <span class="version">Version {{ version }}</span>
                <span class="separator">/</span>
                <span class="published">{{ published }}</span>
                <span class="separator">/</span>
            </div>
            <span v-if="devmode" class="devmode">DevMode</span>
            <span v-if="!devmode" class="production">Production</span>
        </div>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {
    public get published(): string {
        return process.env.VUE_APP_PUBLISHED;
    }
    public get version(): string {
        return process.env.VUE_APP_VERSION;
    }
    public get devmode(): boolean {
        return process.env.VUE_APP_DEV_MODE === true || process.env.VUE_APP_DEV_MODE === 'true';
    }
}
</script>

<style scoped lang="scss"></style>
