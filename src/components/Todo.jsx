import React from 'react'
import { Button } from 'react-bootstrap'

function Todo({ id, title, isFavourite,
    onDeleteCurrentTodo, 
    onToggleIsFavourite, 
    onCompletedTodo, }) {
    return (
        <div className='border rounded-lg m-3 p-3 row bg-white'>
            <div className='w-75 text-left'><h2>{title}</h2></div>
            <div className='ml-auto'>
                <Button variant='outline-success' onClick={() => onCompletedTodo(id)}>
                    <i className='bi bi-check-lg text-success'></i>
                </Button>
                {isFavourite ?
                    <Button variant='primary' className='ml-3' onClick={() => onToggleIsFavourite(id)}>
                        <i className="bi bi-star text-light"></i>
                    </Button>
                :
                    <Button variant='outline-secondary' className='ml-3' onClick={() => onToggleIsFavourite(id)}>
                        <i className="bi bi-star"></i>
                    </Button>
                }    
                <Button variant='outline-danger' className='ml-3' onClick={() => onDeleteCurrentTodo(id)}>
                    <i className="bi bi-trash text-danger"></i>
                </Button>
            </div>
        </div>
    )
}

export default Todo
