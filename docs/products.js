//SWAGGER 7-Para documentar este endpoint, editamos el /docs/tasks.js archivo de la siguiente manera:
// documentación de los diferentes endpoints

const Product = require("../models/Product");

module.exports = {
    paths: {
        "/dashboard": {
            post: {
            tags: ["Products"],
            summary: "Create a product",
            description: "Creates a new product",
            operationId: "createProduct",
            parameters: [],
            requestBody: {
            required: true,
            content: {
            "application/json": {
            schema: {
            type: "object",
            properties: {
                title: { type: "string" }
            },
                required: ["Nombre", "Descripción", "Imagen", "Talla", "Precio"]
            }
        }
    }
        },
        responses: {
            201: {
            description: "Product created successfully",
            },
            500: {
            description: "Server error",
            },
        },
        }
    },
    "/dashboard": {
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
    "/dashboard/{_id}": {
        put: {
        tags: ["Products"],
        summary: "Update a product name",
        description: "Update the name of a specific product without modifying the 'completed' status.",
        operationId: "updateProcuct",
        parameters: [
            {
            name: "_id",
            in: "path",
            required: true,
            schema: {
                type: "string",
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
                    title: { type: "string" }
                },
                required: ["title"]
                }
            }
            }
        },
        responses: {
            200: { description: "Product name updated successfully" },
            500: { description: "Server error" },
        },
        },
        delete: {
        tags: ["ProductS"],
        summary: "Delete a product",
        description: "Deletes a product permanently by its ID.",
        operationId: "deleteProduct",
        parameters: [
            {
            name: "_id",
            in: "path",
            required: true,
            schema: {
                type: "string",
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