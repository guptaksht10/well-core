import React from 'react'

import { styled } from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 36px;
`
const Title = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: ${props => props.theme.text_primary};
`

const Span = styled.div`
    color: ${props => props.theme.text_secondary};
`

const Signup = () => {
      const SignUp = () => {
      const dispatch = useDispatch();
      const [loading, setLoading] = useState(false);
      const [buttonDisabled, setButtonDisabled] = useState(false);
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    
      const validateInputs = () => {
        if (!name || !email || !password) {
          alert("Please fill in all fields");
          return false;
        }
        return true;
      };
    
      const handelSignUp = async () => {
        setLoading(true);
        setButtonDisabled(true);
        if (validateInputs()) {
          await UserSignUp({ name, email, password })
            .then((res) => {
              dispatch(loginSuccess(res.data));
              alert("Account Created Success");
              setLoading(false);
              setButtonDisabled(false);
            })
            .catch((err) => {
              alert(err.response.data.message);
              setLoading(false);
              setButtonDisabled(false);
            });
        }
      };
      return (
        <Container>
          <div>
          <Title>Hello ! Welcome to WellCore 👋</Title>
            <Span>Please signup with your details here</Span>
        </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
            }}
          >
            <TextInput
              label="Full name"
              placeholder="Enter your full name"
              value={name}
              handelChange={(e) => setName(e.target.value)}
            />
            <TextInput
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              handelChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              password
              value={password}
              handelChange={(e) => setPassword(e.target.value)}
            />
            <Button
              text="SignUp"
              onClick={handelSignUp}
              isLoading={loading}
              isDisabled={buttonDisabled}
            />
          </div>
        </Container>
      );
    };
    
}

export default Signup