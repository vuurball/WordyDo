
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
});



new Vue({
  el:'body',
  data:{
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
      
    ],
    hiddenwords: [
      
    ],
  }, 
  methods:{
    removeWord: function(item){   
      this.mywords.$remove(item);
      this.hiddenwords.push(item);
    },
    markLearned: function(item){
       this.mywords.$remove(item);
       this.learnedwords.push(item);
    },
    addToMyWords: function(item){
       this.learnedwords.$remove(item);
       this.mywords.push(item);
    },
    
  }
});
