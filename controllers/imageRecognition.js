const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = 'df9d476fca524a10b10648ebcf6ac538';
    const USER_ID = 'fancypigeon5';       
    const APP_ID = 'smartbrain';   
    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  
    return requestOptions
  }

const handleImageRecognition = (req, res) => {
    fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, returnClarifaiRequestOptions(req.body.input))
        .then(response => response.json())
        .then(result => {
            res.json(result);
        })
}

export default handleImageRecognition;