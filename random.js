var $groups = $('#groups');
var $tbody = $('tbody');
var groupHtmlString = '<tr class="group">' +
        '<td><input type="text" class="class" placeholder="Class"></td>' +
        '<td><input type="number" class="studentnum" placeholder="Number of student" min="1"></td>'+
        '<td><input type="button" class="remove" value="Remove"></td>'+
        '<td><input type="button" class="add" value="Add"></td>'+
        '</tr>';

var initData = [
  ['7HY', 9],
  ['7RW', 7],
  ['8AB', 12],
  ['8WB', 14],
  ['9PL', 8],
  ['9YC', 7],
  ['10EF', 12],
  ['10VS', 13],
  ['11EC', 8],
  ['11JH', 7],
  ['12CS', 12],
  ['13JD', 9],
];

$tbody.html('');
$.each(initData, function (index, value) {
  $(groupHtmlString)
    .appendTo($tbody)
    .find('.class').val(value[0])
    .parent('td').next('td').find('.studentnum').val(value[1])
    .parent('td').siblings('td:last-child').find('.add').hide();
});
$tbody.children('tr:last-child').find('.add').show();

$groups
  .delegate('.add', 'click', function () {
    var $this = $(this);
    $(groupHtmlString)
      .appendTo($this.parents('tbody'))
      .find('.class')
      .focus();
    $this.hide();
  })
  .delegate('.remove', 'click', function () {
    var $this = $(this);
    var $tbody = $this.parents('tbody');

    if ($tbody.children().length > 1) {
      $this.parents('tr').remove();
      $tbody.children('tr:last-child').find('.add').show();
    } else {
      // Clear content of first row
      $this.parents('tr').children('td:nth-child(-n+2)').find('input').val('');
    }
  });

$('#randomise').click(function () {
  var hasError = false;
  var $group = $('.group');
  var $result = $('#results');

  // Check no empty input first
  $('.class').each(function () {
    if ($(this).val().length === 0) {
      hasError = true;
    }
  });

  $('.studentnum').each(function () {
    if (Number($(this).val()) === 0) {
      hasError = true;
    }
  });

  $result.html('');
  $.each(
    randomise(Number($('#typenum').val()), $group.length) || [],
    function (index, value) {
      $result.append(getElement(value, $group.eq(index).find('.class').val()));
    });
  $('body').animate({
    scrollTop: $result.prev().offset().top
  });

  function getElement (groupChar, className) {
    return '<li class="groupChar"><span>'+groupChar+'</span>'+className+'</li>';
  }
});

function randomise (numType, numGroup) {
  var types = [];
  var quota = [];
  var numPerType = Math.floor(numGroup/numType);
  var result = [];

  var i,j;
  var groupNum;

  if (numGroup%numType !== 0) {
    return false;
  }

  for (i=0, j=0; i<numType; i++) {
    if (numType<26) {
      types.push(String.fromCharCode(65+i));
    } else {
      return;
    }

    if ((j+=numPerType)>numGroup) {
      quota.push(numPerType + numGroup%numType);
    } else {
      quota.push(numPerType);
    }
  }

  for (i=0; i<numGroup; i++) {
    groupNum = getGroupNum();
    result[i] = types[groupNum];
    --quota[groupNum];
  }

  console.log(result);
  return result;

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getGroupNum () {
    groupNum = getRandomIntInclusive(0, numType);
    if (quota[groupNum] !== 0) {
      return groupNum;
    } else {
      return getGroupNum();
    }
  }
}
