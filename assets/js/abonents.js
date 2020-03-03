$(document).ready(function() {
    var ajax_url = 'assets/data/all.json';
    var com = 'mrp';
    var companies = {
        mrp: "МРП",
        mosturflot: "Мостурфлот",
        uport: "Южный порт"
    };
    var t = $('#personal').DataTable( {
        dom: '<"right"B>T<"clear"><"top"i>rt',
        buttons: [
            'excel', 'print'
        ],
        "ajax": {
            "url": ajax_url,
            "dataSrc": function ( json ) {
                return json;
            }
        },
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
            { "data": "localorder" },
            { "data": "name" },
            { "data": "cityphone", "class": "nowrap" },
            { "data": "cellphone", "class": "nowrap" },
            { "data": "officephone" },
            { "data": "fmc" },
            { "data": "speciality" },
            { "data": "department" },
            { "data": "room" },
            { "data": "company", "class": "nowrap" }
        ],
        "columnDefs": [
            {
                //"targets": [ 0 ],
                //"sortable": false,
                //"searchable": false
            }
        ],
        "createdRow": function ( row, data ) {
            $.each(companies, function(k,v){
                if(k===data['company'])
                    $('td', row).eq(9).text(v);
            });
        },
        "initComplete": function () {
            this.api().columns(9).every( function () {
                var column = this;
                //console.log(get_ship);
                if (com.length > 0) {
                    column.search( com ).draw();
                }
            });

        }
    } );

    t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    $('#company').on('change', function(){
        t.columns(9).search(this.value).draw();
    });

    $('#qsearch').on('keyup', function()
    {
        t.columns(9).search('').draw();
        t.search(this.value).draw();
        //t.columns(1).search(this.value).draw();
        if(this.value.length < 3){
            t.columns(9).search($('#company').val()).draw();
        }

    } );

} );
