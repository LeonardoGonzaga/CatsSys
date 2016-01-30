/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['moment', 'masks', 'datetimepicker', 'datatable'], function (moment, masks) {
    var index = (function () {
// your module code goes here
// var config = null;

        /**
         * 
         * private functions
         */

        initDatepickers = function () {
            $("input[name=timestamp]").closest(".input-group").datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
                minDate: moment(),
                useCurrent: false,
                maxDate: moment().add(1, 'years'),
                locale: 'pt-br',
                viewDate: moment()
            });
        };
        initDataTable = function () {

            var recruitmentTable = $('#recruitment-table').DataTable({
                iDisplayLength: 10,
                dom: 'lftip',
//                paging: false,
                ajax: {
                    url: "/recruitment/registration/getRegistrations",
                    type: "POST",
                    data: function () {
                        return {
                            recruitment: $("select[name=recruitment]").val(),
                            registrationStatus: $("select[name=registrationStatus]").val()
                        };
                    },
                    dataSrc: function (data) {
                        var result = [];
                        for (var i = 0; i < data.length; i++) {
                            result.push({
                                DT_RowClass: "cats-row",
                                DT_RowAttr: {
                                    "data-id": data[i].registrationId
                                },
                                0: data[i].registrationNumber,
                                1: data[i].registrationDate,
                                2: data[i].personName,
                                3: data[i].personCpf,
                                4: data[i].personRg,
                                5: data[i].personEmail,
                                6: data[i].status.type + '<br>' + data[i].status.timestamp
                            });
                        }

                        return result;
                    }
                },
                columnDefs: [{targets: 6, className: 'text-center'}]
            });
            $('button[name=submit]').click(function () {
                recruitmentTable.ajax.reload();
            });
        };
        initMasks = function () {
            masks.bind({
                datetimeNoSeconds: 'input[name=timestamp]'
            });
        };
        return {
            init: function () {
                initDatepickers();
                initDataTable();
                initMasks();
            },
            getDataOf: function (action) {

                if (action === "fn-enroll" || action === "fn-unenroll") {
                    return {
                        studentClass: $("select[name=studentClasses]").val()
                    };
                }
                return {
                    timestamp: $('input[name=timestamp]').val()
                };
            }
        };
    }());
    return index;
});