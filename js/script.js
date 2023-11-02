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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log ('to ten article to to+' + articles);

  /* START LOOP: for every article:*/
  for (let article of articles) {

    /* find tags wrapper*/
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log('ten wrap '+ tagsWrapper);

    /* make html variable with empty string*/
    let html = '';

    /* get tags from data-tags attribute*/
    const articleTags = article.getAttribute('data-tags');
    console.log('ten tag ' + articleTags);

    /* split tags into array*/
    const articleTagsArray = articleTags.split(' ');
    console.log ('to ten arr ' + articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log('to ten tag ' + tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
      console.log('to ten link ' + linkHTML);
      /* add generated code to html variable */
      html += linkHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
  }
}

generateTags();
