// Находим все кнопки и все формы
let tabButtons = document.querySelectorAll('.tabs__btn');
let forms = document.querySelectorAll('.form');

let clear = function() {
    let FormsEl = document.querySelectorAll('.form')

    FormsEl.forEach(btn => {
        btn.classList.remove("form--active")
    })
}

tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        tabButtons.forEach(btn2 =>  {
            btn2.classList.remove('tabs__btn--active')
        })
        btn.classList.add('tabs__btn--active')


        letSelectedType = this.dataset.type

        clear()
        

        let officialEl = document.querySelector("#officialForm")
        let letterFormEl = document.querySelector("#letterForm")
        let organizationFormEl = document.querySelector("#organizationForm")

        if (letSelectedType === "official") {
            officialEl.classList.add('form--active')
        }

        else if (letSelectedType === "letter") {
            letterFormEl.classList.add('form--active')
        }

        else if (letSelectedType === "organization") {
            organizationFormEl.classList.add('form--active')
        }


    })


})


// бланк организации //

let formOrganizationEl = document.querySelector('.form__sumbit--organization')
formOrganizationEl.addEventListener('click', function() {


let OrgParentName = document.querySelector("#org-parent-name").value
let OrgName = document.querySelector("#org-name").value
let ShortName = document.querySelector("#short-name").value
let CityName = document.querySelector("#city-name").value
let NumberName = document.querySelector("#number-count").value
let TextValue = document.querySelector("#text-value").value


    let wordDoc = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Угловой бланк</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
            background: #f5f5f5;
            
            width:595px;
            padding: 20px;
        }

        /* Бланк */
        .blank {
            width: 595px
            min-height: 1000px;
            background: white;
            padding: 20px;
            
            position: relative;
        }

        /* ВСЕ В ЛЕВОМ ВЕРХНЕМ УГЛУ */
        .blank__corner {
            position: absolute;
            top: 40px;
            left: 40px;
            width: 400px;
        }

        /* Название организации */
        .blank__title {
            font-size: 24px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 10px;
            line-height: 1.2;
        }

        /* Тип учреждения */
        .blank__type {
            font-size: 14px;
            font-weight: normal;
            margin-bottom: 8px;
        }

        /* Полное название */
        .blank__full-name {
            font-size: 16px;
            line-height: 1.2;
            margin-bottom: 5px;
            text-align: center;
        }

        /* Аббревиатура в скобках */
        .blank__abbr {
            font-size: 14px;
            margin-bottom: 15px;
            text-align: center;
        }

        /* Адрес */
        .blank__address {
            font-size: 14px;
            line-height: 1.4;
            margin-bottom: 10px;
        }

        /* Контакты */
        .blank__contacts {
            font-size: 14px;
            line-height: 1.4;
            margin-bottom: 10px;
        }

        /* Реквизиты */
        .blank__requisites {
            font-size: 14px;
            line-height: 1.4;
            margin-bottom: 30px;
        }

        /* Номера */
        .blank__numbers {
            font-size: 14px;
            line-height: 2;
        }

        .blank__number-item {
            margin-bottom: 5px;
            text-align: center;
            
        }

        .blank__underline {
            letter-spacing: 4px;
            margin-left: 5px;
            text-decoration: underline;
        }

        
    </style>
</head>
<body>
    <div class="blank">
        <!-- ВСЁ В ЛЕВОМ ВЕРХНЕМ УГЛУ -->
        
            
            <!-- Полное название -->
            <div class="blank__full-name">
                ${OrgParentName} <br>
                ${OrgName}
            </div>
            
            <!-- Аббревиатура -->
            <div class="blank__abbr">${ShortName}</div>
            

            <!-- Номера -->
            <div class="blank__numbers">
                <div class="blank__number-item">
                     <span class=>${CityName}</span>
                </div>
                <div class="blank__number-item">
                    <span>______</span> № <span class="blank__underline">  ___${NumberName}____</span>
                </div>
            </div>
        </div>
        
        <!-- ОСНОВНОЕ МЕСТО ДЛЯ ТЕКСТА (с отступом от левого угла) -->
        <div style="margin-left: 100px; margin-top: 100px; padding: 20px;">
            ${TextValue}
        </div>
    </div>
</body>
</html>`;

async function generatePDF(htmlContent, filename) {
    // Создаём лоадер
    const loader = document.createElement('div');
    loader.className = 'loader-overlay';
    loader.innerHTML = `
        <div class="loader-card">
            <div class="loader-spinner"></div>
            <div class="loader-text">Создание PDF</div>
            <div class="loader-subtext">Это займёт несколько секунд...</div>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Показываем лоадер
    setTimeout(() => loader.classList.add('active'), 10);
    
    // Функция обновления прогресса
    const updateProgress = (percent) => {
        const fill = document.getElementById('progressFill');
        if (fill) fill.style.width = percent + '%';
    };
    
    // Создаём контейнер
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.width = '595px';
    element.style.padding = '20px';
    element.style.backgroundColor = 'white';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    document.body.appendChild(element);
    
    try {
        updateProgress(20);
        await new Promise(resolve => setTimeout(resolve, 50));
        
        updateProgress(40);
        const canvas = await html2canvas(element, {
            scale: 1.5,
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: false,
            useCORS: true,
            windowWidth: 595
        });
        
        updateProgress(70);
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        
        updateProgress(90);
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save(filename + '.pdf');
        
        updateProgress(100);
        console.log('PDF готов');
    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        // Убираем лоадер
        loader.classList.remove('active');
        setTimeout(() => document.body.removeChild(loader), 300);
        document.body.removeChild(element);
    }
}


generatePDF(wordDoc, "test");






    



})

let formLetterEl = document.querySelector('.form__submit--letter')
formLetterEl.addEventListener('click', function() {

let highOrganization = document.querySelector('#high-organization').value
let FullName = document.querySelector('#fullName').value
let ShortName = document.querySelector('#shortName').value
let AdressName = document.querySelector('#addressName').value
let PhoneName = document.querySelector('#phoneName').value
let EmailName = document.querySelector('#emailName').value
let SiteName = document.querySelector('#siteName').value
let OkpoName = document.querySelector('#okpoName').value
let OgrnName = document.querySelector('#ogrnName').value
let innName = document.querySelector('#innName').value
let TextValue = document.querySelector('#textValue').value

let letterDoc = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Угловой бланк</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            text-align: center;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
        background: white;
        margin: 0;
        padding: 0;

        }

        /* Бланк */
        .blank {
            width: 800px;
            min-height: 1000px;
            background: white;
            padding: 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            position: relative;
            margin: 0 auto;
        }

        /* ВСЕ В ЛЕВОМ ВЕРХНЕМ УГЛУ */
        .blank__corner {
            
            width: 100%;
        }

        /* Название организации */
        .blank__title {
            font-size: 26px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 10px;
            line-height: 1.2;
        }

        /* Тип учреждения */
        .blank__type {
            font-size: 15px;
            font-weight: normal;
            margin-bottom: 8px;
        }

        /* Полное название */
        .blank__full-name {
            font-size: 15px;
            line-height: 1.4;
            margin-bottom: 5px;
        }

        /* Аббревиатура в скобках */
        .blank__abbr {
            font-size: 15px;
            margin-bottom: 15px;
        }

        /* Адрес */
        .blank__address {
            font-size: 15px;
            line-height: 1.4;
            margin-bottom: 10px;
        }

        /* Контакты */
        .blank__contacts {
            font-size: 15px;
            line-height: 1;
            margin-bottom: 10px;
        }

        /* Реквизиты */
        .blank__requisites {
            font-size: 14px;
            line-height: 1;
            margin-bottom: 30px;
        }

        /* Номера */
        .blank__numbers {
            font-size: 15px;
            line-height: 2;
        }

        .blank__number-item {
            margin-bottom: 5px;
        }

        .blank__underline {
            letter-spacing: 4px;
            margin-left: 5px;
        }

        
    </style>
</head>
<body>
    <div class="blank">
        <!-- ВСЁ В ЛЕВОМ ВЕРХНЕМ УГЛУ -->
        
            
            <!-- Полное название -->
            <div class="blank__full-name">
                ${highOrganization} <br>
                ${FullName}
            </div>
            
            <!-- Аббревиатура -->
            <div class="blank__abbr">(${ShortName})</div>
            
            <!-- Пустая строка как на фото -->
            <div style="height: 10px;"></div>
            
            <!-- Адрес -->
            <div class="blank__address">
                ${AdressName}
            </div>
            
            <!-- Контакты -->
            <div class="blank__contacts">
                Тел./факс ${PhoneName}<br>
                E-mail: ${EmailName}<br>
                ${SiteName}
            </div>
            
            <!-- Реквизиты -->
            <div class="blank__requisites">
                ОКПО ${OkpoName}, ОГРН ${OgrnName},<br>
                ИНН/КПП ${innName}
            </div>
            
            
            <!-- Номера -->
            <div class="blank__numbers">
                <div class="blank__number-item">
                    № <span class="blank__underline">______</span>
                </div>
                <div class="blank__number-item">
                    На № <span class="blank__underline">______</span> от <span class="blank__underline">______</span>
                </div>
            </div>
            <div style="margin-left: 80px; margin-top: 100px; padding: 20px;">
                ${TextValue}
            </div>
        </div>
        
        
        
    
</body>
</html>`


  async function generatePDF(htmlContent, filename) {
    // Создаём временный контейнер
    const element = document.createElement('div');
    element.innerHTML = htmlContent;

    // Убираем внешние отступы у самого контейнера
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '800px';
    element.style.backgroundColor = 'white';
    element.style.margin = '0';     // убираем внешние отступы
    element.style.padding = '0';    // убираем внутренние отступы

    document.body.appendChild(element);

    try {
        // Рендерим в canvas
        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#ffffff',
            windowWidth: 800,
            logging: false
        });

        // Создаём PDF
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Отступы (можно менять под себя)
        const leftMargin = 10;    // слева
        const rightMargin = 10;   // справа
        const topMargin = 15;     // сверху
        const bottomMargin = 15;  // снизу
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Ширина контента с учетом отступов
        const contentWidth = pageWidth - leftMargin - rightMargin;
        
        // Масштабируем изображение
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * contentWidth) / canvas.width;
        
        // Если изображение не помещается по высоте
        if (imgHeight > pageHeight - topMargin - bottomMargin) {
            // Масштабируем по высоте
            const scaleByHeight = (pageHeight - topMargin - bottomMargin) / imgHeight;
            const scaledWidth = imgWidth * scaleByHeight;
            const scaledHeight = imgHeight * scaleByHeight;
            
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 0.95), 
                'JPEG', 
                leftMargin + (contentWidth - scaledWidth) / 2, // центрируем по ширине
                topMargin, 
                scaledWidth, 
                scaledHeight
            );
        } else {
            // Всё помещается
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 0.95), 
                'JPEG', 
                leftMargin, 
                topMargin, 
                imgWidth, 
                imgHeight
            );
        }
        
        pdf.save(filename + '.pdf');

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        document.body.removeChild(element);
    }
}

    generatePDF(letterDoc, 'letter-blanc.pdf')

})

let letFaceEl = document.querySelector('.form__submit--face')
letFaceEl.addEventListener('click', function() {

let highOrganization = document.querySelector('#high-organization').value
let FullName = document.querySelector('#fullName2').value
let ShortName = document.querySelector('#shortName2').value
let AdressName = document.querySelector('#addressName2').value
let PhoneName = document.querySelector('#phoneName2').value
let EmailName = document.querySelector('#emailName2').value
let SiteName = document.querySelector('#siteName2').value
let OkpoName = document.querySelector('#okpoName2').value
let OgrnName = document.querySelector('#ogrnName2').value
let innName = document.querySelector('#innName2').value
let TextValue = document.querySelector('#textValue2').value
let FaceName = document.querySelector('#faceName')

let letterDoc = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Угловой бланк</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            text-align: center;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
        background: white;
        margin: 0;
        padding: 0;

        }

        /* Бланк */
        .blank {
            width: 800px;
            min-height: 1000px;
            background: white;
            padding: 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            position: relative;
            margin: 0 auto;
        }

        /* ВСЕ В ЛЕВОМ ВЕРХНЕМ УГЛУ */
        .blank__corner {
            
            width: 100%;
        }

        /* Название организации */
        .blank__title {
            font-size: 26px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 10px;
            line-height: 1.2;
        }

        /* Тип учреждения */
        .blank__type {
            font-size: 15px;
            font-weight: normal;
            margin-bottom: 8px;
        }

        /* Полное название */
        .blank__full-name {
            font-size: 15px;
            line-height: 1.4;
            margin-bottom: 5px;
        }

        /* Аббревиатура в скобках */
        .blank__abbr {
            font-size: 15px;
            margin-bottom: 15px;
        }

        /* Адрес */
        .blank__address {
            font-size: 15px;
            line-height: 1.4;
            margin-bottom: 10px;
        }

        /* Контакты */
        .blank__contacts {
            font-size: 15px;
            line-height: 1;
            margin-bottom: 10px;
        }

        /* Реквизиты */
        .blank__requisites {
            font-size: 14px;
            line-height: 1;
            margin-bottom: 30px;
        }

        /* Номера */
        .blank__numbers {
            font-size: 15px;
            line-height: 2;
        }

        .blank__number-item {
            margin-bottom: 5px;
        }

        .blank__underline {
            letter-spacing: 4px;
            margin-left: 5px;
        }

        
    </style>
</head>
<body>
    <div class="blank">
        <!-- ВСЁ В ЛЕВОМ ВЕРХНЕМ УГЛУ -->
        
            
            <!-- Полное название -->
            <div class="blank__full-name">
                ${highOrganization} <br>
                ${FullName}
            </div>
            
            <!-- Аббревиатура -->
            <div class="blank__abbr">(${ShortName})</div>
            
            <!-- Пустая строка как на фото -->
            <div class="blank__address>${FaceName}</div>
            
            <!-- Адрес -->
            <div class="blank__address">
                ${AdressName}
            </div>
            
            <!-- Контакты -->
            <div class="blank__contacts">
                Тел./факс ${PhoneName}<br>
                E-mail: ${EmailName}<br>
                ${SiteName}
            </div>
            
            <!-- Реквизиты -->
            <div class="blank__requisites">
                ОКПО ${OkpoName}, ОГРН ${OgrnName},<br>
                ИНН/КПП ${innName}
            </div>
            
            
            <!-- Номера -->
            <div class="blank__numbers">
                <div class="blank__number-item">
                    № <span class="blank__underline">______</span>
                </div>
                <div class="blank__number-item">
                    На № <span class="blank__underline">______</span> от <span class="blank__underline">______</span>
                </div>
            </div>
            <div style="margin-left: 80px; margin-top: 100px; padding: 20px;">
                ${TextValue}
            </div>
        </div>
        
        
        
    
</body>
</html>`


  async function generatePDF(htmlContent, filename) {
    // Создаём временный контейнер
    const element = document.createElement('div');
    element.innerHTML = htmlContent;

    // Убираем внешние отступы у самого контейнера
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '800px';
    element.style.backgroundColor = 'white';
    element.style.margin = '0';     // убираем внешние отступы
    element.style.padding = '0';    // убираем внутренние отступы

    document.body.appendChild(element);

    try {
        // Рендерим в canvas
        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#ffffff',
            windowWidth: 800,
            logging: false
        });

        // Создаём PDF
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Отступы (можно менять под себя)
        const leftMargin = 10;    // слева
        const rightMargin = 10;   // справа
        const topMargin = 15;     // сверху
        const bottomMargin = 15;  // снизу
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Ширина контента с учетом отступов
        const contentWidth = pageWidth - leftMargin - rightMargin;
        
        // Масштабируем изображение
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * contentWidth) / canvas.width;
        
        // Если изображение не помещается по высоте
        if (imgHeight > pageHeight - topMargin - bottomMargin) {
            // Масштабируем по высоте
            const scaleByHeight = (pageHeight - topMargin - bottomMargin) / imgHeight;
            const scaledWidth = imgWidth * scaleByHeight;
            const scaledHeight = imgHeight * scaleByHeight;
            
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 0.95), 
                'JPEG', 
                leftMargin + (contentWidth - scaledWidth) / 2, // центрируем по ширине
                topMargin, 
                scaledWidth, 
                scaledHeight
            );
        } else {
            // Всё помещается
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 0.95), 
                'JPEG', 
                leftMargin, 
                topMargin, 
                imgWidth, 
                imgHeight
            );
        }
        
        pdf.save(filename + '.pdf');

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        document.body.removeChild(element);
    }
}

    generatePDF(letterDoc, 'letter-blanc.pdf')

})
