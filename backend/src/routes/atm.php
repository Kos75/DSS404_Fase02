<?php
global $app;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once __DIR__ . '/../controllers/ATMController.php';

$app->post('/api/atm/transaction', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $controller = new ATMController();
    return $controller->createTransaction($data, $response);
});
$app->get('/api/atm/history', function ($request, $response) {
    $params = $request->getQueryParams();
    $controller = new ATMController();
    return $controller->getHistory($params, $response);
});
