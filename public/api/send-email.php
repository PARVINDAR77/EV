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
$to = 'panjabiparvindar77@gmail.com';
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
    <div style='font-family: Arial, sans-serif; background: #050708; color: #fff; padding: 25px; border-radius: 10px; max-width: 600px;'>
        <div style='border-bottom: 2px solid #00FF00; padding-bottom: 12px; margin-bottom: 20px;'>
            <h2 style='color: #00FF00; margin: 0; font-size: 22px;'>AXION CHARGE - New Inquiry</h2>
            <p style='color: #888; font-size: 12px; margin: 4px 0 0 0;'>Received via Axion Website Contact Form</p>
        </div>
        <p style='margin: 8px 0;'><strong>Name:</strong> $userName</p>
        <p style='margin: 8px 0;'><strong>Email:</strong> <a href='mailto:$userEmail' style='color:#00FF00;'>$userEmail</a></p>
        <p style='margin: 8px 0;'><strong>Subject:</strong> $sub</p>
        <div style='margin-top: 20px; padding: 15px; background: #111; border-left: 3px solid #00FF00; border-radius: 4px;'>
            <strong style='color: #00FF00;'>Message:</strong><br><br>
            <span style='color: #eee; line-height: 1.6;'>$msg</span>
        </div>
        <p style='margin-top: 25px; font-size: 11px; color: #666;'>To reply directly to the customer, simply click Reply in your email client.</p>
    </div>";
} elseif ($type === 'franchise') {
    $model = !empty($data['model']) ? htmlspecialchars($data['model']) : 'Partner';
    $loc = !empty($data['location']) ? htmlspecialchars($data['location']) : '';
    $phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : '';
    $subject = "⚡ [Partner Application] $userName ($model)";
    $bodyHtml = "
    <div style='font-family: Arial, sans-serif; background: #050708; color: #fff; padding: 25px; border-radius: 10px; max-width: 600px;'>
        <div style='border-bottom: 2px solid #00FF00; padding-bottom: 12px; margin-bottom: 20px;'>
            <h2 style='color: #00FF00; margin: 0; font-size: 22px;'>AXION CHARGE - Franchise Application</h2>
        </div>
        <p style='margin: 8px 0;'><strong>Name:</strong> $userName</p>
        <p style='margin: 8px 0;'><strong>Email:</strong> <a href='mailto:$userEmail' style='color:#00FF00;'>$userEmail</a></p>
        " . ($phone ? "<p style='margin: 8px 0;'><strong>Phone:</strong> $phone</p>" : "") . "
        <p style='margin: 8px 0;'><strong>Partnership Tier:</strong> $model</p>
        <p style='margin: 8px 0;'><strong>Location:</strong> $loc</p>
    </div>";
} elseif ($type === 'newsletter') {
    $subject = "⚡ [Newsletter] New subscriber: $userEmail";
    $bodyHtml = "
    <div style='font-family: Arial, sans-serif; background: #050708; color: #fff; padding: 25px; border-radius: 10px; max-width: 600px;'>
        <div style='border-bottom: 2px solid #00FF00; padding-bottom: 12px; margin-bottom: 20px;'>
            <h2 style='color: #00FF00; margin: 0; font-size: 22px;'>AXION CHARGE - New Newsletter Subscriber</h2>
            <p style='color: #888; font-size: 12px; margin: 4px 0 0 0;'>Received via Footer Newsletter Form</p>
        </div>
        <p style='margin: 12px 0; font-size: 16px;'><strong>Subscriber Email:</strong> <a href='mailto:$userEmail' style='color:#00FF00;'>$userEmail</a></p>
        <p style='margin-top: 20px; font-size: 12px; color: #666;'>Timestamp: " . date('Y-m-d H:i:s T') . "</p>
    </div>";
}

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Axion Charge Platform <' . $from . '>',
    'Reply-To: ' . ($userEmail ?: $from),
    'X-Mailer: PHP/' . phpversion()
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$success = mail($to, $encodedSubject, $bodyHtml, implode("\r\n", $headers));

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully via PHP']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'PHP mail function failed to dispatch']);
}
