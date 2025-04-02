<?php
// Arquivo para verificar endereço IP, detectar VPN e limitar acessos ao enigma

// Iniciar sessão
session_start();

// Função para obter o IP real do usuário (mesmo atrás de proxies)
function getClientIP() {
    $ipAddress = '';
    
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Para identificar o IP quando atrás de um proxy
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

// Função para verificar se o IP está usando VPN/Proxy
function isUsingVPN($ip) {
    // Opção 1: Usando serviços de API para detecção de VPN/proxy
    // Exemplo com IPHub API (você precisará de uma chave API)
    $apiKey = "Mjc3NDY6c1M2VmJvZE1QaEtXQ051N09IVzJjdTRFdU5wYk8ybFU="; // Substitua por sua chave API
    $url = "http://v2.api.iphub.info/ip/{$ip}";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["X-Key: {$apiKey}"]);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    if ($response) {
        $data = json_decode($response);
        // Block = 1 indica que o IP provavelmente é um VPN/proxy
        if (isset($data->block) && $data->block == 1) {
            return true;
        }
    }
    
    // Opção 2: Verificação de portas comuns usadas por VPNs
    // Isso é menos confiável, mas pode ser usado como verificação adicional
    $commonVPNPorts = [1194, 1723, 500, 4500, 1701, 1702];
    $target = $ip;
    
    foreach ($commonVPNPorts as $port) {
        $connection = @fsockopen($target, $port, $errno, $errstr, 1);
        if (is_resource($connection)) {
            fclose($connection);
            return true;
        }
    }
    
    // Opção 3: Verificar se o IP está em listas de bloqueio de VPN
    // Você pode usar serviços como o Project Honey Pot, Spamhaus, etc.
    
    return false;
}

// Função para verificar e atualizar o contador de tentativas
function checkEnigmaAttempts($ip) {
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
    
    // Inicializar contador para este IP se não existir
    if (!isset($attempts[$ip])) {
        $attempts[$ip] = [
            'started' => false,
            'completed' => false,
            'timestamp' => 0
        ];
    }
    
    // Verificar se o usuário já iniciou ou completou o enigma
    if ($attempts[$ip]['started'] || $attempts[$ip]['completed']) {
        // Usuário já iniciou ou completou o enigma
        return [
            'allowed' => false,
            'reason' => $attempts[$ip]['completed'] ? 'completed' : 'started',
            'timestamp' => $attempts[$ip]['timestamp']
        ];
    }
    
    // Se chegou aqui, o usuário ainda não iniciou/completou o enigma
    return [
        'allowed' => true
    ];
}

// Resposta principal da API
header('Content-Type: application/json');

// Obter endereço IP do cliente
$clientIP = getClientIP();

// Verificar se está usando VPN
$usingVPN = isUsingVPN($clientIP);

if ($usingVPN) {
    // Bloquear acesso para VPNs
    echo json_encode([
        'status' => 'error',
        'error' => 'vpn_detected',
        'message' => 'O uso de VPN não é permitido para acessar esta página.'
    ]);
    exit;
}

// Verificar tentativas do enigma
$enigmaStatus = checkEnigmaAttempts($clientIP);

if (!$enigmaStatus['allowed']) {
    $reason = $enigmaStatus['reason'];
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

// Se chegou aqui, o acesso está permitido
echo json_encode([
    'status' => 'success',
    'client_ip' => $clientIP
]);
?>