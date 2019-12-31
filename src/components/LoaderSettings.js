const loadingText = "Patientez";
const  loaderEmotji = ['🐶','🐱','🐭','🐹','🐰','🐦','🐤','🐕','🐩','🐈','🐇','🐁','🐀','🐿','🦔'];

export const getLoadingText = () => {
    let emotjis = loaderEmotji;
    return `${loadingText} ${emotjis[Math.floor(Math.random() * emotjis.length)]}`;
};
