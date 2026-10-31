const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Create a new service instance for each test to ensure isolation
        service = new TodoService();
        // This is a bit of a hack to reset the singleton for testing purposes
        service.todos = [];
    });

    test('should add a new todo', () => {
        const text = 'Buy groceries';

        service.addTodo(text);

        expect(service.todos).toHaveLength(1);
        expect(service.todos[0].text).toBe(text);
    });

    test('should toggle the completed state of a todo', () => {
        service.addTodo('Buy groceries');
        const todoId = service.todos[0].id;

        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(true);

        service.toggleTodoComplete(todoId);
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        service.addTodo('Buy groceries');
        const todoId = service.todos[0].id;

        service.removeTodo(todoId);

        expect(service.todos).toHaveLength(0);
    });

    test('should not add a todo if text is empty', () => {
        service.addTodo('');

        expect(service.todos).toHaveLength(0);
    });
});
