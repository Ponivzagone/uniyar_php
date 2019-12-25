<?php

header("content-type: text/html; charset=UTF-8"); 

$link = mysqli_connect("mysql", "root", "tiger", "AOM");

if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$link->set_charset("utf8");

echo "Success: A proper connection to MySQL was made! The docker database is great." . PHP_EOL;
echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;

$res = $link->query("SELECT id,name FROM ROUTELIST ORDER BY id ASC");

echo "Reverse order...\n";
for ($row_no = $res->num_rows - 1; $row_no >= 0; $row_no--) {
    $res->data_seek($row_no);
    $row = $res->fetch_assoc();
    echo " id = " . $row['id'] . "name = " . mb_convert_encoding($row['name'], 'UTF-8', 'auto') . "\n";
}

echo "Result set order...\n";
$res->data_seek(0);
while ($row = $res->fetch_assoc()) {
    echo " id = " . $row['id'] . "\n";
}


mysqli_close($link);

