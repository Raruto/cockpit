@if(!empty($options['include_js']))
<script>
    setTimeout(function(){
      @render('forms:views/api/form.js', compact('name', 'options'))
    }, 100);
</script>
@endif

<form id="{{ $options["id"] }}" name="{{ $name }}" class="{{ $options["class"] }}" action="@route('/api/forms/submit/'.$name)" method="post" {{ (!empty($options['include_js']) ? 'onsubmit="return false;"' : '') }}>
<input type="hidden" name="__csrf" value="{{ $options["csrf"] }}">
@if(isset($options["mailsubject"]))
<input type="hidden" name="__mailsubject" value="{{ $options["mailsubject"] }}">
@endif

@trigger('forms.open')
