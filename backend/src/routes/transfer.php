<?php
global $app;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once __DIR__ . '/../controllers/TransferController.php';

$app->post('/api/transfer', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $controller = new TransferController();
    return $controller->transfer($data, $response);
});

$app->get('/api/transfer/history', function ($request, $response) {
    $params = $request->getQueryParams();
    $controller = new TransferController();
    return $controller->getHistory($params, $response);
});

