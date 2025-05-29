<?php
global $app;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once __DIR__ . '/../controllers/ClientController.php';

$app->get('/api/clients', function (Request $request, Response $response) {
    $controller = new ClientController();
    return $controller->getAll($response);
});

$app->get('/api/client/{id}/balance', function ($request, $response, $args) {
    $controller = new ClientController();
    return $controller->getBalanceById($args['id'], $response);
});

$app->put('/api/client/{id}', function ($request, $response, $args) {
    $clientId = $args['id'];
    $data = $request->getParsedBody();

    $controller = new ClientController();
    return $controller->updateClient($clientId, $data, $response);
});


