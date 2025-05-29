<?php
require_once __DIR__ . '/../models/ProductModel.php';

class ProductController {
    public function getByClient($clientId, $response) {
        $products = (new ProductModel())->getByClient($clientId);
        $response->getBody()->write(json_encode(['products' => $products]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create($data, $response) {

        $productModel = new ProductModel();

        try {
            $newProductId = $productModel->create($data);

            $response->getBody()->write(json_encode([
                'product_id' => $newProductId
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        } catch (Throwable $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
}
