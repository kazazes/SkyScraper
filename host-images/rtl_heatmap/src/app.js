$(document).ready(function() {
  $(".button-collapse").sideNav();

  if (window.localStorage.getItem("welcomed") === "true") {
    $(".open-file").hide();
    $("#row-hide").hide();
  }

  if (window.localStorage.getItem("fastmode") === "true") {
    fastMode = true;
  }

  if (window.localStorage.getItem("freqnr") !== null) {
    freqNr = parseInt(window.localStorage.getItem("freqnr"));
  }

  if (window.localStorage.getItem("colormap") !== null) {
    colorMap = JSON.parse(window.localStorage.getItem("colormap"));
  }

  if (window.localStorage.getItem("streamurl") !== null) {
    streamURL = window.localStorage.getItem("streamurl");
    updateStreamURL();
  }

  $("#dismiss-button").click(function(ev) {
    ev.stopPropagation();

    window.localStorage.setItem("welcomed", true);
    $(".open-file").fadeOut(200, function() {
      $("#row-hide").hide();
    });
  });

  $(".open-button").click(function(ev) {
    $("#open-modal").openModal();
  });

  $("#display-btn").click(function(ev) {
    ev.stopPropagation();

    var file = $("#file");
    $("#open-modal").closeModal();
    showSpinner();
    parseCSV(file);
  });

  handle_settings_button();

  $("#close-btn").click(function(ev) {
    ev.stopPropagation();
    $("#settings-modal").closeModal();
  });

  $("#save-btn").click(function(ev) {
    ev.stopPropagation();

    var color = $("input:radio[name=color-scheme]")
      .filter(":checked")
      .val();
    $("#settings-modal").closeModal();

    setColorScheme(color);
    var fmode = $("#fastmode").is(":checked");
    freqNr = $("#freqNr").val();
    streamURL = $("#stream-url").val();

    window.localStorage.setItem("fastmode", fmode);
    window.localStorage.setItem("freqnr", freqNr);
    fastMode = fmode;

    updateStreamURL();
  });

  $(".stream-button").click(function(ev) {
    startStream();
  });
});

function handle_settings_button() {
  $(".settings-button").click(function(ev) {
    ev.stopPropagation();

    showSettings();
    $("ul.tabs").tabs("select_tab", "display-settings");
  });
}

function updateStreamURL() {
  $("#stream-url-label").text("Stream URL (currently: " + streamURL + ")");
}

function displaySettings() {
  $("#freqNr").val(freqNr);

  if (fastMode) {
    $("#fastmode").attr("checked", "true");
  }
}

var fastMode = false;
var freqNr = 20;
var colorMap = ["#2D7B86", "#DB8E47", "#DB5147"];

function setScheme(col1, col2, col3) {
  colorMap = [col1, col2, col3];
  window.localStorage.setItem("colormap", JSON.stringify(colorMap));

  redraw();
}

function setColorScheme(scheme) {
  switch (parseInt(scheme)) {
    case 1:
      setScheme("#2D7B86", "#DB8E47", "#DB5147");
      break;

    case 2:
      setScheme("#0000bd", "#a7ff58", "#840000");
      break;

    case 3:
      setScheme("#ffffff", "#ff7f00", "#2F0000");
      break;

    case 4:
      setScheme("#00ffff", "#7788ff", "#ff00ff");
      break;

    case 5:
      setScheme("#000000", "#184fbc", "#9e0005");
      break;
  }
}

function showSettings() {
  $("#settings-modal").openModal();
  displaySettings();
}

function showSpinner() {
  $("#spinner").css("visibility", "visible");
  $(".valign-wrapper").css("display", "");
}

function hideSpinner() {
  $("#spinner").css("visibility", "hidden");
  $(".valign-wrapper").css("display", "none");
}

var queue = {
  _timer: null,
  _queue: [],
  add: function(fn, context, time) {
    var setTimer = function(time) {
      queue._timer = setTimeout(function() {
        time = queue.add();
        if (queue._queue.length) {
          setTimer(time);
        }
      }, time || 1);
    };

    if (fn) {
      queue._queue.push([fn, context, time]);
      if (queue._queue.length == 1) {
        setTimer(time);
      }
      return;
    }

    var next = queue._queue.shift();
    if (!next) {
      return 0;
    }
    next[0].call(next[1] || window);
    return next[2];
  },
  clear: function() {
    clearTimeout(queue._timer);
    queue._queue = [];
  },
};

$.fn.redraw = function() {
  $(this).each(function() {
    var redraw = this.offsetHeight;
  });
};

var numItems = 0;
function updateLoadState() {
  $("#load-state").text("Loaded " + numItems + " datapoints.");
  $("#load-state").redraw();

  numItems++;
}

function clearLoadState() {
  $("#load-state").text("");
}

function resetState() {
  img = [];
  numItems = 0;
  minDb = null;
  maxDb = null;
  freqMin = null;
  freqMax = null;
  sweep = [];
  lastTime = null;
  curSamps = [];
  freqs = [];
}

function parseCSV(file) {
  resetState();

  Papa.parse(file.prop("files")[0], {
    worker: false,
    skipEmptyLines: true,
    step: function(result) {
      var data = result.data;
      var self = this,
        doBind = function() {
          updateLoadState();
          handleSamples(data);
        };

      if (!fastMode) {
        queue.add(doBind, this);
      } else {
        doBind();
      }
    },
    complete: function() {
      var self = this,
        doBind = function() {
          clearLoadState();
          checkSingle();
          drawAll();
          hideSpinner();

          $(".export-button").attr("href", canvas.toDataURL("image/png"));
        };

      if (!fastMode) {
        queue.add(doBind, this);
      } else {
        doBind();
      }

      var $panzoom = $(".panzoom").panzoom();

      $panzoom.parent().on("mousewheel.focal", function(e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $panzoom.panzoom("zoom", zoomOut, {
          increment: 0.1,
          animate: false,
          focal: e,
        });
      });
    },
  });
}

function parseStream() {
  clearLoadState();
  checkSingle();
  drawAll();
  hideSpinner();
  pph = 1;

  $(".export-button").attr("href", canvas.toDataURL("image/png"));

  var $panzoom = $(".panzoom").panzoom();

  $panzoom.parent().on("mousewheel.focal", function(e) {
    e.preventDefault();
    var delta = e.delta || e.originalEvent.wheelDelta;
    var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    $panzoom.panzoom("zoom", zoomOut, {
      increment: 0.1,
      animate: false,
      focal: e,
    });
  });

  drawLabels(canvas.width);
}

var lastTime = null;
var curSamps = [];
var freqMin = null;
var freqMax = null;
var freqs = [];

function sort(array) {
  var keys = new Array();
  var value = {};

  for (var elem in array) {
    keys.push(elem);
  }

  keys.sort();

  for (var elem in keys) {
    value[keys[elem]] = array[keys[elem]];
  }

  return value;
}

var sweep = [];

function handleSamples(dat) {
  var data = dat[0];
  var time = data[0] + data[1].replace(" ", "T") + "Z";
  var ptime = new Date(time);

  var curMin = parseInt(data[2]);
  var curMax = parseInt(data[3]);
  var step = parseInt(data[4]);
  var numSamps = data[5];

  // check if a new sweep has started
  if (lastTime != null && +ptime != +lastTime) {
    // clone sweep and add it to the image
    img.push(sweep.slice(0));
    sweep = [];
    lastTime = null;
    curSamps = [];
  }

  lastTime = ptime;

  if (freqMin === null || curMin < freqMin) {
    freqMin = curMin;
  }

  if (freqMax === null || curMax > freqMax) {
    freqMax = curMax;
  }

  for (var i = 6; i < data.length; i++) {
    var db = parseFloat(
      String(data[i])
        .replace(" ", "")
        .replace("-", "")
    );
    sweep.push(db);

    if (maxDb === null || 100 - db > maxDb) {
      maxDb = 100 - db;
    }

    if (minDb === null || 100 - db < minDb) {
      minDb = 100 - db;
    }
  }
}

function checkSingle() {
  if (sweep.length > 0) {
    img.push(sweep.slice(0));
    sweep = [];
    lastTime = null;
    curSamps = [];
  }
}

var canvas = null;
var ctx = null;
var pntWidth = 0;
var pntHeight = 0;
var img = [];

var maxDb = null;
var minDb = null;

var drawed = false;
var scaleH;
var scaleW;
var height;
var width;
var pph;
var ppw;
var scale;

function drawAll() {
  drawed = true;

  canvas = document.getElementById("spectrum");
  height = img.length;
  scaleH = 1;

  if (height > 16000) {
    while (height / scaleH > 16000) {
      scaleH *= 2;
    }
  }

  if (height == 0) {
    toast("The image was empty or an unknown error occured.", 4000);
    return;
  }

  width = img[0].length;
  scaleW = 1;

  if (width > 16000) {
    while (width / scaleW > 16000) {
      scaleW *= 2;
    }
  }

  width = width / scaleW;
  height = height / scaleH;

  pph = Math.max(Math.round(canvas.height / height), 1);
  ppw = Math.max(Math.round(canvas.width / width), 1);

  $(canvas).height(pph * height);
  $(canvas).width(ppw * width);
  $("#freq-ruler").width(ppw * width);

  canvas.height = pph * height;
  canvas.width = ppw * width;

  ctx = canvas.getContext("2d");
  ctx.scale(1, 1);
  ctx.save();

  console.log(
    "[Rendering image] minFreq: " +
      freqMin +
      ", maxFreq: " +
      freqMax +
      ", width: " +
      width +
      ", height: " +
      height +
      ", PpH: " +
      pph +
      ", PpW: " +
      ppw
  );
  console.log("min db: " + minDb + ", max db: " + maxDb);

  scale = chroma.scale(colorMap);

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var db = Math.round(img[y][x]);
      var dbP = (102 - db - minDb) / (maxDb - minDb);
      var color = scale(dbP).hex();
      ctx.fillStyle = color;
      ctx.fillRect(x * ppw, y * pph, ppw, pph);
    }
  }

  drawLabels(canvas.width);

  ctx.restore();
}

var firstStreamed = true;
var offset = 0;
function drawLast() {
  if (firstStreamed) {
    firstStreamed = false;
    parseStream();
  }

  var oldcanvas = document.createElement("canvas");
  oldcanvas.height = canvas.height;
  oldcanvas.width = canvas.width;

  oldcanvas.getContext("2d").drawImage(canvas, 0, 0);

  canvas = document.getElementById("spectrum");
  height += pph;

  $(canvas).height(pph * height);
  canvas.height = pph * height;

  ctx.drawImage(oldcanvas, 0, 0, oldcanvas.width, oldcanvas.height);
  //ctx.save();

  console.log(
    "[Rendering image] minFreq: " +
      freqMin +
      ", maxFreq: " +
      freqMax +
      ", width: " +
      width +
      ", height: " +
      height +
      ", PpH: " +
      pph +
      ", PpW: " +
      ppw
  );
  console.log("min db: " + minDb + ", max db: " + maxDb);

  var y = img.length - 1;

  for (var x = 0; x < width; x++) {
    var db = Math.round(img[y][x]);
    var dbP = (102 - db - minDb) / (maxDb - minDb);
    var color = scale(dbP).hex();
    ctx.fillStyle = color;
    ctx.fillRect(x * ppw, numItems * pph, ppw, pph);
  }

  //ctx.restore();
  $(".export-button").attr("href", canvas.toDataURL("image/png"));
}

function formatFreq(freq) {
  if (freq > 1e6) {
    return (parseInt(freq) / 1e6).toFixed(2) + "M";
  } else if (freq > 1e3) {
    return (parseInt(freq) / 1e3).toFixed(2) + "k";
  } else {
    return freq;
  }
}

function drawLabels(width) {
  var step = width / freqNr;
  var frqStep = (freqMax - freqMin) / freqNr;
  var freqCont = $("#freq-ruler");
  freqCont.empty();

  for (var i = 0; i <= freqNr; i++) {
    var frq = frqStep * i;
    var mark = $("<span>");
    mark.css("display", "block");
    mark.css("position", "absolute");
    mark.css("left", Math.round(step * i) + "px");

    mark.text(formatFreq(frq + freqMin));
    freqCont.append(mark);
    /*
        ctx.font="13px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(formatFreq(frq+freqMin),Math.round(step*i),20);
        */
  }
}

function redraw() {
  if (!drawed) {
    return;
  }

  drawAll();
}

var streamURL = "ws://127.0.0.1:8080";
var streamSock = null;
var streamToast = null;
var streamRunning = false;

function websocket_handlemsg(msg) {
  if (msg.data === "hello") {
    toast("Server says " + msg.data, 3000);
    firstStreamed = true;
    resetState();
    dismiss_connecting();

    $(".stream-icon").each(function() {
      $(this).removeClass("fa-play");
      $(this).addClass("fa-stop");
    });

    $(".stream-text").each(function() {
      $(this).text("Stop Stream");
    });

    streamRunning = true;
    return;
  }

  updateLoadState();

  console.log(dat);
  handleSamples(dat);
  drawLast();
}

function websocket_close() {
  streamRunning = false;

  $(".stream-icon").each(function() {
    $(this).removeClass("fa-stop");
    $(this).addClass("fa-play");
  });

  $(".stream-text").each(function() {
    $(this).text("Stream");
  });
}

function websocket_connect() {
  streamSock = new WebSocket(streamURL);
  streamSock.onerror = function() {
    dismiss_connecting();
    toast(
      "Could not connect to server. Are you sure that the stream URL " +
        streamURL +
        ' is correct?<a class="btn-flat yellow-text toast-action settings-button" href="#">Settings<a>',
      8000
    );

    handle_settings_button();
  };

  streamSock.onmessage = websocket_handlemsg;
  streamSock.onclose = websocket_close;
}

function dismiss_connecting() {
  if (streamToast !== null) {
    streamToast.remove();
  }
}

function startStream() {
  if (streamRunning) {
    streamSock.onmessage = null;
    streamSock.onclose = null;
    streamSock = null;
    websocket_close();
    return;
  }

  if (streamURL == null) {
    toast("Please set the stream-URL first!", 4000);
    return;
  }

  toast(
    '<span>Connecting to stream server...</span><a class="btn-flat yellow-text toast-action stream-cancel" href="#">Cancel<a>',
    800000
  );

  $(".stream-cancel").click(function(c) {
    dismiss_connecting();
    streamSock = null;
  });

  streamToast = $(".stream-cancel").parent();

  websocket_connect();
}
