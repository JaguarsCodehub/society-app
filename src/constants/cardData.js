const cardsData = [
    {
        title: 'Chat with the community',
        subTitle: 'Raise an issue regarding the society concern or any query regarding any specific topic',
        buttonText: 'Join the society channel',
        bgColor: '#FFD6B5',
        bgBorderColor: "#EA6E0C",
        textColor: '#EA6E0C',
        buttonColor: '#EA6E0C',
        imageSource: require('../../assets/vendor.png'), // example image
        onPress: () => console.log('Go to Discord'),
    },
    {
        title: 'Watch who visits your society',
        subTitle: 'Expo\'s Snack lets you try Expo with zero local setup.',
        buttonText: 'Create a Snack',
        buttonColor: '#00BE47',
        bgColor: '#D4FFE4',
        bgBorderColor: "#00BE47",
        textColor: '#00BE47',
        imageSource: require('../../assets/camera.png'), // example image
        onPress: () => console.log('Add a Visitor'),
    },
];

export default cardsData