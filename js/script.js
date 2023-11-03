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
  optArticleTagsSelector = '.post-tags .list',
  optAuthorListSelector = '.post .post-author';

function clearMessages(){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
}

function generateTitleLinks(customSelector = ''){

  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  clearMessages();

  const titleItems = document.querySelectorAll('.list .titles li');
  for(let item of titleItems){
    item.remove();
  }

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article:*/
  for (let article of articles) {

    /* [DONE] find tags wrapper*/
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string*/
    let html = '';

    /* [DONE] get tags from data-tags attribute*/
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array*/
    const articleTagsArray = articleTags.split(', ');

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
      /* [DONE] add generated code to html variable */
      html += linkHTML;
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);

  /* [DONE] END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('to ten const href ' + href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log ( 'ten tag równy href ' + tag);

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log ('ten activeTagLinks' + activeTagLinks);

  /* [DONE] START LOOP: for each active tag link */
  /* [DONE] remove class active */
  for (let tag of activeTagLinks) {
    tag.classList.remove('active');
  }
  /* [DONE] END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const foundLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tot ten found Links ' + foundLinks);

  /* [DONE] START LOOP: for each found tag link */
  /* [DONE] add class active */
  /* [DONE] END LOOP: for each found tag link */
  for (let tag of foundLinks) {
    tag.classList.add('active');
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const foundTagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log('ten found tags ' + foundTagLinks);

  /* [DONE] START LOOP: for each link */
  /* [DONE] add tagClickHandler as event listener for that link */
  /* [DONE] END LOOP: for each link */
  for (let link of foundTagLinks) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();



function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optAuthorListSelector);
    let html = '';
    const authorTags = article.getAttribute('data-author');
    console.log('autor tag ' + authorTags);
    const linkHTML = '<a href="#">' + authorTags + '</a>';
    console.log('ten link ' + linkHTML);
    html += linkHTML;

    /*[PROBLEM] nie wiem dlaczego nie "wstrzykuje mi się wartość linku html do post autor"*/

    authorWrapper.insertAdjacentHTML('beforeend', html);
  }
}

generateAuthors();


