'use strict';

'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-all-authors-link').innerHTML),
};

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  event.preventDefault();

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  const  activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const linkHref = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(linkHref);
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
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';
      const linkHTMLData = {id: tag, tagName: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
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

  const allTagsData = {tags: []};
  for(let tag in allTags){
    //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) +' " href="#tag-' + tag +'">'  + tag + ' (' + allTags[tag] + ')</a></li>';
    //allTagsHTML= allTagsHTML + tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    //tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log ('allTagsData');
    console.log(allTagsData);
  }
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let tag of activeTagLinks) {
    tag.classList.remove('active');
  }

  const foundLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let tag of foundLinks) {
    tag.classList.add('active');
  }

  generateTitleLinks('[data-tag^="' + tag + '"]');
}

function addClickListenersToTags(){
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
    const author = article.getAttribute('data-author');
    const linkHTMLData = {id: author, authorName: author};
    const linkHTML = templates.authorLink(linkHTMLData);
    html += linkHTML;
    authorWrapper.innerHTML = html;
    if(!allAuthors.hasOwnProperty(author)){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
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
  generateTitleLinks('[data-author^="' + author + '"]');
}

function addClickListenersToAuthors(){
  const foundAutorsLinks = document.querySelectorAll(('a[href^="#author-"]'));
  for (let link of foundAutorsLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
