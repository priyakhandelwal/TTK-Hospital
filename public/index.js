$(document).ready(function() {

    console.log("Hello");
    var callHistoryList = $("#callHistoryModal .callHistoryList tbody");
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
                  { "data": "id", "visible": false},
                  { "data": "person.name" },
                  { "data": "person.phone"},
                  { "data": "immediateFamily.name"},
                  { "data": "immediateFamily.phone"},
                  { "data": "entryDate", 
                    "render": function ( data, type, full, meta ) {
                      return (new Date(data));
                    }
                  },
                  { "data": "exitDate",
                    "render": function ( data, type, full, meta ) {
                      return (new Date(data));
                    }
                  },
                  { "data": "bucket"},
                  { "data": "failedContactCount"},
                  { "data": "languagePreference"},
                  {
                    "data": "",
                    "render": function ( data, type, full, meta ) {
                            return '<a class="btn btn-info btn-sm btn-call" href=#/' + full[0] + '>' + 'Calls' + '</a>';
                    }
                  },
                  { "data": "",
                    "render": function ( data, type, full, meta ) {
                            return '<a class="btn btn-info btn-sm btn-edit" href=#/' + full[0] + '>' + 'Edit' + '</a>';
                    }
                  }

              ],
              "iDisplayLength": 15,
            });
            $("#ttkdata .btn-call").on("click", function(event) {
                event.preventDefault();
                callHistoryList.empty();
                var tr = $(this).closest("tr");
                var patientData = dataTable.row(tr).data()
                var patientCalls = dataTable.row(tr).data().calls;
                var calls = patientCalls.map(function(call) {
                    return "<tr><td>" + (new Date(call.time)) + "</td><td>" + call.response + "</td></tr>";
                });
                console.log(calls);
                callHistoryList.append(calls.join());
                $('#phoneNumberPK').val(patientData.person.phone);
                $('#callHistoryModal').modal('toggle');
            });  
            $("#ttkdata .btn-edit").on("click", function(event) {
                event.preventDefault();
                alert("Edit");
            });
        }
    });
});
