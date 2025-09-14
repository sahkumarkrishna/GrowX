const templates = [
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/1988.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121327Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=67dc4fb8e0a8c510c790d8e8180d3224dc1393df3809d36146e370abcef04adf",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/33456.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121432Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1a36329f670690978298ce21c69fc6dddeedec8ea61bd3b90205226a4b59be04",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/30855.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121516Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=d0c6f1434fd81eba36458b6d1732be9d299e077f9b58cc4628954f3aee507b2a",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/6024.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121543Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4cf50c6f81eae2e2223d0a954253dd1488251849c6d47c3e8bfc641cc7632d6d",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/6031.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121617Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=9b31effa47a2a3adb5f6f8adb59d5b6da701e523ba226b293becb4db1af4dbc6",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/22525.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121649Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=0eda4ed3ee337dfccc26bef572e6ea349eb546dc55c86e94bb40bad470637b39",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/36213.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121730Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=4111db31752e51928c480d4547522578ecddcdbd9919cf992f3ab95e4b254764",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/30804.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T120302Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=a7143efaa2ccfa9f1b500d6c366521dabc908c41687b00a1f57ed4cd03b5106e",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/22039.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121846Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=ef1403007a52279ea283264a7ed67f5c65c97faca0aad1b733092742d94284d5",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/19515.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121944Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=264f8865efb55f40dd6714f47965fca27d769a0d9e7edb7de044cef867861f50",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/33574.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T122042Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=1c0f198013da1beac6bb530e7492526751a4d9e080a7d0a3b1edcd214c3a0ecb",
  },
  {
    preview: "https://writelatex.s3.amazonaws.com/published_ver/5312.jpeg?X-Amz-Expires=14400&X-Amz-Date=20250911T121259Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWJBOALPNFPV7PVH5/20250911/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=010bc8a0c9eb3c67d61b934d21de18947ba8e9950207e48eb250f1db0e9ea819",
  },
];

export default templates;
