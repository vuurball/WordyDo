
Vue.transition('mywords', {
    enterClass: 'fadeInUp',
    leaveClass: 'fadeOutDown'
});

Vue.transition('learnedwords', {
    enterClass: 'fadeInDown',
    leaveClass: 'fadeOutUp'
});

Vue.transition('hiddenwords', {
    enterClass: 'fadeInDown',
    leaveClass: 'fadeOutUp'
});



new Vue({
    el: 'body',
    data: {
        showTrans: true,
        newWordTrans: '',
        newWordOrigin: '',
        mywords: [
            //            {trans: 'een', origin: 'one'},
            //            {trans: 'twee', origin: 'two'},
            //            {trans: 'drie', origin: 'three'},
            //            {trans: 'vier', origin: 'four'},
            //            {trans: 'vijf', origin: 'five'},
            //            {trans: 'zes', origin: 'six'},
            //            {trans: 'zeven', origin: 'seven'},
            //            {trans: 'acht', origin: 'eight'},
        ],
        learnedwords: [
            //            {trans: 'huis', origin: 'home'},
        ],
        hiddenwords: [
            // {trans: 'Olga', origin: 'olga'},
        ],
        db: ''
    },
    ready: function () {
        
        this.db = new Firebase('https://olgabdb-f2ace.firebaseio.com/');
		
		this.db.child('vocab/mywords').on('child_added', function (snapshot) {			
				this.pushToList({trans: snapshot.val().trans, origin: snapshot.val().origin, showHint: false}, this.mywords);
			}.bind(this)
		);

		this.db.child('vocab/learnedwords').on('child_added', function (snapshot) {			
				this.pushToList({trans: snapshot.val().trans, origin: snapshot.val().origin}, this.learnedwords);
			}.bind(this)
		);
		
		this.db.child('vocab/hiddenwords').on('child_added', function (snapshot) {			
				this.pushToList({trans: snapshot.val().trans, origin: snapshot.val().origin}, this.hiddenwords);
			}.bind(this)
		);
    },
    methods: {
		pushToList: function(newWordObj, list){
			list.push(newWordObj);
		},
        addNewWord: function () {
            var newWordObj = {trans: this.newWordTrans, origin: this.newWordOrigin, showHint: false};
			var activeVisitorRef = this.db.child('vocab/mywords').push(newWordObj, function () {});
            this.newWordOrigin = this.newWordTrans = '';      
            
        },
        removeWord: function (item) {
            this.mywords.$remove(item);
            this.hiddenwords.push(item);
        },
        markLearned: function (item) {
            this.mywords.$remove(item);
            this.learnedwords.push(item);
        },
        unHideAWord: function (item) {
            this.hiddenwords.$remove(item);
            this.mywords.push(item);
        },
        learnWordAgain: function (item) {
            this.learnedwords.$remove(item);
            this.mywords.push(item);
        },
        toggleLanguage: function () {
            this.showTrans = !this.showTrans;
        },
        toggleHint: function (item) {
            item.showHint = !item.showHint;
        },
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        checkCookie: function () {
          
        },
        getCookie: function (cname) {
          
        }
        
    },
    watch: {
        mywords: function () {
            //remove showHint=false property from each word in mywords list before saving
            this.mywords.forEach(function (obj) {
                obj.showHint === undefined;
            });
            var listsArr = {'mywords': this.mywords, 'learnedwords': this.learnedwords, 'hiddenwords': this.hiddenwords};
            this.setCookie('wordslist', JSON.stringify(listsArr), 5);
        },
    }
});
