<?php
require __DIR__ . '/../config/database.php';

class UserModel {
    public function findByEmail($email) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($email, $hashedPassword) {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, 'client')");
        $stmt->execute([$email, $hashedPassword]);
        return $pdo->lastInsertId();
    }

    public function createClient($userId, $name, $fields) {
        global $pdo;

        $columns = ['user_id', 'full_name'];
        $placeholders = ['?', '?'];
        $values = [$userId, $name];

        foreach ($fields as $key => $value) {
            $columns[] = $key;
            $placeholders[] = '?';
            $values[] = $value;
        }

        $sql = "INSERT INTO clients (" . implode(', ', $columns) . ") VALUES (" . implode(', ', $placeholders) . ")";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        return $pdo->lastInsertId();
    }
}
