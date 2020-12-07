import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4100/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question_no, setCurrentQuestionNo] = useState(1) // index to current question
  // const [current_question, setCurrentQuestion] = useState({}) // current question

  const next = async () => {
    // const tmp = current_question_no;
    
    // setCurrentQuestion(contents.find(element => element["questionID"] == tmp + 1));
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    
    if (current_question_no == contents.length) {
      setComplete(true);
      const {
        data: { msg }
      } = await instance.post('/checkAns', { params: { ans } })
      
      console.log(msg)
      setScore(msg.score)
      // console.log(msg.contents.length)
    } else {
      setCurrentQuestionNo(current_question_no + 1);
    }

  }

  const choose = (e) => {
    // TODO : update 'ans' for the option you clicked
    // console.log(e.target.value)
    setAns([...ans, e.target.value])
  }

  const getQuestions = async () => {
    // TODO : get questions from backend
    const {
      data: { msg }
    } = await instance.get('/getContents')
    // console.log(msg.contents)
    // console.log(msg.contents.length)
    
    setContents(msg.contents)

    return msg
  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
      console.log(contents)
  })

  var questionnow;

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              {`Question ${current_question_no} of ${contents.length}`}
            </div>
          </div>

          {complete ? 
          <div id="question-title">
          {score}
          </div>
          :
          <div id="question-title">
            { contents.find(element => element["questionID"] == current_question_no)["question"] }
          </div>

          }

          {complete ? <div></div> :
          <>
            
            
            <div id="options">
              { contents.find(element => element["questionID"] == current_question_no)["options"].map((option, i) => 
              <div className="each-option"> 
                <input 
                  type="radio"
                  // name=
                  id={`q${contents.find(element => element["questionID"] == current_question_no)["questionID"]}_${i}`}
                  value={i + 1}
                  // checked=
                  onClick={choose}
                />
                <span> { option } </span>
              </div>
              )}            
            </div>

            
            <div id="actions" onClick={next}>
              NEXT
            </div>
          </>}
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
