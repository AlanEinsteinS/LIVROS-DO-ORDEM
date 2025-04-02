<?php
// Arquivo para registrar uma tentativa de enigma

// Iniciar sessão
session_start();

// Função para obter o IP real do usuário
function getClientIP() {
    $ipAddress = '';
    
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipAddressList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ipAddress = end($ipAddressList);
    } else if (isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if (isset($_SERVER['HTTP_FORWARDED'])) {
        $ipAddress = $_SERVER['HTTP_FORWARDED'];
    } else if (isset($_SERVER['REMOTE_ADDR'])) {
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    }
    
    // Limpar e validar o endereço IP
    $ipAddress = filter_var($ipAddress, FILTER_VALIDATE_IP);
    return $ipAddress;
}

// Verificar se é uma requisição POST
header('Content-Type: application/json');

// Verificar o tipo de requisição
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'error' => 'invalid_request',
        'message' => 'Método de requisição inválido.'
    ]);
    exit;
}

// Obter os dados enviados pelo usuário
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['action']) || $data['action'] !== 'register_attempt') {
    echo json_encode([
        'status' => 'error',
        'error' => 'invalid_action',
        'message' => 'Ação inválida.'
    ]);
    exit;
}

// Obter o IP do cliente
$clientIP = getClientIP();

// Verificar se está usando VPN (reuso da função do ip-check.php)
include_once('ip-check.php');
if (isUsingVPN($clientIP)) {
    echo json_encode([
        'status' => 'error',
        'error' => 'vpn_detected',
        'message' => 'O uso de VPN não é permitido para acessar esta página.'
    ]);
    exit;
}

// Verificar tentativas do enigma
// Caminho para o arquivo de armazenamento de tentativas
$dataFile = 'enigma_attempts.json';

// Carregar dados existentes
$attempts = [];
if (file_exists($dataFile)) {
    $jsonData = file_get_contents($dataFile);
    if ($jsonData) {
        $attempts = json_decode($jsonData, true) ?: [];
    }
}

// Inicializar registro para este IP se não existir
if (!isset($attempts[$clientIP])) {
    $attempts[$clientIP] = [
        'started' => false,
        'completed' => false,
        'timestamp' => 0
    ];
}

// Verificar se o usuário já iniciou ou completou o enigma
if ($attempts[$clientIP]['started'] || $attempts[$clientIP]['completed']) {
    $reason = $attempts[$clientIP]['completed'] ? 'completed' : 'started';
    $message = ($reason === 'completed') 
        ? "Você já completou o enigma. Este enigma só pode ser resolvido uma vez por pessoa."
        : "Você já iniciou o enigma. Não é possível reiniciar.";
    
    echo json_encode([
        'status' => 'error',
        'error' => 'attempt_exists',
        'message' => $message
    ]);
    exit;
}

// Registrar que o usuário iniciou o enigma
$attempts[$clientIP]['started'] = true;
$attempts[$clientIP]['timestamp'] = time();

// Salvar dados atualizados
file_put_contents($dataFile, json_encode($attempts));

// Retornar sucesso
echo json_encode([
    'status' => 'success',
    'message' => 'Tentativa registrada com sucesso.'
]);
?>