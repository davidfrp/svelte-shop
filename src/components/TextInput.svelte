<script>
    import { slide } from 'svelte/transition';

    export let id;
    export let value = "";
    export let label = "";
    export let maxLength = 999;
    export let autoComplete = "";
    export let isRequired = false;
    export let isPassword = false;
    export let validation = [];
    export let onValidityChanged = () => {};

    let isPasswordShown;

    $: validationErrors = validation.filter(condition => !condition.state);

    $: isValid = validationErrors.length === 0;
    $: onValidityChanged(isValid); // Whenever isValid changes, call onValidityChanged.

    let isPristine = true; // When pristine, validation errors are not shown.
</script>

<div class="text-input-wrapper">
    <div class="text-input">
        <input
            {...{type: isPassword && !isPasswordShown ? "password" : "text"}}
            bind:value={value}
            on:input={() => isPristine = false}
            autocomplete={autoComplete}
            required={isRequired}
            maxlength={maxLength}
            placeholder=" "
            name={id}
            {id} />
        <label for="{id}">{label}</label>
        {#if isPassword}
            <button 
                type="button" 
                class="toggle-password" 
                on:click={() => isPasswordShown = !isPasswordShown}>
                {isPasswordShown ? 'hide' : 'show'}
            </button>
        {/if}
    </div>
    {#each validationErrors as {errorMessage, ignorePristine}}
        <!-- Don't show errors when still pristine, unless we ignore it. -->
        {#if !isPristine || ignorePristine}
            <p class="error-message" transition:slide>
                {errorMessage}
            </p>
        {/if}
    {/each}
</div>

<style>
    .text-input-wrapper {
        margin-bottom: 1em;
    }
    .text-input {
        position: relative;
        margin-top: 1em;
    }

    .text-input:first-of-type {
        margin-top: 0;
    }

    .error-message {
        color: #e40730;
        font-weight: 500;
        font-size: 0.75em;
        margin: 0.35em 0;
    }

    input {
        margin: 0;
        font-size: inherit;
        padding: 1.2em 0.8em 0.4em;
        border: 1px solid #ccc;
        width: 100%;
    }

    input + label {
        color: #5d5d5d;
        font-size: inherit;
        user-select: none;
        pointer-events: none;
        position: absolute;
        left: calc(0.8em + 1px);
        top: calc(50% - 0.75em);
        transition: transform 0.2s ease-in-out;
        transform-origin: 0 0;
    }

    input:not(:placeholder-shown) + label, input:focus + label {
        transform: translateY(-37.5%) scale(0.8);
    }

    .toggle-password {
        cursor: pointer;
        color: #9f4c69;
        font-size: 0.8em;
        position: absolute;
        top: calc(50% - 0.75em);
        right: 1em;
        background: none;
        width: auto;
        padding: 0;
        margin: 0;
    }
</style>