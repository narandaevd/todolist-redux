import React, { useEffect } from 'react'
import Todo from './Todo'
import _ from 'lodash'

import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './../store/reducers/mainReducer'

import { Spinner } from 'react-bootstrap'
import TodoModal from './TodoModal'

function Todolist(props) {

    function renderTodolistAccordingToMode() {
        const JSXTodos = props.todos.map(todo => <Todo 
                {...todo}
                onDeleteCurrentTodo={props.onDeleteCurrentTodo} 
                onToggleIsFavourite={props.onToggleIsFavourite}
                onCompletedTodo={props.onCompletedTodo}
            />
        );
        switch (props.mode) {
            case 'all':        
                return JSXTodos
            case 'sortedBySubstr':
                return JSXTodos.filter(JSXTodo => JSXTodo.props.title.includes(props.substr))
            case 'favourites':
                return JSXTodos.filter(JSXTodo => JSXTodo.props.isFavourite)
            default:
                return []
        }
    }

    useEffect(() => {
        props.onStartLoad();
    }, []);

    return (
        <div className='mt-5'>
            <TodoModal />
            {props.completed > 0 ?
                <div className='border rounded-lg p-3 m-3 bg-white'>
                    <h3>Completed todos: {props.completed}</h3>
                </div> : null
            }
            {_.isEmpty(props.todos) ? 
                <div className='p-5 m-5 row'>
                    <div className="border rounded-lg p-5 mx-auto bg-white">
                        <Spinner animation='border' />
                    </div>
                </div>
            :
            _.isEmpty(renderTodolistAccordingToMode()) ?
                <div className='border rounded-lg m-3 p-5 row bg-white'>
                    <h1 className='mx-auto'>Not founded ({props.mode})</h1>
                </div>
            :
                renderTodolistAccordingToMode()
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist)
