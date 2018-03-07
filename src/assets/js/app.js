$(document).ready(function() {
  /*Sidebar List Items*/
  $(document).on('click', '.parent .parent-link', function () {
    $(this).parent('.parent').find('.submenu').slideToggle('slow', function () {
      $(this).toggleClass('visible');
    });
    $(this).parent('.parent').addClass('active');
  });

  /* Account Header Dropdown*/

  $(document).on('click', '.dropdown-btn', function () {
    if( $('.account-header-dropdown').hasClass('open')){
      $('.account-header-dropdown').removeClass('open');
    }else{
      $('.account-header-dropdown').addClass('open');
    };
    $('.account-header-dropdown').parent('.account-header').addClass('active');
  });
  $(document.body).not('.account-header-dropdown').on('click', function () {
    if( $('.account-header-dropdown').hasClass('open')){
      $('.account-header-dropdown').removeClass('open');
    }
    $('.account-header-dropdown').parent('.account-header').removeClass('active');
  });



  //Attache file modals functions//
  $(document).on('click', "#passImg", function () {
    var self = $(this);
    var img = self.find('div.pic-file').css('background-image');
    console.log(img);
    // $('#openPhoto').find('.modal-body').css('background-image', img);
    img = img.split('url').join('').split('(').join('').split(')').join().split('"').join('').split(',').join('');
    $('#openPhoto').find('img').attr('src', img);
  });
  $(document).on('click', "#educationImg", function () {
    var self = $(this);
    var img = self.find('div.pic-file').css('background-image');
    console.log(img);
    // $('#openPhoto').find('.modal-body').css('background-image', img);
    img = img.split('url').join('').split('(').join('').split(')').join().split('"').join('').split(',').join('');
    $('#openPhoto2').find('img').attr('src', img);
  });
  $(document).on('click', "#otherImg", function () {
    var self = $(this);
    var img = self.find('div.pic-file').css('background-image');
    console.log(img);
    // $('#openPhoto').find('.modal-body').css('background-image', img);
    img = img.split('url').join('').split('(').join('').split(')').join().split('"').join('').split(',').join('');
    $('#openPhoto3').find('img').attr('src', img);
  });

  /*Dropdown Close on document click*/

  // $(document).mouseup(function(e)
  // {
  //   var container = $(".select-styled.active");
  //
  //   // if the target of the click isn't the container nor a descendant of the container
  //   if (container.length && (!container.is(e.target) && container.has(e.target).length === 0))
  //   {
  //     container.removeClass('active');
  //   }
  // });

  // $('.select-styled').on('click',  function () {
  //    $(this).toggleClass('active');
  // });
  // $('.select-options').on('click',  function () {
  //   console.log('select-options clicked');
  //   $('.select-styled').removeClass('active');
  // });

  /*Calculate Career Experience*/

  /*Select*/


  // var $styledSelect = $('.select-styled');
  // var $list = $('.select-options');
  // var $listItems = $list.children('li');


  // $styledSelect.each(function(){

    // $(this).click(function() {
    //   //e.stopPropagation();
    //   $(this).toggleClass('active');
    //   //$('.account-header-dropdown').parent('.account-header').toggleClass('active')
    //
    //
    // });

  //
  //   $listItems.click(function(e) {
  //     e.stopPropagation();
  //     console.log($(this).prev($styledSelect));
  //     $(this).parent().prev($styledSelect).html($(this).html()).removeClass('active');
  //   });
  // })








    // $styledSelect.removeClass('active');












});
