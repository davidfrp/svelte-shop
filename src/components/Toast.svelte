<script>
    import { slide } from 'svelte/transition';

    export let message;
    export let isShown;

    const onDismiss = () => isShown = false;
</script>

{#if isShown}
    <div class="toast" role="status" transition:slide>
        <p>{@html message}</p>
        <button type="button" on:click={onDismiss}>dismiss</button>
    </div>
{/if}

<style>
    .toast {
        padding: 1.25em;
        margin: 1.5em 0;
        background-color: #fff4f8;
        display: flex;
        gap: 1em;
    }

    p {
        font-size: 0.75em;
        margin: 0;
    }

    button {
        font-size: 0.8em;
        cursor: pointer;
        color: #9f4c69;
        background: none;
        width: auto;
        padding: 0;
        margin: 0;
    }
</style>