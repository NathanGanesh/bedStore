
class Products {
  async getProducts() {
    try {

      let result = await fetch("./products.json");
      let data = await result.json();

      let products = data.items;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
  
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class Ui{
    displayItems(products) {
        let mainProducts = document.getElementsByClassName("main-product")[0];

        let result = '';
        products.forEach(product => {
           result+= `    <div class="single-product">
            <div>

                <img src="${product.image}">
            </div>
            <div class="product-info">

                <h5>${product.title}</h5>
                <h6>$${product.price}</h6>
            </div>
            <div class="single-product-icons">

                <button class="add-to-cart" value="${product.id}">Add to cart</button>
            </div>

        </div>`
        
            
        });
        mainProducts.innerHTML = result;
    }


}

document.addEventListener('DOMContentLoaded', () => {
    console.log("domloaded");
      new Products().getProducts().then(
          products =>{
              const ui = new Ui(); 
              ui.displayItems(products)
            
        }
      );

})

