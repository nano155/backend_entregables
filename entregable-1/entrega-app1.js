class Product {
  static id = 1;
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.id++;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }
  static id = 0;

  getProducts = () => {
    return this.products;
  };
  addProduct = (producto) => {
    const product = {
      title: producto.title,
      description: producto.description,
      price: producto.price,
      thumbnail: producto.thumbnail,
      code: producto.code,
      stock: producto.stock,
      id: producto.id,
    };
    const {title, description, code, id, price, stock, thumbnail} = product
    const existe = this.products.some((item) => item.code === product.code);
    if (!existe) {
      if (
        title  &&
        description  &&
        price  &&
        thumbnail  && 
        code  && 
        stock  &&
        id 
      ){
        this.products.push(product)
      }else{
        console.log('Todos los campos deben estar definidos');
      }
    } else {
      console.error("el codigo esta repetido");
    }
  };
  getProductById = (id) => {

   return (this.products.find(producto => producto.id === id ) || Error('No se encontro el id'));
  };
}

const admin = new ProductManager();

const producto1 = new Product(
  'Producto prueba',
  "Este es un producto",
  200,
  "Sin Imagen",
  "abc123",
  25
);




console.log(admin.getProducts());

admin.addProduct(producto1);


console.log(admin.getProducts());

console.log(admin.getProductById(1));


