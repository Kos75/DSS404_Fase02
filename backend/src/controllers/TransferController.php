<?php
require_once __DIR__ . '/../models/TransferModel.php';
require_once __DIR__ . '/../models/TransactionModel.php';
require_once __DIR__ . '/../models/AuditModel.php';

class TransferController
{
    public function transfer($data, $response) {
        $from = $data['from_client_id'] ?? null;
        $to = $data['to_client_id'] ?? null;
        $amount = $data['amount'] ?? 0;
        $productId = $data['product_id'] ?? null;
        $userId = $data['user_id'] ?? null;

        if (!$from || !$to || $from == $to || $amount <= 0 || !$productId) {
            $response->getBody()->write(json_encode(['error' => 'Datos inválidos']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $transferModel = new TransferModel();
        $balance = $transferModel->getProductBalance($productId);

        if ($amount > $balance) {
            $response->getBody()->write(json_encode([
                'error' => 'Saldo insuficiente',
                'disponible' => $balance
            ]));
            return $response->withStatus(403)->withHeader('Content-Type', 'application/json');
        }

        $transferId = (new TransferModel())->create($from, $to, $amount, $productId);

        $action = "Transferencia de \$$amount de cliente ID $from hacia cliente ID $to (producto ID $productId)";
        (new AuditModel())->log($userId, $action);

        $response->getBody()->write(json_encode([
            'message' => 'Transferencia realizada',
            'transfer_id' => $transferId,
            'saldo_restante' => round($balance - $amount, 2)
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getHistory($params, $response) {
        $clientId = $params['client_id'] ?? null;

        if (!$clientId) {
            $response->getBody()->write(json_encode(['error' => 'Parámetro client_id requerido']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $history = (new TransferModel())->getByClient($clientId);

        $response->getBody()->write(json_encode(['transfers' => $history]));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
