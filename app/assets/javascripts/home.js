$(function() {
  if ($("#js-modify-filter").length) {
    /* document ready */
    controlCheckBox();
    resetColor();
    addColorDefault();
    setValuesCounter();
    
    /* click modify button */
    var buttonModify = $("#js-modify-filter")
    var checkBoxGroup1 = $(".check-group-1")
    var checkBoxGroup2 = $(".check-group-2")
    buttonModify.on('click', function() {
      if(checkBoxGroup1.prop('checked') == false && checkBoxGroup2.prop('checked') == false) { return false }
      
      resetColor();
      
      if (checkBoxGroup1.prop('checked')) {
        addColorDefault();
        setValuesCounter();
      }
    });
    
    /* change checkbox */
    checkBoxGroup1.on('change', function() {
      controlCheckBox();
    });

    checkBoxGroup2.on('change', function() {
      controlCheckBox();
    });
    
    /* change lever */
    var filterLever = $("#js-switch-lever")
    filterLever.on('change', function() {
      if (filterLever.prop('checked')) {
        removeDefaultContent('on');
      }
      else {
        removeDefaultContent('off');
      }
    });
  }
});

function addColorDefault() {
  var referenceValue = 0.2;
  
  $(".card .content-def").each(function() {
    if (parseFloat($(this).text()) < referenceValue) {
      return $(this).parent().addClass("color-attend");
    }
    else {
      return $(this).parent().addClass("color-def");
    }
  });
}

function resetColor() {
  $(".card").removeClass("color-def");
  $(".card").removeClass("color-attend");
}

function controlCheckBox() {
  $(".check-group-1").prop('disabled', false)
  $(".check-group-2").prop('disabled', false)

  if ($(".check-group-1:checked").length) {
    $(".check-group-2").prop('disabled', true)
  }
  else if ($(".check-group-2:checked").length) {
    $(".check-group-1").prop('disabled', true)
  }
}

function removeDefaultContent(flg) {
  $(".card").parent().removeClass('dis-none');
  if (flg == "on") {
    $(".color-def").each(function() {
      $(this).parent().addClass('dis-none')
    });
  }
}

function setValuesCounter() {
  var valuesCounter = $(".color-attend").length
  var labelText =  $(".check-group-1:checked").map(function() {
    return $(this).parent().children('label').text()
  }).get().toString();
  $("#js-values-counter").text(labelText + "の件数　" + valuesCounter)
}