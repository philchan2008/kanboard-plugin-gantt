// Based on jQuery.ganttView v.0.8.8 Copyright (c) 2010 JC Grubbs - jc.grubbs@devmynd.com - MIT License
var Gantt = function() {
    this.data = [];
    this.properties = {
        zoomScale: !!navigator.userAgent.match(/firefox/i)?window.devicePixelRatio*0.8:(( window.outerWidth-1) / window.innerWidth)        
    };
    this.options = {
        container: "#gantt-chart",
        showWeekends: true,
        showToday: true,
        allowMoves: true,
        allowResizes: true,
        cellWidth: 21,
        cellHeight: 31,
        slideWidth: 10000,
        vHeaderWidth: 200,
        calendarBufferDays: 180,
    };
    this.sysopts = {
        //Grid Cell Width 
        zoomFactorW: navigator.userAgent.match(/firefox/i) ? (this.properties.zoomScale <= 0.321 ? 0.88 : this.properties.zoomScale <= 0.401 ? 0.908 : this.properties.zoomScale <= 0.481 ? 0.922: this.properties.zoomScale <= 0.50 ? 0.925 : this.properties.zoomScale <= 0.56 ? 0.9315 : this.properties.zoomScale <= 0.601 ? 0.9375 : this.properties.zoomScale <= 0.65 ? 0.9415 : this.properties.zoomScale <= 0.671 ? 0.943 : this.properties.zoomScale <= 0.72 ? 0.947 : this.properties.zoomScale <= 0.8 ? 0.952 : this.properties.zoomScale <= 0.911 ? 0.9580 : this.properties.zoomScale <= 0.95 ? 0.956 : this.properties.zoomScale >= 2.18 ? 0.965: this.properties.zoomScale >= 1.77 ? 0.958 : this.properties.zoomScale >= 1.65 ? 0.955 : this.properties.zoomScale >= 1.59 ? 0.954 : this.properties.zoomScale >= 1.49 ? 0.975 : this.properties.zoomScale >= 1.45 ? 0.973 : this.properties.zoomScale >= 1.37 ? 0.9725 : this.properties.zoomScale >= 1.26 ? 0.97 : this.properties.zoomScale >= 1.2 ? 0.97 : this.properties.zoomScale >= 1.11 ? 0.965 :0.962) : (this.properties.zoomScale <= 0.4 ? 0.952 : this.properties.zoomScale <= 0.5 ? 0.905 : this.properties.zoomScale <= 0.56 ? 0.9315 : this.properties.zoomScale <= 0.671 ? 0.929 : this.properties.zoomScale <= 0.751 ? 0.937 : this.properties.zoomScale <= 0.81 ? 0.94121 : this.properties.zoomScale <= 0.86 ? 0.9525 : this.properties.zoomScale <= 0.91 ? 0.9475 : 0.9526),
        //Grid Cell Height
        zoomFactorH: navigator.userAgent.match(/firefox/i) ? (this.properties.zoomScale <= 0.321 ? 0.952: this.properties.zoomScale <= 0.48 ? 0.978: this.properties.zoomScale <= 0.56 ? 0.985 : this.properties.zoomScale <= 0.601 ? 0.989 : this.properties.zoomScale <= 0.641 ? 0.993 : this.properties.zoomScale <= 0.725 ? 0.995 : this.properties.zoomScale <= 0.80 ? 1.0002 : this.properties.zoomScale <= 0.911 ? 1.004 : this.properties.zoomScale >= 2.18 ? 1.01 : this.properties.zoomScale >= 1.77 ? 1.002 : this.properties.zoomScale >= 1.65 ? 1.0015 : this.properties.zoomScale >= 1.59 ? 1.00 : this.properties.zoomScale >= 1.49 ? 1.015 :  this.properties.zoomScale >= 1.45 ? 1.015 : this.properties.zoomScale >= 1.37 ? 1.0125 : this.properties.zoomScale >= 1.26 ? 1.012 : this.properties.zoomScale >= 1.2 ? 1.012 : this.properties.zoomScale >= 1.11 ? 1.01 :1.0065) : (this.properties.zoomScale <= 0.40 ? 1 : this.properties.zoomScale <= 0.50 ? 0.968 : this.properties.zoomScale <= 0.671 ? 0.983 : this.properties.zoomScale <= 0.751 ? 0.9895 : this.properties.zoomScale <= 0.81 ? 0.9915: this.properties.zoomScale <= 0.91 ? 0.9963: 1),
        //Month Header Width
        zoomFactorMonthW: navigator.userAgent.match(/firefox/i) ? (this.properties.zoomScale <= 0.321 ? 0.997 : this.properties.zoomScale <= 0.4 ? 0.9999 : this.properties.zoomScale <= 0.49 ? 1.0002 : this.properties.zoomScale <= 0.57 ? 0.99945 : this.properties.zoomScale <= 0.65 ? 1.0004 : this.properties.zoomScale <= 0.671 ? 0.9997 : this.properties.zoomScale <= 0.721 ? 0.9998 : this.properties.zoomScale <= 0.78 ? 1.0015 : this.properties.zoomScale <= 0.8 ? 1.00 : this.properties.zoomScale <= 0.88 ? 1.0025 : this.properties.zoomScale <= 0.911 ? 1.0001 : this.properties.zoomScale <= 1.01 ? 1.0019 : this.properties.zoomScale >= 2.18 ? 1.0004 : this.properties.zoomScale >= 1.65 ? 1.008 : this.properties.zoomScale >= 1.59 ? 1.0015 : this.properties.zoomScale >= 1.49 ? 1.0018 : this.properties.zoomScale >= 1.37 ? 1.001 : this.properties.zoomScale >= 1.26 ? 1.0007 : this.properties.zoomScale >= 1.2 ? 1.0022 : this.properties.zoomScale >= 1.11? 0.9998 : 0.999) :  ( this.properties.zoomScale <= 0.40 ? 1 : this.properties.zoomScale <= 0.50 ? 0.9985 : this.properties.zoomScale <= 0.671 ? 0.9992 : this.properties.zoomScale <= 0.751 ? 0.9995 : this.properties.zoomScale <= 0.81 ? 0.9995 : this.properties.zoomScale <= 0.91 ? 0.9993 : this.properties.zoomScale >= 1.25 ? 1 : 1),
        //debug hide month 
        debugHideMonthHeader: false //enable it to hide month header for debugging purpose, check today's aligns to task's today?
    };
};

// Save record after a resize or move
Gantt.prototype.saveRecord = function(record) {
    $.ajax({
        cache: false,
        url: $(this.options.container).data("save-url"),
        contentType: "application/json",
        type: "POST",
        processData: false,
        data: JSON.stringify(record)
    });
};

// Build the Gantt chart
Gantt.prototype.show = function() {
    this.data = this.prepareData($(this.options.container).data('records'));
    zoomScale = this.properties.zoomScale;
    var minDays = Math.floor((this.options.slideWidth / this.options.cellWidth) + this.options.calendarBufferDays);
    var range = this.getDateRange(minDays); //FIXME: Added some days here for buffer
    var startDate = range[0];
    var endDate = range[1];
    var container = $(this.options.container);
    var chart = jQuery("<div>", { "class": "ganttview", "id": "grantview" });
    chart.append(this.renderVerticalHeader());
    chart.append(this.renderSlider(startDate, endDate));
    container.append(chart);

    jQuery("div.ganttview-grid-row div.ganttview-grid-row-cell:last-child", container).addClass("last");
    jQuery("div.ganttview-hzheader-days div.ganttview-hzheader-day:last-child", container).addClass("last");
    jQuery("div.ganttview-hzheader-months div.ganttview-hzheader-month:last-child", container).addClass("last");

    if (! $(this.options.container).data('readonly')) {
        this.listenForBlockResize(startDate);
        this.listenForBlockMove(startDate);
    }
    else {
        this.options.allowResizes = false;
        this.options.allowMoves = false;
    }
};


Gantt.prototype.infoTooltip = function(content) {
    var markdown = $("<div>", {"class": "markdown"}).append(content);
    var script = $("<script>", {"type": "text/template"}).append(markdown);
    var icon = $('<i>', {"class": "fa fa-info-circle"});
    return $('<span>', {"class": "tooltip"}).append(icon).append(script);
};

// Render record list on the left: slidebar
Gantt.prototype.renderVerticalHeader = function() {
    var headerDiv = jQuery("<div>", { "class": "ganttview-vtheader" });
    var itemDiv = jQuery("<div>", { "class": "ganttview-vtheader-item" });
    var seriesDiv = jQuery("<div>", { "class": "ganttview-vtheader-series" });
    var zoomScale = this.properties.zoomScale;
    for (var i = 0; i < this.data.length; i++) {
        var content = jQuery("<span>");
            content.append("&nbsp;")
                    .append(this.infoTooltip(this.getVerticalHeaderTooltip(this.data[i])))
                    .append("&nbsp;");

        if (this.data[i].type == "task") {
            content.append(jQuery('<strong>').text('#' + this.data[i].id + ' '));
            //content.append(jQuery('<small>').text('P' + this.data[i].color.background + ' '));
            content.append(jQuery("<a>", {"href": this.data[i].link, "title": this.data[i].title}).text(this.data[i].title));
        }
        else {
            content
                .append(jQuery("<a>", {"href": this.data[i].board_link, "title": $(this.options.container).data("label-board-link")}).append('<i class="fa fa-th"></i>'))
                .append("&nbsp;")
                .append(jQuery("<a>", {"href": this.data[i].gantt_link, "title": $(this.options.container).data("label-gantt-link")}).append('<i class="fa fa-sliders"></i>'))
                .append("&nbsp;")
                .append(jQuery("<a>", {"href": this.data[i].link}).text(this.data[i].title));
        }
        if ( i ==0 ) {
            seriesDiv.append(jQuery("<div>", {"class": "ganttview-vtheader-title"}).append('Tasks'));
            //seriesDiv.append(jQuery("<div>", { "class": "ganttview-vtheader-title" }).append(zoomScale < 0.95 || zoomScale > 1.10 ? 'Zoom level is ' + Math.round(zoomScale * 100) + '%' : ''));
            //seriesDiv.append(jQuery("<div>", {"class": "ganttview-vtheader-title"}).append('<input type="range" id="ganttTaskTitleWidth" name="ganttTaskTitleWidth"  min="50" max="1500" value="500" style="min-width:50px; width:100px; padding:5px; margin: 5px" />'));
            //seriesDiv.append(jQuery("<div>", {"class": "ganttview-vtheader-title"}).append('<input type="range" id="ganttTaskTitleWidth" name="ganttTaskTitleWidth"  min="50" max="1500" value="500" style="min-width:50px; width:100px; padding:5px; margin: 5px" />'));
            console.log('Zoom level is '+Math.round(zoomScale*100)+'%');
        }
        seriesDiv.append(jQuery("<div>", {
            "class": "ganttview-vtheader-series-name",
            "css": { "height": this.options.cellHeight * this.sysopts.zoomFactorH + "px", background: this.data[i].color.background }
        }).append(content));
        
    }
    itemDiv.append(seriesDiv);
    headerDiv.append(itemDiv);

    return headerDiv.html(); //FIXME: added .html() can solve the display problem in Firefox.
};

// Render right part of the chart (top header + grid + bars)
Gantt.prototype.renderSlider = function(startDate, endDate) {
    var slideDiv = jQuery("<div>", {"class": "ganttview-slide-container"});
    var dates = this.getDates(startDate, endDate);

    slideDiv.append(this.renderHorizontalHeader(dates));
    slideDiv.append(this.renderGrid(dates));
    slideDiv.append(this.addBlockContainers());
    this.addBlocks(slideDiv, startDate);

    return slideDiv;
};

// Render top header (months + days)
Gantt.prototype.renderHorizontalHeader = function(dates) {
    var headerDiv = jQuery("<div>", { "class": "ganttview-hzheader" });
    var monthsDiv = jQuery("<div>", { "class": "ganttview-hzheader-months" });
    var daysDiv = jQuery("<div>", { "class": "ganttview-hzheader-days" });
    var totalW = 0;
    var lastMthWidth = 0;
    for (var y in dates) {
        for (var m in dates[y]) {
            var w = dates[y][m].length * this.options.cellWidth; //FIXME: +3 to prevent wrapping in Chrome
            totalW = totalW + w;
            monthsDiv.append(jQuery("<div>", {
                "class": "ganttview-hzheader-month",
                "css": { "width": (w-1) * this.sysopts.zoomFactorMonthW + "px"}
            }).append($.datepicker.regional[$("html").attr('lang')].monthNames[m] + " " + y));
            
            for (var d in dates[y][m]) {
                //console.log(y + ";" + m + ";" + dates.length + ";" + dates[dates.length - 1][dates[dates.length - 1].length - 1]);
                // if (y == dates.length - 1 && m == dates[dates.length - 1].length - 1 && d == dates[dates.length - 1][dates[dates.length - 1].length - 1].length - 1) {
                //     //Prevent overflow by not printing the last date
                // } else {
                    daysDiv.append(jQuery("<div>", {
                        "class": "ganttview-hzheader-day",
                        "css": {
                            "width": this.options.cellWidth * this.sysopts.zoomFactorW + "px"
                        } //FIXME: cellWidth*0.95
                    }).append(dates[y][m][d].getDate()));
                //}
            }

            //FIXME: By adding a dummy cell in month header to prevent day bar comes to months
            if (y == dates.length - 1 && m == dates[dates.length - 1].length - 1) { //last month
                lastMthWidth = w;
                monthsDiv.append(jQuery("<div>", {
                    "class": "ganttview-hzheader-month",
                    "css": { "width": this.options.cellWidth+"px" }
                }).append(" "));
            }
        }
    }

    monthsDiv.css("width", totalW + lastMthWidth + "px");
    daysDiv.css("width", totalW + this.options.cellWidth*1.1 + "px"); //10/zoomScale
    if (this.sysopts.debugHideMonthHeader) {
        headerDiv.append(daysDiv);
    } else {
        headerDiv.append(monthsDiv).append(daysDiv);
    }

    return headerDiv;
};

// Render grid - focused on resizing the grid
Gantt.prototype.renderGrid = function(dates) {
    var gridDiv = jQuery("<div>", { "class": "ganttview-grid" });
    var rowDiv = jQuery("<div>", { "class": "ganttview-grid-row" });
    var zoomScale = this.properties.zoomScale;
    for (var y in dates) {
        for (var m in dates[y]) {
            for (var d in dates[y][m]) {
                if (y == dates.length - 1 && m == dates[dates.length - 1].length - 1 && d == dates[dates.length - 1][dates[dates.length - 1].length - 1].length - 1) {
                    //Prevent overflow by not printing the last date
                } else {
                    var cellDiv = jQuery("<div>", {
                        "class": "ganttview-grid-row-cell",
                        "css": {
                            "width": this.options.cellWidth * this.sysopts.zoomFactorW + "px",
                            "height": this.options.cellHeight * this.sysopts.zoomFactorH + "px"
                        } //FIXME: cellWidth*0.95
                    });
                    if (this.options.showWeekends && this.isWeekend(dates[y][m][d])) {
                        cellDiv.addClass("ganttview-weekend");
                    }
                    if (this.options.showToday && this.isToday(dates[y][m][d])) {
                        cellDiv.addClass("ganttview-today");
                    }
                    rowDiv.append(cellDiv); //DEBUG:
                }
            }
        }
    }
    var w = jQuery("div.ganttview-grid-row-cell", rowDiv).length * this.options.cellWidth * 1.01; // * (zoomScale<=0.85?1.011:1.01); //FIXME: add 7 to revent grid wrapped to next line
    rowDiv.css("width", w + this.options.cellWidth-1 + "px");
    gridDiv.css("width", w + this.options.cellWidth-1 + "px");

    for (var i = 0; i < this.data.length; i++) {
        gridDiv.append(rowDiv.clone());
    }

    return gridDiv;
};

// Render bar containers
Gantt.prototype.addBlockContainers = function() {
    var blocksDiv = jQuery("<div>", { "class": "ganttview-blocks" });

    for (var i = 0; i < this.data.length; i++) {
        blocksDiv.append(jQuery("<div>", { "class": "ganttview-block-container" }));
    }

    return blocksDiv;
};

// Render bars //This bar can't resize width by zoomscale
Gantt.prototype.addBlocks = function(slider, start) {
    var rows = jQuery("div.ganttview-blocks div.ganttview-block-container", slider);
    var rowIdx = 0;
    var zoomScale = this.properties.zoomScale;
    for (var i = 0; i < this.data.length; i++) {
        var series = this.data[i];
        var size = this.daysBetween(series.start, series.end) + 1;
        var offset = this.daysBetween(start, series.start);
        var text = jQuery("<div>", {
          "class": "ganttview-block-text",
          "css": {
              "width": ((size * this.options.cellWidth-3)) + "px"
          }
        });

        var block = jQuery("<div>", {
            "class": "ganttview-block" + (this.options.allowMoves ? " ganttview-block-movable" : ""),
            "css": {
                "width": ((size * this.options.cellWidth-3)) + "px",
                "margin-left": (offset * this.options.cellWidth ) + "px"
            }
        }).append(text);

        if (series.type === 'task') {
            this.addTaskBarText(text, series, size);
        }

        block.data("record", series);
        this.setBarColor(block, series);

        jQuery(rows[rowIdx]).append(block);
        rowIdx = rowIdx + 1;
    }
};

Gantt.prototype.addTaskBarText = function(container, record, size) {
    if (size >= 4) {
        container.html($('<span>').text(record.progress + ' - #' + record.id + ' ' + record.title));
    }
    else if (size >= 2) {
        container.html($('<span>').text(record.progress));
    }
};

// Get tooltip for vertical header
Gantt.prototype.getVerticalHeaderTooltip = function(record) {
    if (record.type === 'task') {
        return this.getTaskTooltip(record);
    }

    return this.getProjectTooltip(record);
};

Gantt.prototype.getTaskTooltip = function(record) {
    var assigneeLabel = $(this.options.container).data("label-assignee");
    var tooltip = $('<span>')
        .append($('<strong>').text(record.column_title + ' (' + record.progress + ') '))
        .append($('<br>'))
        .append($('<span>').text('#' + record.id + ' ' + record.title))
        .append($('<br>'))
        .append($('<span>').text(assigneeLabel + ' ' + (record.assignee ? record.assignee : '')));

    return this.getTooltipFooter(record, tooltip);
};

Gantt.prototype.getProjectTooltip = function(record) {
    var tooltip = $('<span>');

    if ('project-manager' in record.users) {
        var projectManagerLabel = $(this.options.container).data('label-project-manager');
        var list = $('<ul>');

        for (var user_id in record.users['project-manager']) {
            list.append($('<li>').append($('<span>').text(record.users['project-manager'][user_id])));
        }

        tooltip.append($('<strong>').text(projectManagerLabel));
        tooltip.append($('<br>'));
        tooltip.append(list);
    }

    return this.getTooltipFooter(record, tooltip);
};

Gantt.prototype.getTooltipFooter = function(record, tooltip) {
    var notDefinedLabel = $(this.options.container).data("label-not-defined");
    var startDateLabel = $(this.options.container).data("label-start-date");
    var startEndLabel = $(this.options.container).data("label-end-date");

    if (record.not_defined) {
        tooltip.append($('<br>')).append($('<em>').text(notDefinedLabel));
    } else {
        tooltip.append($('<br>'));
        tooltip.append($('<strong>').text(startDateLabel + ' ' + $.datepicker.formatDate('yy-mm-dd', record.start)));
        tooltip.append($('<br>'));
        tooltip.append($('<strong>').text(startEndLabel + ' ' + $.datepicker.formatDate('yy-mm-dd', record.end)));
    }

    return tooltip;
};

// Set bar color
Gantt.prototype.setBarColor = function(block, record) {
    block.css("background-color", record.color.background);
    block.css("border-color", record.color.border);

    if (record.not_defined) {
        if (record.date_started_not_defined) {
            block.css("border-left", "2px solid #000");
        }

        if (record.date_due_not_defined) {
            block.css("border-right", "2px solid #000");
        }
    }

    if (record.progress != "0%") {
        var progressBar = $(block).find(".ganttview-progress-bar");

        if (progressBar.length) {
            progressBar.css("width", record.progress);
        } else {
            block.append(jQuery("<div>", {
                "class": "ganttview-progress-bar",
                "css": {
                    "background-color": record.color.border,
                    "width": record.progress,
                }
            }));
        }
    }
};

// Setup jquery-ui resizable
Gantt.prototype.listenForBlockResize = function(startDate) {
    var self = this;

    jQuery("div.ganttview-block", this.options.container).resizable({
        grid: this.options.cellWidth,
        handles: "e,w",
        delay: 300,
        stop: function() {
            var block = jQuery(this);
            self.updateDataAndPosition(block, startDate);
            self.saveRecord(block.data("record"));
        }
    });
};

// Setup jquery-ui drag and drop
Gantt.prototype.listenForBlockMove = function(startDate) {
    var self = this;

    jQuery("div.ganttview-block", this.options.container).draggable({
        axis: "x",
        delay: 300,
        grid: [this.options.cellWidth, this.options.cellWidth],
        stop: function() {
            var block = jQuery(this);
            self.updateDataAndPosition(block, startDate);
            self.saveRecord(block.data("record"));
        }
    });
};

// Update the record data and the position on the chart
Gantt.prototype.updateDataAndPosition = function(block, startDate) {
    var container = jQuery("div.ganttview-slide-container", this.options.container);
    var scroll = container.scrollLeft();
    var offset = block.offset().left - container.offset().left - 1 + scroll;
    var record = block.data("record");

    // Restore color for defined block
    record.not_defined = false;
    this.setBarColor(block, record);

    // Set new start date
    var daysFromStart = Math.round(offset / this.options.cellWidth);
    var newStart = this.addDays(this.cloneDate(startDate), daysFromStart);
    if (!record.date_started_not_defined || this.compareDate(newStart, record.start)) {
        record.start = this.addDays(this.cloneDate(startDate), daysFromStart);
        record.date_started_not_defined = true;
    }
    else if (record.date_started_not_defined) {
        delete record.start;
    }

    // Set new end date
    var width = block.outerWidth();
    var numberOfDays = Math.round(width / this.options.cellWidth) - 1;
    var newEnd = this.addDays(this.cloneDate(newStart), numberOfDays);
    if (!record.date_due_not_defined || this.compareDate(newEnd, record.end)) {
        record.end = newEnd;
        record.date_due_not_defined = true;
    }
    else if (record.date_due_not_defined) {
        delete record.end;
    }

    if (record.type === "task" && numberOfDays > 0) {
        this.addTaskBarText(jQuery("div.ganttview-block-text", block), record, numberOfDays);
    }

    block.data("record", record);

    // Remove top and left properties to avoid incorrect block positioning,
    // set position to relative to keep blocks relative to scrollbar when scrolling
    block
        .css("top", "")
        .css("left", "")
        .css("position", "relative")
        .css("margin-left", offset + "px");
};

// Creates a 3 dimensional array [year][month][day] of every day
// between the given start and end dates
Gantt.prototype.getDates = function(start, end) {
    var dates = [];
    dates[start.getFullYear()] = [];
    dates[start.getFullYear()][start.getMonth()] = [start];
    var last = start;

    while (this.compareDate(last, end) == -1) {
        var next = this.addDays(this.cloneDate(last), 1);

        if (! dates[next.getFullYear()]) {
            dates[next.getFullYear()] = [];
        }

        if (! dates[next.getFullYear()][next.getMonth()]) {
            dates[next.getFullYear()][next.getMonth()] = [];
        }

        dates[next.getFullYear()][next.getMonth()].push(next);
        last = next;
    }

    return dates;
};

// Convert data to Date object
Gantt.prototype.prepareData = function(data) {
    for (var i = 0; i < data.length; i++) {
        var start = new Date(data[i].start[0], data[i].start[1] - 1, data[i].start[2], 0, 0, 0, 0);
        data[i].start = start;

        var end = new Date(data[i].end[0], data[i].end[1] - 1, data[i].end[2], 0, 0, 0, 0);
        data[i].end = end;
    }

    return data;
};

// Get the start and end date from the data provided
Gantt.prototype.getDateRange = function(minDays) {
    var minStart = new Date();
    var maxEnd = new Date();

    for (var i = 0; i < this.data.length; i++) {
        var start = new Date();
        start.setTime(Date.parse(this.data[i].start));

        var end = new Date();
        end.setTime(Date.parse(this.data[i].end));

        if (i == 0) {
            minStart = start;
            maxEnd = end;
        }

        if (this.compareDate(minStart, start) == 1) {
            minStart = start;
        }

        if (this.compareDate(maxEnd, end) == -1) {
            maxEnd = end;
        }
    }

    // Insure that the width of the chart is at least the slide width to avoid empty
    // whitespace to the right of the grid
    if (this.daysBetween(minStart, maxEnd) < minDays) {
        maxEnd = this.addDays(this.cloneDate(minStart), minDays);
    }

    // Always start one day before the minStart
    minStart.setDate(minStart.getDate() - 1);

    return [minStart, maxEnd];
};

// Returns the number of day between 2 dates
Gantt.prototype.daysBetween = function(start, end) {
    if (! start || ! end) {
        return 0;
    }

    var count = 0, date = this.cloneDate(start);

    while (this.compareDate(date, end) == -1) {
        count = count + 1;
        this.addDays(date, 1);
    }

    return count;
};

// Return true if it's the weekend
Gantt.prototype.isWeekend = function(date) {
    return date.getDay() % 6 == 0;
};

// Return true if it's today
Gantt.prototype.isToday = function(date) {
   var today = new Date();
   return today.toDateString() == date.toDateString();
 };

// Clone Date object
Gantt.prototype.cloneDate = function(date) {
    return new Date(date.getTime());
};

// Add days to a Date object
Gantt.prototype.addDays = function(date, value) {
    date.setDate(date.getDate() + value * 1);
    return date;
};

/**
 * Compares the first date to the second date and returns an number indication of their relative values.
 *
 * -1 = date1 is lessthan date2
 * 0 = values are equal
 * 1 = date1 is greaterthan date2.
 */
Gantt.prototype.compareDate = function(date1, date2) {
    if (isNaN(date1) || isNaN(date2)) {
        throw new Error(date1 + " - " + date2);
    } else if (date1 instanceof Date && date2 instanceof Date) {
        return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
    } else {
       throw new TypeError(date1 + " - " + date2);
    }
};


