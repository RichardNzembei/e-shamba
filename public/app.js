const { createApp, ref, computed } = Vue;

const app = createApp({
    setup() {
        const products = ref([
            { id: 1, name: 'Apple', description: 'Fresh apples', price: 2, category: 'Fruits', icon: 'fa fa-apple' },
            { id: 2, name: 'Banana', description: 'Ripe bananas', price: 1, category: 'Fruits', icon: 'fa fa-lemon' },
            { id: 3, name: 'Carrot', description: 'Organic carrots', price: 3, category: 'Vegetables', icon: 'fa fa-carrot' },
            { id: 4, name: 'Broccoli', description: 'Green broccoli', price: 2.5, category: 'Vegetables', icon: 'fa fa-leaf' },
            { id: 5, name: 'Rice', description: 'Basmati rice', price: 10, category: 'Cereals', icon: 'fa fa-seedling' },
            { id: 6, name: 'Wheat', description: 'Whole wheat', price: 8, category: 'Cereals', icon: 'fa fa-wheat' }
        ]);
        const searchTerm = ref('');
        const selectedProduct = ref(null);
        const cart = ref([]);

        const selectProduct = (product) => {
            selectedProduct.value = product;
        };

        const addToCart = (product) => {
            cart.value.push(product);
        };

        const backToProducts = () => {
            selectedProduct.value = null;
        };

        const filteredProducts = computed(() => {
            if (!searchTerm.value) return products.value;
            return products.value.filter(product =>
                product.category.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        });

        const searchProducts = () => {
            // The search is automatically handled by the computed property
        };

        return {
            products,
            searchTerm,
            selectedProduct,
            cart,
            selectProduct,
            addToCart,
            backToProducts,
            filteredProducts,
            searchProducts
        };
    }
});

app.component('product-list', {
    props: ['products'],
    template: `
        <div>
            <h1>Products</h1>
            <div v-for="product in products" :key="product.id" class="product">
                <div class="product-container">
                    <i :class="product.icon + ' icon'"></i>
                    <div>
                        <h2>{{ product.name }}</h2>
                        <p>Price: {{ product.price }}</p>
                        <button @click="$emit('select-product', product)">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    `
});

app.component('product-details', {
    props: ['product'],
    template: `
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <p>Price: {{ product.price }}</p>
            <p>Description: {{ product.description }}</p>
            <button @click="$emit('add-to-cart', product)">Add to Cart</button>
            <button @click="$emit('back-to-products')">Back to Products</button>
        </div>
    `
});

app.component('shopping-cart', {
    props: ['cart'],
    template: `
        <div class="shopping-cart">
            <h2>Shopping Cart</h2>
            <ul>
                <li v-for="item in cart" :key="item.id">
                    {{ item.name }} - {{ item.price }}
                </li>
            </ul>
        </div>
    `
});
app.mount('#app')