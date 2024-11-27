const aws_sandwich = {
    "aws_project_region": "sp_southeast-1",  // 替换为你的 Region
    "aws_cognito_region": "sp_southeast-1",  // 同样替换为你的 Region
    "aws_user_pools_id": "ap-southeast-1_IjaKNHN5k",  // 替换为你的 User Pool ID
    "aws_user_pools_web_client_id": "111cv6odnaocu71pr68qosr42t", // "1vg73tfgjo246ikvjtbqah3576", // "111cv6odnaocu71pr68qosr42t", // "6cc58a4esgfbhngiq8437afip1",// "6fq4fehkakj1fvm8jocji3prdi",  // 替换为你的 App Client ID
    // 用户池属性 email , username
    "aws_user_attributes": [
        "email",
        "locale",
        "preferred_username",
        "username",
    ],
    "oauth": {
        "domain": "sandwichlab.auth.ap-southeast-1.amazoncognito.com",
        "scope": [
            "email",
            "openid",
            "phone"
        ],
        "redirectSignIn": "http://localhost:3000/lexi,https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/oauth2/idpresponse",
        "redirectSignOut": "http://localhost:3000/lexi,https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/oauth2/idpresponse/",
        "responseType": "code"
    }
};

export default aws_sandwich;