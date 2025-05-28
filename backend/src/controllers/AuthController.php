<?php
require_once __DIR__ . '/../models/UserModel.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController {
    public function login($data, $response) {
        global $pdo;

        $email = $data['email'];
        $password = $data['password'];

        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($password, $user['password'])) {
            $response->getBody()->write(json_encode(['error' => 'Credenciales inválidas']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $clientStmt = $pdo->prepare("SELECT * FROM clients WHERE user_id = ?");
        $clientStmt->execute([$user['id']]);
        $clientProfile = $clientStmt->fetch(PDO::FETCH_ASSOC);

        if (!$clientProfile) {
            $response->getBody()->write(json_encode(['error' => 'Cliente no encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $token = 'dummy-jwt-or-real-token';

        $response->getBody()->write(json_encode([
            'access_token' => $token,
            'user' => $clientProfile // ✅ Esto tendrá todos los datos del perfil
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }
    public function register($data, $response) {
        try {
            $email = $data['email'] ?? null;
            $password = $data['password'] ?? null;

            if (!$email || !$password) {
                throw new Exception("Email y contraseña requeridos");
            }

            $userModel = new UserModel();
            $existing = $userModel->findByEmail($email);

            if ($existing) {
                throw new Exception("Este email ya está registrado");
            }

            $hashed = password_hash($password, PASSWORD_DEFAULT);
            $userId = $userModel->create($email, $hashed);

            $clientId = $userModel->createClient($userId, $data['full_name'], [
                'dui' => $data['dui'] ?? '',
                'birth_date' => $data['birthDate'] ?? '',
                'city' => $data['city'] ?? '',
                'department' => $data['department'] ?? '',
                'profession' => $data['profession'] ?? '',
                'email' => $email,
                'phone' => $data['phone'] ?? '',
                'monthly_salary' => $data['monthlySalary'] ?? 0,
                'other_income' => $data['otherIncome'] ?? 0,
                'marital_status' => $data['maritalStatus'] ?? '',
            ]);

            $response->getBody()->write(json_encode([
                'message' => 'Cliente registrado con éxito',
                'user_id' => $userId,
                'client_id' => $clientId
            ]));

            return $response->withHeader('Content-Type', 'application/json');

        } catch (Exception $e) {
            $response->getBody()->write(json_encode([
                'error' => $e->getMessage()
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }

}
