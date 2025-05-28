<?php
use Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__ . '/../controllers/AuditController.php';

$app->get('/api/audit-log', function ($request, $response) {
    $controller = new AuditController();
    return $controller->getAll($response);
});
