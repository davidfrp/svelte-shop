<script>
    import { user } from "../stores/authStore";
    import ProductGrid from "../components/ProductGrid.svelte";

    $: console.log('Frontpage user:', $user);
    $: isLoggedIn = !!$user;
</script>

<h1>All products</h1>
{#if isLoggedIn}
    <p>Welcome back, {$user?.username}</p>
{/if}
<ProductGrid />