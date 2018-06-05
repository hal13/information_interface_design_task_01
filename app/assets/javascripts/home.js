$(function() {
  if ($("#js-switch-lever").length) {
    /* document load */
    setColorTask();
    countRangeValues();
    setValuesCounter();
    controlCheckBox();
    
    var displayColumn = $("#js-select-column");
    setDisplayColumn(displayColumn.val());
    
    /* change select column */
    displayColumn.on('change', function() {
      setDisplayColumn($(this).val());
    });

    /* change checkbox */
    var allCheckBox = $(".check-group-1, .check-group-2");
    allCheckBox.on('change', function() {
      if ($(".check-group-1:checked").length) {
        setColorTask();
      }
      else if($(".check-group-2:checked").length) {
        setColorRange();
      }
      else {
        setColorDefault();
      }
      controlCheckBox();
    });

    /* change switch lever */
    var filterLever = $("#js-switch-lever");
    filterLever.on('change', function() {
      if (filterLever.prop('checked')) {
        removeDefaultContent('on');
      }
      else {
        removeDefaultContent('off');
      }
      controlCheckBox();
    });
  }
});

function setColorDefault() {
  var contentElem = $(".card-custom");
  contentElem.removeClass('color-def color-attend');
  contentElem.children('.content-def').removeClass('content-transform');
  contentElem.addClass('color-def');
}

function setColorTask() {
  var referenceValue = 0.2;
  
  $(".content-def").each(function() {
    if (parseFloat($(this).text()) < referenceValue) {
      $(this).parent().removeClass("color-def");
      $(this).parent().addClass("color-attend");
      $(this).addClass('content-transform');
      
    }
    else {
      $(this).parent().removeClass("color-attend");
      $(this).removeClass('content-transform');
      $(this).parent().addClass("color-def");
    }
  });
}

function setColorRange() {
  var allRangesElem = $(".check-group-2:checked");
  var allContent = $(".content-def");
  var arrayList = [];
  allRangesElem.each(function() {
    var obj = {};
    obj.from = parseFloat($(this).attr('data-value-from'));
    obj.to = parseFloat($(this).attr('data-value-to'));
    arrayList.push(obj);
  });
  allContent.each(function() {
    var contentValue = parseFloat($(this).text());
    var contentElem = $(this);
    $.each(arrayList, function(index, elem) {
      if (contentValue >= elem.from && contentValue < elem.to) {
        contentElem.parent().removeClass('color-def');
        contentElem.parent().addClass('color-attend');
        contentElem.addClass('content-transform');
        return false;
      }
      contentElem.parent().removeClass('color-attend');
      contentElem.removeClass('content-transform');
      contentElem.parent().addClass('color-def');
    });
  });
}

function controlCheckBox() {
  $(".check-group-1, .check-group-2").prop('disabled', false)

  if ($("#js-switch-lever").prop('checked')) {
    $(".check-group-1, .check-group-2").prop('disabled', true);
  }
  else if ($(".check-group-1:checked").length) {
    $(".check-group-2").prop('disabled', true);
  }
  else if ($(".check-group-2:checked").length) {
    $(".check-group-1").prop('disabled', true);
  }
}

function removeDefaultContent(flg) {
  $(".card-custom").parent().removeClass('dis-none');
  if (flg == "on") {
    $(".color-def").each(function() {
      $(this).parent().addClass('dis-none')
    });
  }
}

function setValuesCounter() {
  var valuesCounter = $(".color-attend").length;
  var labelText =  $(".check-group-1:checked").map(function() {
    return $(this).parent().children('label').text();
  }).get().toString();
  $("#js-values-counter").text(labelText + "の件数　" + valuesCounter);
}

function countRangeValues() {
  var allRangesElem = $(".check-group-2");
  var allContent = $(".content-def");
  allRangesElem.each(function() {
    var rangeFrom = parseFloat($(this).attr('data-value-from'));
    var rangeTo = parseFloat($(this).attr('data-value-to'));
    var i = 0;
    allContent.each(function() {
      var contentValue = parseFloat($(this).text());
      if (contentValue >= rangeFrom && contentValue < rangeTo) {
        i += 1;
      }
    });
    $(this).parent().children('label').children('.range-counter').text("  (" + i.toString() + "件)");
  });
}

function setDisplayColumn(val) {
  var cardElem = $(".value-columns");
  var className = "col s" + (12 / val).toString();
  
  cardElem.removeClass('col s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12');
  
  cardElem.addClass(className);
}
