import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  await Question.find({}, (err, data) => {
    if (err) {
      res.status(403).send({ message: 'error', contents: [] })
      // return console.error(err);
    }
    // console.log(data);
    res.status(200).send({ msg: {message: 'success', contents: data} })
  });
  // let data;
  // data = await Question.find().toArray();;
  // console.log(data);
  // // res.status(403).send({ message: 'error', contents: [] })
  // res.status(200).send({ message: 'success', contents: ["SOME DATA"]})
  // // res.json({ message: 'success', contents: ["SOME DATA"]})
  // res.json({ message: 'success', contents: ["SOME DATA"]})
  // res.json({ msg: { message: 'success', contents: ["SOME DATA"]} })
  
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  await Answer.find({}, (err, data) => {
    if (err) {
      res.status(403).send({ message: 'error', score: -1 })
      // return console.error(err);
    }
    // console.log(data);

  });
  // const s;
  // s = data.filter(q => q["answer"] == req[q["questionID"]-1]).length;

  const s = 0;
  console.log(req.length)
  console.log(req)
  console.log(req.toArray())
  for (var i = 0; req.length < i; i++) {
		if (req[i] == data[i]["answer"]) {
      s += 1;
    }
    console.log(data[i]["answer"])
  }
  
  res.status(200).send({ msg: {message: 'success', score: s} })
}
