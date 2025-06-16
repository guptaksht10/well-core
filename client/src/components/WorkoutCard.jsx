import { FitnessCenterRounded, TimelapseRounded } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    flex: 1;
    min-width: 250px;
    max-width: 400px;
    padding: 16px 18px;
    border: 1px solid ${props => props.theme.text_secondary};
    box-shadow: 1px 6px 20px 0px ${props => props.theme.text_secondary + 20};
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    @media screen and (max-width: 600px) {
        padding: 12px 14px;
    }
`
const Category = styled.div`
    width: fit-content;
    font-size: 14px;
    color: ${props => props.theme.primary};
    padding: 4px 10px;
    border-radius: 8px; 
    font-weight: 500;
    background: ${props => props.theme.primary + 20};
`
const Name = styled.div`
    font-size: 20px;
    color: ${({theme}) => theme.text_primary};
    font-weight: 600;
`

const Sets = styled.div`
    font-size: 15px;
    color: ${props => props.theme.text_secondary};
    font-weight: 500;
    display: flex;
    gap: 6px;
`
const Flex = styled.div`
    display: flex;
    gap:16px;   
`
const Details = styled.div`
    font-size: 15px;
    color: ${props => props.theme.text_primary};
    font-weight: 500;
    display: flex;
    gap: 6px;
    align-items: center;
`
const WorkoutCard = ({ workout }) => {
    return (
      <Card>
        <Category>#{workout?.category}</Category>
        <Name>{workout?.workoutName}</Name>
        <Sets>
          Count: {workout?.sets} sets X {workout?.reps} reps
        </Sets>
        <Flex>
          <Details>
            <FitnessCenterRounded sx={{ fontSize: "20px" }} />
            {workout?.weight} kg
          </Details>
          <Details>
            <TimelapseRounded sx={{ fontSize: "20px" }} />
            {workout?.duration} min
          </Details>
        </Flex>
      </Card>
    );
  };
  
  

export default WorkoutCard