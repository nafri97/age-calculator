<script>
import copyright from './copyright.vue';
export default {

  data(){
    return{
      currentDate: new Date().toLocaleDateString(),
      dayInput:'--',
      monthInput:'--',
      yearInput:'--',
      currentDay : new Date().getDate(),
      currentMonth : new Date().getMonth() + 1,
      currentYear : new Date().getFullYear(),
      thirtyOneMonths : [1, 3, 5, 7, 8, 10, 12],
      thirtyMonths : [4, 6, 9, 11],
      alertDay : null,
      alertMonth : null,
      alertYear : null,
    }
  },
  components: {
    copyright,
  },
  computed: {
    day() {
      if(  this.dayInput == 0 ){
        if ( this.monthInput === 0 && this.yearInput === 0 ){
          this.alertDay =  null
          return '--'
       }else {
        this.alertDay =  "This field required"
        return '--'
       }
      }else if (typeof this.dayInput !== "number"){
        this.alertDay = "Must be a number"
        return '--'
      }else if (this.dayInput < this.currentDay){
        this.alertDay = null ;
        return (this.currentDay - this.dayInput);
      }else if (this.dayInput == this.currentDay){
        this.alertDay = null ;
        return 0
      }else if( this.monthInput == 1 | this.monthInput == 3 | this.monthInput== 5 | this.monthInput == 7 | this.monthInput == 8 | this.monthInput == 10 | this.monthInput == 12){
        if (this.dayInput <= 31 && this.dayInput >0 ) {
          this.alertDay = null ;
          return ( 31 - this.dayInput + this.currentDay )
        }else{ 
          this.alertDay = "Must be a valid day" ;
          return '--'
        }
      }else if( this.monthInput == 4 | this.monthInput == 6 | this.monthInput== 9 | this.monthInput == 11 ){
        if (this.dayInput <= 30 && this.dayInput >0 ) {
          this.alertDay = null ;
          return ( 30 - this.dayInput + this.currentDay )
        }else{ 
          this.alertDay = "Must be a valid day"
        }
      }else if (this.monthInput == 2 && this.yearInput%4 != 0){
        if (this.dayInput <= 28 && this.dayInput >0 ) {
          this.alertDay = null ;
          return ( 28 - this.dayInput + this.currentDay )
        }else{ 
          this.alertDay =  "Must be a valid day"
          return '--' 
        }
      }else if (this.monthInput == 2 && this.yearInput%4 == 0){
        if (this.dayInput <= 29 && this.dayInput >0 ) {
          this.alertDay = null ;
          return ( 29 - this.dayInput + this.currentDay )
        }else{ 
          this.alertDay =  "Must be a valid day"
          return '--'
        }
      }else {
        this.alertDay =  "Must be a valid day"
        return '--' ;
      }
    },
    month() {
      if ( this.monthInput == 0 ){
        if ( this.dayInput === 0 && this.yearInput === 0 ){
          this.alertMonth =  null
          return '--'
       }else {
        this.alertMonth =  "This field required"
        return '--'
       }
      // check valid month
      }else if (typeof this.monthInput !== "number"){
        this.alertMonth = "Must be a number"
        return '--'
      } else if (this.monthInput > 0 && this.monthInput <=12 ){
        this.alertMonth =  null;
        //counter for same month
        if (this.monthInput == this.currentMonth){
          if (this.dayInput > this.currentDay){
            return 11;
          }else{
            return 0;
          }
        }else if (this.currentMonth < this.monthInput) {
          return 12-((this.currentMonth - this.monthInput)*-1);
        }else {
          return ((this.monthInput - this.currentMonth)*-1)
        }
      } else {
        this.alertMonth =  "Must be a valid month";
        return '--'
      }
    },
    year() {
      if ( this.yearInput == 0 ) {
        if ( this.dayInput === 0 && this.monthInput === 0 ){
          this.alertYear =  null
          return '--'
       }else {
        this.alertYear =  "This field required";
        return '--'
       }
      }else if (typeof this.yearInput !== "number"){
        this.alertYear = "Must be a number"
        return '--'
      }else if ((this.currentYear > this.yearInput) || ((this.yearInput == this.currentYear) && (this.monthInput < this.currentMonth))){ 
        this.alertYear =  null
        if ((this.monthInput > this.currentMonth) ||( (this.monthInput == this.currentMonth) && (this.dayInput > this.currentDay ))){
          return this.currentYear - this.yearInput - 1;
        } else {
          return this.currentYear - this.yearInput;
        }
      } else if ((this.yearInput == this.currentYear) && ( (this.monthInput == this.currentMonth))){
        this.alertYear =  null
        if (this.dayInput > this.currentDay ){
          return this.currentYear - this.yearInput - 1;
        }else {
          this.alertYear = "Must be in the past";
          return '--'
        }
      } else if (this.yearInput > this.currentYear){
          this.alertYear = "Must be in the past";
          return '--'
      }else {
        this.alertYear = "Invalid value";
        return '--'
      }
    },
    compiledDate() {
      const day = parseInt(this.dayInput);
      const month = parseInt(this.monthInput) - 1;
      const year = parseInt(this.yearInput);
      const date = new Date(year, month, day);

      return date.toLocaleDateString();

    }

    

  // },
  //   methods: {
  //     isValidDate(date) {
  //       return !isNaN(date.getTime());
  //     }
  //   }
  }
}
</script>

<template>
  <div class="container bg-white p-6 md:p-12 rounded-3xl ms-40">
    <div class="flex flex-row gap-3 md:gap-5">
      <div class="flex flex-col">
        <label for="day" class="label text-SmokeyGrey" :class="{'text-red-600' : typeof alertDay === 'string' }">Day</label>
        <input type="number" id="day" class="input border-SmokeyGrey-400 focus:border-indigo-600" placeholder="DD" v-model="dayInput" :class="{'border-red-600 focus:border-red-600' : typeof alertDay === 'string' }">
        <p class="text-xs text-red-600">{{ alertDay }}</p>
      </div>
      <div class="flex flex-col">
        <label for="month" class="label text-SmokeyGrey" :class="{'text-red-600' : typeof alertMonth === 'string' }">Month</label>
        <input type="number" id="month" class="input border-SmokeyGrey-400 focus:border-indigo-600" placeholder="MM" v-model="monthInput" :class="{'border-red-600 focus:border-red-600' : typeof alertMonth === 'string' }">
        <p class="text-xs text-red-600">{{ alertMonth }}</p>
      </div>
      <div class="flex flex-col">
        <label for="year" class="label text-SmokeyGrey" :class="{'text-red-600' : typeof alertYear === 'string' }">Year</label>
        <input type="number" id="year" class="input border-SmokeyGrey-400 focus:border-indigo-600" placeholder="YYYY" v-model="yearInput" :class="{'border-red-600 focus:border-red-600' : typeof alertYear === 'string' }">
        <p class="text-xs text-red-600">{{  alertYear }}</p>
      </div>
      <div class="w-16">
      </div>
    </div>
    <div>
      <hr class="bg-SmokeyGrey mt-10">
      <img class="bg-violet-500 rounded-full p-5 float-right -mt-11 md:float-right cursor-pointer hover:bg-slate-900 " src="./assets/icon-arrow.svg" alt="arrow">
    </div>
    <div class="my-10">
      <h2>{{ year }} <span class="text-black">years</span></h2>
      <h2>{{ month }} <span class="text-black">months</span></h2>
      <h2>{{ day }} <span class="text-black">days</span></h2>
    </div>
    <copyright/>
  </div>
</template>

<style scoped>
.container{
  border-bottom-right-radius: 10rem;
}
h2{
  font-family: Poppins-Bold;
  font-weight: 900;
  font-size: 5rem;
  color: hsl(259, 100%, 65%);
  font-style: italic;
  letter-spacing: -0.05em;
  margin-bottom: -2rem;
}
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
}
@media (max-width: 1024px) {
  .container { 
    margin: 0;
    margin-top: 3rem;
  }
  h2{
    font-size: 3rem;
  }
  img{
    max-width: 60px;
    display: block;
    float: none;
    margin: -30px;
    margin-left: calc(50% - 30px);
  }
  label{
   font-size: 0.7rem; 
  }
  p{
    font-size: 0.7rem;
  }
  hr{
    margin-top: 3rem;
  }
}
</style>
