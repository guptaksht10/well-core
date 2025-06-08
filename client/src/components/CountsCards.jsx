import React from 'react'
import styled from 'styled-components'

const Title = styled.div `
  font-weight: 600;
  font-size: 16px;
  color: ${props => props.theme.primary}; 
  @media (max-width: 600px) {
    font-size: 12px;
  }
`
const Card = styled.div `
  flex: 1;
  min-width : 200px;
  padding: 24px;
  display: flex;
  gap: 6px;
  border: ${
    props => props.theme.text_primary + 20
};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${
    props => props.theme.text_primary + 20
};
`
const Left = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    gap: 6px;
  }
`
const Value = styled.div `
  font-weight: 600;
  font-size: 32px;
  color: ${
    props => props.theme.text_primary
  };  
`
const Unit = styled.div `
  font-size : 14px;
  margin-bottom : 8px;
`  
const Span = styled.div `
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
  ${({postitve, theme}) => postitve ? `color: ${theme.green}` : `color: ${theme.red}`}

`
const Icon = styled.div `
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({bg}) => bg};
  color: ${({color}) => color};
`

const Desc = styled.div `
  font-size : 14px;
  margin-bottom : 6px;
  color: ${props => props.theme.text_secondary};
  @media (max-width: 600px) {
    font-size: 12px;
  }
`


const CountsCards = ({item, data}) => {
    return (
        <Card>
            <Left>
                <Title>{
                    item.name
                }</Title>
                <Value>
                    {data && data[item.key].toFixed(2)}
                    <Unit>{
                        item.unit
                    }</Unit>
                    <Span postitve>(+10%)</Span>
                </Value>
                <Desc>{item.desc}</Desc>
            </Left>
            <Icon color={item.color} bg={item.lightColor} >{
                item.icon
            }</Icon>
        </Card>
    )
}

export default CountsCards;
