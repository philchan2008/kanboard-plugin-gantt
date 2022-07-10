KB.on('dom.ready', function () {
    function goToLink (selector) {
        if (! KB.modal.isOpen()) {
            var element = KB.find(selector);

            if (element !== null) {
                window.location = element.attr('href');
            }
        }
    }

    KB.onKey('v+g', function () {
        goToLink('a.view-gantt');
    });

    if (KB.exists('#gantt-chart')) {
        var chart = new Gantt();
        chart.show();

        //KB.tooltip();
    }

});

$(function() {
    var isDragging = false;
    var offsetX = 0;
    var offsetLeft = 0;
    $("div.ganttview-slide-container")
    .mousedown(function(e) {
        isDragging = true;
        offsetX = e.pageX; 
        offsetLeft = $("div.ganttview-slide-container").scrollLeft();
    })
    .mousemove(function(e) {
        if (isDragging) {
            $("div.ganttview-slide-container").scrollLeft(offsetLeft + (e.pageX - offsetX)*-1);
        }
     })
    .mouseup(function(e) {
        var wasDragging = isDragging;
        isDragging = false;
    });
    $("div.ganttview-block").mousemove(function(e) { isDragging = false; });
    $("div.ganttview-vtheader-item").mousemove(function(e) { isDragging = false; });
    $("div.ganttview-vtheader-item").mousemove(function(e) { isDragging = false; });
});
