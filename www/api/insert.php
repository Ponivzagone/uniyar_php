<?php

    function AddRoutes($link,$row) {
        $res  = $link->query("SELECT VALUE(MAX(id),0) as id FROM ROUTELIST");
        $stmt = $link->prepare("INSERT INTO ROUTELIST(id,name) VALUES(?,?)");
        if($res) {
            $r = $res->fetch_assoc();
            $stmt->bind_param("is",$id,$name);
            $id    = $r['id'] + 1;
            $name  = $row['name'];
            $stmt->execute();
        }
        $out = array('row_ins' => $stmt->affected_rows);
        $stmt->close();
        return $out;
    }

    function AddTrains($link,$row) {
        //TODO: Проверку на сформированный поезд и диапазон
        $stmt  = $link->prepare("INSERT INTO TRAINLIST(NUM,TYPE,CAR_NUMBER,CAR_TYPE,BEGIN,END,ID_ROUTE) VALUES(?,?,?,?,?,?,?)");
        $stmt->bind_param("isisssi", $train_num,$type,$car_num,$car_type,$beg,$end,$id_route);
        $train_num      = intval($row['train_num']);
        $type           = $row['train_type'];
        $car_num        = intval($row['car_num']);
        $car_type       = $row['car_type'];
        $beg            = $row['beg'];
        $end            = $row['end'];
        $id_route       = intval($row['id_route']);
        $stmt->execute();
        $out = array('row_ins' => $stmt->affected_rows);
        $stmt->close();
        return $out;
    }

    function AddPassangers($link, $row) {
        //TODO: Проверку на вместимость поезда
        $stmt  = $link->prepare("INSERT INTO PASSANGERS(TRAIN_NUM,FIRST,LAST,GENDER,PASS_SERIES,PASS_NUM) VALEUS(?,?,?,?,?,?)");
        $stmt->bind_param("issii", $num,$first,$last,$gen,$p_ser,$p_num);
        $num    = intval($row['train_num']);
        $first  = $row['first'];
        $last   = $row['last'];
        $p_ser  = intval($row['pass_series']);
        $p_num  = intval($row['pass_num']);
        $gen    = intval($row['gender']);
        $stmt->execute();
        $out = array('row_ins' => $stmt->affected_rows);
        $stmt->close();
        return $out;
    }


    require_once("../lib/module_global.php");
    header("content-type: text/html; charset=UTF-8"); 

    $link = connect();
    
    $handler = array(
        'routes' => 'AddRoutes',
        'trains' => 'AddTrains',
        'passangers' => 'AddPassangers'
    );
    
    if(!isset($_GET['type']) || !array_key_exists($_GET['type'], $handler)) {
        $out = array('row_ins' => 0);
        echo json_encode($out);
        disconnect($link);
        exit;
    }

    echo json_encode(call_user_func($handler[$_GET['type']], $link,$_GET), JSON_UNESCAPED_UNICODE);
    
?>