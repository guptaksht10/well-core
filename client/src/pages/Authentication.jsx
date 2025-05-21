import React, { useState } from 'react'

import { styled } from 'styled-components'
import Signin from '../components/Signin'
import Signup from '../components/Signup'

const Container = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    background-color: ${props => props.theme.bg};
    @media (max-width: 768px) {
        flex-direction: column;
    }

`
const Left = styled.div`
    position: relative;
    flex: 2;
    @media (max-width: 768px) {
        display: none;
    }
`

const Image = styled.img`
    postion: relative;
    width: 100%;
    height: 100%;
`   

const Logo = styled.img`
    position: absolute;
    top: 40px;
    width:70px;
    left: 100px;
    z-index: 10;
`

const Right = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 40px;
    align-items: center;
    justify-content: center;
    gap:16px;

`

const Text = styled.div`
    font-size: 16px;
    color: ${props => props.theme.text_secondary};
    text-align: center;
    margin-top: 16px;
    @media (max-width: 400px) {
        font-size: 14px;
    }
`
const TextButton = styled.span`
    color: ${props => props.theme.primary};
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
`

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
    <Container>
        <Left>
           <Logo src="/Images/logo.png" alt="Logo" />
            <Image src="/Images/AuthImage.jpg" alt="Auth Image" />

        </Left>
        <Right>
            {isLogin ? (
                <>
                    <Signin />
                    <Text>Don't have an account ? <TextButton onClick = {() => setIsLogin(false)}>SignUp</TextButton></Text>
                </> 
            ): (
                <>  
                    <Signup />
                    <Text>Already have an account ? <TextButton onClick = {() => setIsLogin(true)}>Signin</TextButton></Text>

                </>
            )}
        </Right>
    </Container>
  )
}

export default Authentication