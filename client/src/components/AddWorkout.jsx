import React from 'react'
import styled from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'

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

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card>
        <Title>Add New Workout</Title>
        <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:

#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />
      <Button
        text="Add Workout"
        small
        onClick={() => addNewWorkout()}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  )
}

export default AddWorkout