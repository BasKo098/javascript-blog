'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  event.preventDefault();

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
   /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

   /* [DONE]  remove class 'active' from all articles */
  const  activeArticles = document.querySelectorAll('.posts article.active');
   for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active')
   }

  /* [DONE] get 'href' attribute from the clicked link */
  const linkHref = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(linkHref);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active')
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
function clearMessages(){
    const titleList = document.querySelector(optTitleListSelector); 
    titleList.innerHTML = '';
  }
 
function generateTitleLinks(){

   /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  clearMessages();

  const titleItems = document.querySelectorAll('.list .titles li');
  for(let item of titleItems){
    item.remove();
  }
/*następnie dla każdego artykułu:
odczytaj jego id i zapisz je do stałej,
znajdź element z tytułem i zapisz jego zawartość do stałej,
na podstawie tych informacji stwórz kod HTML linka i zapisz go do stałej,
wstaw stworzony kod HTML do listy linków w lewej kolumnie.*/
  
/* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

    /* get the article id */
    for (let article of articles) {
      const articleId = article.getAttribute('id');
    }
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);



    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();
