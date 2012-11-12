// namespace
window.application = {
  editor:"",
  db:localStorage
};
// Dom Ready
$(function(){

  $("#clear").bind('click',function(e){
    e.preventDefault();
    application.db.clear();
    application.editor.setValue("");
    $("#in").val = "";
  });
  // Initilize CodeMirror Editor
  application.editor = CodeMirror.fromTextArea(document.getElementById("in"), {
    mode: 'gfm',
    lineNumbers: true,
    matchBrackets: true,
    theme: "default",
    dragDrop :true,
    onFocus:function(){
      $(".CodeMirror-scroll").addClass("focus");
    },
    onBlur:function(){
      $(".CodeMirror-scroll").removeClass("focus");
      application.editor.save();
      application.db.setItem("#in",$("#in").val());
    },
    onCursorActivity: function() {
      application.editor.setLineClass(hlLine, null, null);
      hlLine = application.editor.setLineClass(application.editor.getCursor().line, null, "activeline");
    },
    onChange: function(){
      application.editor.save();
      application.db.setItem("#in",$("#in").val());
    }
  });
  var hlLine = application.editor.setLineClass(0, "activeline");
  var cache = application.db.getItem("#in");
  if (cache){
    $("#in").val = cache;
    application.editor.setValue(cache);
  }
});