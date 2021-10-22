const searchInput = document.querySelector('#search-input');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VI';
recognition.continuous = false;

const microphone = document.querySelector('.microphone');

const speak = (text) => {
    if (synth.speaking) {
        console.error('Busy. Speaking...');
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    // utter.lang = 'vi-VI';
    // utter.lang = 'ja-JP';
    utter.text = text;
    synth.speak(utter);
};

const handleVoice = (text) => {
    console.log('text : ', text);

    const handledText = text.toLowerCase();
    if (handledText.includes('bật')){
        document.getElementById('phong').src='img/phong_bat_den.jpg';
        speak('Ok');
    }
     if (handledText.includes('tắt')){
        document.getElementById('phong').src='img/phong_tat_den.jpg';
        speak('Ok');
    }

    if (handledText.includes('facebook')){
        location.replace("https://www.facebook.com/")
        speak("OK");
    }


    if (handledText.includes('mấy giờ')) {
        var today = new Date();
        speak(today.getHours()+" hours "+today.getMinutes()+" minute ");
        return;
    }

    speak('sorry I do not understand');
}

microphone.addEventListener('click', (e) => {
    e.preventDefault();

    recognition.start();
    microphone.classList.add('recording');
});

recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
}

recognition.onerror = (err) => {
    console.error(err);
    microphone.classList.remove('recording');
}

recognition.onresult = (e) => {
    console.log('onresult', e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}
