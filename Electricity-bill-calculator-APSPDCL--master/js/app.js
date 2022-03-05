function bill_cal() {
    var tariff = {
        0: [1, 20, 20, 6.00],
        1: [21, 30, 30, 7.00],
        2: [31, 50, 50, 8.5],
        3: [51, 150, 150, 10.00],
        4: [151, 250, 250, 11.00],
        5: [251, 400, 400, 12.00],
        6: [401, 10000000000000000, 10000000000000000, 13.00]
    };
    var result = [];
    var unit = parseFloat($("#unit").val());
    if (unit > 0) {
        $("#display-table").show();
    } else {
        $("#display-table").hide();
    }
    var i = (unit > 50) ? 1 : 0;
    var loop = true;
    var diff = 0;
    var total = 0;
    $("#display-range").html("");
    $("#display-total").html("");

    while (tariff[i][2] < unit) {
        diff = tariff[i][1] - tariff[i][0] + 1;
        unit = unit - diff;
        result[i] = [diff, tariff[i][3], (diff * tariff[i][3]).toFixed(2)];
        to = (tariff[i][1] == 10000000000000000) ? '&infin;' : tariff[i][1];
        $("#display-range").append("<tr><td>" + tariff[i][0] + "-" + to + "</td><td>" + result[i][1] + "</td><td>" + result[i][0] + "</td><td>" + result[i][2] + "</td></tr>");
        total = parseFloat(total) + parseFloat(result[i][2]);
        i++;
    }
    if (unit > 0) {
        diff = tariff[i][1] - tariff[i][0] + 1;
        diff = (unit >= tariff[i][1]) ? unit - diff : unit;
        result[i] = [diff, tariff[i][3], (diff * tariff[i][3]).toFixed(2)];
        to = (tariff[i][1] == 10000000000000000) ? '&infin;' : tariff[i][1];
        $("#display-range").append("<tr><td>" + tariff[i][0] + "-" + to + "</td><td>" + result[i][1] + "</td><td>" + result[i][0] + "</td><td>" + result[i][2] + "</td></tr>");
        total = parseFloat(total) + parseFloat(result[i][2]);
    }
    
    gtotal = parseFloat(total);
    gtotal = gtotal.toFixed(2);
    $("#display-total").append("<tr><td></td><td></td><td>Bill</td><td>" + total + "</td></tr>");
    $("#display-total").append("<tr><td></td><td></td><td>VAT</td><td>" + vat + "</td></tr>");
    $("#display-total").append("<tr><td></td><td></td><td>G. Total</td><td>" + gtotal + "</td></tr>");
}
$("#unit").on('keyup keydown change', bill_cal);