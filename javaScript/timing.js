
const dom = {
    formatTime: document.querySelector('.dateLong'),
    dateManufacture: document.querySelector('.dateField'),
    term: document.querySelector('.timingFild'),
    timingBTN: document.querySelector('.timingBtn'),
    resultWrepper: document.querySelector('.resultWrepper__timing'),
    resultWrepperDaysLeft: document.querySelector('.resultWrepper__daysLeft')
}


class OUTRESULT{
    constructor(start, term, longTime){
        this.start = start,
        this.term = term,
        this.longTime = longTime


    }


    renderData(res){
        let date = new Date(res);
        let dateNow = new Date();
        

        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();


      /*  console.log(typeof(this.start));
        console.log(typeof(this.term));
        console.log(typeof(this.longTime));*/

        if(this.start != '' && this.longTime != '' ){

            if(month >= 0 && month < 9){
                month = '0'+month;
            }
            if(day >= 0 && day < 9){
                day = '0'+day;
            }


            let out = `<p class='answerTerm'><i class="fa fa-trash-o" aria-hidden="true"></i><span class='result__titlt'>Дата истечения срока: </span> ${day}.${month}.${year}</p>`;
            document.querySelector('.resultWrepper__timing').innerHTML = out;



            

            let dif = date - dateNow;
            let daysLeft = Math.ceil(dif/1000/60/60/24);

            if(daysLeft <= 7){
                document.querySelector('.resultWrepper__daysLeft').innerHTML = `<p class='answerTerm'><i class="fa fa-sun-o" aria-hidden="true"></i><span class='result__titlt'>Осталось дней:</span><span class='result__term__red'> ${daysLeft}</span></p>`; 
            }
            else{
                //console.log(dif/1000/60/60/24);
            document.querySelector('.resultWrepper__daysLeft').innerHTML = `<p class='answerTerm'><i class="fa fa-sun-o" aria-hidden="true"></i><span class='result__titlt'>Осталось дней:</span> ${daysLeft}</p>`;
            }
        }
        

    }





}






class CalcTiming extends OUTRESULT{
    constructor(start, term, longTime){
        /*this.start = start,
        this.term = term,
        this.longTime = longTime*/
        super(start, term, longTime)

    }

    days(){
        let date = new Date(this.start);
        let res = date.setDate(date.getDate() + Number(this.term));
        super.renderData(res);
    }

    month(){
        let date = new Date(this.start);
        let res = date.setMonth(date.getMonth() + Number(this.term));
        super.renderData(res);
        


    }
    year(){
        let date = new Date(this.start);
        let res = date.setFullYear(date.getFullYear() + Number(this.term));
        super.renderData(res);
    }
}






class Timing extends CalcTiming{
    constructor(start, term, longTime){
        super(start, term, longTime)
    }

    Timing() {

        if(this.longTime == 2){
            super.days(this.start, this.term, this.longTime);
        }
        else if(this.longTime == 3){
            super.month(this.start, this.term,  this.longTime);
        }
        else{
            super.year(this.start, this.term,  this.longTime);
        }
       // console.log(this.longTime); 
    }


    


}







class calcButtonTiming{


    static render() {


        if(!document.querySelector('.modalWrepper')){
            let out = `<div class='modalWind'><form onsubmit="return false">
                <div class="block-form__termCalck">
                <h2 class='dateCalck__title'><i class="fa fa-clock-o" aria-hidden="true"></i> Калькулятор сроков годности</h2>
                    <div class="inputWrepper">
                        <label for="dateStart" class='termCalck__label'>
                            <div class="inputWrepper__title">
                                <i class="fa fa-industry" aria-hidden="true"></i>
                                <span class='timingFild__title'>Дата изготовления</span>
                            </div> 
                            <input type="date" class="dateField inputTerms" name='dateStart' required>
                        </label>
                    </div>    
                    <div class="inputWrepper">
                        <label for="dateLongFild" class='termCalck__label'>
                            <div class="inputWrepper__title">
                                <i class="fa fa-calendar-minus-o" aria-hidden="true"></i>
                                <span class='timingFild__title'>Еденицы времени</span>
                            </div>
                            <select name="dateLongFild"  class="dateLong inputTerms">
                                <!--option value="1" class="dateLong__item">Часы</option-->
                                <option value="2" class="dateLong__item">Дни</option>
                                <option value="3" class="dateLong__item" selected>Месяцы</option>
                                <option value="4" class="dateLong__item">Годы</option>
                            </select>
                        </label>
                    </div>
                    <div class="inputWrepper">
                        <label for="timingFild" class='termCalck__label'>
                            <div class="inputWrepper__title">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                <span class='timingFild__title'>Срок</span>
                            </div>
                            <input type="number" name="timingFild " class="timingFild inputTerms" min="0" required>
                        </label>
                    </div>
                    <div class="inputWrepper">
                        <button class="timingBtn btn inputTerms" onclick='calcButtonTiming.action()'>Проверить</button>
                        <button class="timingBtn btn inputTerms" onclick='calcButtonTiming.resetForm()' type="reset">Очистить</button>
                        <button class="timingBtn btn inputTerms timingBtn__close" onclick='calcButtonTiming.closeWindow()'>Закрыть</button>
                        
                    </div>

                    <div class="resultWrepper__timing"></div>
                    <div class="resultWrepper__daysLeft"></div>

                </div></form>
            </div>`;




        

            let wrepper = document.createElement('div');
            wrepper.classList.add('modalWrepper');
            document.querySelector('.main').appendChild(wrepper);
            wrepper.innerHTML = out;
                
            wrepper.scrollIntoView(0);
            document.querySelector('body').classList.add('stopScroll');

        }

    }



    static action(){
       
        let dateManufacture = document.querySelector('.dateField');
        let term = document.querySelector('.timingFild');
        let formatTime = document.querySelector('.dateLong');


       
            let timing = new Timing(dateManufacture.value, term.value, formatTime.value);
            timing.Timing();
        
    }


    static closeWindow(){
        if(document.querySelector('.modalWrepper')){
            document.querySelector('.modalWrepper').remove();
            document.querySelector('body').classList.remove('stopScroll');

        }
    }


    static resetForm(){
        if(document.querySelector('.modalWrepper')){
            document.querySelector('.resultWrepper__timing').innerHTML = '';
            document.querySelector('.resultWrepper__daysLeft').innerHTML = '';
        }
    }


}

/*static alc(e){

}*/


/*dom.timingBTN.onclick = () =>{

    let timing = new Timing(dom.dateManufacture.value, dom.term.value, dom.formatTime.value);
    timing.Timing();

}*/

