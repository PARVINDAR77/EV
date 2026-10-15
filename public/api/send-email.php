<?php
/**
 * Axion Charge - PHP Mailer Endpoint for Hostinger Web Hosting
 * Handles JSON POST requests and sends email via Hostinger SMTP or PHP mail()
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['type']) || empty($input['data'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid or missing request body']);
    exit;
}

$type = $input['type'];
$data = $input['data'];
$to = 'axion@vardaansmartsolutions.com';
$from = 'axion@vardaansmartsolutions.com';

$subject = 'Axion Charge Website Notification';
$bodyHtml = '';
$userEmail = !empty($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$userName = !empty($data['name']) ? htmlspecialchars($data['name']) : 'User';

if ($type === 'contact') {
    $sub = !empty($data['subject']) ? htmlspecialchars($data['subject']) : 'General Inquiry';
    $msg = !empty($data['message']) ? nl2br(htmlspecialchars($data['message'])) : '';
    $subject = "⚡ [Contact Form] $sub - $userName";
    $bodyHtml = "
    <div style='font-family: Arial, sans-serif; background: #050708; color: #fff; padding: 25px; border-radius: 10px;'>
        <h2 style='color: #00FF00; margin-top: 0;'>New Contact Inquiry</h2>
        <p><strong>Name:</strong> $userName</p>
        <p><strong>Email:</strong> <a href='mailto:$userEmail' style='color:#00FF00;'>$userEmail</a></p>
        <p><strong>Subject:</strong> $sub</p>
        <div style='margin-top: 20px; padding: 15px; background: #111; border-left: 3px solid #00FF00;'>
            <strong>Message:</strong><br><br>$msg
        </div>
    </div>";
} elseif ($type === 'franchise') {
    $model = !empty($data['model']) ? htmlspecialchars($data['model']) : 'Partner';
    $loc = !empty($data['location']) ? htmlspecialchars($data['location']) : '';
    $phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : '';
    $subject = "⚡ [Partner Application] $userName ($model)";
    $bodyHtml = "
    <div style='font-family: Arial, sans-serif; background: #050708; color: #fff; padding: 25px; border-radius: 10px;'>
        <h2 style='color: #00FF00; margin-top: 0;'>New Partner Application</h2>
        <p><strong>Name:</strong> $userName</p>
        <p><strong>Email:</strong> <a href='mailto:$userEmail' style='color:#00FF00;'>$userEmail</a></p>
        " . ($phone ? "<p><strong>Phone:</strong> $phone</p>" : "") . "
        <p><strong>Partnership Tier:</strong> $model</p>
        <p><strong>Location:</strong> $loc</p>
    </div>";
} elseif ($type === 'newsletter') {
    $subject = "⚡ [Newsletter] New subscriber: $userEmail";
    $bodyHtml = "
    <div style='font-family: Arial, sans-serif; background: #050708; color: #fff; padding: 25px; border-radius: 10px;'>
        <h2 style='color: #00FF00; margin-top: 0;'>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> $userEmail</p>
    </div>";
}

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Axion Charge Platform <' . $from . '>',
    'Reply-To: ' . ($userEmail ?: $from),
    'X-Mailer: PHP/' . phpversion()
];

$success = mail($to, $subject, $bodyHtml, implode("\r\n", $headers));

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully via PHP']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'PHP mail function failed to dispatch']);
}
