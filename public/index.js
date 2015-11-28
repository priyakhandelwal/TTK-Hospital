$(document).ready(function() {

    console.log("Hello");
    $.ajax({
        url: "/fetchAllData",
        //force to handle it as text
        dataType: "text",
        success: function(data) {
            if(JSON.parse(data)["success"] == false && JSON.parse(data)["msg"] == "Authentication Required"){
                location.href = "/login.html";
            }
            var data = JSON.parse(data);
            var dataTable;
            console.log(data);
            dataTable = $("#ttkdata").DataTable({
              "data": data,
              "order": [],
              "columns": [
                  {
                    "className": "call-history-icon",
                    "data": null,
                    "orderable": false,
                    "defaultContent": ""
                  }
                  { "data": "person.name" },
                  { "data": "person.phone"},
                  { "data": "immediateFamily.name"},
                  { "data": "immediateFamily.phone"},
                  { "data": "entryDate"},
                  { "data": "exitDate"},
                  { "data": "bucket"},
                  { "data": "failedContactCount"},
                  { "data": "languagePreference"},
                  {
                    "data": "",
                    "render": function ( data, type, full, meta ) {
                            return '<a class="btn btn-info btn-sm" href=#/' + full[0] + '>' + 'Calls' + '</a>';
                    }
                  },
                  { "data": "",
                    "render": function ( data, type, full, meta ) {
                            return '<a class="btn btn-info btn-sm" href=#/' + full[0] + '>' + 'Edit' + '</a>';
                    }
                  }

              ],
              "iDisplayLength": 15,
            });
        }
    });   
});
