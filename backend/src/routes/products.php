<?php
global $app;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once __DIR__ . '/../controllers/ProductController.php';

$app->get('/api/products/{client_id}', function ($request, $response, $args) {
    $controller = new ProductController();
    return $controller->getByClient($args['client_id'], $response);
});

$app->post('/api/products', function ($request, $response) {
    $data = json_decode($request->getBody()->getContents(), true);
    $controller = new ProductController();
    return $controller->create($data, $response);
});
