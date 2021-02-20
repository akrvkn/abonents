$(document).ready(function() {
//https://docs.google.com/spreadsheets/d/1VdlOTyBsSf8Qcr3TIc6x34rORbNQ7n2QcCNRe3zHg6c/gviz/tq?tqx=out:csv&sheet=Лист1

    /*const mosturflot = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSsgrZpP0_yy6vq6Bwsi8WthGTP93KBxayTeJiKw_cpsmHFJIcxmkO8sV4GsS_wbBWaiYRIDk4HraOc/pub?output=csv";

    const mrpgroup = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRb3fmvItxj-9wzCviuCwIHBeJLxJzgHXcw3Z_pD46KA3Fa1Qt5flVHqJpoaj9fV-11QBQBSK7B_-iQ/pub?output=csv";

    const uport = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlt95bIV9DqQw037IkgLOgSc3z_-OxyXarwclj2rMncvAuiMnhr1_5Iq5D5gqiyDNjYDoFuR0QY1DV/pub?output=csv";

    const piter = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLnWPibdy-uspaH86Qi98w1LkjknTgxpiSSB59bZt8LALNWLN3KQF05IKjjWnY-udhgH1BeaP-1pNF/pub?output=csv";*/
    const mosturflot = "https://docs.google.com/spreadsheets/d/1kIJe3PmiSKcYqr7LHpjn1PG0dInPOmYhx7Cd3r51kRo/gviz/tq?tqx=out:csv";

    const mrpgroup = "https://docs.google.com/spreadsheets/d/1hwO3ZA90ZW2cU_SVjmrYQondBhjPglTzj8HdNGAsPvA/gviz/tq?tqx=out:csv";

    //const uport = "https://docs.google.com/spreadsheets/d/1ZNh79fXk5-UEZ4YLTZLwbcPUi-6kUG88BYZk4GcABIA/gviz/tq?tqx=out:csv";

    const piter = "https://docs.google.com/spreadsheets/d/1nYYm-NsofUFZmpLODo3bNepmvnqgir51M5_v5HLNgUg/gviz/tq?tqx=out:csv";
    //https://docs.google.com/spreadsheets/d/1o6XojdICFDHYqu3IG2WuFQ3ocFsQ2iqN-F__Rcvsl_I/edit?usp=sharing
    const offices = "https://docs.google.com/spreadsheets/d/1o6XojdICFDHYqu3IG2WuFQ3ocFsQ2iqN-F__Rcvsl_I/gviz/tq?tqx=out:csv";

    //https://docs.google.com/spreadsheets/d/19l50oWpYZIhaBuxxf0CWOhum_6QatxPIAYhPRcACLQ4/edit?usp=sharing
    const ships = "https://docs.google.com/spreadsheets/d/19l50oWpYZIhaBuxxf0CWOhum_6QatxPIAYhPRcACLQ4/gviz/tq?tqx=out:csv";




    /*const mosturflot = "assets/data/mosturflot.csv";

    const mrpgroup = "assets/data/mrp.csv";

    const uport = "assets/data/uport.csv";

    const piter = "assets/data/piter.csv";*/

    const data = [];

    $.when(
        $.get(mosturflot),
        $.get(mrpgroup),
        $.get(offices),
        $.get(piter),
        $.get(ships),
    ).then(function(mtf, mrp, off, pit, shp) {
        if(processData(mtf[0], 'mosturflot')){
            if(processData(mrp[0], 'mrp')){
                if(processData(off[0], 'offices')) {
                    if(processData(pit[0], 'piter')) {
                        if(processData(shp[0], 'ships')) {
                            InitDatatable();
                        }
                    }
                }
            }
        }

    });



    function processData(allText, com) {
        let all = allText.split(/\r\n|\n/);
        let row = '';
        for(let i=1;i<all.length;i++){
            row = all[i].split(',');
            let r = {
                localorder: i,
                name: row[0].replace(/"/g, ''),
                cityphone: row[1].replace(/"/g, ''),
                cellphone: row[2].replace(/"/g, ''),
                officephone: row[3].replace(/"/g, ''),
                fmc: row[4].replace(/"/g, ''),
                speciality: row[5].replace(/"/g, ''),
                department: row[6].replace(/"/g, ''),
                room: row[7].replace(/"/g, ''),
                company: com
            };
            data.push(r);
            if(i === all.length - 1){
                return 1;
            }
        }
        return 0;

    }

    let com = 'mrp';
    const companies = {
        mrp: "Ривер Сити",
        mosturflot: "ХМСЗ",
        offices: "Офисы продаж",
        piter: "Офис Питер",
        ships: "Теплоходы"
    };
    function InitDatatable() {
        const t = $('#personal').DataTable({
            dom: '<"right"B>T<"clear"><"top"i>rt',
            buttons: [
                'excel', 'print'
            ],
            data: data,
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
            "createdRow": function (row, data) {
                $.each(companies, function (k, v) {
                    if (k === data['company'])
                        $('td', row).eq(9).text(v);
                });
            },
            "initComplete": function () {
                this.api().columns(9).every(function () {
                    let column = this;
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
            if (this.value.length < 3) {
                t.columns(9).search($('#company').val()).draw();
            }

        });
    }

} );
