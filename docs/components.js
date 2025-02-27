//SWAGGER 4 - componentes reutilizables para la documentación

module.exports = {
    components:{
        schemas:{
            Product:{
                type:'object',
                //required: ["Nombre", "Descripción", "Imagen", "Talla", "Precio"],
                properties:{
                    _id:{
                        type:'string',
                        description:"Product identification number is MongoDB ProductId",
                        example:"6201064b0028de7866e2b2c4"
                    },
                    name:{
                        type:'string',
                        description:"Product name",
                        example:"Pantalón"
                    },
                    description:{
                        type:'string',
                        description:"Product description",
                        example: "pantalones vaqueros color azul"
                    },  
                    image:{
                        type:'string',
                        description:"Product image",
                        example: "https://optica-optima.com/383127-thickbox_default/kate-spade-camryn-s-x199o.jpg"
                    },
                    category:{
                        type:'string',
                        description:"Product category",
                        example: "Pantalones"
                    },
                    size:{
                        type:'string',
                        description:"Product size",
                        example: "XL"
                    },
                    price:{
                        type:'number',
                        description:"Product price",
                        example: "25"
                    },
                },
            },
            ProductInput: {
                    type: "object",
                    properties: {
                        name:{
                            type:'string',
                            description:"Product name",
                            example:"Pantalón"
                        },
                        description:{
                            type:'string',
                            description:"Product description",
                            example: "pantalones vaqueros color azul"
                        },  
                        image:{
                            type:'string',
                            description:"Product image",
                            example: "https://optica-optima.com/383127-thickbox_default/kate-spade-camryn-s-x199o.jpg"
                        },
                        category:{
                            type:'string',
                            description:"Product category",
                            example: "Pantalones"
                        },
                        size:{
                            type:'string',
                            description:"Product size",
                            example: "XL"
                        },
                        price:{
                            type:'number',
                            description:"Product price",
                            example: "25"
                        },
                    },
                },
            _id: {
                type: "objectId",
                description: "An id of a product",
                example: "6201064b0028de7866e2b2c4",
            },
        },
    },
}


