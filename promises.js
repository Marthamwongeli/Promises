// Write an asynchronous function that accepts a message string and a delay time in milliseconds.
// The function should log the message to the console after the specified delay time.
async function message(){
    console.log("My name is Martha");
};
setTimeout(message,2000);
//    //You have an array of user IDs and a function getUserData(id) that returns a Promise with user data when given
//    // a user ID. Write an asynchronous function that fetches and logs the data for each user ID one by one, in sequence.
   async function getUserData(id) {
    return new Promise((resolve) => {
   
        resolve(`User data for ID ${id}`);
      })
    }
  
  const userIds = [10, 20, 35, 48, 56];
  async function fetchAndLogUserData(userIds) {
    const results = await userIds.reduce(async (previousPromise, id) => {
      await previousPromise;
      const userData = await getUserData(id);
           console.log(userData);
      return getUserData(id + 1);
    }, Promise.resolve());
    console.log('All user data has been logged.');
  }
fetchAndLogUserData(userIds);
// //You have an asynchronous function performTask() that returns a Promise. The Promise resolves if the task is successful and rejects if
// //there's an error. Write a function that calls performTask() and logs a custom success message if the task is successful, and a custom
// // error message if there's an error.
const workDone = false;
const workPromise = new Promise((resolve,reject)=>{
    if(workDone){
        resolve("I finished it successfully")
    }
    else{
        reject("I will try it one more time")
    }
});

workPromise.then((response)=>{
    console.log(response);
    console.log("work accomplished successfully");
})
.catch((error)=>{
    console.log(error);
    console.log("I will continue working");
})
.finally(()=>{
    console.log("The work has been accomplished");
})

async function performTask(){
    try{
        await workPromise
    }
    catch{console.log();
        console.log("There's always a second chance");

    }
}
performTask();
// Retry Logic:
// Scenario:
// Write a function unstableTask that:

// 1.Accepts a taskName and failureProbability (a number between 0 and 1).
// 2. Returns a Promise that:
// Resolves immediately with a success message if a randomly generated number is greater than failureProbability.
// Rejects immediately with a failure message if a randomly generated number is less than or equal to failureProbability.
// Write another function executeWithRetry that:

// Accepts a taskName, retries, and failureProbability.
// Uses a retry mechanism to attempt the unstableTask up to retries times.
// Logs whether the task succeeded or failed after all attempts.

function unstableTask(taskName, failureProbability) {
    return new Promise((resolve, reject) => {
        const randomValue = Math.random();
        if (randomValue > failureProbability) {
            resolve(`${taskName} succeeded`);
        } else {
            reject(`${taskName} failed`);
        }
    });
}

async function executeWithRetry(taskName, retries, failureProbability) {
    let attempt = 0;
    while (attempt < retries) {
        try {
            await unstableTask(taskName, failureProbability);
            console.log(`${taskName} succeeded after ${attempt + 1} attempts.`);
            return;
        } catch (error) {
            console.error(`${taskName} failed on attempt ${attempt + 1}.`);
            attempt++;
        }
    }
    console.error(`${taskName} failed after ${retries} attempts.`);
} 

executeWithRetry("SampleTask", 3, 0.5);






