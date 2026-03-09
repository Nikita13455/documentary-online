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
                    <span class="blank__underline">______</span> № <span class="blank__underline">  ___${NumberName}____</span>
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
