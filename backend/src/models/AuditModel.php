<?php
require __DIR__ . '/../config/database.php';

class AuditModel
{
    public function log($userId, $action)
    {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO audit_log (user_id, action) VALUES (?, ?)");
        $stmt->execute([$userId, $action]);
    }


    public function getAll()
    {
        global $pdo;
        $stmt = $pdo->query("
            SELECT audit_log.*, users.email 
            FROM audit_log 
            LEFT JOIN users ON audit_log.user_id = users.id 
            ORDER BY audit_log.created_at DESC
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
