<?php
require_once __DIR__ . '/TransactionModel.php';

class ClientModel {
    public function getAll() {
        global $pdo;
        $stmt = $pdo->query("SELECT id, full_name, email FROM clients ORDER BY full_name");
        $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $transactionModel = new TransactionModel();
        foreach ($clients as &$client) {
            $client['balance'] = $transactionModel->getBalance($client['id']);
        }

        return $clients;
    }

    public function update($clientId, $data) {
        global $pdo;
        $query = "UPDATE clients SET 
                full_name = :full_name,
                city = :city,
                department = :department,
                email = :email,
                phone = :phone,
                profession = :profession
              WHERE id = :id";
        $stmt = $pdo->prepare($query);
        return $stmt->execute([
            ':full_name' => $data['full_name'],
            ':city' => $data['city'],
            ':department' => $data['department'],
            ':email' => $data['email'],
            ':phone' => $data['phone'],
            ':profession' => $data['profession'],
            ':id' => $clientId
        ]);
    }

    public function getById($clientId) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT * FROM clients WHERE id = ?");
        $stmt->execute([$clientId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}

