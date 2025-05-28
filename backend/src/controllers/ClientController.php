<?php
require_once __DIR__ . '/../models/ClientModel.php';

class ClientController {
    public function getAll($response) {
        $clients = (new ClientModel())->getAll();

        $response->getBody()->write(json_encode([
            'clients' => $clients
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getBalanceById($clientId, $response) {
        require_once __DIR__ . '/../models/TransactionModel.php';

        $transactionModel = new TransactionModel();
        $balance = $transactionModel->getBalance($clientId);

        $response->getBody()->write(json_encode([
            'client_id' => $clientId,
            'balance' => $balance
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

}
