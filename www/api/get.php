<?php
    function FormatResponse($res)
    {
        $out = array(
            'columns' => array(),
            'data' => array() );
        if($res) {
            while ($row = $res->fetch_assoc()) {
                array_push($out['data'],$row);
            }
        }
        return $out;
    }

    function GetRoutes($link,$row) {
        $res = $link->query("SELECT id,name FROM ROUTELIST ORDER BY id ASC");
        $out = FormatResponse($res);
        array_push($out['columns'], array('title'=> "Идентификатор", 'data'=> "id"));
        array_push($out['columns'], array('title'=> "Маршрут", 'data'=> "name"));
        return $out;
    }

    function GetTrains($link,$row) {
        $res = $link->query("SELECT NUM,TYPE,CAR_NUMBER,CAR_TYPE,BEGIN,END,ID_ROUTE,NAME AS ROUTE_NAME FROM TRAINLIST INNER JOIN ROUTELIST ON ID = ID_ROUTE");
        $out = FormatResponse($res);
        array_push($out['columns'], array('title'=> "Номер поезда", 'data'=> "NUM"));
        array_push($out['columns'], array('title'=> "Тип поезда", 'data'=> "TYPE"));
        array_push($out['columns'], array('title'=> "Колличество вагонов", 'data'=> "CAR_NUMBER"));
        array_push($out['columns'], array('title'=> "Тип вагонов", 'data'=> "CAR_TYPE"));
        array_push($out['columns'], array('title'=> "Сформирован", 'data'=> "BEGIN"));
        array_push($out['columns'], array('title'=> "Расформирование", 'data'=> "END"));
        array_push($out['columns'], array('title'=> "Идентификатор маршрута", 'data'=> "ID_ROUTE"));
        array_push($out['columns'], array('title'=> "Название маршрута", 'data'=> "ROUTE_NAME"));
        return $out;
    }

    function GetPassangers($link,$row) {
        $num = 0;
        if(isset($_GET['train_num'])) { $num = $_GET['train_num']; }
        $res = $link->bind_param("SELECT TRAIN_NUM,FIRST,LAST,GENDER,PASS_SERIES,PASS_NUM,ID FROM PASSENGERS WHERE TRAIN_NUM = ? OR ? = 0");
        $stmt->bind_param("ii", $num,$num);
        $stmt->execute();
        $stmt->close();
        $out = FormatResponse($res);
        array_push($out['columns'], array('title'=> "Номер поезда", 'data'=> "TRAIN_NUM"));
        array_push($out['columns'], array('title'=> "Имя", 'data'=> "FIRST"));
        array_push($out['columns'], array('title'=> "Фамилия", 'data'=> "LAST"));
        array_push($out['columns'], array('title'=> "Пол", 'data'=> "GENDER"));
        array_push($out['columns'], array('title'=> "Серия паспорта", 'data'=> "PASS_SERIES"));
        array_push($out['columns'], array('title'=> "Номер паспорта", 'data'=> "PASS_NUM"));
        array_push($out['columns'], array('title'=> "Идентификатор", 'data'=> "ID"));
        return $out;
    }


    require_once("../lib/module_global.php");
    header("content-type: text/html; charset=UTF-8"); 

    $link = connect();
    
    $handler = array(
        'routes' => 'GetRoutes',
        'trains' => 'GetTrains',
        'passangers' => 'GetPassangers'
    );

    
    if(!isset($_GET['type']) || !array_key_exists($_GET['type'], $handler)) {
        $out = array(
            'columns' => array(),
            'data' => array(),
            'error' => "request is bad!"
        );
        echo json_encode($out);
        disconnect($link);
        exit;
    }

    echo json_encode(call_user_func($handler[$_GET['type']], $link,$_GET), JSON_UNESCAPED_UNICODE);
    
?>