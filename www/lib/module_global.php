<?php



header("content-type: text/html; charset=UTF-8"); 


function connect()
{
    $link = mysqli_connect("mysql", "root", "tiger", "AOM");

    if (!$link) {
        $out = array('message' =>  "Unable to connect to MySQL.",
                     'errno' => mysqli_connect_errno(),
                     'error' => mysqli_connect_error());
        echo json_encode($out);
        exit;
    }

    $link->set_charset("utf8");
    return $link;
}


function disconnect($link)
{
    mysqli_close($link);
}
