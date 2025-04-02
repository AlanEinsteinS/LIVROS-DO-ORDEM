<?php
// Arquivo para salvar o resultado do enigma

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

if (!isset($data['action']) || $data['action'] !== 'save_result' || 
    !isset($data['score']) || !isset($data['code'])) {
    echo json_encode([
        'status' => 'error',
        'error' => 'invalid_data',
        'message' => 'Dados inválidos.'
    ]);
    exit;
}

// Obter o IP do cliente
$clientIP = getClientIP();

// Validar a pontuação
$score = intval($data['score']);
if ($score < 0 || $score > 5) {
    echo json_encode([
        'status' => 'error',
        'error' => 'invalid_score',
        'message' => 'Pontuação inválida.'
    ]);
    exit;
}

// Validar o código - agora só há um código para quem acerta tudo
$code = trim($data['code']);
$validCode = 'ORDEM-SUPREMA-2024';

if ($code !== $validCode) {
    echo json_encode([
        'status' => 'error',
        'error' => 'invalid_code',
        'message' => 'Código inválido.'
    ]);
    exit;
}

// Verificar se a pontuação é 5 (acertou todas)
if ($score !== 5 && $code === $validCode) {
    echo json_encode([
        'status' => 'error',
        'error' => 'code_mismatch',
        'message' => 'O código só é válido para quem acerta todas as perguntas.'
    ]);
    exit;
}

// Caminho para o arquivo de armazenamento de tentativas
$attemptsFile = 'enigma_attempts.json';

// Carregar dados existentes de tentativas
$attempts = [];
if (file_exists($attemptsFile)) {
    $jsonData = file_get_contents($attemptsFile);
    if ($jsonData) {
        $attempts = json_decode($jsonData, true) ?: [];
    }
}

// Marcar como completado
if (isset($attempts[$clientIP])) {
    $attempts[$clientIP]['started'] = true;
    $attempts[$clientIP]['completed'] = true;
    $attempts[$clientIP]['score'] = $score;
    $attempts[$clientIP]['timestamp'] = time();
    
    // Salvar dados atualizados de tentativas
    file_put_contents($attemptsFile, json_encode($attempts));
}

// Salvar o resultado no banco de dados ou arquivo de resultados
$resultsFile = 'enigma_results.json';

// Carregar dados existentes de resultados
$results = [];
if (file_exists($resultsFile)) {
    $jsonData = file_get_contents($resultsFile);
    if ($jsonData) {
        $results = json_decode($jsonData, true) ?: [];
    }
}

// Adicionar novo resultado
$results[] = [
    'ip' => $clientIP,
    'score' => $score,
    'code' => $code,
    'timestamp' => time(),
    'date' => date('Y-m-d H:i:s')
];

// Salvar dados atualizados
file_put_contents($resultsFile, json_encode($results));

// Retornar sucesso
echo json_encode([
    'status' => 'success',
    'message' => 'Resultado salvo com sucesso.'
]);
?>