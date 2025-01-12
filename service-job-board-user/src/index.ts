import express, { Request, Response } from 'express';
import AWS from 'aws-sdk';

const app = express();
const port = 4002;

// AWS SQS Configuration
const SQS = new AWS.SQS({ region: 'us-east-1' }); // Replace with your region
const queueUrl = 'https://sqs.us-east-1.amazonaws.com/194722438131/NotificationToUsersQueue'; // Replace with your SQS Queue URL

// SQS Polling Function
const processNotificationMessages = async () => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,   // Fetch up to 10 messages in a single request
    WaitTimeSeconds: 20,       // Enable long polling with a 20-second wait time
  };

  try {
    const response = await SQS.receiveMessage(params).promise();

    if (response.Messages) {
      for (const message of response.Messages) {
        // const jobDetails = JSON.parse(message['Body'] || '');
        const jobDetails = message['Body'] || "DUMMY DATA";
        // console.log('Processing notification for new job:', jobDetails.title);

        // Simulate sending a notification (e.g., email, push notification)
        console.log(`Notification sent for job: ${jobDetails}`);

        // Delete the message after successful processing
        await SQS.deleteMessage({
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle,
          } as any).promise();
      }
    }
  } catch (error) {
    console.error('Error processing SQS messages:', error);
  }

  // Continue polling after processing messages
  setTimeout(processNotificationMessages, 1000); // Poll again after 1 second
};

// Start polling when the server starts
processNotificationMessages();

// Express Route
app.get('/', (req: Request, res: Response) => {
  res.send('Job Board User Service with SQS Polling');
});

// Start Express Server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at USER SERVICE http://localhost:${port}`);
});