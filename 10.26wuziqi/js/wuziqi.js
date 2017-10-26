$(function(){
    let hei = {};   // 存黑子的位置  {'1_1:true'}
    let bai = {};
    let kongbai = {};   /*0_0:{x:0,y:0}*/
    let isAI = true;
    for(let i=0;i<15;i++){
        $('<div>').addClass('hang').appendTo('.qipan');
        $('<span>').addClass('shu').appendTo('.qipan');
        for(let j=0;j<15;j++){
            kongbai[i+'_'+j] = {x:i,y:j};
            $('<li>').addClass('qizi').attr('id',i+'_'+j).data('pos',{x:i,y:j})
                .appendTo('.qipan');

        }
    }
    let flag = true;
    $('.qipan .qizi').on('click',function () {
        if($(this).hasClass('hei') || $(this).hasClass('bai')){
            return;
        }
        let data = $(this).data('pos');
        if(flag){
            $(this).addClass('hei');
            hei[data.x+"_"+data.y] = true;
            delete kongbai[data.x+"_"+ data.y];
            if(panduan(data,hei)>=5){
                $('.qipan .qizi').off();
                console.log('黑棋胜')
            }
            if(isAI){
                let pos = ai();
                $(`#${pos.x}_${pos.y}`).addClass('bai');
                bai[pos.x+"_"+pos.y] = true;
                delete kongbai[pos.x+"_"+ pos.y];
                if(panduan(pos,bai) >=5){
                    $('.qipan .qizi').off();
                    console.log('白棋胜')
                } ;

                return;

            }
        }else{
            $(this).addClass('bai');
            bai[data.x+"_"+data.y] = true;
            delete kongbai[data.x+"_"+ data.y];
            if(panduan(data,bai)>=5){
                $('.qipan .qizi').off();
                console.log('白棋胜')
            } ;
        }
        flag = !flag;

    })
    function ai(){
        // 返回格式{x:i,y:i}
        let max = -Infinity , max1 = -Infinity;  // infinity无穷
        let zb = null , zb1 = null;
        for(let i in kongbai){
            let score = panduan(kongbai[i],bai)
            if(score > max){
                max = score;
                zb = kongbai[i];
            }
        }

        for(let i in kongbai){
            let score = panduan(kongbai[i],hei)
            if(score > max1){
                max1 = score;
                zb1 = kongbai[i];
            }
        }

      return (max > max1) ? zb : zb1;

    }
    // 传的参数是位置和颜色
    function panduan(pos,obj){
        // pos的格式{x:1,y:2}
        let rows=1, cols=1, zx=1,yx=1;
        let i = pos.x ,j = pos.y+1;
        // 横右
        while(obj[i+'_'+j]){
            rows++;
            j++;
        }
        // 横左
        j = pos.y-1;   // 例从3—6判断，往左判断就不用计算3-6，从3-5开始所以减1
        while(obj[i+'_'+j]){
            rows++;
            j--;
        }
        // 竖下
        i = pos.x+1,j=pos.y;
        while(obj[i+'_'+j]){
            cols++;
            i++;
        }
        // 竖上
        i = pos.x-1;   // 从3—6判断，往左判断就不用计算3-6，从3-5开始所以减1
        while(obj[i+'_'+j]){
            cols++;
            i--;
        }
        // 左斜 上
        i = pos.x-1,j=pos.y-1;
        while(obj[i+'_'+j]){
            zx++;
            i--;
            j--;
        }
        // 左斜 下
        i = pos.x+1 , j=pos.y+1;   // 从3—6判断，往左判断就不用计算3-6，从3-5开始所以减1
        while(obj[i+'_'+j]){
            zx++;
            i++;
            j++;
        }

        // 右斜 上
        i = pos.x-1,j=pos.y+1;
        while(obj[i+'_'+j]){
            yx++;
            i--;
            j++;
        }
        // 左斜 下
        i = pos.x+1 , j=pos.y-1;   // 从3—6判断，往左判断就不用计算3-6，从3-5开始所以减1
        while(obj[i+'_'+j]){
            zx++;
            i++;
            j--;
        }
        return Math.max(rows,cols,zx,yx);
    }
})