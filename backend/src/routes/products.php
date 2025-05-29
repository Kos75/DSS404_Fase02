<?php
global $app;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once __DIR__ . '/../controllers/ProductController.php';

$app->get('/api/products', function ($request, $response) {
    $params = $request->getQueryParams();
    $client_id = $params['client_id'] ?? null;
    $controller = new ProductController();
    return $controller->getByClient($client_id, $response);
});


$app->post('/api/products', function ($request, $response) {
    $data = $request->getParsedBody();
    $controller = new ProductController();
    return $controller->create($data, $response);
});
