import React, { useState } from 'react'
import styled from 'styled-components'
import CountsCards from '../components/CountsCards'
import { counts } from '../utils/data'
import WeeklyStat from '../components/WeeklyStats'
import CategoryChart from '../components/CategoryChart'
import AddWorkout from '../components/AddWorkout'
import WorkoutCard from '../components/WorkoutCard'
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";

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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [todaysWorkouts, setTodaysWorkouts] = useState([]);
    const [workout, setWorkout] = useState(`#Legs
      -Back Squat
      -5 setsX15 reps
      -30 kg
      -10 min`);
      
        const dashboardData = async () => {
          setLoading(true);
          const token = localStorage.getItem("fittrack-app-token");
          await getDashboardDetails(token).then((res) => {
            setData(res.data);
            console.log(res.data);
            setLoading(false);
          });
        };
        const getTodaysWorkout = async () => {
          setLoading(true);
          const token = localStorage.getItem("fittrack-app-token");
          await getWorkouts(token, "").then((res) => {
            setTodaysWorkouts(res?.data?.todaysWorkouts);
            console.log(res.data);
            setLoading(false);
          });
        };
      
        const addNewWorkout = async () => {
          setButtonLoading(true);
          const token = localStorage.getItem("fittrack-app-token");
          await addWorkout(token, { workoutString: workout })
            .then((res) => {
              dashboardData();
              getTodaysWorkout();
              setButtonLoading(false);
            })
            .catch((err) => {
              alert(err);
            });
        };
      
        useEffect(() => {
          dashboardData();
          getTodaysWorkout();
        }, []);
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
            <AddWorkout
                workout={workout}
                setWorkout={setWorkout}
                addNewWorkout={addNewWorkout}
                buttonLoading={buttonLoading}
            />
        </FlexWrap>

        <Section>
            <Title>Todays Workout</Title>
            <CardWrapper>
                {todaysWorkouts.map((workout) => (
                <WorkoutCard workout={workout} />
                ))}
          </CardWrapper>
        </Section>
        </Wrapper>
    </Container>
    );
}

export default Dashboard