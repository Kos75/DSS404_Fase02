<?php
require_once __DIR__ . '/TransactionModel.php';

class ClientModel {
    public function getAll() {
        global $pdo;
        $stmt = $pdo->query("SELECT id, full_name, email FROM clients ORDER BY full_name");
        $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Añadir saldo para cada cliente
        $transactionModel = new TransactionModel();
        foreach ($clients as &$client) {
            $client['balance'] = $transactionModel->getBalance($client['id']);
        }

        return $clients;
    }
}

