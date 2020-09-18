(function() {
    'use strict';

    function app(target) {
        return new Vue({
            el: target, 
            data: {
                newItem: '',
                todos: [{
                    title: 'task 1',
                    isDone: false
                },{
                    title: 'task 2',
                    isDone: false
                },{
                    title: 'task 3',
                    isDone: true
                }]
            },
            watch: {
                todos: {
                    handler: function() {
                        localStorage.setItem('todos', JSON.stringify(this.todos));
                    },
                    deep: true
                }
            },
            mounted: function() {
                this.todos = JSON.parse(localStorage.getItem('todos')) || [];
            },
            methods: {
                addItem: function() {
                    var item = {
                        title: this.newItem,
                        isDone: false
                    };
                    this.todos.push(item);
                    this.newItem = '';
                },
                deleteItem: function(index) {
                    if (confirm('消去しますか?')) {
                        this.todos.splice(index, 1);
                    }
                },
                purge: function() {
                    if (!confirm('全て消去しますか?')) {
                        return;
                    }
                    this.todos = this.remaining;
                }
            },
            computed: {
                remaining: function() {
                    return this.todos.filter(function(todo) {
                        return !todo.isDone;
                    });
                }
            }
        });
    }

    const vm1 = app('#app1');
    const vm2 = app('#app2');
    const vm3 = app('#app3');
})();