<?php
require_once __DIR__ . '/../models/ProductModel.php';

class ProductController {
    public function getByClient($clientId, $response) {
        $products = (new ProductModel())->getByClient($clientId);
        $response->getBody()->write(json_encode(['products' => $products]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create($data, $response) {
        $clientId = $data['client_id'] ?? null;
        $type = $data['type'] ?? null;
        $name = $data['name'] ?? null;
        $balance = $data['balance'] ?? 0;

        if (!$clientId || !$type || !$name) {
            $response->getBody()->write(json_encode(['error' => 'Datos incompletos']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $id = (new ProductModel())->create($clientId, $type, $name, $balance);

        $response->getBody()->write(json_encode([
            'message' => 'Producto creado',
            'product_id' => $id
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
