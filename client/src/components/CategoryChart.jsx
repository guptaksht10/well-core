import React from 'react'
import styled from 'styled-components'
import { PieChart } from '@mui/x-charts/PieChart'
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

const CategoryChart = ({data}) => {
  return (
    <Card>
        <Title>Calories Burn Categories Weekly</Title>
        <div style={{
            width: '100%',
            height: '500px',
            background: '#f5f5f5',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            {data?.pieChartData && (
                <PieChart
                series={[{
                    data: data?.pieChartData,
                    innerRadius: 30,
                    outerRadius: 200,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    
                }]}
                height={500} />
            )}
        </div>
    </Card>
  )
}

export default CategoryChart