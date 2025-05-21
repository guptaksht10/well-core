import React from 'react'

import { styled } from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 36px;
`
const Title = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: ${props => props.theme.text_primary};
`

const Span = styled.div`
    color: ${props => props.theme.text_secondary};
`

const Signup = () => {
  return (
    <Container> 
        <div>
            <Title>Hello ! Welcome to WellCore 👋</Title>
            <Span>Please signup with your details here</Span>
        </div>
        <div style = {{display: "flex", flexDirection: "column", gap: "20px"}}>
            <TextInput label = "Full Name" placeholder = "Enter your full name here"/>
            <TextInput label = "Email Address" placeholder = "Enter your email address here"/>
            <TextInput label = "Password" placeholder = "Enter your password here" password/>
            <Button text="SignUp" /> 

        </div>
    </Container>
  )
}

export default Signup