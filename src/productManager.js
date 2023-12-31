import fs from 'fs';
import { v4 as uuidV4 } from 'uuid';

class ProductManager {


    constructor() {
        this.products = [];
        this.path = './productos.json'
    }

    async getProducts() {
        if (!fs.existsSync(this.path)) {
            return console.log('el archivo no se encuentra')
        } else {
            try {
                const listJSON = await fs.promises.readFile(this.path, 'utf-8');
                const list = JSON.parse(listJSON);
                return list;
            } catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
            }
        }
    }

    async addProduct(title, description, price, category, code, stock, statusP, thumbnail) {
        if (!title || !description || !price || !category || !code || !stock || !statusP) {
            return console.warn("Todos los campos son requeridos");

        }
        const validCode = this.products.find((p) => p.code === code)
        if (validCode) {
            return console.log(`Ya existe este codigo ${code} de producto`);

        } else {
            const newProduct = {
                id: uuidV4(),
                title,
                description,
                price,
                category,
                code,
                stock,
                statusP,
                thumbnail,
            }

            this.products.push(newProduct)


            const content = JSON.stringify(this.products, null, '\t')

            try {
                await fs.promises.writeFile(this.path, content, 'utf-8')
            } catch (error) {
                console.log(`Ha ocurrido un error: ${error.message}`)
            }

        }

    }

    async updateProduct(prodid, newTitle, newDescription, newPrice, newCategory, newCode, newStock, newStatusP) {

        if (!fs.existsSync(this.path)) {
            return console.log('el archivo no se encuentra')
        } else {
            try {
                const listJSON = await fs.promises.readFile(this.path, 'utf-8');
                const list = JSON.parse(listJSON);
                const index = list.findIndex((e) => e.id === prodid);
                console.log(index)
                if (index !== -1) {
                    const updatedObj = {
                        ...this.products[index],
                        title: newTitle ? newTitle : this.products[index].title,
                        description: newDescription ? newDescription : this.products[index].description,
                        price: newPrice ? newPrice : this.products[index].price,
                        category: newCategory ? newCategory : this.products[index].category,
                        code: newCode ? newCode : this.products[index].code,
                        stock: newStock ? newStock : this.products[index].stock,
                        statusP: newStatusP ? newStatusP : this.products[index].newStatusP,
                    };
                    this.products[index] = updatedObj;
                    const content = JSON.stringify(this.products, null, '\t')

                    try {
                        await fs.promises.writeFile(this.path, content, 'utf-8')
                        return updatedObj;
                    } catch (error) {
                        console.log(`No pudo actualizarse el producto: ${error.message}`)
                    }
                }

            } catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
            }
        }
    }

    async getProductsbyId(prodid) {

        if (!fs.existsSync(this.path)) {
            return console.log('el archivo no se encuentra')
        } else {
            try {
                const listJSON = await fs.promises.readFile(this.path, 'utf-8');
                const list = JSON.parse(listJSON);
                const getId = list.find((p) => p.id == prodid)
                if (!getId) {
                    console.warn("Product not Found")
                    return
                }
                console.log("Producto Buscado:", getId)
                return getId;
            } catch (error) {
                console.error(`Ocurrio un error: ${error.message}`)
            }
        }

    }



    async deleteProduct(prodid) {

        if (!fs.existsSync(this.path)) {
            return console.log('el archivo no se encuentra')
        } else {
            try {
                const listJSON = await fs.promises.readFile(this.path, 'utf-8');
                const list = JSON.parse(listJSON);
                const deletedList = list.filter((e) => e.id !== prodid)
                this.products = deletedList;
                const content = JSON.stringify(this.products, null, '\t')
                try {
                    await fs.promises.writeFile(this.path, content, 'utf-8')
                    return console.log('producto borrado', this.products);
                } catch (error) {
                    console.log(`No se pudo borrar: ${error.message}`)
                }

            } catch (error) {
                console.error(`No se pudo borrrar el prducto: ${error.message}`)
            }

        }
    }

}


const productManager = new ProductManager
export default productManager;
/*
productManager.addProduct(
    1,
    true,
    [],
    "Camiseta Titular 2023",
    "Camiseta de Independendiente titular del 2023",
    "A1",
    98,
    26,
    "Camisetas",
    true

)

productManager.addProduct(
    2,
    true,
    [],
    "Camiseta Titular 2021",
    "Camiseta de Independendiente titular del 2021",
    "A2",
    58,
    6,
    "Camisetas",
    true
)
productManager.addProduct(
    3,
    true,
    [],
    "Camiseta Suplente 2023",
    "Camiseta de Independendiente suplente del 2023",
    "A3",
    78,
    23,
    "Camisetas",
    true
)

productManager.addProduct(
    4,
    true,
    [],
    "Short Titular 2023",
    "Short de Independendiente titular del 2023",
    "B1",
    58,
    26,
    "Short",
    true
)

productManager.addProduct(
    5,
    true,
    [],
    "Short Suplente 2023",
    "Short de Independendiente suplente del 2023",
    "B2",
    48,
    26,
    "Short",
    true
)

productManager.addProduct(
    6,
    true,
    [],
    "Campera Independiente",
    "Campera de Independendiente roja",
    "C1",
    75,
    16,
    "Abrigos y accesorios",
    true
)

productManager.addProduct(
    7,
    true,
    [],
    "Buso Independiente",
    "Buso de Independendiente negro",
    "C2",
    67,
    8,
    "Abrigos y accesorios",
    true
)

productManager.addProduct(
    8,
    true,
    [],
    "Pelota Independiente",
    "Pelota de Independendiente negra",
    "C3",
    28,
    9,
    "Abrigos y accesorios",
    true
)

productManager.addProduct(
    9,
    true,
    [],
    "Mochila de independiente ",
    "Mochila de Independendiente gris ",
    "C4",
    50,
    6,
    "Abrigos y accesorios",
    true
)

export default productManager;*/
