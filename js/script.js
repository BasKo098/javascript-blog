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
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const linkHref = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(linkHref);
  
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
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
  
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles) {
    
    /* [DONE]get the article id */
    const articleId = article.getAttribute('id'); 
   
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* [DONE] insert link into html variable */
    /* [DONE] EXAMPLE by use insertAdjacentHTML:  const insert = titleList.insertAdjacentHTML('beforeend', linkHTML);*/
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
