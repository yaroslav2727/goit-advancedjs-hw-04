import "modern-normalize/modern-normalize.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";
import { getImages } from "./getImages";
import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast";

iziToast.settings({
  position: "bottomCenter",
  timeout: 2500,
});

const RESULTS_PER_PAGE = 40;

const formEl = document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery");
const observerEl = document.querySelector(".js-observer");

const lightbox = new SimpleLightbox(".gallery a");
const observer = new IntersectionObserver(observerAction, {
  rootMargin: "1000px",
});

formEl.addEventListener("submit", onSubmit);

let currentPage;
let currentQuery;

function onSubmit(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value.trim().replace(/\s+/g, "+");
  if (!query) {
    iziToast.info({ message: "Please enter your search query." });
    return;
  }
  if (query === currentQuery) {
    iziToast.info({ message: "For a new search, please enter another search query." });
    return;
  }
  currentPage = 0;
  currentQuery = query;
  galleryEl.innerHTML = "";
  observer.observe(observerEl);
}

async function observerAction(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      const newMarkup = await drawMarkup(currentQuery, currentPage);
      if (newMarkup) {
        galleryEl.insertAdjacentHTML("beforeend", newMarkup);
        lightbox.refresh();
      }
    }
  });
}

async function drawMarkup(query, pageNumber = 1) {
  try {
    const data = await getImages(query, pageNumber, RESULTS_PER_PAGE);
    if (!data.totalHits) {
      iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again.",
        timeout: 5000,
      });
      observer.disconnect();
      return "";
    }
    if (pageNumber === 1) {
      iziToast.success({ message: `Hooray! We found ${data.totalHits} images.` });
    }
    if (data.totalHits <= pageNumber * RESULTS_PER_PAGE) {
      iziToast.info({ message: "All found images are displayed." });
      observer.disconnect();
    }
    return data.hits
      .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
                <a
                    class="photo-card"
                    href="${largeImageURL}"
    
                >
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${downloads}
                        </p>
                    </div>
                </a>`;
      })
      .join("");
  } catch (err) {
    console.dir(err);
    iziToast.error({ message: err.message });
    observer.disconnect();
  }
}
