const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplates')
const Survey = require('../models/Survey')

module.exports = app => {
  app.get('/api/surveys', (req, res) =>{
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/thanks', requireLogin, requireCredits, async(req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    // send email
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()
      res.send(user)
    } catch(err) {
      res.status(422).send(err)
    }
  })
}
