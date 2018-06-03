$(function() {
  if ($("#js-switch-lever").length) {
    /* document load */
    resetColor();
    setColorDefault();
    setValuesCounter();
    controlCheckBox();
    
    var displayColumn = $("#js-select-column");
    setDisplayColumn(displayColumn.val());
    
    /* change select column */
    displayColumn.on('change', function() {
      setDisplayColumn($(this).val());
    });

    /* change checkbox */
    var checkBoxGroup1 = $(".check-group-1");
    var checkBoxGroup2 = $(".check-group-2");
    checkBoxGroup1.on('change', function() {
      controlCheckBox();
    });

    checkBoxGroup2.on('change', function() {
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
  var referenceValue = 0.2;
  
  $(".card-custom .content-def").each(function() {
    if (parseFloat($(this).text()) < referenceValue) {
      $(this).parent().addClass("color-attend");
      $(this).addClass('content-transform');
      
    }
    else {
      $(this).parent().addClass("color-def");
    }
  });
}

function resetColor() {
  $(".card-custom").removeClass("color-def color-attend content-transform");
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

function setDisplayColumn(val) {
  var cardElem = $(".value-columns");
  var className = "col s" + (12 / val).toString();
  
  cardElem.removeClass('col s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12');
  
  cardElem.addClass(className);
}