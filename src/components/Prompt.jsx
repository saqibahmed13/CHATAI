import { useState } from 'react'
import axios from 'axios'
import './Prompt.css'

function Prompt() {
  const [initialRes,setRes] = useState("response will be generated here!");
  const [askQuestion,setQuestion] = useState(" ")
  const questionHandlers = (event) => {
    setQuestion(event.target.value)
}

  async function generateAnswer(){
    setRes("Loading")
    const response = await axios({
      url:'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBTmv-hIZRLOGUEgCVkTZMuz9zlZ--q0WQ',
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
  <p key={index}>{point.trim()}</p>
));


    setRes(formattedResponse);  // this will display 
    //OR
    // setRes(response['data']['candidates'][0]['content']['parts'][0]['text'])

  }


  return (
  <>
  <div className='response-container'>
      <h1>Chat AI</h1>
      <br />
      <input type="text" placeholder='Enter the prompt'  value={askQuestion} onChange={questionHandlers}/>
      <br />
         <div className='input-container'>
         <button onClick={generateAnswer}>Generate Button</button>
         </div>
      <br />
      <pre>{initialRes}</pre>
    </div>
    </>
  )
}

export default Prompt
