<template>
  <div class="about">
    <h1>This is an about page - Count: {{counter}} / </h1>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import counter from '../store/modules/CounterModule';

  @Component({ components: { } })
  export default class About extends Vue {
    public get counter(): number {
      return counter.count;
    }

    public get published(): string {
      return process.env.VUE_APP_PUBLISHED;
    }

  }
</script>
<style lang="scss"></style>
