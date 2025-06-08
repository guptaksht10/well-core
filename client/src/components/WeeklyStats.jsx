import React from 'react'
import styled from 'styled-components'
import { BarChart } from '@mui/x-charts/BarChart'
const Card = styled.div`
    flex: 1;
    min-width: 280px;
    padding: 24px;
    border-radius: 14px;
    border: 1px solid ${props => props.theme.text_secondary};
    box-shadow: 1px 6px 20px 0px ${props => props.theme.text_secondary + 20};
    display: flex;
    gap: 6px;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        padding: 16px;
    }
`
const Title = styled.div`
    padding: 0px 16px;
    font-size: 22px;
    color: ${props => props.theme.primary};
    font-weight: 800;
`

const WeeklyStats = ({data}) => {
  return (
    <Card>
        <Title>Weekly Calorie Burnt</Title>
        <div style={{
            width: '100%',
            height: '500px',
            background: '#f5f5f5',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            {data?.totalWeekCaloriesBurnt && (
                <BarChart
                xAxis={[
                    {ScaleType: "band", data: data?.totalWeekCaloriesBurnt?.weeks}]}
                series={[
                    {data: data?.totalWeekCaloriesBurnt?.caloriesBurned, color: '#41C1A6'}]}
                height={500} />
            )}
        </div>
    </Card>
  )
}

export default WeeklyStats