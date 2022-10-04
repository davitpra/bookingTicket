import React from 'react';
import { useMachine } from '@xstate/react';
import bookingMachine from '../Machines/bookingMachine';

export const BaseLayout = ()=> {
    const [state,send] = useMachine(bookingMachine)

    console.log('machine', state)
    
    return (
        <div>State Machine</div>
    )
}