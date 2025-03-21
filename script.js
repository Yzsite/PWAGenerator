document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const resultDiv = document.getElementById('result');
    const generatedUrlSpan = document.getElementById('generatedUrl');
    const pwaDisplayDiv = document.getElementById('pwaDisplay');
    const pwaImage = document.getElementById('pwaImage');
    const pwaTitle = document.getElementById('pwaTitle');
    const pwaLink = document.getElementById('pwaLink');

    // PWA として起動されたか判定
    if (window.matchMedia('(display-mode: standalone)').matches) {
        const storedImage = localStorage.getItem('pwaImage');
        const storedTitle = localStorage.getItem('pwaTitle');
        const storedUrl = localStorage.getItem('pwaUrl');

        if (storedImage && storedTitle && storedUrl) {
            pwaImage.src = storedImage;
            pwaTitle.textContent = storedTitle;
            pwaLink.href = storedUrl;

            document.querySelector('.container').style.display = 'none'; // メインコンテンツを非表示
            pwaDisplayDiv.style.display = 'block'; // PWA表示
        } else {
            // データがない場合はエラーメッセージを表示するか、フォームを表示する
            alert("PWA data not found. Please upload again.");
        }
    }


    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const imageFile = document.getElementById('image').files[0];
        const title = document.getElementById('title').value;
        const url = document.getElementById('url').value;

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64Image = reader.result;
            const uuid = generateUUID();
            const generatedUrl = `https://example.com/?uuid=${uuid}`;

            // localStorage に保存
            localStorage.setItem('pwaImage', base64Image);
            localStorage.setItem('pwaTitle', title);
            localStorage.setItem('pwaUrl', url);


            generatedUrlSpan.textContent = generatedUrl;
            resultDiv.style.display = 'block';
        };

        reader.readAsDataURL(imageFile);
    });

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    // Service Worker の登録 (PWA 化に必要)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }

});
