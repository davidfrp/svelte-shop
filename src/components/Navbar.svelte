<script>
    import { token } from "../stores/authStore";
    import { user } from "../stores/authStore";
</script>

<nav>
    <a href="/">Products</a>
    {#if $user}
        <a href="/" on:click={() => token.set(null)}>Log out</a>
    {:else}
        <a href="/login">Log in</a>
        <a href="/register">Register</a>
    {/if}
</nav>

<style>
    :global(body) {
        padding-top: 4.5rem;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 4.5rem;
        border-bottom: 1px solid #ccc;
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
    }

    nav a {
        display: flex;
        align-items: center;
        padding: 0 1.25rem;
        height: 100%;
    }
</style>