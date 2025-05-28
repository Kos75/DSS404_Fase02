<?php
require __DIR__ . '/../config/database.php';

class ProductModel {
    public function getByClient($clientId) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT * FROM products WHERE client_id = ?");
        $stmt->execute([$clientId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($clientId, $type, $name, $balance = 0) {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO products (client_id, product_type, product_name, balance) VALUES (?, ?, ?, ?)");
        $stmt->execute([$clientId, $type, $name, $balance]);
        return $pdo->lastInsertId();
    }
}
