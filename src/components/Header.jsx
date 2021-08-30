import React, { useRef } from 'react'
import { connect } from 'react-redux'

import { mapDispatchToProps, mapStateToProps } from '../store/reducers/mainReducer';
import { Navbar, Form, Button } from 'react-bootstrap'

function Header({ onToggleTodoModalMode, 
    onFindTodosBySubstr,
    onChangeTodolistMode,
 }) {

    const inputRef = useRef();

    return (
        <Navbar bg='light' variant='white'>
            <Navbar.Brand as={'a'} href='/' className='text-dark'>Todolist</Navbar.Brand>
            <Button variant='outline-info' className='ml-auto' onClick={onToggleTodoModalMode}>
                Add Todo
            </Button>
            <Button variant='outline-secondary ml-3' onClick={() => onChangeTodolistMode('favourites')}>
                Favourites
            </Button>
            <Form inline className='ml-3' onSubmit={e => {
                e.preventDefault();
                onChangeTodolistMode('sortedBySubstr')
            }}>
                <Form.Control ref={inputRef} placeholder='Search...'></Form.Control>
                <Button 
                type='submit'
                className='ml-3' 
                variant='outline-warning' 
                onClick={() => onFindTodosBySubstr(inputRef.current.value)}>
                    Find
                </Button>
            </Form>
        </Navbar>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
