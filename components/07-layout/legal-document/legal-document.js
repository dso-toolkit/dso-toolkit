// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = {
  dsoLegalDocument(legalDocument, options) {
    return `
      <section class="dso-legal-document">
        ${legalDocument.map((d, i, array) => {
          if (isHeader(d.type)) {
            const headerElement = getHeader(d, array);
            const headerClass = getHeadingClass(d.type);

            return `<${headerElement} class="${headerClass}">${d.content}</${headerElement}>`;
          }

          if (isArticle(d.type)) {
            return `
              <article>
                ${d.content.map((c, i, array) => {
                  if (isArticleHeader(c.type)) {
                    const articleHeaderElement = getArticleHeader(c, array);
                    const articleHeaderClass = getArticleHeadingClass(c.type);

                    return `<${articleHeaderElement} class="${articleHeaderClass}">${c.content}</${articleHeaderElement}>`;
                  }
                  if (isArticleBody(c.type)) {
                    return c.content;
                  }
                }).join('')}
              </article>
            `;
          }
        }).join('')}
      </section>
    `;
  }
};

function isHeader(type) {
  return type === 'documentHeader' || type === 'chapterHeader' || type == 'titleHeader' || type === 'departmentHeader';
}

function getHeader(h, array) {
  if (!array.includes(h)) {
    throw new Error('Header does not exist in array');
  }

  const headers = array.filter(i => isHeader(i.type));

  return `h${headers.indexOf(h) + 1}`;
}

function getHeadingClass(type) {
  switch (type) {
    case 'documentHeader':
      return 'dso-is-document';
    case 'chapterHeader':
      return 'dso-is-chapter';
    case 'titleHeader':
      return 'dso-is-title';
    case 'departmentHeader':
      return 'dso-is-department';
  }
}

function isArticle(type) {
  return type === 'article';
}

function isArticleHeader(type) {
  return type === 'paragraphHeader' || type === 'subparagraphHeader' || type === 'subsubparagraphHeader' || type === 'articleHeader';
}

function isArticleBody(type) {
  return type === 'body';
}

function getArticleHeader(h, array) {
  if (!array.includes(h)) {
    throw new Error('Header does not exist in array');
  }

  const articleHeaders = array.filter(i => isArticleHeader(i.type));

  return `h${articleHeaders.indexOf(h) + 1}`;
}

function getArticleHeadingClass(type) {
  switch (type) {
    case 'paragraphHeader':
      return 'dso-is-paragraph';
    case 'subparagraphHeader':
      return 'dso-is-subparagraph';
    case 'subsubparagraphHeader':
      return 'dso-is-subsubparagraph';
      case 'articleHeader':
        return 'dso-is-article';
  }
}
