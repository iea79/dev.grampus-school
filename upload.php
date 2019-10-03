<?php
    if(isset($_FILES) && $_FILES['img']['error'] == 0){ // Проверяем, загрузил ли пользователь файл
        $file_name = basename(uniqid() . $_FILES["img"]["name"]); // Имя файла с уникальным преффиксом
        $uploaddir = dirname(__FILE__) .'/img/review/upload/'; // Директория для размещения файла
        $upload_file_path = $uploaddir . $file_name; // Полный путь для загрузки файла вместе с его названием
        $short_file_path = '/img/review/upload/'. $file_name;

        // if( ! is_dir( $uploaddir ) ) mkdir( $uploaddir, 0777 );

        move_uploaded_file($_FILES['img']['tmp_name'], $upload_file_path); // Перемещаем файл в желаемую директорию
        echo $short_file_path;
    } else {
        echo 'error';
    }
?>
