import {ProductManager, product} from "./entrega-app2.js";
import express from 'express'



const productos = await product.getProducts()

const calculoLimit = (cantidad =null) =>{
    if(cantidad === null) return null
    const nuevoproducto = []
        for(let i = 0; i <= cantidad-1; i++) {
            const element = productos[i];
            
            nuevoproducto.push(element)
        }
        return nuevoproducto
}


const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
 
app.get('/products', (req, res) => {
    let limit = req.query.limits
    if(limit){
        let productLimit = calculoLimit(parseInt(limit))
        res.send(productLimit)
    }
    res.send(productos)
    
})

app.get('/products/:pid', async(req, res) => {
    let productId = parseInt(req.params.pid);
    
    let productSearch = await product.getProductById(productId)

    !productSearch ?res.send({error :'Usuario no encontrado'}):res.send({Producto: productSearch})
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})