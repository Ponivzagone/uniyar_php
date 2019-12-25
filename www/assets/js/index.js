PrvRequest = "";

function TrainsHandleInsert() {
    (function(){
        $('#modal-content').html(
            '<div class="container-fluid">\
                <div class="row">\
                    <div class="col-sm-6" id="ins_Route">\
                    <div class="form-group">\
                        <label for="exampleFormControlSelect1">Маршрут</label>\
                        <select class="form-control" id="RouteInsert">\
                        </select>\
                    </div>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-sm-6" id="ins_NumTrain">\
                        <div class="form-group">\
                            <div class="input-group">\
                                <span class="input-group-addon" id="basic-addon1">№</span>\
                                <input type="number" class="form-control" placeholder="Номер поезда" aria-describedby="basic-addon1">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-sm-6" id="ins_TypeTrain">\
                        <div class="form-group">\
                            <div class="input-group">\
                                <span class="input-group-addon" id="basic-addon2">@</span>\
                                <input type="text" class="form-control" placeholder="Тип поезда" aria-describedby="basic-addon2">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-sm-6" id="ins_NumCar">\
                        <div class="form-group">\
                            <div class="input-group">\
                                <span class="input-group-addon" id="basic-addon1">№</span>\
                                <input type="number" class="form-control" placeholder="Кол-во вагонов" aria-describedby="basic-addon1">\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-sm-6" id="ins_TypeCar">\
                        <div class="form-group">\
                            <div class="input-group">\
                                <span class="input-group-addon" id="basic-addon2">@</span>\
                                <input type="text" class="form-control" placeholder="Тип вагонов" aria-describedby="basic-addon2">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <div class="row">\
                    <div class="col-sm-6">\
                        <div class="form-group">\
                            <div class="input-group">\
                            <span class="input-group-addon">Дата начала</span>\
                            <input type="text" class="form-control" value="" id="ins_DateBeg">\
                            </div>\
                        </div>  \
                    </div>\
                    <div class="col-sm-6">\
                        <div class="form-group">\
                            <div class="input-group">\
                            <span class="input-group-addon">Дата конца</span>\
                            <input type="text" class="form-control" value="" id="ins_DateEnd">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>');
    })();

    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/get.php?type=routes');
    xhr.send();

    xhr.onload = function() {
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.response); 
            $('#ins_Route select').html(response.data.reduce(function(accum, cur) {
                return accum + '<option value="' + cur.id +'">' + 
                      cur.name  +
                    '</option>';
              }, ""));
        }
    };

    (function(){
        var checkin = $('#ins_DateBeg').datepicker({
            format: 'yyyy-mm-dd',
            getName: 'Дата начала',
            getParameter: 'PDATE_BEG'
        }).on('changeDate', function (ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date)
                newDate.setDate(newDate.getDate() + 1);
                checkout.setValue(newDate);
            } else { checkout.setValue(checkout.date); }
            checkin.hide();
            $('#ins_DateEnd')[0].focus();
        }).data('datepicker');

        var checkout = $('#ins_DateEnd').datepicker({
            onRender: function (date) {
                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            },
            format: 'yyyy-mm-dd',
            getName: "Дата конца",
            getParameter: 'PDATE_END'
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');
        $('.datepicker.dropdown-menu').css('z-index', 1051);
    })();

    $('#AcceptInsert').off('click');
    $('#AcceptInsert').on('click', function() {

        var req = (function(){
            return 'id_route=' + $( "#RouteInsert option:selected" ).val() + '&' +
                   'train_num=' + $( "#ins_NumTrain input" ).val() + '&' +
                   'train_type=' + $( "#ins_TypeTrain input" ).val() + '&' +
                   'car_num=' + $( "#ins_NumCar input" ).val() + '&' +
                   'car_type=' + $( "#ins_TypeCar input" ).val() + '&' +
                   'beg=' + $( "#ins_DateBeg" ).val() + '&' +
                   'end=' + $( "#ins_DateEnd" ).val();
        })();
        console.log(req);
        xhr.open('GET', '/api/insert.php?type=trains&' + req);
        xhr.send();

        xhr.onload = function() {
            if (xhr.status == 200) {
                let response = JSON.parse(xhr.response); 
                if(parseInt(response.row_ins) > 0) {
                    RefreshTable(PrvRequest);
                }
            }
        };
    });

}

function TrainsHandleRemove(tr,td,row) {    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/remove.php?type=trains&train_num=' + row.data().NUM);
    xhr.send();

    xhr.onload = function() {
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.response); 
                if(parseInt(response.row_remove) > 0) {
                    RefreshTable(PrvRequest);
                }
        }
    };
}

function TrainsHandleUpdate(action,tr,td,row) {
    switch(action)
    {
        case "setEv": 
            console.log("setEv");
            $(tr).on('click', 'td', function () {
                if($(this).hasClass("change") || $(this).hasClass("not-change")) { return; }
                $(this).addClass("change");
                $(this).html('<input type="text" value=' + this.innerText +'>');
            });

        break;
        case "unsetEv":
            console.log("unsetEv");
            $(tr).off('click', 'td');
            $(tr).children('td.change').removeClass('change');
        break;
        case "update":
            console.log("update");
            console.log(row.data());
        break;
    }
}



var Handle = {
    routes: {
        insert: TrainsHandleInsert,
        remove: TrainsHandleRemove,
        update: TrainsHandleUpdate
    },
    trains: {
        insert: TrainsHandleInsert,
        remove: TrainsHandleRemove,
        update: TrainsHandleUpdate
    },
    passangers: {
        insert: TrainsHandleInsert,
        remove: TrainsHandleRemove,
        update: TrainsHandleUpdate
    }
};


function RefreshTable(request) {
    
    PrvRequest = request;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/get.php?type=' + request,false);
    try {
        xhr.send();

        if (xhr.status != 200) {
          alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } 
        
    } catch(err) {
        alert("Запрос не удался");
    }
    let response = JSON.parse(xhr.response); 
    response.columns.push({
        "className": 'update glyphicon glyphicon-pencil not-change',
        "orderable": false,
        "data": null,
        "defaultContent": ''
    });
    response.columns.push({
        "className": 'remove glyphicon glyphicon-remove not-change',
        "orderable": false,
        "data": null,
        "defaultContent": ''
    });


    if ($.fn.DataTable.isDataTable("#report")) {
        $('#report').off('click', 'td.remove.glyphicon');
        $('#report').off('click', 'td.update.glyphicon');
        $('#report').DataTable().clear().destroy();
    }

    var self = $('#report').DataTable({

        "language": {
            "zeroRecords": " Нет данных",
            "search": "Поиск по таблице :",
            "loadingRecords": "Загрузка...",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Отображено с _START_ по _END_ из _TOTAL_ записей",
            "infoEmpty": "Отображено с 0 по 0 из 0 записей",
            "paginate": {
                "first": "Первый",
                "last": "Последний",
                "next": "Следующий",
                "previous": "Предыдущий"
            }
        },
        "pagingType": "input",

        "dom": "<'row spasing'<'col-sm-12 col-md-6'B>><'row spasing'<'col-sm-6'l><'col-sm-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-4'i><'col-sm-8'p>>",
        "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
        "data": response.data,

        "columns": response.columns,
        "order": [[0, 'asc']],

        "deferRender": true,
        "buttons": [
            'copy',
            {
                extend: 'excel',
                title: 'Поезда',
                customize: function (xlsx) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                    $('row c', sheet).each(function () {
                        // Get the value
                        $(this).attr('s', '25');
                    });

                }
            },
            {
                "extend": "colvis",
                "text": "Видимые столбцы"
            },
            {
                text: 'Добавить запись',
                attr: {
                    id: 'insert'
                },
                action: function ( e, dt, node, config ) {
                    Handle[PrvRequest].insert();
                    $("#InsertModal").modal('show');
                }

            }
        ]
    });

    $('#report').on('click', 'td.remove.glyphicon', function () {
        var tr = $(this).closest('tr');
        var td = $(this).closest('td.remove.glyphicon');
        var row = self.row(tr);
        Handle[PrvRequest].remove(tr,td,row);
    });


    $('#report').on('click', 'td.update.glyphicon', function () {
        var tr = $(this).closest('tr');
        var td = $(this).closest('td.update.glyphicon');
        var row = self.row(tr);

        if(td.hasClass('glyphicon-pencil'))
        {
            let $ok = self.$('td.update.glyphicon.glyphicon-ok');
            $ok.removeClass('glyphicon-ok');
            $ok.addClass('glyphicon-pencil');
            if($ok.length != 0) {
                let trOk = $ok.closest('tr');
                let idx = self.row(trOk).index();
                Handle[PrvRequest].update("unsetEv",trOk,null,null);
                self.row(idx).invalidate('data').draw(false);
            }
            
            Handle[PrvRequest].update("setEv",tr,null,row);
            td.removeClass('glyphicon-pencil');
            td.addClass('glyphicon-ok');
        } else 
        {
            Handle[PrvRequest].update("unsetEv",tr,null,null);
            td.removeClass('glyphicon-ok');
            td.addClass('glyphicon-pencil');
            Handle[PrvRequest].update("update",tr,null,row);
        }

       
    });

}


$(document).ready(function () {
    RefreshTable('trains');
});