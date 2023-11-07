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
  console.log('clickedElement:', clickedElement);
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

function generateTitleLinks(customSelector = '') {

  const titleList = document.querySelector(optTitleListSelector);
  const titleItems = document.querySelectorAll('.list .titles li');
  for(let item of titleItems) {
    item.remove();
  }
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
    titleList.innerHTML = html;
  }

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  console.log('my custom selector: ', customSelector);
}

generateTitleLinks();

function calculateTagsParam(tags){
  const params = {
    min: 0,
    max: 999999,
  };

  for (let tag in tags){
    //*console.log(tag + ' is used ' + tags[tag] + ' times');
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
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray){
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
      html += linkHTML;
      if (!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParam(allTags);
  let allTagsHTML = '';
  for(let tag in allTags){
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) +' " href="#tag-' + tag +'">'  + tag + ' (' + allTags[tag] + ')</a></li>';
    allTagsHTML= allTagsHTML + tagLinkHTML;
    tagList.innerHTML = allTagsHTML;
  }
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
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

  for (let tag of foundLinks) {
    tag.classList.add('active');
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tag~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const foundTagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of foundTagLinks) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

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
  const authorList = document.querySelector(optAuthorListSelector);
  const authorsParams = calculateTagsParam(allAuthors);
  let allAuthorsHTML = '';
  for(let author in allAuthors) {
    const authorsLinkHTML = '<li><a class="' + calculateTagClass(allAuthors[author], authorsParams) +' " href="#author-' + author +'">'  + author +  '(' + allAuthors[author] + ')</a></li>';
    allAuthorsHTML += authorsLinkHTML;
    authorList.innerHTML = allAuthorsHTML;
  }
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorList = document.querySelectorAll('a.active[href^="#author-"]');

  for (let authorLink of activeAuthorList) {
    authorLink.classList.remove('active');
  }

  const foundAuthor = document.querySelectorAll('a[href="' + href + '"]');

  for (let author of foundAuthor){
    author.classList.add('active');
  }
  generateTitleLinks('[data-author~="' + author + '"]');
}

function addClickListenersToAuthors(){
  const foundAutorsLinks = document.querySelectorAll(('a[href^="#author-"]'));
  for (let link of foundAutorsLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
