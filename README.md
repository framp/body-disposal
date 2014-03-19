bodyDisposal
=================

A simple connect middleware which manipulate your `req.body` and clean the crime scene.

What will it do?
----------------

If you're using the default configuration (do it):

 - Every form field which gets submitted as empty ('' - as in `?password=&..`) will be deleted.
 - Every deleted field whose name is contained in the `req.body._delete` array (or is `req.body._delete`) will be set to undefined.

 
 You just need to add it to your middlewares (after req.body has been set):
 
    connect.use(bodyDisposal())
    
 If you really want to change something (at your own risk):
 
    connect.use(
      bodyDisposal('_delete', 
        // key used to contain the names of the fields which have to be killed
      {
        deleteData: false,        
          // If this is true, you will be able to delete field submitted with data
          // Don't do it, being able to delete something ONLY when it's empty 
          // is pretty handy 
        deleteValue: undefined
          // When set to something the `deleted field` will contain something.
          // Yeah, I know, surprising. 
          // Changing it doesn't make sense - unless you're ignoring undefined
          // values and you won't actually delete the data. In that case I'd 
          // still go about detecting undefined.
      })
    )
 
 
Why?
-----------------

The rationale behind this little project is having a set of well defined rules to avoid being captured in the suckyness of web forms:

 - Ignore empty fields
 - If you want to set a field as empty you have to say it

By ignoring the inputs left empty by default, you can easily send partial form to update only the data you want:

    $.post({ 
      username: username,
      avatar: avatar
    })
    
It also make things simpler for fields who are not supposed to be pre-populated again:

    <input type="text" name="username" value="framp">
    <input type="password" name="password" value="">


In this way creating a checkbox which can be used as a toggle button is as easy as writing:

    <input type="checkbox" name="toggle" {?toggle}checked{/toggle}>
    <input type="hidden" name="_delete" value="toggle">
    
Sweet!

What about multiple fields?

    <input type="checkbox" name="toggles_0" value="checked" {_.toggles_0}>
    <input type="hidden" name="_delete[0]" value="toggles_0">
    <input type="checkbox" name="toggles_1" value="checked" {_.toggles_1}>
    <input type="hidden" name="_delete[1]" value="toggles_1">
    <input type="checkbox" name="toggles_2" value="checked" {_.toggles_2}>
    <input type="hidden" name="_delete[2]" value="toggles_2">
    

Creating an optional field which can be updated as empty in the future is pretty simple too:

    <input type="hidden" name="_delete" value="optionalDescription">
    <textarea name="optionalDescription"></texarea>
    
Need to delete something?

    $.post({ 
      _delete: 'avatar'
    })
    
Why not use a `_keep` instead of `_delete`?
-----------
It's just a matter of taste.

I simply found myself having more fields to keep than fields to delete.
    
License
-----------
MIT
    