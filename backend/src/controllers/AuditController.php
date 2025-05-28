<?php
require_once __DIR__ . '/../models/AuditModel.php';

class AuditController {
    public function getAll($response) {
        $audits = (new AuditModel())->getAll();

        $response->getBody()->write(json_encode([
            'logs' => $audits
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
