import React, { useState } from 'react'
import styled from 'styled-components'
import CountsCards from '../components/CountsCards'
import { counts } from '../utils/data'
import WeeklyStat from '../components/WeeklyStats'
import CategoryChart from '../components/CategoryChart'
import AddWorkout from '../components/AddWorkout'
import WorkoutCard from '../components/WorkoutCard'

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

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 0px 16px;
    @media screen and (max-width: 600px) {
        gap: 12px;
    }
`

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 100px;
    @media screen and (max-width: 600px) {
        gap: 12px;
    }
`
const Dashboard = () => {
    const [workout, setWorkout] = useState("")
    const data = {
        totalCaloriesBurnt: 13500,
        totalWorkouts: 6,
        avgCaloriesBurntPerWorkout: 2250,
        totalWeekCaloriesBurnt: {
            weeks: ["17th", "18th", "19th", "20th", "21st", "22nd", "23rd"],
            caloriesBurned: [1200, 1500, 1800, 2100, 2400, 2700, 3000]
        },
        pieChartData: [
            {
                id: 0,
                value: 6000,
                label: "Legs"
            },
            {
                id: 1, 
                value: 4000,
                label: "Arms"
            },
            {
                id: 2, 
                value: 2000,
                label: "Chest"
            },
            {
                id: 3, 
                value: 1000,
                label: "Shoulder"
            },
            {
                id: 4, 
                value: 500,
                label: "Abs"
            }
        ]
    }
  return (
    <Container>
        <Wrapper>
            {/* <Title>Dashboard</Title> */}
        <FlexWrap>
            {counts.map((item, index) => (
                <CountsCards key={index} item={item} data={data}/>
            ))}
        </FlexWrap>
        <FlexWrap>
            <WeeklyStat data={data}/>
            <CategoryChart data={data}/>
        </FlexWrap>
        <FlexWrap>
            <AddWorkout workout={workout} setWorkout={setWorkout}/>
        </FlexWrap>

        <Section>
            <Title>Todays Workout</Title>
            <CardWrapper>
                <WorkoutCard/>
                <WorkoutCard/>
                <WorkoutCard/>
                <WorkoutCard/>
            </CardWrapper>
        </Section>
        </Wrapper>
    </Container>
  )
}

export default Dashboard