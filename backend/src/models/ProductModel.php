<?php
require __DIR__ . '/../config/database.php';

class ProductModel {
    public function getByClient($clientId) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT * FROM products WHERE client_id = ?");
        $stmt->execute([$clientId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        global $pdo;

        $stmt = $pdo->prepare("INSERT INTO products (client_id, product_type, product_name, balance) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['client_id'],
            $data['product_type'],
            $data['product_name'],
            $data['balance']
        ]);


        return $pdo->lastInsertId();
    }

}
