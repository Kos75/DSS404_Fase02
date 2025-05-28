<?php
require __DIR__ . '/../config/database.php';

class TransactionModel {
    public function create($clientId, $type, $amount, $productId = null) {
        global $pdo;

        $stmt = $pdo->prepare("INSERT INTO transactions (client_id, product_id, type, amount) VALUES (?, ?, ?, ?)");
        $stmt->execute([$clientId, $productId, $type, $amount]);

        $transactionId = $pdo->lastInsertId();

        if ($productId) {
            $delta = $type === 'abono' ? $amount : -$amount;
            $pdo->prepare("UPDATE products SET balance = balance + ? WHERE id = ?")
                ->execute([$delta, $productId]);
        }

        return $transactionId;
    }



    public function getByClient($clientId) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT id, type, amount, created_at FROM transactions WHERE client_id = ? ORDER BY created_at DESC");
        $stmt->execute([$clientId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBalance($clientId) {
        global $pdo;

        $abonoStmt = $pdo->prepare("SELECT SUM(amount) FROM transactions WHERE client_id = ? AND type = 'abono'");
        $abonoStmt->execute([$clientId]);
        $abonos = floatval($abonoStmt->fetchColumn() ?? 0);

        $retiroStmt = $pdo->prepare("SELECT SUM(amount) FROM transactions WHERE client_id = ? AND type = 'retiro'");
        $retiroStmt->execute([$clientId]);
        $retiros = floatval($retiroStmt->fetchColumn() ?? 0);

        $transferStmt = $pdo->prepare("SELECT SUM(amount) FROM transfers WHERE from_client_id = ?");
        $transferStmt->execute([$clientId]);
        $transferencias = floatval($transferStmt->fetchColumn() ?? 0);

        $balance = $abonos - $retiros - $transferencias;
        return round($balance, 2);
    }

    public function getProductBalance($productId) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT balance FROM products WHERE id = ?");
        $stmt->execute([$productId]);
        return (float) $stmt->fetchColumn();
    }



}
