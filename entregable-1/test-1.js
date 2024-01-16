const { v4 : uuidv4 } = require("uuid")
class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock
        this.id = uuidv4()

    }
}

class ProductManager  {
    constructor(){
        this.products = []
        this.id = 0
    }
    getProducts=()=>{

        return this.products
    }
    addProduct =(producto)=>{
        const product = {
            title : producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            code: producto.code,
            stock: producto.stock,
            id: this.id++
        }
        const existe = this.products.some(item => item.code === product.code)
        
        if(!existe){
            this.products.push(product)
        } else{
            console.error('el codigo esta repetido')
        }
    }
    getProductById = (id) =>{

        return this.products.some(item => item.id === id) ? this.products.filter(item => item.id === id ) :'No existe el producto'
    }

}

const admin = new ProductManager()

const producto1 = new Product('producto prueba', 'Este es un producto', 200, 'Sin Imagen', 'abc123', 25)

const producto2 = new Product('producto prueba', 'Este es un producto', 200, 'Sin Imagen', 'abc1234', 25)

const producto3 = new Product('producto prueba', 'Este es un producto', 200, 'Sin Imagen', 'abc12345', 25)

console.log(admin.getProducts());

admin.addProduct(producto1);

admin.addProduct(producto2);

admin.addProduct(producto3);

console.log(admin.getProducts());
console.log(admin.getProductById(2));
console.log(admin.getProductById(20));



