//SWAGGER 4 - componentes reutilizables para la documentación

module.exports = {
    components:{
        schemas:{
            Product:{
                type:'object',
                required: ["Nombre", "Descripción", "Imagen", "Talla", "Precio"],
                properties:{
                    _id:{
                        type:'string',
                        description:"Product identification number is MongoDB ProductId",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    Nombre:{
                        type:'string',
                        description:"Product name",
                        example:"Pantalón"
                    },
                    Descripción:{
                        type:'string',
                        description:"Product description",
                        example: "pantalones vaqueros color azul"
                    },  
                    Imagen:{
                        type:'string',
                        description:"Product image",
                        example: "https://optica-optima.com/383127-thickbox_default/kate-spade-camryn-s-x199o.jpg"
                    },
                    Categoría:{
                        type:'string',
                        description:"Product category",
                        example: "Pantalones"
                    },
                    Talla:{
                        type:'string',
                        description:"Product category",
                        example: "XL"
                    },
                    Precio:{
                        type:'number',
                        description:"Product price",
                        example: "25"
                    },
                }
            }
        }
    }
}

