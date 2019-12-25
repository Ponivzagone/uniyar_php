<?php

    function DropRoutes($link,$row) {
        $stmt = $link->prepare("DELETE FROM ROUTELIST WHERE ID = ?");
        $stmt->bind_param("i",$id);
        $id    = $r['id'];
        $stmt->execute();
        $out = array('row_remove' => $stmt->affected_rows);
        $stmt->close();
        return $out;
    }

    function DropTrains($link,$row) {
        $stmt  = $link->prepare("DELETE FROM TRAINLIST WHERE NUM = ?");
        $stmt->bind_param("i", $train_num);
        $train_num      = intval($row['train_num']);
        $stmt->execute();
        $out = array('row_remove' => $stmt->affected_rows);
        $stmt->close();
        return $out;
    }

    function DropPassangers($link, $row) {
        $stmt  = $link->prepare("DELETE FROM PASSANGERS WHERE ID = ? ");
        $stmt->bind_param("i", $id);
        $id    = intval($row['id']);
        $stmt->execute();
        $out = array('row_remove' => $stmt->affected_rows);
        $stmt->close();
        return $out;
    }


    require_once("../lib/module_global.php");
    header("content-type: text/html; charset=UTF-8"); 

    $link = connect();
    
    $handler = array(
        'routes' => 'DropRoutes',
        'trains' => 'DropTrains',
        'passangers' => 'DropPassangers'
    );

    
    if(!isset($_GET['type']) || !array_key_exists($_GET['type'], $handler)) {
        $out = array('row_remove' => 0);
        echo json_encode($out);
        disconnect($link);
        exit;
    }

    echo json_encode(call_user_func($handler[$_GET['type']], $link,$_GET), JSON_UNESCAPED_UNICODE);
    
?>