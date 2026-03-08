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


    let WordDoc = `<!DOCTYPE html>
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
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        /* Бланк */
        .blank {
            width: 800px;
            min-height: 1000px;
            background: white;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
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
            font-size: 14px;
            line-height: 1.4;
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
            
            <!-- Пустая строка как на фото -->
            <div style="height: 10px;"></div>

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

const converted = htmlDocx.asBlob(WordDoc, {
        orientation: 'portrait', // книжная ориентация
        margins: { 
            top: 1000,      // отступы в твипах (1/20 точки)
            right: 1000, 
            bottom: 1000, 
            left: 1000 
        }
    });
    
    // Скачиваем через FileSaver
    saveAs(converted, 'blank.doc');




})
