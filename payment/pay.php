<?php
    use YandexCheckout\Client;

    $client = new Client();
    $client->setAuth('603707', 'test_tc3A7ai50zIlMdo4mSRtvzr7rPcqfgC5VTylYswqEis');
    $payment = $client->createPayment(
        array(
            'amount' => array(
                'value' => 10.0,
                'currency' => 'RUB',
            ),
            'confirmation' => array(
                'type' => 'redirect',
                'return_url' => 'http://grampus-school.ru/payment/success-payment.html',
            ),
            'capture' => true,
            'description' => 'Test №1',
        ),
        uniqid('', true)
    );
?>
