<?php
require_once __DIR__ . '/../models/UserModel.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController {
    public function login($data, $response) {
        $user = (new UserModel())->findByEmail($data['email'] ?? '');

        if (!$user || !password_verify($data['password'], $user['password'])) {
            $response->getBody()->write(json_encode(['error' => 'Credenciales inválidas']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }

        $payload = [
            'id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'iat' => time(),
            'exp' => time() + 3600
        ];

        $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        $response->getBody()->write(json_encode([
            'access_token' => $jwt,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
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
