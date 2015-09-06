	/**Автоматическая генерация оглавления*/
function maketoc() {
	// Найти контейнер. В случае отсутствия такового просто завершить работу.
	var container = document.getElementById('toc');
	if (!container) return;
	// Обойти документ, добавить в массив все теги <h1>...<h6>
	var sections = [];
	findSections(document, sections);
	// Вставить якорный элемент перед контйнером, чтобы можно было
	// создавать обратные ссылки на него
	var anchor = document.createElement("a"); // Создать узел <a>
	anchor.name = "TOCtop";
	// Установить атрибуты
	anchor.id = "TOCtop";
	// name и id (для IE)
	container.parentNode.insertBefore(anchor, container); // Вставить перед оглавлением
	// Инициализировать массив для отслеживания номеров разделов
	var sectionNumbers = [0,0,0,0];
	
	// Обойти в цикле все найденные заголовки разделов
	for(var s = 0; s < sections.length; s++) {
		var section = sections[s];
		
		// Определить уровень заголовка		
		var level = parseInt(section.tagName.charAt(1));
		if (isNaN(level) || level < 2 || level > 6) continue;
		// Увеличить номер раздела для данного уровня
		// и сбросить в ноль номера всех нижележащих подуровней
		sectionNumbers[level-1]++;
		for(var i = level; i < 6; i++) sectionNumbers[i] = 0;
		// Собрать номер раздела для данного уровня,
		// чтобы создать такой номер, как, например, 2.3.1
		var sectionNumber = "";
		for(i = 0; i < level; i++) {
			sectionNumber += sectionNumbers[i];
			if (i < level-1) sectionNumber += ".";
		}
		// Добавить номер и пробел в заголовок.
		// Номер помещается в тег <span>, чтобы можно было влиять на формат вывода.
		var frag = document.createDocumentFragment(); // Для хранения номера и пробела
		var span = document.createElement("span");
		// Узел span номера сделать
		span.className = "TOCSectNum";
		// доступным для форматирования
		span.appendChild(document.createTextNode(sectionNumber)); // Добавить номер
		frag.appendChild(span);	// Добавить тег с номером во фрагмент
		frag.appendChild(document.createTextNode(" ")); // Добавить пробел
		section.insertBefore(frag, section.firstChild); // Добавить все в заголовок
		// Создать якорный элемент, который будет отмечать начало раздела.
		var anchor = document.createElement("a");
		// Имя элемента, на которое будет ссылка
		anchor.name = "TOC"+sectionNumber;
		anchor.id = "TOC"+sectionNumber; // В IE для генерации ссылок
		// необходимо определить атрибут id
		// Обернуть якорным элементом обратную ссылку на оглавление
		var link = document.createElement("a");
		link.href = "#TOCtop";
		link.className = "TOCBackLink";
		link.appendChild(document.createTextNode(maketoc.backlinkText));
		anchor.appendChild(link);
		// Вставить якорный элемент и ссылку непосредственно перед заголовком раздела
		section.parentNode.insertBefore(anchor, section);
		// Создать ссылку на этот раздел.
		var link = document.createElement("a");
		link.href = "#TOC" + sectionNumber; // Определить адрес ссылки
		link.innerHTML = section.innerHTML; // записать текст заголовка в текст ссылки
		// Поместить ссылку в элемент div, чтобы получить возможность влиять
		// на формат отображения на основе уровня заголовка
		var entry = document.createElement("div");
		entry.className = "TOCEntry TOCLevel" + level; // Для CSS
		entry.appendChild(link);
		// И добавить элемент div в контейнер с оглавлением
		container.appendChild(entry);
	}
	
	
	// Этот метод обходит дерево элементов с корнем в элементе n,
	// отыскивает теги с <h1> по <h6> и добавляет их в массив разделов.
	function findSections(n, sects) {
		// Обойти все дочерние узлы элемента n
		for(var m = n.firstChild; m != null; m = m.nextSibling) {
		  // Пропустить узлы, которые не являются элементами.
		  if (m.nodeType != 1 /* Node.Element_NODE */) continue;
		  
		  // Пропустить контейнерный элемент, поскольку он может иметь свой заголовок
		  if (m == container) continue;
		  // С целью оптимизации пропустить теги <p>, поскольку
		  // предполагается, что заголовки не могут появляться внутри
		  // абзацев. (Кроме того, можно было бы пропустить списки,
		  // теги <pre> и прочие, но тег <p> самый распространенный.)
		  if (m.tagName == "p") continue; // Оптимизация Узел не был пропущен проверить, не является ли он заголовком.
		  //Если это заголовок, добавить его в массив. Иначе просмотреть
		  //рекурсивно содержимое узла.
		  //Обратите внимание: модель DOM основана на интерфейсах,
		  //а не на классах, потому нельзя выполнить проверку
		  //на принадлежность (m instanceof HTMLHeadingElement).
		  if (m.tagName.length==2 && m.tagName.charAt(0)=="H")
		  sects.push(m);
		  else
		  findSections(m, sects);
		  
		}
	}
}
	// Это текст по умолчанию для обратных ссылок на оглавление
	maketoc.backlinkText = "К оглавлению";
	
	// Зарегистрировать функцию maketoc() как обработчик события onload
	if (window.addEventListener) window.addEventListener("load", maketoc, false);
	else if (window.attachEvent) window.attachEvent("onload", maketoc);
	
	
	
