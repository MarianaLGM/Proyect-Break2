//SWAGGER 7-Para documentar este endpoint, editamos el /docs/products.js archivo de la siguiente manera:
// documentación de los diferentes endpoints


module.exports = {
    paths: {
        "/dashboard": { //POST crear un producto
        post: {
        tags: {
            Products: "Create a product",
        },
        description: "Create Product",
        operationId: "createProduct",
        parameters: [],
        requestBody: {
            required: true,
            content: {
            "application/json": {
                schema: {
                $ref: "#/components/schemas/ProductInput",
                },
            },
            },
        },
        responses: {
            201: {
            description: "Product created successfully",
            },
            500: {
            description: "Server error",
            },
        },
        },
    },
    "/products": { //GET obtener todos los productos
        get: {
        tags: ["Products"],
        summary: "Get all products",
        description: "Retrieves a list of all prodcuts stored in the database.",
        operationId: "getProducts",
        parameters: [],
        responses: {
            200: {
            description: "List of products retrieved successfully",
            content: {
                "application/json": {
                schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" },
                },
                },
            },
            },
            500: {
            description: "Server error",
            },
        },
        }
    },
    "/dashboard/{_id}": { //PUT actualizar un producto por id
        put: {
        tags: ["Products"],
        summary: "Update a product name",
        description: "Update the name of a specific product without modifying the 'completed' status.",
        operationId: "updateProduct",
        parameters: [
            {
            name: "_id",
            in: "path",
            required: true,
            schema: {
                type: "objetctId",
            },
            description: "The ID of the product to update.",
            },
        ],
        requestBody: {
            required: true,
            content: {
            "application/json": {
                schema: {
                type: "object",
                properties: {
                    Nombre: { type: "string" },
                    Descripción: { type: "string" },
                    Imagen: { type: "string" },
                    Talla: { type: "string" },
                    Precio: { type: "number" }
                },
                required: ["Nombre", "Descripción", "Imagen", "Talla", "Precio"]
                }
            }
            }
        },
        responses: {
            200: { description: "Product name updated successfully" },
            500: { description: "Server error" },
        },
        },
        delete: { //DELETE eliminar un producto
        tags: ["Products"],
        summary: "Delete a product",
        description: "Deletes a product permanently by its ID.",
        operationId: "deleteProduct",
        parameters: [
            {
            name: "_id",
            in: "path",
            required: true,
            schema: {
                type: "objetctId",
            },
            description: "The ID of the product to delete.",
            },
        ],
        responses: {
            200: { description: "Product deleted successfully" },
            500: { description: "Server error" },
        },
        }
    },
    },
};


