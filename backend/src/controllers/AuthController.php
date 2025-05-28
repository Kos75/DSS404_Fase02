<?php
require_once __DIR__ . '/../models/UserModel.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController {
    public function login($data, $response) {
        $user = (new UserModel())->findByEmail(isset($data['email']) ? $data['email'] : '');

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
        $email = isset($data['email']) ? $data['email'] : null;
        $password = isset($data['password']) ? $data['password'] : null;

        if (!$email || !$password) {
            $response->getBody()->write(json_encode(['error' => 'Email y contraseña requeridos']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $userModel = new UserModel();
        $existing = $userModel->findByEmail($email);

        if ($existing) {
            $response->getBody()->write(json_encode(['error' => 'Este email ya está registrado']));
            return $response->withStatus(409)->withHeader('Content-Type', 'application/json');
        }

        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $userId = $userModel->create($email, $hashed);

        $clientId = $userModel->createClient($userId, $email);

        $response->getBody()->write(json_encode([
            'message' => 'Cliente registrado con éxito',
            'user_id' => $userId,
            'client_id' => $clientId
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

}
