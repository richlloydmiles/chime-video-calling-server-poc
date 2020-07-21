const express = require('express')
const app = express()
const AWS = require('aws-sdk')
const { v4: uuid } = require('uuid')
const cors = require('cors')
const region = 'us-east-1'

const chime = new AWS.Chime({ region })
chime.endpoint = new AWS.Endpoint(
    'https://service.chime.aws.amazon.com/console'
)

app.get('/meeting', cors(), async (req, res) => {
    try {
        const response = {}
        response.meetingResponse = await chime
            .createMeeting({
                ClientRequestToken: uuid(),
                MediaRegion: region,
            })
            .promise()
        
        response.attendee = await chime
        .createAttendee({
            MeetingId: response.meetingResponse.Meeting.MeetingId,
            ExternalUserId: uuid(),
        })
        .promise()

    res.send(response)
    } catch (err) {
        res.send(err)
    }
})

app.listen(5000, () => console.log(`Video calling POC server listening at http://localhost:5000`))
