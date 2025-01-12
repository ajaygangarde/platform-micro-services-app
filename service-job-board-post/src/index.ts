
import express, { Request, Response } from 'express';
// import entire SDK
import AWS from 'aws-sdk';
const  SNS = new AWS.SNS({region:"us-east-1"})

const app = express();
const port = 4001;

const publishJobPostedEvent = async (jobDetails:any) => {
    const params = {
      TopicArn: 'arn:aws:sns:us-east-1:194722438131:NewJobPostedTopic', // Replace with your Topic ARN
      Message: JSON.stringify(jobDetails),
    };
  
    try {
      await SNS.publish(params).promise();
      console.log('Job posted event published to SNS');
    } catch (error) {
      console.error('Error publishing job event:', error);
    }
  };

app.get('/', (req: Request, res: Response) => {

    // Example usage
publishJobPostedEvent({
    jobId: '12345',
    title: 'Senior Fullstack Developer',
    location: 'Remote',
    company: 'Tech Solutions',
    description: 'Join our team as a Senior Fullstack Developer...',
  });

res.send('Job Board Post Service');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});