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
  optArticleAuthorsSelector = '.post-author',
  optAuthorListSelector = '.authors.list',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

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
  console.log('my custom selector:', customSelector);
}

function calculateTagsParam(tags){
  const params = {
    min: 0,
    max: 999999,
  };

  for (let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1)+1);
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
      /* [DONE] add generated code to html variable */
      html += linkHTML;
      /* [DONE] END LOOP: for each tag */
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log('all tag ');
      console.log( allTags);
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  /*[NEW] create a variable for all links HTML code*/
  const tagsParams = calculateTagsParam(allTags);
  let allTagsHTML = '';
  for(let tag in allTags){
    /*[NEW] generate code of a link and add it to allTagsHTML: */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) +' " href="#tag-' + tag +'">'  + tag + ' (' + allTags[tag] + ')</a></li>';
    //const linkHTML = '<li><a class="" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    allTagsHTML += tagLinkHTML;
  }
  /*[NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log('tag list');
  console.log(tagList);
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  event.preventDefault();

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  /* [DONE] remove class active */
  for (let tag of activeTagLinks) {
    tag.classList.remove('active');
  }
  /* [DONE] END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const foundLinks = document.querySelectorAll('a[href="' + href + '"]');

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

  /* [DONE] START LOOP: for each link */
  /* [DONE] add tagClickHandler as event listener for that link */
  /* [DONE] END LOOP: for each link */
  for (let link of foundTagLinks) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

/*[DONE]*/
function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    let html = '';
    /*AUTHOR LIST*/
    const authorTags = article.getAttribute('data-author');
    const linkHTML = '<a href="#author-' + authorTags + '">' + authorTags + '</a>';
    html += linkHTML;
    authorWrapper.innerHTML = html;
    if(!allAuthors.hasOwnProperty(authorTags)){
      allAuthors[authorTags] = 1;
    } else {
      allAuthors[authorTags]++;
    }
  }
  console.log('allAuthors ');
  console.log(allAuthors);
  const authorList = document.querySelector(optAuthorListSelector);
  const authorsParams = calculateTagsParam(allAuthors);
  console.log('authorsParams: ', authorsParams);
  let allAuthorsHTML = '';
  for(let author in allAuthors) {
    const authorsLinkHTML = '<li><a class="' + calculateTagClass(allAuthors[author], authorsParams) +' " href="#tag-' + author +'">'  + author +  '(' + allAuthors[author] + ')</a></li>';
    console.log('authorsLinkHTML: ', authorsLinkHTML);
    allAuthorsHTML += authorsLinkHTML;
    authorList.innerHTML = allAuthorsHTML;

  }
  //authorList.innerHTML = allAuthorsHTML;




}
generateAuthors();

function addClickListenersToAuthors(){
  const foundAutorsLinks = document.querySelectorAll(('a[href^="#"]'));
  for (let link of foundAutorsLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorList = document.querySelectorAll('a.active[href^="#author-"]');

  for (let authorLink of activeAuthorList) {
    authorLink.classList.remove('active');
  }

  const foundAuthor = document.querySelectorAll('a[href="' + author + '"]');

  for (let author of foundAuthor){
    author.classList.add('active');
  }

  generateTitleLinks('[data-tags="' + author + '"]');
}
