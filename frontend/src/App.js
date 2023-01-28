import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import data from "./global";
import UserFrame from "./UserFrame";

function App() {
  const [usernames, setUsernames] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/image/usernames")
      .then((res) => res.json())
      .then(
        (result) => {
          setUsernames(result.files);
        },
        (error) => {
          console.error(error);
        }
      );
  }, []);

  console.log("username " + data.username);

  if (data.username === null) {
    navigate("/login/");
  }

  return (
    <Container>
      {usernames.map((username) => {
        return <UserFrame key={username} username={username} />;
      })}
    </Container>
  );
}

export default App;
