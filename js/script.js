'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  event.preventDefault();
  console.log('clickedElement (with plus): ' + clickedElement);
  console.log('Link was clicked!');
  console.log(event);


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
    activeArticle.classList.remove('active')
   }

  /* [DONE] get 'href' attribute from the clicked link */
  const linkHref = clickedElement.getAttribute('href');
  console.log('pobrany href to: ', linkHref)


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(linkHref);
  console.log ('Szukany artykuł to: ', targetArticle)

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active')
  console.log('active: ', targetArticle);
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}