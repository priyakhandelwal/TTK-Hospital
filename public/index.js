$(document).ready(function() {
    $('.ttkdata').DataTable({
    	"ajax": "/apicallforread",
    	"columns": [
            { "data": "name" },
            { "data": "number" },
            { "data": "address" },
            { "data": "relative" },
            { "data": "lastcall" },
        ]
    });
});