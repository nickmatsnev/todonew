<script>
// Вешаем обработчик на каждую кнопку аккордеона, у которой есть data-server-fqdn
document.querySelectorAll('.accordion-button[data-server-fqdn]').forEach(button => {
  button.addEventListener('click', function() {
    const serverFqdn = this.getAttribute('data-server-fqdn');

    // Чтобы при повторном открытии не дёргать API второй раз
    if (!this.dataset.loaded) {
      fetchOrdersForServer(serverFqdn);
      this.dataset.loaded = 'true';  // флаг, указывающий, что заказы уже загружены
    }
  });
});

/**
 * Функция подгружает заказы (orders) для конкретного сервера (serverFqdn),
 * а затем динамически формирует вложенный аккордеон (Bootstrap).
 */
async function fetchOrdersForServer(serverFqdn) {
  const containerId = `AccordionWithOrdersToFill${serverFqdn}`;
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Не найден контейнер #${containerId}`);
    return;
  }

  // Показываем индикатор загрузки (или можно что-то другое)
  container.innerHTML = `<p>Загружаем заказы для ${serverFqdn}...</p>`;

  try {
    // Пример URL. Допустим, backend принимает параметр serverFqdn
    // Замените /api/orders/ на ваш реальный эндпоинт
    const response = await fetch(`/api/orders/?serverFqdn=${encodeURIComponent(serverFqdn)}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const orders = await response.json();

    // Если заказов нет, выводим сообщение
    if (!orders || orders.length === 0) {
      container.innerHTML = `<p>Currently, there are no orders for ${serverFqdn} machine.</p>`;
      return;
    }

    // Очищаем контейнер перед созданием вложенного аккордеона
    container.innerHTML = '';

    // Создаём вложенный аккордеон (div.accordion)
    const subAccordion = document.createElement('div');
    subAccordion.className = 'accordion';
    subAccordion.id = `subAccordion_${serverFqdn}`;
    container.appendChild(subAccordion);

    // Перебираем полученные заказы
    orders.forEach((order, index) => {
      // Уникальные айди для heading/collapse
      const headingId = `heading_${serverFqdn}_${index}`;
      const collapseId = `collapse_${serverFqdn}_${index}`;

      // Создаём элемент .accordion-item
      const itemDiv = document.createElement('div');
      itemDiv.className = 'accordion-item';

      // Создаём заголовок (h2.accordion-header)
      const h2 = document.createElement('h2');
      h2.className = 'accordion-header';
      h2.id = headingId;

      // Создаём кнопку внутри заголовка
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'accordion-button collapsed';
      btn.setAttribute('data-bs-toggle', 'collapse');
      btn.setAttribute('data-bs-target', `#${collapseId}`);
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', collapseId);
      // Пример оформления текста кнопки
      btn.textContent = `Order #${order.id} — ${order.status}`;

      h2.appendChild(btn);
      itemDiv.appendChild(h2);

      // Создаём div.accordion-collapse для тела
      const collapseDiv = document.createElement('div');
      collapseDiv.className = 'accordion-collapse collapse';
      collapseDiv.id = collapseId;
      collapseDiv.setAttribute('aria-labelledby', headingId);
      // Связываем с вложенным аккордеоном (чтобы только один раскрывался)
      collapseDiv.setAttribute('data-bs-parent', `#subAccordion_${serverFqdn}`);

      // Создаём div.accordion-body
      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'accordion-body';

      // Пример наполнения данными
      bodyDiv.innerHTML = `
        <p><strong>ID:</strong> ${order.id}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Scheduled:</strong> ${order.scheduled}</p>
      `;
      // Пример, если есть тесты
      if (order.tests && order.tests.length > 0) {
        bodyDiv.innerHTML += `<hr><p><strong>Tests:</strong></p>`;
        order.tests.forEach(test => {
          bodyDiv.innerHTML += `<p>— ${test.name}: ${test.result}</p>`;
        });
      }

      collapseDiv.appendChild(bodyDiv);
      itemDiv.appendChild(collapseDiv);
      subAccordion.appendChild(itemDiv);
    });

  } catch (err) {
    console.error(`Ошибка при загрузке заказов для ${serverFqdn}:`, err);
    container.innerHTML = `<p class="text-danger">Не удалось загрузить заказы для сервера ${serverFqdn}.</p>`;
  }
}
</script>