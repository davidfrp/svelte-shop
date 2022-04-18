<script>
    import ProductItem from "../components/ProductItem.svelte";
    let products = [];
</script>

<div class="product-grid">
    {#each products as product}
        <ProductItem {...product} />
    {/each}
</div>

<style>
    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
    }
</style>