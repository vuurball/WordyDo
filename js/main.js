
Vue.transition('mywords',{
  enterClass: 'fadeInUp',
  leaveClass: 'fadeOutDown'
});

Vue.transition('learnedwords',{
  enterClass: 'fadeInDown',
  leaveClass: 'fadeOutUp'
});

Vue.transition('hiddenwords',{
  enterClass: 'fadeInDown',
  leaveClass: 'fadeOutUp'
});



new Vue({
  el:'body',
  data:{
     newWord: '',
     mywords: [
      {trans: 'een', origin:'one'},
      {trans: 'twee', origin: 'two'},
      {trans: 'drie', origin: 'three'},
      {trans: 'vier', origin: 'four'},
      {trans: 'vijf', origin:'five'},
      {trans: 'zes', origin: 'six'},
      {trans: 'zeven', origin: 'seven'},
      {trans: 'acht', origin: 'eight'},
    ],
    learnedwords: [
       {trans: 'huis', origin: 'home'},
    ],
    hiddenwords: [
       {trans: 'Olga', origin: 'olga'},
    ],
  }, 
  methods:{
    addNewWord: function(){
      var newWordArr = this.newWord.split('-');
      if(newWordArr.length ==2){
        var newWordObj = {trans: newWordArr[0], origin: newWordArr[1]};
        this.mywords.push(newWordObj);
        this.newWord = '';
      }else{
        this.newWord = this.newWord + ' ' + 'ERROR';
      }
      
    },
    removeWord: function(item){   
      this.mywords.$remove(item);
      this.hiddenwords.push(item);
    },
    markLearned: function(item){
       this.mywords.$remove(item);
       this.learnedwords.push(item);
    },
    unHideAWord: function(item){
       this.hiddenwords.$remove(item);   
       this.mywords.push(item);
    },
    learnWordAgain: function(item){    
       this.learnedwords.$remove(item);
       this.mywords.push(item);
    }, 
  },
  watch: {
    learnedwords: function () {
       console.log(JSON.stringify(this.learnedwords))
    },
    hiddenwords: function () {
      console.log(JSON.stringify(this.hiddenwords))
    }
  }
});
