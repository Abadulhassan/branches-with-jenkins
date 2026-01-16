exports.handler = async (event) => {
    console.log("Incoming event:", JSON.stringify(event));

    const response = {
        message: "Hello from AWS Lambda this best lambda responce ever!",
        input: event
        
    };

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "this code is from main branch "
        },
        body: JSON.stringify(response)
    };
};
