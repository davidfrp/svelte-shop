<script>
    export let id;
    export let name;
    export let price;
    export let imageUrl;
    export let description;
</script>

<div class="product-item">
    <div class="product-image">
        <img src={imageUrl} alt={name} />
    </div>
    <div class="product-details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
    </div>
</div>

<style>
    .product-item {
        padding: 1rem;
        background: #eee;
        border-radius: 0.5rem;
    }
</style>