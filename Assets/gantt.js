
KB.on('dom.ready', function () {

    var chart; //chart instance

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
        chart = new Gantt();
        
        $("#zoomFactorW").val(chart.sysopts.zoomFactorW*1000);
        $("#zoomFactorH").val(chart.sysopts.zoomFactorH*1000);
        $("#zoomFactorMonthW").val(chart.sysopts.zoomFactorMonthW*1000);
        
        chart.show();
        //KB.tooltip();
    }

    var isDragging = false;
    var offsetX = 0;
    var offsetLeft = 0;
    var offsetY = 0;
    var offsetTop = 0;
    $("div.ganttview-slide-container")
        .dblclick(function(e) {
            isDragging = true;
            offsetX = e.pageX; 
            offsetLeft = $("div.ganttview-slide-container").scrollLeft();
            offsetY = e.pageY;
            offsetTop = $(document).scrollTop();
        })
        .mousedown(function(e) {
            isDragging = true;
            offsetX = e.pageX; 
            offsetLeft = $("div.ganttview-slide-container").scrollLeft();
            offsetY = e.pageY;
            offsetTop = $(document).scrollTop();
        })
        .mousemove(function(e) {
            if (isDragging) {
                $("div.ganttview-slide-container").scrollLeft(offsetLeft + (e.pageX - offsetX)*-1);
                $(document).scrollTop(offsetTop + (e.pageY - offsetY)*-1);
                e.preventDefault();
            }
        })
        .mouseup(function(e) {
            var wasDragging = isDragging;
            isDragging = false;
        });
    $("div.ganttview-block").mousemove(function(e) { isDragging = false; });
    $("div.ganttview-vtheader-item").mousemove(function(e) { isDragging = false; });
    $("div.ganttview-vtheader-item").mousemove(function(e) { isDragging = false; });

    $('#zoomFactorW')
        .change( function(e) {
            var zoomFactorW;
            zoomFactorW = $('#zoomFactorW').val()*0.001;  
            console.log("zoomFactorW: "+zoomFactorW); 
            $(".ganttview-grid-row-cell").css("width", chart.options.cellWidth * zoomFactorW +"px");
            $(".ganttview-hzheader-day").css("width", chart.options.cellWidth * zoomFactorW +"px");
            //$(".ganttview-hzheader-month").css("width", chart.options.cellWidth / chart.options.zoomFactorMonthW * zoomFactorW +"px");
            // $('.ganttview-hzheader-month').each(function() {
            //     $(this).css("width","0px");
            // });
        });

    $('#zoomFactorH')
        .change( function(e) {
            var zoomFactorH;
            zoomFactorH = $('#zoomFactorH').val()*0.001; 
            console.log("zoomFactorH: "+zoomFactorH);
            $(".ganttview-grid-row-cell").css("height", chart.options.cellHeight * zoomFactorH +"px");
        });

    $('#ganttTaskTitleWidth')
        .change( function(e) {
            var ganttTaskTitleWidth;
            ganttTaskTitleWidth = $('#ganttTaskTitleWidth').val(); 
            console.log("ganttTaskTitleWidth: "+ganttTaskTitleWidth);
            $(".ganttview-vtheader-series-name").css("width", ganttTaskTitleWidth +"px");
        });

    // $('#zoomFactorMonthW')
    //     .change( function(e) {
    //         var zoomFactorMonthW;
    //         zoomFactorMonthW = $('#zoomFactorMonthW').val()*0.001;   
    //         $('.ganttview-hzheader-month').each(function() {
    //             //console.log($(this).width());
    //             //$(this).css("width", $(this).width()/lstMthFactor*zoomFactorMonthW "0px");
    //         });
    //     });   

    // $('#button-print').click(function(){
    //     html2canvas($('#grantview'), 
    //     {
    //       onrendered: function (canvas) {
    //         var a = document.createElement('a');
    //         // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
    //         a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    //         a.download = 'image.jpg';
    //         a.click();
    //       }
    //     });
    // });    
});

