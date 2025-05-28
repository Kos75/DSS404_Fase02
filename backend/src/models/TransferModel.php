<?php
require __DIR__ . '/../config/database.php';

class TransferModel
{
    public function create($fromClientId, $toClientId, $amount, $productId = null)
    {
        global $pdo;

        $stmt = $pdo->prepare("INSERT INTO transfers (from_client_id, to_client_id, product_id, amount) VALUES (?, ?, ?, ?)");
        $stmt->execute([$fromClientId, $toClientId, $productId, $amount]);

        $transferId = $pdo->lastInsertId();

        if ($productId) {
            $pdo->prepare("UPDATE products SET balance = balance - ? WHERE id = ?")
                ->execute([$amount, $productId]);
        }

        return $transferId;
    }



    public function getByClient($clientId)
    {
        global $pdo;
        $stmt = $pdo->prepare("
        SELECT 
            id,
            from_client_id,
            to_client_id,
            amount,
            created_at,
            CASE 
              WHEN from_client_id = ? THEN 'sent'
              ELSE 'received'
            END AS direction
        FROM transfers
        WHERE from_client_id = ? OR to_client_id = ?
        ORDER BY created_at DESC
    ");
        $stmt->execute([$clientId, $clientId, $clientId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductBalance($productId) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT balance FROM products WHERE id = ?");
        $stmt->execute([$productId]);
        return (float) $stmt->fetchColumn();
    }


}
