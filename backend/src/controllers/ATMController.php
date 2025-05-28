<?php
require_once __DIR__ . '/../models/TransactionModel.php';
require_once __DIR__ . '/../models/AuditModel.php';

class ATMController
{
    public function createTransaction($data, $response) {
        $clientId = $data['client_id'] ?? null;
        $type = $data['type'] ?? null;
        $amount = $data['amount'] ?? 0;
        $productId = $data['product_id'] ?? null;
        $userId = $data['user_id'] ?? null;

        if (!$clientId || !$type || $amount <= 0 || !$productId) {
            $response->getBody()->write(json_encode(['error' => 'Datos incompletos']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $transactionModel = new TransactionModel();

        if ($type === 'retiro') {
            $productBalance = $transactionModel->getProductBalance($productId);
            if ($amount > $productBalance) {
                $response->getBody()->write(json_encode([
                    'error' => 'Saldo insuficiente para retiro',
                    'disponible' => $productBalance
                ]));
                return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
            }
        }

        $transaction = $transactionModel->create($clientId, $type, $amount, $productId);

        $action = ucfirst($type) . " de \$$amount para cliente ID $clientId (producto ID $productId)";
        (new AuditModel())->log($userId, $action);

        $response->getBody()->write(json_encode([
            'message' => 'Transacción registrada',
            'id' => $transaction
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getHistory($params, $response) {
        $clientId = $params['client_id'] ?? null;

        if (!$clientId) {
            $response->getBody()->write(json_encode(['error' => 'Parámetro client_id requerido']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $history = (new TransactionModel())->getByClient($clientId);

        $response->getBody()->write(json_encode(['transactions' => $history]));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
