/**
 * Created by dhd on 2017/8/26.
 */
$(function(){
    var $navigation = $('.navigation');
   $('.banner-toggle').on('click',function(){
        if($navigation.is(":visible")){
            $navigation.slideUp();
        }else{
            $navigation.slideDown();
        }
   });
});