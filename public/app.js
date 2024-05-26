const cartComponent = {
    props: ['products', 'cart'],
    emits:['toggle-cart'],
    setup(props,{emit}){
      const toggle=()=>{
        emit('toggle-cart')
      }
      return{
        toggle
      }

    },
    template:`
    <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Cart
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="toogle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th><span class="sr-only">Product Image</span></th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(quantity,key,i) in cart" :key="i">
              <td><i class="icofont-carrot icofont-3x"></i></td>
              <td>{{key}}</td>
              <td>price</td>
              <td class="center">total</td>
              <td>otal</td>
              <td class="center">
                <button @click="removeitem(key)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>
        <div class="spread">
          <span><strong>Total:</strong>total</span>
          <button class="btn btn-light">Checkout</button>
        </div>
      </div>
    </div>
  </aside>
    `
}


const { createApp, ref,computed } = Vue;

const app=createApp({
    components:{
'cart-component':cartComponent
    },
    setup() {
        const products = ref([
    // Fruits
    { id: 1, name: 'Apple', description: 'Fresh apples', price: 2, category: 'Fruits', icon: 'fas fa-apple' },
    { id: 2, name: 'Banana', description: 'Ripe bananas', price: 1, category: 'Fruits', icon: 'fas fa-banana' },
    { id: 3, name: 'Avocado', description: 'Creamy avocados', price: 3, category: 'Fruits', icon: 'fas fa-avocado' },
    { id: 4, name: 'Citrus Fruits', description: 'Assorted citrus fruits', price: 3.5, category: 'Fruits', icon: 'fas fa-lemon' },
    { id: 5, name: 'Cucurbit Fruits', description: 'Watermelon, pumpkins, etc.', price: 4, category: 'Fruits', icon: 'fas fa-watermelon' },
    { id: 6, name: 'Berries', description: 'Strawberries, gooseberries, etc.', price: 5, category: 'Fruits', icon: 'fas fa-berries' },
    { id: 7, name: 'Passion Fruit', description: 'Fresh passion fruits', price: 2.5, category: 'Fruits', icon: 'fas fa-grin-hearts' },
    { id: 8, name: 'Pineapple', description: 'Sweet pineapples', price: 3.5, category: 'Fruits', icon: 'fas fa-pineapple' },
    { id: 9, name: 'Pawpaw', description: 'Ripe pawpaw fruits', price: 4, category: 'Fruits', icon: 'fas fa-paw' },
    { id: 10, name: 'Tree Tomato', description: 'Tree tomatoes for cultivation', price: 6, category: 'Fruits', icon: 'fas fa-tree' },
    { id: 11, name: 'Mango', description: 'Juicy mangoes', price: 3, category: 'Fruits', icon: 'fas fa-mango' },
    // Vegetables
    { id: 12, name: 'Irish Potatoes', description: 'Staple food in many Kenyan households', price: 3, category: 'Vegetables', icon: 'fas fa-potato' },
    { id: 13, name: 'Tomatoes', description: 'Another popular vegetable in Kenya', price: 2, category: 'Vegetables', icon: 'fas fa-tomato' },
    { id: 14, name: 'Cabbage', description: 'Commonly used in Kenyan dishes', price: 2.5, category: 'Vegetables', icon: 'fas fa-cabbage' },
    { id: 15, name: 'Snow Peas', description: 'Type of flat, tender pea', price: 3.5, category: 'Vegetables', icon: 'fas fa-pea-pod' },
    { id: 16, name: 'Kale', description: 'Type of leafy green vegetable', price: 3, category: 'Vegetables', icon: 'fas fa-leaf' },
    { id: 17, name: 'Spinach', description: 'Popular leafy green vegetable', price: 3.5, category: 'Vegetables', icon: 'fas fa-leaf' },
    { id: 18, name: 'Runner Beans', description: 'Type of green bean', price: 4, category: 'Vegetables', icon: 'fas fa-bean' },
    { id: 19, name: 'French Beans', description: 'Type of green bean', price: 4, category: 'Vegetables', icon: 'fas fa-bean' },
    { id: 20, name: 'Carrots', description: 'Popular root vegetable in Kenya', price: 3, category: 'Vegetables', icon: 'fas fa-carrot' },
    { id: 21, name: 'Broccoli', description: 'Type of cruciferous vegetable', price: 4, category: 'Vegetables', icon: 'fas fa-broccoli' },
    { id: 22, name: 'Indigenous Vegetables', description: 'Wide range of indigenous vegetables', price: 3, category: 'Vegetables', icon: 'fas fa-seedling' },
    // Cereals
    { id: 23, name: 'Maize (Corn)', description: 'Staple food in Kenya used to make ugali and other dishes', price: 2.5, category: 'Cereals', icon: 'fas fa-corn' },
    { id: 24, name: 'Rice', description: 'Commonly consumed in various forms including plain rice and pilau', price: 4, category: 'Cereals', icon: 'fas fa-rice' },
    { id: 25, name: 'Wheat', description: 'Used to make bread, chapati, and other baked goods', price: 3, category: 'Cereals', icon: 'fas fa-wheat' },
    { id: 26, name: 'Barley', description: 'Used for brewing beer and making malted products', price: 5, category: 'Cereals', icon: 'fas fa-beer' },
    { id: 27, name: 'Sorghum', description: 'Used to make ugali, porridge, and fermented beverages', price: 3, category: 'Cereals', icon: 'fas fa-sorghum' },
    { id: 28, name: 'Millet', description: 'Used for making porridge, flatbreads, and traditional drinks', price: 3.5, category: 'Cereals', icon: 'fas fa-mug-hot' },
    { id: 29, name: 'Oats', description: 'Used to make oatmeal, porridge, and baked goods', price: 4, category: 'Cereals', icon: 'fas fa-seedling' }
]);
        const cart=ref({})
        const isCartVisible=ref(false)
        const searchTerm=ref('')
        const filteredProducts=computed(()=>{
            if(!searchTerm.value)return products.value;
            return products.value.filter(product=>
                product.category.toLowerCase().includes(searchTerm.value.toLowerCase())
            )
        })
        const toggleSideBar=()=>{
            isCartVisible.value=!isCartVisible.value;
            console.log('the button was clicked')
        }

        return { cart,products ,searchTerm,filteredProducts,isCartVisible,toggleSideBar};
    },
  
}).mount('#app');
