import { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Box, Typography } from '@mui/material';

function Prompt() {
  const [initialRes,setRes] = useState("response will be generated here!");
  const [askQuestion,setQuestion] = useState(" ")
  const questionHandlers = (event) => {
    setQuestion(event.target.value)
}

  async function generateAnswer(){
    setRes("Loading")
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAdQXfYE1wK74wQqGD6NlQHNCfruRISkP0",
      method:"POST",
      data:{
        contents:[
          {parts:[{text:askQuestion}]}
        ],
      }
    });


//console.log(response.data.candidates[0].content.parts[0].text); this is to display in console

const textResponse = response.data.candidates[0].content.parts[0].text
const cleanResponse = textResponse.replace(/[^a-zA-Z0-9\s]/g, '').trim();
const points = cleanResponse.split('\n').filter(point => point.trim());

// Format the response as a paragraph or list
const formattedResponse = points.map((point, index) => (
  <Typography key={index} variant="body1" component="p" gutterBottom>
          {point.trim()}
        </Typography>
));


    setRes(formattedResponse);  // this will display 
    //OR
    // setRes(response['data']['candidates'][0]['content']['parts'][0]['text'])

  }


  return (
  <>
<Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Chat AI
      </Typography>

      {/* Flexbox container to center the TextField and Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',      // Center vertically
        gap: 2, 
        marginBottom: 2 
      }}>
        <TextField
          label="Enter the prompt"
          variant="outlined"
          value={askQuestion}
          onChange={questionHandlers}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              generateAnswer();
            }
          }}
          size="small"  // Decrease size of the TextField
          sx={{ maxWidth: '400px' }}  // Optional: Set a maximum width
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={generateAnswer}
        >
          Generate
        </Button>
      </Box>

      <Box sx={{ textAlign: 'left', whiteSpace: 'pre-wrap', marginTop: 2 }}>
        {initialRes}
      </Box>
    </Box>
    </>
  )
}

export default Prompt
