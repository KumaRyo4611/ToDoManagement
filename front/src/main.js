window.onload = function() {
    vm.todos.length = 0;
    // XMLHttpRequestオブジェクトの作成
    var request = new XMLHttpRequest();

    // URLを開く
    request.open('GET', "http://localhost:5042/getAll", true);
    request.responseType = 'json'

    // レスポンスが返ってきた時の処理を記述 
    request.onload = function () {
        vm.todos.length = 0;
        var data = this.response;
        for (var i = 0; i < data.length; ++i) {
            var task = data[i];
            console.log(task);
            var recode = { id: task[0], tasks: task[1], limit: task[2], detail: task[3], category: task[4], remarks: task[5] };
            vm.todos.push(recode);
        }
    }

    // リクエストをURLに送信
    request.send();
}

var vm = new Vue({
    el: '.app-table',
    data: {
        sortOf: 0,
        sortType: true,
        todos: [
        ]
    },
    computed: {
        sortedTasks: function() {
            this.sortOf
            return this.todos.sort(this.cmp)
        }
    },
    methods: {
        cmp: function(a, b) {
            switch (this.sortOf) {
                case 0:
                    return this.sortType ? a.id - b.id : b.id - a.id
                case 1:
                    if (this.sortType) {
                        return (a.tasks > b.tasks) ? 1 : -1
                    } else {
                        return (a.tasks < b.tasks) ? 1 : -1
                    }
                case 2:
                    if (this.sortType) {
                        return (a.limit > b.limit) ? 1 : -1
                    } else {
                        return (a.limit < b.limit) ? 1 : -1
                    }
                case 3:
                    if (this.sortType) {
                        return (a.category > b.category) ? 1 : -1
                    } else {
                        return (a.category < b.category) ? 1 : -1
                    }
                default :
                    break
            }
        },
        dispdetail: function(todo) {
            detailvm.dispflg = true;
            detailvm.todo = todo;
        },
        
    }
})

var detailvm = new Vue({
    el: '.detail',
    data: {
        dispflg: false,
        addflg: false,
        todo: { id: 0, tasks: 'タスク', limit: '期限', detail: '詳細', category: 'カテゴリ', remarks: '備考' }
    },
    methods: {
        remove: function(todo) {
            // XMLHttpRequestオブジェクトの作成
            var request = new XMLHttpRequest();

            // URLを開く
            var delURL = "http://localhost:5042/deleteData/" + this.todo.id;
            request.open('GET', delURL, true);
            request.responseType = 'json'

            // レスポンスが返ってきた時の処理を記述 
            request.onload = function () {
                window.onload;
            }

            // リクエストをURLに送信
            request.send();
        }
    }
})

function add() {
    detailvm.dispflg = true;
    detailvm.addflg = true;
}