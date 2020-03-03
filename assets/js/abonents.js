$(document).ready(function() {

    var mosturflot = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbc8ZlxPyRQrzalD3xT-4h2Y28bQRqLkDsvfRlZSqWZBpUhPAl7y2EkA1izfs78S5vIi-rMI_H_j70/pub?gid=0&single=true&output=csv";

    var mrpgroup = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRb3fmvItxj-9wzCviuCwIHBeJLxJzgHXcw3Z_pD46KA3Fa1Qt5flVHqJpoaj9fV-11QBQBSK7B_-iQ/pub?output=csv";

     var uport = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlt95bIV9DqQw037IkgLOgSc3z_-OxyXarwclj2rMncvAuiMnhr1_5Iq5D5gqiyDNjYDoFuR0QY1DV/pub?output=csv";

     var data = [];

    $.when(
        $.get(mosturflot),
        $.get(mrpgroup),
        $.get(uport),
    ).then(function(mtf, mrp, port) {
        //console.log(mtf, mrp, port);
        if(processData(mtf[0])){
            if(processData(mrp[0])){
                if(processData(port[0])){
                    InitDatatable();
                }
            }
        };

    });


    function processData(allText) {
        let all = allText.split(/\r\n|\n/);
        let row = '';
        for(let i=1;i<all.length;i++){
            row = all[i].split(',');
            let r = {
                localorder: row[0],
                name: row[1],
                cityphone: row[2],
                cellphone: row[3],
                officephone: row[4],
                fmc: row[5],
                speciality: row[6],
                department: row[7],
                room: row[8],
                company: row[9]
            };
            data.push(r);
            if(i === all.length - 1){
                return 1;
            }
        }
        return 0;

    }



    //var ajax_url = 'assets/data/all.json';
    var com = 'mrp';
    var companies = {
        mrp: "МРП",
        mosturflot: "Мостурфлот",
        uport: "Южный порт"
    };
    function InitDatatable() {
        var t = $('#personal').DataTable({
            dom: '<"right"B>T<"clear"><"top"i>rt',
            buttons: [
                'excel', 'print'
            ],
            data: data,
            /*"ajax": {
                "url": ajax_url,
                "dataSrc": function (json) {
                    return json;
                }
            },*/
            language: {
                processing: "Подождите...",
                search: "Поиск:",
                lengthMenu: "Показать _MENU_ записей",
                info: "Записи с _START_ до _END_ из _TOTAL_ записей",
                infoEmpty: "Записи с 0 до 0 из 0 записей",
                infoFiltered: "(отфильтровано из _MAX_ записей)",
                infoPostFix: "",
                loadingRecords: "Загрузка записей...",
                zeroRecords: "Записи отсутствуют.",
                emptyTable: "В таблице отсутствуют данные",
                paginate: {
                    first: "Первая",
                    previous: "Предыдущая",
                    next: "Следующая",
                    last: "Последняя"
                },
                aria: {
                    sortAscending: ": активировать для сортировки столбца по возрастанию",
                    sortDescending: ": активировать для сортировки столбца по убыванию"
                }
            },
            bDeferRender: true,
            bProcessing: true,
            responsive: true,
            iDisplayLength: -1,
            columns: [
                {"data": "localorder"},
                {"data": "name"},
                {"data": "cityphone", "class": "nowrap"},
                {"data": "cellphone", "class": "nowrap"},
                {"data": "officephone"},
                {"data": "fmc"},
                {"data": "speciality"},
                {"data": "department"},
                {"data": "room"},
                {"data": "company", "class": "nowrap"}
            ],
            "columnDefs": [
                {
                    //"targets": [ 0 ],
                    //"sortable": false,
                    //"searchable": false
                }
            ],
            "createdRow": function (row, data) {
                $.each(companies, function (k, v) {
                    if (k === data['company'])
                        $('td', row).eq(9).text(v);
                });
            },
            "initComplete": function () {
                this.api().columns(9).every(function () {
                    var column = this;
                    //console.log(get_ship);
                    if (com.length > 0) {
                        column.search(com).draw();
                    }
                });

            }
        });

        t.on('order.dt search.dt', function () {
            t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();

        $('#company').on('change', function () {
            t.columns(9).search(this.value).draw();
        });

        $('#qsearch').on('keyup', function () {
            t.columns(9).search('').draw();
            t.search(this.value).draw();
            //t.columns(1).search(this.value).draw();
            if (this.value.length < 3) {
                t.columns(9).search($('#company').val()).draw();
            }

        });
    }

} );
