import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// 1. CОЗДАНИЕ ГАЛЕРЕИ ИЗОБРАЖЕНИЙ
const galleryItemsContainer = document.querySelector(".gallery");
console.log(galleryItemsContainer);

const itemsMarkup = createItemsMarkup(galleryItems);
console.log(itemsMarkup);

// Вставка готовых элементов галереи в html
galleryItemsContainer.insertAdjacentHTML("afterbegin", itemsMarkup);

// Функция создания галереи изображений
function createItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
}

// 2. СОЗДАНИЕ ОБЩЕГО СЛУШАТЕЛЯ СОБЫТИЙ НА ГАЛЕРЕЮ
galleryItemsContainer.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(evt) {
  // отменить клик на ссылку <a> по умолчанию
  evt.preventDefault();

  // Элемент на который кликнули
  const hoverGalleryItemEl = evt.target;
  console.log("src", hoverGalleryItemEl.src);
  console.log("dataset.source", hoverGalleryItemEl.dataset.source);

  //   Если кликнули не на картинку - выход с функции
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  // 3. РАБОТА БИБЛИОТЕКИ basicLightbox НА ЕЛЕМЕНТ, КОТОРЫЙ КЛИКНУЛИ
  const instance = basicLightbox.create(
    `<img src = ${hoverGalleryItemEl.dataset.source} width = "800" height = "600"/>`
  );

  instance.show();

  //   ВЫХОД ИЗ ОКНА ПРОСМОТРА ПО КЛАВИШЕ ESCAPE
  window.addEventListener("keydown", (evt) => {
    console.log(evt.code);

    if (evt.code === "Escape") {
      instance.close();
    }
  });

  //   2 ВАРИАНТ - ESCAPE в отдельную функцию
  //     window.addEventListener("keydown", onGalleryItemExit);

  //     function onGalleryItemExit(evt) {
  //       const ESC_KEY_CODE = "Escape";
  //       const isEscKey = evt.code === ESC_KEY_CODE;
  //       if (isEscKey) {
  //         instance.close();
  //       }
  //     }
}
