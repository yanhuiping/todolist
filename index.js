$(function(){
    var todo=[];
    var toto=[];
    // var num=0;
    //判断本地有没有TODOdata
    if(localStorage.tododata){
        var todo=JSON.parse(localStorage.tododata);
        render();
    }else{
        localStorage.tododata=JSON.stringify(todo);
    }
    //判断本地有没有totodata
    if(localStorage.totodata){
        var toto=JSON.parse(localStorage.totodata);
        render1();
    }else{
        localStorage.totodata=JSON.stringify(toto);
    }
    //将内容放到TODO中，放到本地
    function addlist(aa){
        todo.push({
            title:aa,
            state:'0',
            isDel:'0'
        })
        localStorage.tododata=JSON.stringify(todo);
        render();

    }
    //把内容放到toto中，放到本地
    function addtoto(aa){
        toto.push({
            title:aa,
            state:'0',
            isDel:'0'
        })
        localStorage.totodata=JSON.stringify(toto);
        render1();
    }
    //渲染页面
    function render(){
        $('.list').empty();
        var idnum=0;
        $.each(todo,function(i,v){
            idnum++;
            $('<li class="listinner ani" id=" '+ idnum+ ' "><div class="xinxi icon-font icon-zhizhang5"></div><span class="contant">'+ v.title +'</span><input class="shuru"/><div class="dian icon-font icon-more1170511easyiconnet"></div><div class="dui icon-font icon-xuanzhong"></div></li>').appendTo('.list');
        })
        if($('.mright').hasClass('mmr')){
            $('.shuzi .span1').css('display','block');
            $('.shuzi .sb').css('display','none');
            $('.shuzi .span1').text(idnum);
        }

    }
   // 渲染归档页面
    function render1(){
        var idnum1=0;
        $('.list1').empty();
        $.each(toto,function(i,v){
            idnum1++;
            $('<li class="listinner ani" id=" '+ idnum1+ ' "><div class="xinxi icon-font icon-zhizhang5"></div><span class="contant" >'+ v.title +'</span><input class="shuru"/><div class="dian icon-font icon-more1170511easyiconnet"></div><div class="dui icon-font icon-xuanzhong"></div><div class="done"></div></li>').appendTo('.list1');
        })
        if($('.mleft').hasClass('mmr')){
            $('.shuzi .span1').css('display','none');
            $('.shuzi .sb').css('display','block');
            $('.shuzi .sb .span2').text(idnum1);
        }


    }
   $('input').focus();
    //点击添加
    $('.addleft').on('click',function(){

        var val=$('input').val();
        console.log(val);
        addlist(val);
        render();
        // todo
        $('input').val('');
        $('input').blur();
        $('.duikuang').css('opacity','1').delay(800).queue(function(){
            $(this).css('opacity','0').dequeue();
        })


    })
    $('input').blur();
    //手机端touch移动
    var left=null;
    $('.list').on('touchstart','.listinner',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
    })
    $('.list').on('touchend','.listinner',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
    })
    $(".list").on('touchmove','.listinner',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        $(this).css('transition','transform 0.8s ease');
        $(this).css('transform','translate3d('+ x +'px,0,0)');

        $(this).delay(800).queue(function(){
            $(this).css('transform','none').dequeue();
        })

    })
    $('.list1').on('touchstart','.listinner',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
    })
    $('.list1').on('touchend','.listinner',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
    })
    $(".list1").on('touchmove','.listinner',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        $(this).css('transition','transform 0.8s ease');
        $(this).css('transform','translate3d('+ x +'px,0,0)');

        $(this).delay(800).queue(function(){
            $(this).css('transform','none').dequeue();
        })

    })
    //删除内容
    var ins;
    $('.list').on('click','.dui',function(){
        // num--;
        $(this).css('color','blue');
        $('.delbox').css('display','block');
        $('.imgbox3').css('display','none');
        $('.imgbox2').css('display','none');
        $('.imgbox').css('display','block');
        $('.imgbox ').addClass('elastic-in-down');
         ins=$(this).parent().index();
        // console.log(i);
        var that=$(this);


    })
    //删除一条数据
    $('.shanchu').on('click',function(){
        $('.delbox').css('display','none');
        // var i=$(that).closest('li').index();
        // var i=$(that).parent().index();
        // console.log(i);
        todo.splice(ins,1);
        localStorage.tododata=JSON.stringify(todo);
       $('li').eq(ins).addClass('feichu').delay(800).queue(function(){
            $(this).remove().dequeue();
            render();
        })


    })
    //归档一条内容
    $('.guidang').on('click',function(){
        $('.delbox').css('display','none');
        // var i=$(that).closest('li').index();

        // console.log(i);
        var it=todo[ins];
        todo.splice(ins,1);
        console.log(todo);
        addtoto(it.title);
        localStorage.tododata=JSON.stringify(todo);
        localStorage.totodata=JSON.stringify(toto);
        $('li').eq(ins).addClass('feichu').delay(800).queue(function(){
            $(this).remove().dequeue();
            render();
            render1();

        })


    })
    //在归档里删除一条
    var ins1;
    $('.list1').on('click','.dui',function(e){
        // num--;
        $(".dui").css('color','');
        $(this).css('color','blue');
        $('.delbox').css('display','block');
        $('.imgbox').css('display','none');
        $('.imgbox3').css('display','none');
        $('.imgbox2').css('display','block');
        $('.imgbox2 ').addClass('elastic-in-down');
         ins1=$(this).parent().index();
        var that=$(this);
        //删除一条数据


    })
    $('.yes').on('click',function(){
        $('.delbox').css('display','none');
        // var i=$(that).closest('li').index();
        // console.log(i);
        toto.splice(ins1,1);
        localStorage.totodata=JSON.stringify(toto);
        $('li').eq(ins1).addClass('feichu').delay(800).queue(function(){
            $(this).remove().dequeue();
            render1();
        })
    })
    $('.no').on('click',function(){
        $('.delbox').css('display','none');
        $('.imgbox2').css('display','block');
        $('.imgbox').css('display','block');
        $('.imgbox3').css('display','block');
        // console.log(i);

    })
    //更改内容
    $('.list').on('click','.contant',function(){
        // $('.xinxi').css('background','##7edbff');
        $(this).parent().find('input').css('display','block');
        $(this).parent().find('input').val($(this).text());
        $(this).text('');
        $(this).parent().find('input').blur(function(){
            console.log($(this));
           var num= $(this).val();
            $(this).parent().find('.contant').text(num);
            $(this).css('display','none');
            var xiabiao=$(this).parent().index();
            todo[xiabiao].title=num;
            localStorage.tododata=JSON.stringify(todo);
            render();
            $('.duikuang').css('opacity','1').delay(800).queue(function(){
                $(this).css('opacity','0').dequeue();
            })
        })
    })
    //已完成
    $('.list').on('click','.xinxi',function(){
        $(this).addClass('yanse');
        var xinnum=$(this).parent().index();
        todo[xinnum].state=1;
        localStorage.tododata=JSON.stringify(todo);
        console.log(todo);

    })
    //已完成的内容删除
  
    //点击便签
    $('.mright').on('click',function(){
        $(this).addClass('mmr');
        $('.mleft').removeClass('mmr');
        $('.list').css('display','block');
        $('.list1').css('display','none');

           /* $('.shuzi .span1').css('display','block');
            $('.shuzi .sb').css('display','none');
            $('.shuzi .span1').text($('.list').find('li').index());*/

    })
    $('.mleft').on('click',function(){
        $(this).addClass('mmr');
        $('.mright').removeClass('mmr');
        $('.list').css('display','none');
        $('.list1').css('display','block');
    })
//    全部删除
    $('.mk').on('click',function(){
        $('.delbox').css('display','block');
        $('.imgbox').css('display','none');
        $('.imgbox2').css('display','none');
        $('.imgbox3').css('display','block');
        $('.imgbox3 ').addClass('elastic-in-down');
        $('.list ').find('.xinxi').css('background','#9715F5');
        $('.list1 ').find('.xinxi').css('background','#9715F5');


        $('.yes').on('click',function(){
            $('.delbox').css('display','none');
            if($('.mright').hasClass('mmr')){
                todo=[];
                localStorage.tododata=JSON.stringify(todo);
                $('.list').find('li').addClass('feichu').delay(800).queue(function(){
                    $(this).remove().dequeue();
                    render();
                })
            }
           if($('.mleft').hasClass('mmr')){
               toto=[];
               localStorage.totodata=JSON.stringify(toto);
               $('.list1').find('li').addClass('feichu').delay(800).queue(function(){
                   $(this).remove().dequeue();
                   render1();
               })
           }

        })
        $('.no').on('click',function(){
            $('.list ').find('.xinxi').css('background','');
            $('.list1 ').find('.xinxi').css('background','');
            $('.delbox').css('display','none');
            $('.imgbox2').css('display','block');
            $('.imgbox').css('display','block');
            $('.imgbox3').css('display','block');
        })

    })
    // $(document).on('mousedown',false);
})