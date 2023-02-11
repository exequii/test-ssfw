function screenIcon() {
  $(".iconback > *").remove();
  var mainScreenIcon = $(".titulo i").attr('class');
  $(".iconback").append("<i class='" + mainScreenIcon + "'>");
}

