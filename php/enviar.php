<?php
// Configurações do e-mail
$to = "holanda.silva@escola.pr.gov.br";
$subject = "Mensagem do Site Tudo em Casa";

// Recebe os dados do formulário
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$assunto = $_POST['assunto'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';

// Mapeia o assunto para um texto mais amigável
$assuntos = [
    'duvida' => 'Dúvida',
    'sugestao' => 'Sugestão',
    'reclamacao' => 'Reclamação',
    'elogio' => 'Elogio',
    'outro' => 'Outro'
];

$assunto_texto = $assuntos[$assunto] ?? 'Outro';

// Monta o corpo do e-mail
$body = "Você recebeu uma nova mensagem do site Tudo em Casa:\n\n";
$body .= "Nome: $nome\n";
$body .= "E-mail: $email\n";
$body .= "Telefone: $telefone\n";
$body .= "Assunto: $assunto_texto\n";
$body .= "Mensagem:\n$mensagem\n";

// Cabeçalhos do e-mail
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envia o e-mail
$success = mail($to, $subject, $body, $headers);

// Retorna uma resposta JSON
header('Content-Type: application/json');
echo json_encode(['success' => $success]);
?>
