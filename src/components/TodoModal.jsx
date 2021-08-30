import React, { useRef } from 'react'
import { connect } from 'react-redux'

import { Modal, Form, Button } from 'react-bootstrap'
import { mapDispatchToProps, mapStateToProps } from '../store/reducers/mainReducer';

function TodoModal({ isActiveTodoModal, 
    onToggleTodoModalMode, 
    onAddTodoInTodolist }) {

    const inputRef = useRef();

    return (
        <div>
            <Modal show={isActiveTodoModal} onHide={onToggleTodoModalMode}>
                <Modal.Header closeButton>
                    <Modal.Title>Add todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control ref={inputRef} placeholder='Title of todo' />
                        <Button 
                            onClick={() => onAddTodoInTodolist(inputRef.current.value)}
                            variant='outline-success' 
                            className='mt-3'>
                                Add todo
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoModal)
