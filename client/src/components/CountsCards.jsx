import React from 'react'
import styled from 'styled-components'

const Title = styled.div``  
const Card = styled.div``
const Left = styled.div``
const Value = styled.div``
const Unit = styled.div``
const Span = styled.div``
const Icon = styled.div``


const CountsCards = ({item}) => {
  return (
    <Card>
        <Left>
            <Title>{item.name}</Title>
            <Value>
                1200
                <Unit>{item.unit}</Unit>
                <Span postitve>(+10%)</Span>
            </Value>
        </Left>
        <Icon>{item.icon}</Icon>
    </Card>
  )
}

export default CountsCards