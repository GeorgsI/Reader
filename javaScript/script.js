class readFile {

    static elem(){
        let file = document.querySelector('#file').files[0];

        if(file != null){

        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        console.log(reader.result);
        reader.onload = function(){
            var data = new Uint8Array(reader.result);
            console.log(file);
        


            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");
        
                /* Call XLSX */
                var workbook = XLSX.read(bstr, {type:"binary"});
        
                /* DO SOMETHING WITH workbook HERE */
               var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];
                let infoList = XLSX.utils.sheet_to_json(worksheet,{raw:true});
                //console.log(infoList);


                let ff = new readFile();
                ff.outList(infoList);

                




            } 

            
        }
        else{

            document.querySelector('.resultRead').innerHTML = `<div class='msessageErrorWrepper'>
                <p class='error-text'><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Выберите файл!</p>
                <p class='error-text'><i class="fa fa-file-excel-o" aria-hidden="true"></i> Используйте фалы с расширением xlsx, xls.</p>
            </div>`;

        }


    }

  
   


    outList(infoList){
          
      
        let aria;


        let out ='';
        let conter = 0; 
        for(let key in infoList)
        {

            
            if(infoList[key]['район']){

                aria=infoList[key]['район'];

               // console.log(infoList[key]['район']);

            }
            else{

               infoList[key]['район']=aria;

                

            }









        }

        console.log(infoList);












    }
           



}




todatY();
function todatY(){
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    document.querySelector('.yearToday').innerText = nowYear;
   
}


setTimeout(go, 2000)



//document.querySelector('.btn').onclik();

let f = document.querySelector('.btn');
f.onclick = show();




function show(){
    alert(1111)
}


document.querySelector('.btn').onclik();

function go(params) {
    console.log(1111)
}

/*

document.querySelector('.one').value='tttt';
document.querySelector('.tow').value='rrrrrrrrr';
document.querySelector('.selectOp').value='3';
*/