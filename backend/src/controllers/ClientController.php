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

    public function updateClient($clientId, $data, $response) {

        $clientModel = new ClientModel();

        try {
            $updated = $clientModel->update($clientId, $data);

            if ($updated) {
                $client = $clientModel->getById($clientId);
                $response->getBody()->write(json_encode($client));
                return $response->withHeader('Content-Type', 'application/json');
            } else {
                $response->getBody()->write(json_encode(['error' => 'No se pudo actualizar el perfil']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

        } catch (Throwable $e) {
            $response->getBody()->write(json_encode([
                'error' => 'Error interno',
                'details' => $e->getMessage()
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }


}
