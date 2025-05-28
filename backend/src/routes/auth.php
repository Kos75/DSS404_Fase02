<?php
global $app;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once __DIR__ . '/../controllers/AuthController.php';

$app->post('/api/login', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $controller = new AuthController();
    return $controller->login($data, $response);
});

$app->post('/api/register', function ($request, $response) {
    $data = $request->getParsedBody();
    $controller = new AuthController();
    return $controller->register($data, $response);
});
