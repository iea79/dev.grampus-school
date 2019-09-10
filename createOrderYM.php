<?php
require __DIR__ . '/vendor/autoload.php';
use YandexMoney\API;

$auth_url = API::buildObtainTokenUrl($client_id, $redirect_uri, $scope);

// $client = new Client();
// $client->setAuth('603707', 'test_tc3A7ai50zIlMdo4mSRtvzr7rPcqfgC5VTylYswqEis');
// $idempotenceKey = uniqid('', true);
//
// $programm = $_POST['customerNumber'];
// $amount = $_POST['sum'];
// $typePayment = $_POST['payType'];
//
// $payment = $client->createPayment(
//     array(
//         'amount' => array(
//             'value' => $amount,
//             'currency' => 'RUB',
//         ),
//         'payment_method_data' => array(
//             'type' => $typePayment,
//         ),
//         'confirmation' => array(
//             'type' => 'redirect',
//             'return_url' => 'http://grampus-school.ru/payment/success-payment.html',
//         ),
//         'capture' => true,
//         'description' => $programm,
//         'test' => true,
//     ),
//     $idempotenceKey
// );
//
// header('Content-type: application/json');
// echo json_encode($payment);
?>
