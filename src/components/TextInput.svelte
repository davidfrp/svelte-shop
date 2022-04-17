<script>
    export let id;
    export let value = "";
    export let label = "";
    export let maxLength = 999;
    export let isRequired = false;
    export let isPassword = false;
    export let validation = [];
    export let onValidityChanged = () => {};

    $: errorMessages = (validation.map(condition => {
        return condition.state ? null : condition.errorMessage;
    }) ?? []).filter(message => message !== null);

    $: isValid = errorMessages.length === 0;
    $: onValidityChanged(isValid);

    let isPristine = true;
</script>

{#each errorMessages as errorMessage}
    <p class="error-message" hidden={isPristine}>{errorMessage}</p>
{/each}

<div>
    <input
        {...{type: isPassword ? "password" : "text"}} 
        bind:value={value}
        on:input={() => isPristine = false}
        required={isRequired}
        maxlength={maxLength}
        placeholder=" " 
        name={id} 
        {id} />
    <label for="{id}">{label}</label>   
</div>

<style>
    div {
        position: relative;
        margin-bottom: 0.5rem;
    }

    .pristine {
        background-color: #e40730;
    }

    .error-message {
        color: #e40730;
        font-size: 0.8em;
        margin-bottom: 0.35em;
        margin-top: 0;
    }

    input {
        font-size: inherit;
        padding: 1em 0.4em 0.2em;
    }

    input + label {
        color: #484848;
        font-size: inherit;
        user-select: none;
        pointer-events: none;
        transition: transform 0.2s ease-in-out;
        transform-origin: 0 0;
        position: absolute;
        top: calc(50% - 1em);
        left: 0.4em;
    }

    input:not(:placeholder-shown) + label, input:focus + label {
        transform: translateY(-37.5%) scale(0.8);
    }
</style>