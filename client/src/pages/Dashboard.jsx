import React from 'react'
import styled from 'styled-components'
import CountsCards from '../components/CountsCards'
import { counts } from '../utils/data'

const Container = styled.div`
    flex: 1;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 22px 0px;
    overflow-y: scroll;
`
const Wrapper = styled.div`
    flex: 1;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    @media screen and (max-width: 600px) {
        gap: 12px;
    }
`
const Title = styled.div`
    padding: 0px 16px;
    font-size: 22px;
    color: ${props => props.theme.text_primary};
    font-weight: 500;
`

const FlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 22px;
    padding: 0px 16px;
    @media screen and (max-width: 600px) {
        gap: 12px;
    }
`
const Dashboard = () => {
  return (
    <Container>
        <Wrapper>
            <Title>Dashboard</Title>
        <FlexWrap>
            {counts.map((item, index) => (
                <CountsCards key={index} item={item}/>
            ))}
        </FlexWrap>
        </Wrapper>
    </Container>
  )
}

export default Dashboard