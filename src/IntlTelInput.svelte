<script lang="ts">
  import { onMount } from 'svelte';
  import type { Options } from 'intl-tel-input';
  import intlTelInput from './intl-tel-input-transformed/intlTelInput.min';

  import 'intl-tel-input/build/css/intlTelInput.css';

  export let initialOptions: Options = {};

  let inputRef: HTMLElement;

  onMount(async () => {
    await import('./intl-tel-input-transformed/utils.js');

    (intlTelInput as unknown as Window['intlTelInput'])(inputRef, {
      ...initialOptions,
    });
  });
</script>

<input on:click on:blur bind:this={inputRef} type="tel" {...$$restProps} />
