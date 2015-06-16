
// Задаем начальные значения данных:
schet1 = 0;
schet2 = 0;
// Координата биты игрока (отступ слева)
bitaLeft = 220;
bita2Left = 220;

// Координаты мяча в ассоциативном массиве
shar = {top: 410, left: 220}
igraNachata = 0;
// Шаг изменения координат шарика
// при отрицательном значении координата уменьшается
pribavka = {top: -3, left: 3}

// Создаем переменную, в которой будет храниться периодический запуск функции движения шарика
dvijenie = null;

// Теперь создаем функции:

// стартовая функция
function startProgram(){
	// при нажатии кнопок клавиатуры, запускаем программу keyProgram
	window.onkeydown = keyProgram;
}

// функция реагирует на нажатия клавиатуры
// в эту функцию автоматически передаются данные о нажатии в переменную 'e'
function keyProgram(e){

	// влево
    if (e.keyCode == 37){
    	bitaLeft = bitaLeft - 35;
    	// ограничиваем движение биты слева
    	if (bitaLeft < 10){ bitaLeft = 10 }
    	// и теперь двигаем html-элемент биты
		document.getElementById('id_bita').style.left = bitaLeft;
    }
	if (e.keyCode == 65){
    	bita2Left = bita2Left - 35;
    	// ограничиваем движение биты слева
    	if (bita2Left < 10){ bita2Left = 10 }
    	// и теперь двигаем html-элемент биты
		document.getElementById('id_bita2').style.left = bita2Left;
    }
	// вправо
    if (e.keyCode == 39){
    	bitaLeft = bitaLeft + 35;
    	// если бита слишком уползла вправо, возвращаем в крайне-правую позицию
    	if (bitaLeft > 430){ bitaLeft = 430 }
    	// и теперь двигаем html-элемент биты
		document.getElementById('id_bita').style.left = bitaLeft;
    }
	if (e.keyCode == 68){
    	bita2Left = bita2Left + 35;
    	// если бита слишком уползла вправо, возвращаем в крайне-правую позицию
    	if (bita2Left > 430){ bita2Left = 430 }
    	// и теперь двигаем html-элемент биты
		document.getElementById('id_bita2').style.left = bita2Left;
    }

	// пробел
    if (e.keyCode == 32 || e.charCode == 32){
    	// запускаем движение мячика
    	if(igraNachata == 0){
			startShar(); 
			igraNachata = 1;
			}
    }

    // выводим в консоли информацию о нажатии клавиш
    console.log(e)
}


function startShar(){
	// каждые 10 миллисекунд будет выполняться функция передвижения шарика на один шажок
	dvijenie = setInterval(moveShar, 10);
}

function stopShar(){
	// останавливаем регулярные выполнения функции moveShar
	clearInterval(dvijenie);
}


// функция сдвига шарика на один шажок
function moveShar(){

	// запоминаем новое значение координат
	shar.left = shar.left + pribavka.left;
	shar.top = shar.top + pribavka.top;

	// проверяем, свободна ли ячейка для движения шарика
	// и запоминаем в переменной 
	svobodnoLiMesto = proverkaMesta();
	// !== означает "не равно"
	if(svobodnoLiMesto !== 'svobodno'){
		// если место не свободно, надо изменить направление полета шарика
		// но куда?

		// возврат по горизонтали
		shar.left = shar.left - pribavka.left;

		// снова проверим 
		if (proverkaMesta() !== 'svobodno'){			
			otskokVertikalno();
		} else {
			otskokGorizontalno();
		}
		// возврат по вертикали
		shar.top = shar.top - pribavka.top;

	} else {
		// в ином случае место свободно:
		// меняем координаты у html-элемента на новые
		document.getElementById('id_shar').style.left = shar.left;
		document.getElementById('id_shar').style.top = shar.top;
	}
}

function otskokVertikalno(){
	// меняем шаг прибавки на противоположный
	pribavka.top = -pribavka.top;

	shar.left = shar.left + pribavka.left;
	shar.top = shar.top + pribavka.top;
}

function otskokGorizontalno(){
	// меняем шаг прибавки на противоположный
	pribavka.left = -pribavka.left;

	shar.left = shar.left + pribavka.left;
	shar.top = shar.top + pribavka.top;
}

// функция для проверки свободно ли место перед шариком
// возвращает (return) название преграды, если место занято
// или 'svobodno'

// важно: после срабатывания команды "return" функция сразу завершается
function proverkaMesta(){
	// проверим, не выходят ли координаты за рамки поля
	if(shar.left > 510){ return 'stena' }
	if(shar.left < 20){ return 'stena' }
	if(shar.top < 20){ return 'stena' }

	// если шарик в нижней части поля
	if(shar.top > 490){
		// проверим ударился ли он в биту
		 if(shar.left > bitaLeft && shar.left < bitaLeft + 100){
			return 'bita'
		} else {
			// а если мимо биты - останавливаем игру
			stopShar();
			igraNachata = 0;
			schet2 = schet2 + 1;
			document.getElementById('id_schet1').innerHTML = schet2;
			proverkaScheta();
			// и возвращаем координаты мячика в стартовую точку 
			shar = {top: 410, left: 220}
			return 'svobodno';
		}
		
		
	}else if(shar.top < 35){
		// проверим ударился ли он в биту
		 if(shar.left > bita2Left && shar.left < bita2Left + 100){
			return 'bita'
		} else {
			// а если мимо биты - останавливаем игру
			stopShar();
			igraNachata = 0;
			schet1 = schet1 + 1;
			document.getElementById('id_schet2').innerHTML = schet1;
			proverkaScheta();
			// и возвращаем координаты мячика в стартовую точку 
			shar = {top: 90, left: 220}
			return 'svobodno';
		}
		
		
	}
	
	return 'svobodno'
}
function proverkaScheta(){
	if (schet1 == 20){
		alert('Igrok 1 pobedil');
		schet2 = 0;
		schet1 = 0;
		document.getElementById('id_schet2').innerHTML = 0;
		document.getElementById('id_schet1').innerHTML = 0;
	}else if(schet2 == 20){
		alert('Igrok 2 pobedil');
		schet2 = 0;
		schet1 = 0;
		document.getElementById('id_schet1').innerHTML = 0;
		document.getElementById('id_schet2').innerHTML = 0;
}	
}

// Запуск функции startProgram устанавливаем на момент после полной загрузки веб-страницы
window.onload = startProgram;
