import  React, { usestate, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import Header from './header'

function Login() {
const history = useHistory();
useEffect(() => {
    
}
)
}   

return (
    <div>
        <Header>
            <h1>
                Login Panel 
            </h1>
            <div>
                <input type='text' placeholder='Username' className='form-control' />
            </div>
        </Header>
    </div>
)

export default Login;