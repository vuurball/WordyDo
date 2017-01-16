
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
        ]
    },
    ready: function () {
        //get the lists content from cookie
        var listsArr = JSON.parse(this.getCookie('wordslist'));
        //ini each list
        this.mywords = listsArr['mywords'];
        this.learnedwords = listsArr['learnedwords'];
        this.hiddenwords = listsArr['hiddenwords'];
        //add showHint=false property to each word in mywords list
        this.mywords.forEach(function (obj) {
            obj.showHint = false;
        });
    },
    methods: {
        addNewWord: function () {
            var newWordObj = {trans: this.newWordTrans, origin: this.newWordOrigin, showHint: false};
            this.mywords.push(newWordObj);
            this.newWordOrigin = this.newWordTrans = '';

//            var newWordArr = this.newWord.split('-');
//            if (newWordArr.length === 2) {
//                var newWordObj = {trans: newWordArr[0], origin: newWordArr[1]};
//                this.mywords.push(newWordObj);
//                this.newWord = '';
//            } else {
//                this.newWord = this.newWord + ' ' + 'ERROR';
//            }

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
            var username = getCookie("username");
            if (username != "") {
                alert("Welcome again " + username);
            } else {
                username = prompt("Please enter your name:", "");
                if (username != "" && username != null) {
                    setCookie("username", username, 365);
                }
            }
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
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