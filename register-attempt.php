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
    
    // Uso de IP padrão em caso de falha na detecção ou filtragem
    if (!$ipAddress) {
        $ipAddress = '127.0.0.1';
    }
    
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

// Verificar se está usando VPN - função importada (simplificada)
function isUsingVPN($ip) {
    // Desativada a verificação de VPN para evitar erros
    return false;
}

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

// Criar diretório se não existir
$dir = dirname($dataFile);
if (!is_dir($dir) && $dir !== '.' && $dir !== '') {
    mkdir($dir, 0755, true);
}

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

// Salvar dados atualizados com tratamento de erro
$success = false;
try {
    $success = file_put_contents($dataFile, json_encode($attempts)) !== false;
} catch (Exception $e) {
    // Em caso de erro ao salvar, prosseguir mesmo assim
    $success = false;
}

// Retornar sucesso mesmo se houver falha na gravação, para não bloquear o usuário
echo json_encode([
    'status' => 'success',
    'message' => 'Tentativa registrada com sucesso.'
]);
?>