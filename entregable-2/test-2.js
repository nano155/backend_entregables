
const fs = require('fs')

class Product {

  constructor(title, description, price, thumbnail, code, stock, id) {
    if (!title  || !description  || !price  && !thumbnail  || !code  || !stock|| !id ){
      console.error('Todos los campos deben estar definidos') 
      return  
  }
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = id;
  }
}


class ProductManager {
  constructor() {
    this.products = []
    this.patch = "./ejemploPromesa.txt"
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {

    const newProduct = new Product( title, description, price, thumbnail, code, stock, ++ProductManager.id );

    this.products.push(newProduct)
    await fs.promises.writeFile(this.patch, JSON.stringify(this.products))

  }

  #readProducts = async () =>{
    let respuesta = await fs.promises.readFile(this.patch, 'utf-8')

   return (JSON.parse(respuesta));
  }

  getProducts = async () =>{
      let productosP = await this.#readProducts()

      if(!productosP) 
      throw new Error('No se encuentran productos en el directorio')

      console.log(productosP);
      
  }
  
  getProductById = async (id) =>{
      const productosId = await this.#readProducts()

      if(!productosId.find(res => res.id === id))
      throw new Error(`No se encontro productos con el id ${id}`)


      console.log(productosId.find(res => res.id === id));
      
  
  }

  deleteProduct = async (id) =>{
    const productosIdfilter = await this.#readProducts()
    

    if(!productosIdfilter.find(res => res.id === id)){

      throw new Error(`No se encontro productos con el id para borrar ${id}`)
    }

      let nuevoArray = productosIdfilter.filter(res => res.id !== id)


      await fs.promises.writeFile(this.patch, JSON.stringify(nuevoArray))

      console.log(`fue borrado el array con id ${id}`)
  }

  updateProducts = async({id, ...producto})=>{
    await this.deleteProduct(id);
    let productoPrev = await this.#readProducts();
    let productoNew = [{id, ...producto}, ...productoPrev];
    await fs.promises.writeFile(this.patch, JSON.stringify(productoNew))
  }
}

const product = new ProductManager()

product.addProduct('Producto prueba1', "Este es un producto", 200, "Sin Imagen", "abc123", 25 );
product.addProduct('Producto prueba2', "Este es un producto", 100, "Sin Imagen", "abc124", 25 );
product.addProduct('Producto prueba3', "Este es un producto", 150, "Sin Imagen", "abc1245", 25 );

product.getProducts()

product.deleteProduct(3)

product.updateProducts ({
  title : 'producto nuevo 3',
  description : "Este es un producto",
  price : 150,
  thumbnail : "Sin Imagen",
  code : "abc1245",
  stock : 25,
  id : 3,
})







