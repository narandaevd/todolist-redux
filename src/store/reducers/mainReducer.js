// Начальное состояние
const initialState = {
    completed: 0,
    todos: [],
    sortedTodos: [],
    isActiveTodoModal: false,
    mode: 'all',
    substr: '',
}

//// Все action'ы

// Загрузка всех todo при старте страницы
const startLoadAction = dispatch => fetch('https://jsonplaceholder.typicode.com/todos?_limit=13')
        .then(res => res.json())
        .then(json => json.map((item, index) => ({ ...item, id: index, isFavourite: false })))
        .then(json => dispatch({ type: 'START_LOAD', data: json }))

// Удаление текущего todo
const deleteCurrentTodoAction = id => ({
    type: 'DELETE_CURRENT_TODO',
    todo: {
        id: id,   
    },
    updateData: (todos, id) => todos
        // Удаляем текущий todo
        .filter((_, index) => index !== id)
        // Изменяем id всех оставшихся
        .map((todo, index) => ({...todo, id: index})),
})

// Добавление в избранное
const toggleIsFavouriteAction = id => ({
    type: 'ADD_TODO_IN_FAVOURITES',
    todo: {
        id: id,
    },
    updateData: (todos, id) => todos
        .map((todo, index) => id === index ? { ...todo, isFavourite: !todos[id].isFavourite } : todo),
})

// Выполнение todo
const completedTodoAction = id => ({
    type: 'COMPLETED_TODO',
    todo: {
        id: id,   
    },
    updateData: (todos, id) => todos
        // Удаляем текущий todo
        .filter((_, index) => index !== id)
        // Изменяем id всех оставшихся
        .map((todo, index) => ({...todo, id: index})),
})

// Изменение режима модального окна
const toggleTodoModalModeAction = () => ({
    type: 'SET_TODO_MODAL_MODE',
})

// Добавление todo
const addTodoInTodolistAction = title => ({
    type: 'ADD_TODO_IN_TODOLIST',
    todo: {
        completed: false,
        id: null,
        isFavourite: false,
        title: title,
        userId: 1,
    },
    updateData: todos => todos.map((item, index) => ({...item, id: index})) 
})

// Нахождение по подстроке
const findTodosBySubstrAction = substr => ({
    type: 'FIND_TODOS_BY_SUBSTR',
    substr: substr,
})

// Изменения мода todolist 
const changeTodolistModeAction = mode => ({
    type: 'CHANGE_TODOLIST_MODE',
    mode: mode,
})

// Основной reducer
export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'START_LOAD':
            return { ...state, todos: [...action.data] }
        case 'DELETE_CURRENT_TODO':
            return { ...state, todos: action.updateData(state.todos, action.todo.id) }
        case 'SET_TODO_MODAL_MODE':
            return { ...state, isActiveTodoModal: !state.isActiveTodoModal}
        case 'ADD_TODO_IN_TODOLIST':
            return { ...state, todos: action.updateData([...state.todos, action.todo]), isActiveTodoModal: !state.isActiveTodoModal}
        case 'FIND_TODOS_BY_SUBSTR':
            return { ...state, substr: action.substr }
        case 'ADD_TODO_IN_FAVOURITES':
            return { ...state, todos: action.updateData(state.todos, action.todo.id) }
        case 'COMPLETED_TODO':
            return { ...state, todos: action.updateData(state.todos, action.todo.id), completed: state.completed + 1 }
        case 'CHANGE_TODOLIST_MODE':
            return { ...state, mode: action.mode }
        default:
            return state
    }
}

// Передаем state и dispatch как props
const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
        onStartLoad: () => dispatch(startLoadAction),
        onDeleteCurrentTodo: id => dispatch(deleteCurrentTodoAction(id)),
        onToggleIsFavourite: id => dispatch(toggleIsFavouriteAction(id)),
        onCompletedTodo: id => dispatch(completedTodoAction(id)),
        onToggleTodoModalMode: () => dispatch(toggleTodoModalModeAction()),
        onAddTodoInTodolist: title => dispatch(addTodoInTodolistAction(title)),
        onFindTodosBySubstr: substr => dispatch(findTodosBySubstrAction(substr)),
        onChangeTodolistMode: mode => dispatch(changeTodolistModeAction(mode)),
})

export { mapStateToProps, mapDispatchToProps }
