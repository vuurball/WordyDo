
//dialog window for adding new words
var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function() {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
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
        ],
        learnedwords: [],
        hiddenwords: [],
        db: ''
    },
    ready: function() {
        //connect to db
        this.db = new Firebase('https://olgabdb-f2ace.firebaseio.com/');
        //populate lists from db and register changes-feed listener 
        this.registerChangesFeed();
    },
    methods: {
        //populates lists from db, and listens to added/removed changes
        registerChangesFeed: function() {
            var vuethis = this;
            var listNames = ['mywords', 'learnedwords', 'hiddenwords'];
            listNames.forEach(function(listName) {
                var cur_list = vuethis.getListByName(listName);
                //register child_added event on all lists
                vuethis.db.child('vocab/' + listName).on('child_added', function(snapshot) {
                    cur_list.push({id: snapshot.name(), trans: snapshot.val().trans, origin: snapshot.val().origin, showHint: false});
                }
                );
                //register child_removed event on all lists
                vuethis.db.child('vocab/' + listName).on('child_removed', function(snapshot) {
                    vuethis.removeFromVueList(snapshot.name(), cur_list);
                });
            });
        },
        //remove word from list by wordId
        removeFromVueList: function(wordId, list) {
            var i = list.map(item => item.id).indexOf(wordId); // find index the item in a list
            list.splice(i, 1); // remove it from the list          
        },
        //add new word to collection - mywords 
        addNewWord: function() {
            var newWordObj = {trans: this.newWordTrans, origin: this.newWordOrigin, showHint: false};
            this.db.child('vocab/mywords').push(newWordObj, function() {});
            this.resetNewWord();
        },
        resetNewWord: function() {
            this.newWordOrigin = this.newWordTrans = '';
        },
        removeWord: function(item) {
            this.moveWord(item, 'mywords', 'hiddenwords');
        },
        markLearned: function(item) {
            this.moveWord(item, 'mywords', 'learnedwords');
        },
        unHideAWord: function(item) {
            this.moveWord(item, 'hiddenwords', 'mywords');
        },
        learnWordAgain: function(item) {
            this.moveWord(item, 'learnedwords', 'mywords');
        },
        //move word from collection to collection
        moveWord: function(item, from, to) {
            this.db.child('vocab/' + to).push(item, function() {
            });
            this.db.child('vocab/' + from + '/' + item.id).remove();
        },
        toggleLanguage: function() {
            this.showTrans = !this.showTrans;
        },
        toggleHint: function(item) {
            item.showHint = !item.showHint;
        },
        //get the relevant list instance by name
        getListByName: function(listName) {
            switch (listName) {
                case 'mywords':
                    return this.mywords;
                case 'learnedwords':
                    return this.learnedwords;
                case 'hiddenwords':
                    return this.hiddenwords;
            }
        },
    },
});
